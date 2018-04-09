<template>
  <div>
    <page-header/>
    <login-form/>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import LoginForm from '~/components/LoginForm'

export default {
  middleware: 'anonymous',
  components: {
    PageHeader,
    LoginForm
  },
  head () {
    return { title: this.$t('login.title') }
  },
  mounted () {
    this.$store.commit('SET_PAGE', 'login')
  }
}
</script>