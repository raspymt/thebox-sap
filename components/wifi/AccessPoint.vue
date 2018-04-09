<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="accesspointSwitch"
        class="float-left pr-3 mt-3 mb-0"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="float-left mb-0 mt-2">{{ $t('wifi.accesspoint.title') }}</h4>
      <icon class="switch-icon" name="refresh" v-if="busy" pulse/>
    </b-card-header>
    <b-card-body>
      <div class="small" v-html="$t('wifi.accesspoint.description')"></div>
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
      active () {
        return this.$store.state.services.accesspoint.active
      },
      busy () {
        return this.$store.state.services.accesspoint.busy
      }
    },
    mounted () {
      this.$refs.accesspointSwitch.$on('input', val => {
        this.$store.dispatch('enableDisableNow', { name: 'accesspoint', enable: val })
      })
    }
  }
</script>