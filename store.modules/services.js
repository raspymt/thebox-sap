export const state = () => ({
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
    torrent: {
      active: false,
      busy: false
    },
    wifi: {
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
  SET_STATUS_SERVICE: (state, data) => {
    if (data.active !== undefined) {
      state.services[data.service].active = data.active
    }
    if (data.busy !== undefined) {
      state.services[data.service].busy = data.busy
    }
  }
}

export const actions = {
  async statuses ({ commit }) {
    try {
      const { statuses } = await this.$axios.$get('services/statuses')
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

  async service ({ commit }, { name, enable }) {
    const startStop = enable ? 'start' : 'stop'
    try {
      commit('SET_STATUS_SERVICE', { service: name, busy: true })
      const { success } = await this.$axios.$post(require('../thebox.config.js').api[name][startStop])
      if (success) {
        commit('SET_STATUS_SERVICE', { service: name, active: enable, busy: false })
      }
    } catch (error) {
      console.log(error)
      commit('SET_STATUS_SERVICE', { service: name, active: !enable, busy: false })
      throw new Error(this.app.i18n.t(`errors.${name}.${startStop}`))
    }
  }
}
