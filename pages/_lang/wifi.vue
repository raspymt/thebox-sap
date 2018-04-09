<template>
  <div>
  <page-header/>
    <b-row>
      <b-col lg="4" md="6" sm="12" class="pt-3">
        <networks class="h-100"/>
      </b-col>
      <b-col lg="4" md="6" sm="12" class="pt-3">
        <access-point class="h-100"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import Networks from '~/components/wifi/Networks.vue'
import AccessPoint from '~/components/wifi/AccessPoint.vue'

export default {
  middleware: 'authenticated',
  async fetch ({ store, params }) {
    try {
      const config = require('../../thebox.config').api
      const { networks } = await store.dispatch('statuses', {
        networks: config.networks,
        accesspoint: config.accesspoint
      })
      if (networks === true) {
        store.dispatch('networks', config.networks.interface)
      }
    } catch (e) {
      console.log(e)
    }
  },
  components: {
    PageHeader,
    Networks,
    AccessPoint
  },
  head () {
    return { title: this.$t('wifi.title') }
  },
  mounted () {
    this.$store.commit('SET_PAGE', 'wifi')
  }
}
</script>