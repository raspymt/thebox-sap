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
      }
    },
    mounted () {
      this.$refs.mpdSwitch.$on('input', val => {
        this.$store.dispatch('enableDisableNow', { name: 'mpd', enable: val })
      })
    }
  }
</script>