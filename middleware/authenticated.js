import { getToken, getUser, unsetToken } from '~/utils/auth'

export default function ({ store, redirect, app }) {
  const token = store.getters.getToken || getToken()
  const user = store.getters.getUser || getUser()
  if (token) {
    // verify token
    app.$axios.setToken(token, 'Bearer')
    app.$axios.post('users/verify')
      .then(res => {
        store.commit('SET_TOKEN', token)
        store.commit('SET_USER', user)
      })
      .catch(error => {
        console.error(error)
        unsetToken()
        app.$axios.setToken(false)
        store.commit('SET_TOKEN', false)
        store.commit('SET_USER', null)
        return redirect((store.state.locale === 'en' ? '' : '/' + store.state.locale) + '/login')
      })
  } else {
    return redirect((store.state.locale === 'en' ? '' : '/' + store.state.locale) + '/login')
  }
  // if (store.getters.isAuthenticated) {
  //   return redirect((store.state.locale === 'en' ? '' : '/' + store.state.locale) + '/login')
  // }
}
