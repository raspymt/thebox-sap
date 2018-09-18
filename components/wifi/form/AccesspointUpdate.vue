<template>
  <div class="position-relative mt-2 border p-1">
    <icon class="switch-icon__absolute" name="sync" v-if="busy" pulse/>
    <b-form @submit.prevent="updateAccesspoint">
      <transition name="slide">
        <b-alert 
          :variant="alertVariant"
          dismissible
          :show="alertDismissCountDown"
          @dismissed="alertDismissCountdown=0"
          @dismiss-count-down="alertCountDownChanged">
          {{ formAlert }}
        </b-alert>
      </transition>
      <form-ssid ref="ssid"/>
      <form-repeat-password ref="repeatPassword"/>
      <b-button type="submit" variant="light" :disabled="disabledSubmit">{{ $t('credentials.submit') }}</b-button>
    </b-form>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import FormSsid from '~/components/form/FormUsername.vue'
import FormRepeatPassword from '~/components/form/FormRepeatPassword.vue'

export default {
  components: {
    Icon,
    FormSsid,
    FormRepeatPassword
  },
  data () {
    return {
      formAlert: null,
      alertDismissSecs: 5,
      alertDismissCountDown: 0,
      alertVariant: null,
      busy: false,
      disabledSubmit: true
    }
  },
  mounted () {
    this.$refs.ssid.formUsername = this.$store.state.services.accesspoint.ssid
    this.$refs.ssid.placeholderUsername = 'wifi.accesspoint.update.ssidusername'
    this.$refs.ssid.descriptionUsername = 'wifi.accesspoint.update.ssiddescription'
    this.$refs.ssid.$on('usernameChanged', e => {
      this.disabledSubmit = !(this.$refs.ssid.isValid && this.$refs.repeatPassword.isValid)
    })
    this.$refs.repeatPassword.$on('passwordChanged', e => {
      this.disabledSubmit = !(this.$refs.ssid.isValid && this.$refs.repeatPassword.isValid)
    })
  },
  methods: {
    alertCountDownChanged (alertDismissCountDown) {
      this.alertDismissCountDown = alertDismissCountDown
    },
    alertShow () {
      this.alertDismissCountDown = this.alertDismissSecs
    },
    async updateAccesspoint () {
      try {
        this.busy = true
        const result = await this.$store.dispatch('updateAccesspoint', { ssid: this.$refs.ssid.formUsername, password: this.$refs.repeatPassword.formPassword })
        // this.$refs.ssid.clear()
        this.$refs.repeatPassword.clear()
        this.formAlert = null
        if (result === true) {
          this.alertVariant = 'success'
          this.formAlert = this.$i18n.t('credentials.success')
          this.alertShow()
        } else {
          this.alertVariant = 'warning'
          this.formAlert = result.message
        }
        this.busy = false
      } catch (e) {
        this.busy = false
        this.alertVariant = 'warning'
        this.formAlert = e.message
        this.alertShow()
      }
    }
  }
}
</script>