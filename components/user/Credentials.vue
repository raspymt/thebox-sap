<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <h4 class="float-left mb-0 mt-2">{{ $t('user.credentials.title') }}</h4>
      <icon class="switch-icon" name="sync" v-if="busy" pulse/>
    </b-card-header>
    <b-card-body>
      <div class="small" v-html="$t('user.credentials.description')"></div>

      <b-form @submit.prevent="updateUser">
        <transition name="slide">
          <b-alert 
            variant="warning"
            dismissible
            :show="errorDismissCountDown"
            @dismissed="errorDismissCountdown=0"
            @dismiss-count-down="errorCountDownChanged">
            {{ formError }}
          </b-alert>
        </transition>
        <transition name="slide">
          <b-alert 
            variant="success"
            dismissible
            :show="successDismissCountDown"
            @dismissed="successDismissCountdown=0"
            @dismiss-count-down="successCountDownChanged">
            {{ formSuccess }}
          </b-alert>
        </transition>

        <b-form-group id="usernameGroup"
          :label="$t('user.credentials.username.title')"
          label-for="username"
          :feedback="usernameFeedback" 
          :state="usernameState"
          :description="$t('user.credentials.username.description')"
          >
          <b-form-input id="username"
            type="text"
            v-model="formUsername"
            :state="usernameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="passwordGroup"
          :label="$t('user.credentials.password.title')"
          label-for="password"
          :feedback="passwordFeedback" 
          :state="passwordState"
          :description="$t('user.credentials.password.description')"
          >
          <b-form-input id="password"
            type="password"
            v-model.trim="formPassword"
            :state="passwordState"
            required
          ></b-form-input>
        </b-form-group>
        
        <b-form-group id="repeatPasswordGroup"
          :label="$t('user.credentials.password.repeat')"
          label-for="repeatPassword"
          :feedback="repeatPasswordFeedback" 
          :state="repeatPasswordState">
          <b-form-input id="repeatPassword"
            type="password"
            v-model.trim="formRepeatPassword"
            :state="repeatPasswordState"
            required
            class="mt-2"
          ></b-form-input>
        </b-form-group>
        
        <b-button type="submit" variant="light" :disabled="disabledSubmit">{{ $t('user.credentials.submit') }}</b-button>
      </b-form>

    </b-card-body>
  </b-card>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
  data () {
    return {
      formError: null,
      formSuccess: null,
      formUsername: '',
      formPassword: '',
      formRepeatPassword: '',
      errorDismissSecs: 5,
      errorDismissCountDown: 0,
      successDismissSecs: 5,
      successDismissCountDown: 0,
      busy: false
    }
  },
  components: {
    Icon
  },
  computed: {
    usernameFeedback () {
      return this.formUsername.length > 0 ? this.$t('user.credentials.username.feedback.not_empty') : ''
    },
    usernameState () {
      return this.formUsername.length === 0 ? null : this.formUsername.length > 3 ? 'valid' : 'invalid'
    },
    passwordFeedback () {
      return this.formPassword.length > 0 ? this.$t('user.credentials.password.feedback.not_empty') : ''
    },
    passwordState () {
      return this.formPassword.length === 0 ? null : this.formPassword.length > 6 ? 'valid' : 'invalid'
    },
    repeatPasswordFeedback () {
      if (this.formRepeatPassword.length !== 0 && this.formRepeatPassword !== this.formPassword) {
        return this.$t('user.credentials.password.feedback.password_no_match')
      }
    },
    repeatPasswordState () {
      return this.formRepeatPassword === this.formPassword ? this.passwordState : 'invalid'
    },
    disabledSubmit () {
      return !(this.usernameState === 'valid' && this.passwordState === 'valid' && this.repeatPasswordState === 'valid')
    }
  },
  mounted () {
    this.formUsername = this.$store.getters.getUsername
  },
  methods: {
    errorCountDownChanged (errorDismissCountDown) {
      this.errorDismissCountDown = errorDismissCountDown
    },
    successCountDownChanged (successDismissCountDown) {
      this.successDismissCountDown = successDismissCountDown
    },
    errorShowAlert () {
      this.errorDismissCountDown = this.errorDismissSecs
    },
    successShowAlert () {
      this.successDismissCountDown = this.successDismissSecs
    },
    async updateUser () {
      try {
        this.busy = true
        const result = await this.$store.dispatch('updateUser', {
          id: this.$store.state.user.id,
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formRepeatPassword = ''
        this.formError = null
        if (result.success === true) {
          this.formSuccess = this.$i18n.t('user.credentials.success')
          this.successShowAlert()
        } else {
          this.formError = result.message
        }
        this.busy = false
      } catch (e) {
        this.busy = false
        this.formError = e.message
        this.errorShowAlert()
      }
    }
  }
}
</script>