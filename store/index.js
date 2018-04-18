import jwtDecode from 'jwt-decode'
import { setToken, unsetToken } from '~/utils/auth'

export const state = () => ({
  locales: ['en', 'fr'],
  locale: 'en',
  user: null,
  // {
  //   exp: null,
  //   iat: null,
  //   role: null,
  //   username: null
  // },
  token: false,
  page: 'index',
  networks: [],
  networkStatus: {},
  medias: [],
  services: {
    mpd: {
      active: false,
      busy: false
    },
    mpdgui: {
      active: false,
      busy: false
    },
    upnpdlna: {
      active: false,
      busy: false
    },
    filesharing: {
      active: false,
      busy: false
    },
    torrents: {
      active: false,
      busy: false
    },
    networks: {
      active: false,
      busy: false
    },
    accesspoint: {
      active: false,
      busy: false
    },
    cloudstorage: {
      active: false,
      busy: false
    }
  }
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_STATUS_SERVICE: (state, data) => {
    state.services[data.service].active = data.active
    if (data.busy !== undefined) {
      state.services[data.service].busy = data.busy
    }
  },
  SET_PAGE: (state, page) => {
    state.page = page
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NETWORK_STATUS: (state, status) => {
    state.networkStatus = status
  },
  SET_NETWORKS: (state, networks) => {
    state.networks = networks.map(e => {
      if (e.ssid === state.networkStatus.ssid) {
        e.connected = true
      }
      return e
    })
  },
  SET_MEDIAS: (state, medias) => {
    state.medias = medias
  }
  // ,
  // REMOVE_MEDIA: (state, media) => {
  //   state.medias.splice(state.medias.indexOf(media), 1)
  // }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.token
  },
  getToken (state) {
    return state.token
  },
  getLoggedUser (state) {
    return state.user
  },
  getUser (state) {
    return state.user
  },
  getUsername (state) {
    return state.user ? state.user.username : ''
  }
}

export const actions = {
  async login ({ commit }, { username, password }) {
    try {
      const data = await this.$axios.$post(
        'users/login',
        null,
        { auth: { username: username, password: password } }
      )
      setToken(data.token)
      this.$axios.setToken(data.token, 'Bearer')
      commit('SET_TOKEN', data.token)
      commit('SET_USER', jwtDecode(data.token))
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.credentials'))
    }
  },

  logout ({ commit }) {
    unsetToken()
    this.$axios.setToken(false)
    commit('SET_TOKEN', null)
    commit('SET_USER', null)
  },

  async updateUser ({ commit }, { id, username, password }) {
    try {
      const data = await this.$axios.$put(
        `users/${id}`,
        { credentials: 'UpdateUser ' + window.btoa(`${username}:${password}`) }
      )
      return data
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.credentials'))
    }
  },

  async updateFileSharingPassword ({ commit }, { password }) {
    try {
      const data = await this.$axios.$post(
        require('../thebox.config.js').api.filesharing.updatePassword,
        { credentials: 'UpdatePassword ' + window.btoa(password) }
      )
      return data
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.credentials'))
    }
  },

  async statuses ({ commit }, services) {
    try {
      const { statuses } = await this.$axios.$get('services/statuses', {
        headers: {
          services: JSON.stringify(services)
        }
      })
      for (var status in statuses) {
        commit('SET_STATUS_SERVICE', {
          service: status,
          active: statuses[status]
        })
      }
      return statuses
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.statuses'))
    }
  },

  async enableDisableNow ({ commit }, options) {
    const { name, enable } = options
    const service = require('../thebox.config').api[name].service
    const action = enable ? 'enableNow' : 'disableNow'
    commit('SET_STATUS_SERVICE', { service: name, active: !enable, busy: true })
    try {
      const { data } = await this.$axios.$post('services/action', null, {
        headers: { service: service, action: action }
      })
      if (data.success) {
        commit('SET_STATUS_SERVICE', { service: name, active: enable, busy: false })
        return enable
      } else {
        throw new Error(this.app.$i18n.t('errors.service'))
      }
    } catch (error) {
      console.log(error)
      commit('SET_STATUS_SERVICE', {
        service: name,
        active: !enable,
        busy: false
      })
    }
  },

  async networks ({ commit }, iface) {
    try {
      const { networks, status } = await this.$axios.$get('networks', { headers: { interface: iface } })
      commit('SET_NETWORK_STATUS', status)
      commit('SET_NETWORKS', networks)
      return networks
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.networks'))
    }
  },

  async medias ({ commit }) {
    try {
      const { mounts } = await this.$axios.$get('medias')
      commit('SET_MEDIAS', mounts)
      return mounts
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.medias.list'))
    }
  },

  async unmount ({ commit }, media) {
    try {
      const { data } = await this.$axios.$post('services/action', null, {
        headers: {
          service: `usb-mount@${media}.service`,
          action: 'stop'
        }
      })
      if (data.success) {
        return true
      } else {
        throw new Error(this.app.i18n.t('errors.medias.unmount'))
      }
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.medias.unmount'))
    }
  },

  async poweroff ({ commit }) {
    try {
      await this.$axios.$post('services/action', null, {
        headers: {
          action: 'poweroff'
        }
      })
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.service.poweroff'))
    }
  },

  async reboot ({ commit }) {
    try {
      await this.$axios.$post('services/action', null, {
        headers: {
          action: 'reboot'
        }
      })
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.service.reboot'))
    }
  }

}
