// import { getToken, getUserFromLocalStorage, unsetToken } from '~/utils/auth'

export default function ({ isServer, store, req, app }) {
  console.log('CHECK AUTH')
  // if (!store.getters.getToken && getToken()) {
  //   app.$axios.setToken(getToken(), 'Bearer')
  //   app.$axios.post('users/verify')
  //     .then(res => {
  //       console.log(res)
  //       store.commit('SET_TOKEN', getToken())
  //       store.commit('SET_USER', getUserFromLocalStorage())
  //     })
  //     .catch(error => {
  //       app.$axios.setToken(false)
  //       unsetToken()
  //       store.commit('SET_TOKEN', false)
  //       store.commit('SET_USER', null)
  //       console.log(error)
  //     })
  // try {
  //   console.log('CHECKING AUTH')
  //   app.$axios.setToken(getToken(), 'Bearer')
  //   console.log(data)
  //   app.$axios.post('users/verify')
  //   store.commit('SET_TOKEN', getToken())
  //   store.commit('SET_USER', getUserFromLocalStorage())
  // } catch (e) {
  //   app.$axios.setToken(false)
  //   unsetToken()
  //   store.commit('SET_TOKEN', false)
  //   store.commit('SET_USER', null)
  //   console.log(e)
  // }
  // }
}
