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
        <p>{{ $t('wifi.accesspoint.ssidname') }} <strong>{{ ssid }}</strong></p>
        <div class="small" v-html="$t('wifi.accesspoint.description')"></div>
        <hr/>
        <action-button
          v-b-toggle.collapse-accesspoint-update
          icon="key"
          class="text-white"
          color="dark"
          :labelOpened="$t('wifi.accesspoint.update.close')"
          :labelClosed="$t('wifi.accesspoint.update.open')"
        />
        <b-button v-b-popover.hover="$t('wifi.accesspoint.update.help')" variant="link" class="align-top pt-2">
            <icon name="question-circle"/>
          </b-button>
        <b-collapse id="collapse-accesspoint-update">
          <accesspoint-update/>
        </b-collapse>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
  import Switcher from '~/components/actions/Switch'
  import CollapseCardButton from '~/components/actions/CollapseCardButton'
  import Icon from 'vue-awesome/components/Icon'
  import ActionButton from '~/components/actions/ActionButton'
  import AccesspointUpdate from '~/components/wifi/form/AccesspointUpdate'

  export default {
    components: {
      Switcher,
      CollapseCardButton,
      Icon,
      ActionButton,
      AccesspointUpdate
    },
    computed: {
      active () {
        return this.$store.state.services.accesspoint.active
      },
      busy () {
        return this.$store.state.services.accesspoint.busy
      },
      ssid () {
        return this.$store.state.services.accesspoint.ssid
      }
    },
    mounted () {
      this.$refs.accesspointSwitch.$on('input', val => {
        this.$store.dispatch('startStopService', { name: 'accesspoint', enable: val })
      })
    }
  }
</script>