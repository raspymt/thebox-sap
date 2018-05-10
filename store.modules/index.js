export const state = () => ({
  locales: ['en', 'fr'],
  locale: 'en',
  page: 'index'
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_PAGE: (state, page) => {
    state.page = page
  }
}

export const actions = {
  async updateFileSharingPassword ({ commit }, { password }) {
    try {
      const data = await this.$axios.$post(
        require('../thebox.config.js').api.filesharing.updatePassword,
        { credentials: 'UpdatePassword ' + window.btoa(password) }
      )
      return data
    } catch (error) {
      console.log(error)
      throw new Error(this.app.i18n.t('errors.filesharing.password.update'))
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
