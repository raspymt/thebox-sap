<template>
  <div>
    <page-header/>
    <b-row>
      <b-col lg="4" md="6" sm="12" class="pt-3">
        <mpd class="h-100"/>
      <!-- </b-col> -->
      <!-- <b-col lg="4" md="6" sm="12" class="pt-3"> -->
        <upnp-dlna class="h-100"/>
      <!-- </b-col> -->
      <!-- <b-col lg="4" md="6" sm="12" class="pt-3"> -->
        <torrent class="h-100"/>
      <!-- </b-col> -->
      <!-- <b-col lg="4" md="6" sm="12" class="pt-3"> -->
        <file-sharing class="h-100"/>
      <!-- </b-col> -->
      <!-- <b-col lg="4" md="6" sm="12" class="pt-3"> -->
        <cloud-storage class="h-100"/>
      </b-col>
    </b-row>
    <!-- <b-card-group columns>
      <mpd/>
      <upnp-dlna/>
      <file-sharing/>
      <torrents/>
      <cloud-storage/>
    </b-card-group> -->
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'

import Mpd from '~/components/applications/Mpd.vue'
import FileSharing from '~/components/applications/FileSharing.vue'
import Torrent from '~/components/applications/Torrent.vue'
import UpnpDlna from '~/components/applications/UpnpDlna.vue'
import CloudStorage from '~/components/applications/CloudStorage.vue'

export default {
  middleware: 'authenticated',
  async fetch ({ store, params }) {
    try {
      await store.dispatch('statuses')
    } catch (e) {
      console.log(e)
    }
  },
  components: {
    PageHeader,
    FileSharing,
    Mpd,
    Torrent,
    UpnpDlna,
    CloudStorage
  },
  head () {
    return { title: `${this.$t('title')} - ${this.$t('applications.title')}` }
  },
  mounted () {
    this.$store.commit('SET_PAGE', 'applications')
  }
}
</script>