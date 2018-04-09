export default function ({ store, redirect }) {
  if (store.getters.isAuthenticated) {
    return redirect(store.state.locale === 'en' ? '/' : '/' + store.state.locale)
  }
}
