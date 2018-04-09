<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="networksSwitch"
        class="float-left pr-3 mt-3 mb-0"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="float-left mb-0 mt-2">{{ $t('wifi.networks.title') }}</h4>
      <icon class="switch-icon" name="refresh" v-if="busy" pulse/>
    </b-card-header>
    <b-card-body>
      <p class="small" v-html="$t('wifi.networks.description')"></p>
      <transition name="slide">
        <b-list-group v-if="networks.length">
            <network
              v-for="network in networks"
              :network="network"
              :key="network.ssid"
            />
        </b-list-group>
      </transition>
    </b-card-body>
  </b-card>
</template>

<script>
import Switcher from '~/components/actions/Switch'
import Network from '~/components/wifi/Network'
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    Switcher,
    Network,
    Icon
  },
  refreshNetworkTimeout: null,
  methods: {
    refreshNetworks () {
      const config = require('../../thebox.config')
      clearTimeout(this.refreshNetworkTimeout)
      if (!this.busy && this.active === true && this.$store.state.page === 'wifi') {
        this.$store.dispatch('networks', config.api.networks.interface)
        this.refreshNetworkTimeout = setTimeout(this.refreshNetworks, 10000)
      }
    }
  },
  computed: {
    active () {
      return this.$store.state.services.networks.active
    },
    busy () {
      return this.$store.state.services.networks.busy
    },
    networks () {
      return this.$store.state.networks
    }
  },
  mounted () {
    this.$refs.networksSwitch.$on('input', val => {
      if (val === false) {
        this.$store.commit('SET_NETWORKS', [])
      }
      this.$store.dispatch('enableDisableNow', { name: 'networks', enable: val })
        .then(() => {
          setTimeout(this.refreshNetworks, 1000)
        })
    })
    setTimeout(this.refreshNetworks, 1000)
    // this.refreshNetworks()
  }
}
</script>