<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="accesspointSwitch"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="card-title">{{ $t('wifi.accesspoint.title') }}</h4>
      <collapse-card-button v-b-toggle.collapse-accesspoint/>
      <div v-if="busy" class="card-header-progress"></div>
    </b-card-header>
    <b-collapse id="collapse-accesspoint">
      <b-card-body>
        <div class="small" v-html="$t('wifi.accesspoint.description')"></div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
  import Switcher from '~/components/actions/Switch'
  import CollapseCardButton from '~/components/actions/CollapseCardButton'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    components: {
      Switcher,
      CollapseCardButton,
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
        this.$store.dispatch('startStopService', { name: 'accesspoint', enable: val })
      })
    }
  }
</script>