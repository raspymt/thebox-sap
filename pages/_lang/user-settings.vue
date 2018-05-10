<template>
  <div>
    <page-header/>
    <b-row>
      <b-col xl="4" lg="6" md="6" sm="12" class="pt-3">
        <credentials class="h-100"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader'
import Credentials from '~/components/user/Credentials'

export default {
  middleware: 'authenticated',
  components: {
    PageHeader,
    Credentials
  },
  head () {
    return { title: `${this.$t('title')} - ${this.$t('user.title')}` }
  },
  mounted () {
    this.$store.commit('SET_PAGE', 'user')
  }
}
</script>