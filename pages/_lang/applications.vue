<template>
  <div>
    <page-header/>
    <b-row>
      <b-col lg="4" md="6" sm="12" class="pt-3">
        <mpd class="h-100"/>
      </b-col>
      <b-col lg="4" md="6" sm="12" class="pt-3">
        <upnp-dlna class="h-100"/>
      </b-col>
      <b-col lg="4" md="6" sm="12" class="pt-3">
        <torrents class="h-100"/>
      </b-col>
      <b-col lg="4" md="6" sm="12" class="pt-3">
        <file-sharing class="h-100"/>
      </b-col>
    </b-row>
    <!-- <b-card-group columns>
      <mpd/>
      <upnp-dlna/>
      <file-sharing/>
      <torrents/>
    </b-card-group> -->
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'

import Mpd from '~/components/applications/Mpd.vue'
import FileSharing from '~/components/applications/FileSharing.vue'
import Torrents from '~/components/applications/Torrents.vue'
import UpnpDlna from '~/components/applications/UpnpDlna.vue'

export default {
  middleware: 'authenticated',
  async fetch ({ store, params }) {
    try {
      const config = require('../../thebox.config').api
      await store.dispatch('statuses', {
        mpd: config.mpd,
        mpdgui: config.mpdgui,
        filesharing: config.filesharing,
        upnpdlna: config.upnpdlna,
        torrents: config.torrents
      })
    } catch (e) {
      console.log(e)
    }
  },
  components: {
    PageHeader,
    FileSharing,
    Mpd,
    Torrents,
    UpnpDlna
  },
  head () {
    return { title: this.$t('applications.title') }
  },
  mounted () {
    this.$store.commit('SET_PAGE', 'applications')
  }
}
</script>