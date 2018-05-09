import jwtDecode from 'jwt-decode'
import { setToken, unsetToken } from '~/utils/auth'

export const state = () => ({
  user: null,
  token: false
})

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_TOKEN: (state, token) => {
    state.token = token
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
  }
}
