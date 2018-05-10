<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <div class="clearfix">
        <switcher
          ref="mpdSwitch"
          color="dark"
          typeBold="true"
          :checked="active"
          :disabled="busy"
        />
        <h4 class="card-title">{{ $t('applications.mpd.title') }}</h4>
        <collapse-card-button v-b-toggle.collapse-mpd/>
        <manage-link
          :href="$t('applications.mpdgui.link')"
          :visible="guiActive && !busy"
          :title="$t('applications.mpdgui.linkhelp')"/>
      </div>
      <div v-if="busy" class="card-header-progress"></div>
    </b-card-header>
    <b-collapse id="collapse-mpd">
      <b-card-body>
        <transition name="slide">
          <div v-if="active">
            <div class="clearfix position-relative">
              <switcher ref="mpdguiSwitch"
                class="vue-switcher--small"
                color="dark"
                typeBold="true"
                :checked="guiActive && active"
                :disabled="busy || !active"
              />
              <h6 class="switcher-label mb-0">{{ $t('applications.mpdgui.title') }}</h6>
            </div>
            <hr/>
          </div>
        </transition>
        <div class="small" v-html="$t('applications.mpd.description')"></div>
        <hr/>
        <action-button
          v-b-toggle.collapse-mpd-password
          icon="key"
          class="text-white"
          color="dark"
          :labelOpened="$t('applications.mpd.password.close')"
          :labelClosed="$t('applications.mpd.password.open')"
        />
        <b-button v-b-popover.hover="$t('applications.mpd.password.help')" variant="link" class="align-top pt-2">
            <icon name="question-circle"/>
          </b-button>
        <b-collapse id="collapse-mpd-password">
          <mpd-credentials/>
        </b-collapse>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
  import Switcher from '~/components/actions/Switch'
  import CollapseCardButton from '~/components/actions/CollapseCardButton'
  import MpdCredentials from '~/components/applications/form/MpdCredentials'
  import ManageLink from '~/components/actions/ManageLink'
  import Icon from 'vue-awesome/components/Icon'
  import ActionButton from '~/components/actions/ActionButton'

  export default {
    components: {
      Switcher,
      CollapseCardButton,
      MpdCredentials,
      ManageLink,
      Icon,
      ActionButton
    },
    computed: {
      active () {
        return this.$store.state.services.mpd.active
      },
      guiActive () {
        return this.$store.state.services.mpdgui.active
      },
      busy () {
        return this.$store.state.services.mpd.busy || this.$store.state.services.mpdgui.busy
      }
    },
    updated () {
      if (this.$refs.mpdguiSwitch !== undefined) {
        this.$refs.mpdguiSwitch.$on('input', val => {
          this.$store.dispatch('startStopService', { name: 'mpdgui', enable: val })
        })
      }
    },
    mounted () {
      this.$refs.mpdSwitch.$on('input', val => {
        if (val === false) {
          this.$refs.mpdguiSwitch.$off('input')
          this.$store.dispatch('startStopService', { name: 'mpdgui', enable: false })
        }
        this.$store.dispatch('startStopService', { name: 'mpd', enable: val })
      })
      if (this.$refs.mpdguiSwitch !== undefined) {
        this.$refs.mpdguiSwitch.$on('input', val => {
          this.$store.dispatch('startStopService', { name: 'mpdgui', enable: val })
        })
      }
    }
  }
</script>