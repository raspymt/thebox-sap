<template>
  <div>
    <!-- <page-header/> -->
    <b-row class="margin-header">
      <b-col lg="4" md="6" sm="12">
        <h2 class="text-white cards-title">{{ $t('applications.title') }}</h2>
        <file-sharing/>
        <mpd/>
        <torrent/>
        <upnp-dlna/>
        <syncthing/>
        <resilio/>
      </b-col>
      <b-col lg="4" md="6" sm="12">
        <h2 class="text-white cards-title">{{ $t('wifi.title') }}</h2>
        <networks/>
        <access-point/>
        <h2 class="text-white cards-title">{{ $t('medias.title') }}</h2>
        <mounts/>
      </b-col>
      <!-- <b-col lg="4" md="6" sm="12" class="mt-4">
        <h2 class="text-white">{{ $t('medias.title') }}</h2>
        <mounts/>
      </b-col> -->
    </b-row>
  </div>
</template>

<script>
// import PageHeader from '~/components/PageHeader.vue'

import Mpd from '~/components/applications/Mpd.vue'
import FileSharing from '~/components/applications/FileSharing.vue'
import Torrent from '~/components/applications/Torrent.vue'
import UpnpDlna from '~/components/applications/UpnpDlna.vue'
import Syncthing from '~/components/applications/Syncthing.vue'
import Resilio from '~/components/applications/Resilio.vue'

import Networks from '~/components/wifi/Networks.vue'
import AccessPoint from '~/components/wifi/AccessPoint.vue'

import Mounts from '~/components/medias/Mounts'

export default {
  middleware: 'authenticated',
  async fetch ({ store, params }) {
    try {
      store.dispatch('medias')
      await store.dispatch('statuses')
    } catch (e) {
      console.log(e)
    }
  },
  components: {
    // PageHeader,
    FileSharing,
    Mpd,
    Torrent,
    UpnpDlna,
    Syncthing,
    Resilio,
    Networks,
    AccessPoint,
    Mounts
  },
  head () {
    return { title: `${this.$t('title')} - ${this.$t('index.title')}` }
  },
  mounted () {
    this.$store.commit('SET_PAGE', 'index')
  }
}
</script>