<template>
  <div class="position-relative mt-2 border p-1">
    <icon class="switch-icon__absolute" name="sync" v-if="busy" pulse/>
    <b-form @submit.prevent="updatePassword">
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
      <form-repeat-password ref="repeatPassword"/>
      <b-button type="submit" variant="light" :disabled="disabledSubmit">{{ $t('credentials.submit') }}</b-button>
    </b-form>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import FormRepeatPassword from '~/components/form/FormRepeatPassword.vue'

export default {
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
  components: {
    Icon,
    FormRepeatPassword
  },
  mounted () {
    this.$refs.repeatPassword.$on('passwordChanged', e => {
      this.disabledSubmit = !this.$refs.repeatPassword.isValid
    })
  },
  methods: {
    alertCountDownChanged (alertDismissCountDown) {
      this.alertDismissCountDown = alertDismissCountDown
    },
    alertShow () {
      this.alertDismissCountDown = this.alertDismissSecs
    },
    async updatePassword () {
      try {
        this.busy = true
        const result = await this.$store.dispatch('updateFileSharingPassword', this.$refs.repeatPassword.formPassword)
        this.$refs.repeatPassword.clear()
        this.formAlert = null
        if (result === true) {
          this.alertVariant = 'success'
          this.formAlert = this.$i18n.t('credentials.successpassword')
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