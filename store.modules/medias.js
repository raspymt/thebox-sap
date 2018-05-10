export const state = () => ({
  medias: []
})

export const mutations = {
  SET_MEDIAS: (state, medias) => {
    state.medias = medias
  }
}

export const actions = {
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
  }
}
