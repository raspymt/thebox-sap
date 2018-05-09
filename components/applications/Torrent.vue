<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="torrentSwitch"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="card-title">{{ $t('applications.torrent.title') }}</h4>
      <collapse-card-button v-b-toggle.collapse-torrent/>
      <manage-link
        :href="$t('applications.torrent.link')"
        :visible="active && !busy"
        :title="$t('applications.torrent.linkhelp')"/>
      <div v-if="busy" class="card-header-progress"></div>
    </b-card-header>
    <b-collapse id="collapse-torrent">
      <b-card-body>
        <div class="small" v-html="$t('applications.torrent.description')"></div>
        <hr/>
        <action-button
          v-b-toggle.collapse-torrent-password
          icon="key"
          class="text-white"
          color="dark"
          :labelOpened="$t('applications.torrent.credentials.close')"
          :labelClosed="$t('applications.torrent.credentials.open')"
        />
        <b-button v-b-popover.hover="$t('applications.torrent.credentials.help')" variant="link" class="align-top pt-2">
            <icon name="question-circle"/>
          </b-button>
        <b-collapse id="collapse-torrent-password">
          <torrent-credentials/>
        </b-collapse>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
  import Switcher from '~/components/actions/Switch'
  import CollapseCardButton from '~/components/actions/CollapseCardButton'
  import ManageLink from '~/components/actions/ManageLink'
  import Icon from 'vue-awesome/components/Icon'
  import TorrentCredentials from '~/components/applications/form/TorrentCredentials'
  import ActionButton from '~/components/actions/ActionButton'

  export default {
    components: {
      Switcher,
      CollapseCardButton,
      ManageLink,
      Icon,
      TorrentCredentials,
      ActionButton
    },
    computed: {
      active () {
        return this.$store.state.services.torrent.active
      },
      busy () {
        return this.$store.state.services.torrent.busy
      }
    },
    mounted () {
      this.$refs.torrentSwitch.$on('input', val => {
        this.$store.dispatch('startStopService', { name: 'torrent', enable: val })
      })
    }
  }
</script>