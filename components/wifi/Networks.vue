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
                @wifi-selected="connectWifi"
                v-for="network in networks"
                :network="network"
                :key="network.ssid"
              />
          </b-list-group>
        </transition>
      </b-card-body>
    </b-collapse>
    <b-modal ref="wifiPskModal"
      @hide="clearNamewifiPskInput"
      centered
      :ok-title="$t('wifi.modal.okTitle')"
      :cancel-title="$t('wifi.modal.cancelTitle')"
      hide-header
      body-bg-variant="light"
      body-text-variant="dark"
      ok-variant="dark"
      cancel-variant="warning">
      <p>{{ $t('wifi.modal.text') }}</p>
      <b-form-group
        id="wifiPskGroup"
        label-for="wifiPskInput"
        :feedback="wifiPskGroupFeedback"
        :state="wifiPskState"
        >
        <b-form-input
          id="wifiPskInput"
          type="password"
          v-model.trim="wifiPskInput"
          :state="wifiPskState"
          required
          :placeholder="$t('wifi.modal.pskPlaceholder')"
        ></b-form-input>
      </b-form-group>
    </b-modal>
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
  data () {
    return {
      wifiPskInput: ''
    }
  },
  syncNetworkTimeout: 0,
  syncNetworkInterval: 0,
  methods: {
    clearNamewifiPskInput () {
      this.wifiPskInput = ''
    },
    async dispatchConnectWifi (network) {
      await this.$store.dispatch('connectWifi', network)
      this.syncNetworkTimeout = setTimeout(() => { this.$store.dispatch('wifiNetworks') }, 1000)
    },
    async syncNetworks () {
      this.$store.dispatch('wifiNetworks')
    },
    async connectWifi (network) {
      // not connected to wifi
      if (network.connected !== true) {
        // show modal passphrase only if not open wifi
        if (network.security !== 'open') {
          this.$refs.wifiPskModal.show()
          this.$refs.wifiPskModal.$on('ok', e => {
            network.passphrase = this.wifiPskInput
            this.dispatchConnectWifi(network)
          })
        } else {
          this.dispatchConnectWifi(network)
        }
      }
    }
  },
  computed: {
    // isValid () {
    //   return this.wifiPskState === true
    // },
    active () {
      return this.$store.state.services.wifi.active
    },
    busy () {
      return this.$store.state.services.wifi.busy
    },
    networks () {
      return this.$store.state.wifiNetworks
    },
    wifiPskState () {
      return this.wifiPskInput.length > 7
    },
    wifiPskGroupFeedback () {
      return this.wifiPskInput.length < 8 ? this.$t('wifi.modal.shortPassword') : null
    }
  },
  mounted () {
    if (this.active === true) {
      this.syncNetworks()
      this.syncNetworkInterval = setInterval(this.syncNetworks, 10000)
    }
    this.$refs.networksSwitch.$on('input', val => {
      this.$store.dispatch('startStopService', { name: 'wifi', enable: val })
        .then(() => {
          if (val === false) {
            clearInterval(this.syncNetworkInterval)
            this.$store.commit('SET_WIFI_NETWORKS', [])
          } else {
            this.syncNetworkTimeout = setTimeout(this.syncNetworks, 1000)
            this.syncNetworkInterval = setInterval(this.syncNetworks, 10000)
          }
        })
    })
  },
  destroyed () {
    clearInterval(this.syncNetworkInterval)
    clearTimeout(this.syncNetworkTimeout)
  }
}
</script>
