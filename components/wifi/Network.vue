<template>
  <b-button
    class="list-group-item list-group-item-action bg-dark text-light mb-1 clearfix"
    :network="network"
    @click="openWifiModal(network.ssid)"
    >
    <icon :class="classIcon(network.connected)">
      <icon :name="signal(network.signal)" scale="2"></icon>
      <icon name="lock" v-if="network.security!=='open'" class="text-warning"></icon>
    </icon>
    <div :class='classSsid(network.connected)'>
      {{ network.ssid }}
      <span class='small mb-0' v-if="network.connected">
        <br/>{{ $t('wifi.networks.connected') }}
      </span>
    </div>
    
  </b-button>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

Icon.register({'signal-1': {'width': 1792, 'height': 1792, 'paths': [{'d': 'M256 1440v192q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h192q14 0 23 9t9 23zM640 1312v320q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-320q0-14 9-23t23-9h192q14 0 23 9t9 23zM1024 1056v576q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h192q14 0 23 9t9 23zM1408 672v960q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-960q0-14 9-23t23-9h192q14 0 23 9t9 23z'}]}})
Icon.register({'signal-2': {'width': 1792, 'height': 1792, 'paths': [{'d': 'M256 1440v192q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h192q14 0 23 9t9 23zM640 1312v320q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-320q0-14 9-23t23-9h192q14 0 23 9t9 23zM1024 1056v576q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h192q14 0 23 9t9 23z'}]}})
Icon.register({'signal-3': {'width': 1792, 'height': 1792, 'paths': [{'d': 'M256 1440v192q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h192q14 0 23 9t9 23zM640 1312v320q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-320q0-14 9-23t23-9h192q14 0 23 9t9 23z'}]}})
Icon.register({'signal-4': {'width': 1792, 'height': 1792, 'paths': [{'d': 'M256 1440v192q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h192q14 0 23 9t9 23z'}]}})

export default {
  components: {
    Icon
  },
  props: {
    network: {}
  },
  computed: {
  },
  methods: {
    classIcon (connected) {
      return 'float-left' + (connected === true ? ' mt-2' : '')
    },
    classSsid (connected) {
      return 'float-left pl-3' + (connected !== true ? ' mt-2' : '')
    },
    openWifiModal (ssid) {
      console.log('Connection to ', ssid)
    },
    signal (level) {
      return level < -90 ? 'signal-4' : (level < -80 ? 'signal-3' : (level < -60 ? 'signal-2' : (level < -40 ? 'signal-1' : 'signal')))
    }
  }
}
</script>