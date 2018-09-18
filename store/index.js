import jwtDecode from 'jwt-decode'
import { setToken, unsetToken } from '~/utils/auth'

const api = require('../thebox.config.js').api

/**
 * Helpers
 */
const encodeParams = (action, params = {}) => {
  return { params: { s: window.btoa(JSON.stringify({ ...params, action: action })) } }
}

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
  wifiNetworks: [],
  wifiStatus: {},
  medias: {},
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
      rebuilding: false,
      active: false,
      busy: false
    },
    filesharing: {
      active: false,
      busy: false
    },
    torrent: {
      active: false,
      busy: false,
      username: ''
    },
    resilio: {
      active: false,
      busy: false
    },
    syncthing: {
      active: false,
      busy: false
    },
    wifi: {
      active: false,
      busy: false
    },
    accesspoint: {
      active: false,
      busy: false,
      ssid: ''
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
    // if (data.active !== undefined) {
    //   state.services[data.service].active = data.active
    // }
    // if (data.busy !== undefined) {
    //   state.services[data.service].busy = data.busy
    // }
    Object.keys(data.data).forEach(function (key) {
      state.services[data.service][key] = data.data[key]
    })
  },
  SET_STATUSES_SERVICE: (state, data) => {
    Object.keys(data).forEach(function (key) {
      if (state.services[key] !== undefined) {
        Object.keys(data[key]).forEach(function (k) {
          state.services[key][k] = data[key][k]
        })
      }
    })
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
  SET_WIFI_STATUS: (state, status) => {
    state.wifiStatus = status
  },
  SET_WIFI_NETWORKS: (state, networks) => {
    state.wifiNetworks = networks.map(e => {
      if (e.ssid === state.wifiStatus.ssid) {
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
        api.users.update + id,
        { credentials: 'UpdateUser ' + window.btoa(`${username}:${password}`) }
      )
      return data
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.credentials'))
    }
  },

  /**
   * RPC
   */

  async statuses ({ commit }) {
    try {
      const statuses = await this.$axios.$get(api.rpc, encodeParams('statuses'))
      commit('SET_STATUSES_SERVICE', statuses)
      return statuses
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.statuses'))
    }
  },

  async startStopService ({ commit }, { name, enable }) {
    const startStop = enable ? 'start' : 'stop'
    try {
      commit('SET_STATUS_SERVICE', { service: name, data: { busy: true } })
      const success = await this.$axios.$post(api.rpc, encodeParams(api[`${startStop}Service`], { service: api[name] }))
      if (success) {
        commit('SET_STATUS_SERVICE', { service: name, data: { active: enable, busy: false } })
      }
    } catch (error) {
      console.log(error)
      commit('SET_STATUS_SERVICE', { service: name, data: { active: !enable, busy: false } })
      throw new Error(this.app.i18n.t(`errors.${name}.${startStop}`))
    }
  },

  async updateFileSharingPassword ({ commit }, password) {
    try {
      return this.$axios.$post(api.rpc, encodeParams(api.filesharingCredentials, { credentials: 'UpdatePassword ' + window.btoa(password) }))
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.filesharing.password.update'))
    }
  },

  async updateMPDPassword ({ commit }, password) {
    try {
      return this.$axios.$post(api.rpc, encodeParams(api.mpdCredentials, { credentials: 'UpdatePassword ' + window.btoa(password) }))
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.mpd.password.update'))
    }
  },

  async updateTorrentCredentials ({ commit }, { username, password }) {
    try {
      return this.$axios.$post(api.rpc, encodeParams(api.torrentCredentials, { credentials: 'UpdateCredentials ' + window.btoa(`${username}:${password}`) }))
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.torrent.credentials.update'))
    }
  },

  async updateAccesspoint ({ commit }, { ssid, password }) {
    try {
      return this.$axios.$post(api.rpc, encodeParams(api.accesspointUpdate, { credentials: 'UpdateSSID ' + window.btoa(`${ssid}:${password}`) }))
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.accesspoint.ssid.update'))
    }
  },

  async rescanUpnpDlna ({ commit }) {
    try {
      const success = await this.$axios.$post(api.rpc, encodeParams(api.startService, { service: api.upnpdlnaRescan }))
      commit('SET_STATUS_SERVICE', { service: 'upnpdlna', data: { busy: true } })
      if (success) {
        commit('SET_STATUS_SERVICE', { service: 'upnpdlna', data: { rescanning: true, busy: false } })
      }
    } catch (error) {
      console.log(error)
      commit('SET_STATUS_SERVICE', { service: 'upnpdlna', data: { busy: false } })
      throw new Error(this.app.i18n.t('errors.upnpdlna.rescan'))
    }
  },

  async rebuildUpnpDlna ({ commit }) {
    try {
      const success = await this.$axios.$post(api.rpc, encodeParams(api.startService, { service: api.upnpdlnaRebuild }))
      commit('SET_STATUS_SERVICE', { service: 'upnpdlna', data: { busy: true } })
      if (success) {
        commit('SET_STATUS_SERVICE', { service: 'upnpdlna', data: { rebuilding: true, busy: false } })
      }
    } catch (error) {
      console.log(error)
      commit('SET_STATUS_SERVICE', { service: 'upnpdlna', data: { busy: false } })
      throw new Error(this.app.i18n.t('errors.upnpdlna.rebuild'))
    }
  },

  async wifiNetworks ({ commit }) {
    try {
      const { networks, status } = await this.$axios.$get(api.rpc, encodeParams(api.networks))
      commit('SET_WIFI_STATUS', status)
      commit('SET_WIFI_NETWORKS', networks)
      return networks
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.networks'))
    }
  },

  async medias ({ commit }) {
    try {
      const medias = await this.$axios.$get(api.rpc, encodeParams(api.medias))
      commit('SET_MEDIAS', medias)
      return medias
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.medias.list'))
    }
  },

  async unmount ({ commit }, media) {
    try {
      return this.$axios.$post(api.rpc, encodeParams(api.unmount, { media: media }))
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.medias.unmount'))
    }
  },

  async poweroff ({ commit }) {
    try {
      await this.$axios.$post(api.rpc, encodeParams(api.poweroff))
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.service.poweroff'))
    }
  },

  async reboot ({ commit }) {
    try {
      await this.$axios.$post(api.rpc, encodeParams(api.reboot))
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.service.reboot'))
    }
  }

}
