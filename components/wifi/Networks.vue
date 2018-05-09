<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="networksSwitch"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="card-title">{{ $t('wifi.networks.title') }}</h4>
      <collapse-card-button v-b-toggle.collapse-networks/>
      <div v-if="busy" class="card-header-progress"></div>
    </b-card-header>
    <b-collapse id="collapse-networks">
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
    </b-collapse>
  </b-card>
</template>

<script>
import Switcher from '~/components/actions/Switch'
import CollapseCardButton from '~/components/actions/CollapseCardButton'
import Network from '~/components/wifi/Network'
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    Switcher,
    CollapseCardButton,
    Network,
    Icon
  },
  syncNetworkTimeout: null,
  methods: {
    async syncNetworks () {
      clearTimeout(this.syncNetworkTimeout)
      if (!this.busy && this.active === true && this.$store.state.page === 'index') {
        await this.$store.dispatch('wifiNetworks')
        this.syncNetworkTimeout = setTimeout(this.syncNetworks, 10000)
      }
    }
  },
  computed: {
    active () {
      return this.$store.state.services.wifi.active
    },
    busy () {
      return this.$store.state.services.wifi.busy
    },
    networks () {
      return this.$store.state.wifiNetworks
    }
  },
  mounted () {
    clearTimeout(this.syncNetworkTimeout)
    this.$refs.networksSwitch.$on('input', val => {
      this.$store.dispatch('startStopService', { name: 'wifi', enable: val })
        .then(() => {
          if (val === false) {
            this.$store.commit('SET_WIFI_NETWORKS', [])
          } else {
            this.syncNetworks()
          }
        })
    })
    this.syncNetworks()
  }
}
</script>