export const state = () => ({
  wifiNetworks: [],
  wifiStatus: {}
})

export const mutations = {
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
  }
}

export const actions = {
  async wifiNetworks ({ commit }) {
    try {
      const { networks, status } = await this.$axios.$get(require('../thebox.config.js').api.wifi.networks)
      commit('SET_WIFI_STATUS', status)
      commit('SET_WIFI_NETWORKS', networks)
      return networks
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.networks'))
    }
  }
}
