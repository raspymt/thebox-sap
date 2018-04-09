<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="mpdSwitch"
        class="float-left pr-3 mt-3 mb-0"
        color="dark"
        typeBold="true"
        :checked="mpd_active"
        :disabled="mpd_busy || mpdgui_busy"
      />
      <h4 class="float-left mt-2 mb-0">{{ $t('applications.mpd.title') }}</h4>
      <icon class="switch-icon" name="sync" v-if="mpd_busy || mpdgui_busy" pulse/>
    </b-card-header>
    <b-card-body>
      <div class="small" v-html="$t('applications.mpd.description')"></div>
    </b-card-body>

    <b-card-body class="pt-0">
      <div class="clearfix position-relative">
        <switcher ref="mpdguiSwitch"
          class="float-left pr-3 pt-1"
          color="dark"
          typeBold="true"
          :checked="mpdgui_active && mpd_active"
          :disabled="mpdgui_busy || mpd_busy || !mpd_active"
        />
        <h6 class="float-left">{{ $t('applications.mpdgui.title') }}</h6>
      </div>
      <p class="small" v-html="$t('applications.mpdgui.description')"></p>
      <transition name="slide">
        <p v-if="mpdgui_active && !mpdgui_busy" v-html="$t('applications.mpdgui.link')" class="small"></p>
      </transition>
    </b-card-body>
  </b-card>
</template>

<script>
  import Switcher from '~/components/actions/Switch'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    components: {
      Switcher,
      Icon
    },
    computed: {
      mpd_active () {
        return this.$store.state.services.mpd.active
      },
      mpd_busy () {
        return this.$store.state.services.mpd.busy
      },
      mpdgui_active () {
        return this.$store.state.services.mpdgui.active
      },
      mpdgui_busy () {
        return this.$store.state.services.mpdgui.busy
      }
    },
    mounted () {
      this.$refs.mpdSwitch.$on('input', val => {
        this.$store.dispatch('enableDisableNow', { name: 'mpd', enable: val })
        if (val === false) {
          this.$store.commit('SET_STATUS_SERVICE', { service: 'mpdgui', active: false, busy: false })
        }
      })
      this.$refs.mpdguiSwitch.$on('input', val => {
        this.$store.dispatch('enableDisableNow', { name: 'mpdgui', enable: val })
      })
    }
  }
</script>