<template>
  <div>
    <page-header/>
    <b-row>
      <b-col lg="4" md="6" sm="12" class="pt-3">
        <mounts class="h-100"/>
      </b-col>
      <!-- <b-col lg="4" md="6" sm="12">
      </b-col> -->
    </b-row>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader'

import Mounts from '~/components/medias/Mounts'

export default {
  middleware: 'authenticated',
  components: {
    PageHeader,
    Mounts
  },
  async fetch ({ store, params }) {
    store.dispatch('medias')
  },
  head () {
    return { title: `${this.$t('title')} - ${this.$t('medias.title')}` }
  },
  mounted () {
    this.$store.commit('SET_PAGE', 'medias')
  }
}
</script>