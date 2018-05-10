<template>
  <div>

    <b-form @submit.prevent="login">
      <transition name="slide">
        <b-alert
          variant="warning"
          dismissible
          :show="dismissCountDown"
          @dismissed="dismissCountdown=0"
          @dismiss-count-down="countDownChanged">
          {{ formError }}
        </b-alert>
      </transition>

      <b-form-group id="usernameGroup"
        :label="$t('login.username')"
        label-for="username"
        :feedback="usernameFeedback" 
        :state="usernameState">
        <b-form-input id="username"
          type="text"
          v-model="formUsername"
          :state="usernameState"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="passwordGroup"
        :label="$t('login.password')"
        label-for="password"
        :feedback="passwordFeedback" 
        :state="passwordState">
        <b-form-input id="password"
          type="password"
          v-model.trim="formPassword"
          :state="passwordState"
          required
        ></b-form-input>
      </b-form-group>
      
      <b-button type="submit" variant="dark" :disabled="disabledSubmit">{{ $t('login.login') }}</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formError: null,
      formUsername: '',
      formPassword: '',
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  computed: {
    usernameFeedback () {
      return this.$t('login.form.username.feedback.empty')
    },
    usernameState () {
      return this.formUsername.length > 0 ? 'valid' : 'invalid'
    },
    passwordFeedback () {
      return this.$t('login.form.password.feedback.empty')
    },
    passwordState () {
      return this.formPassword.length > 0 ? 'valid' : 'invalid'
    },
    disabledSubmit () {
      return !(this.passwordState === 'valid' && this.usernameState === 'valid')
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    // async login ({ redirect }) {
    async login () {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null

        this.$router.replace(this.$i18n.locale === 'en' ? '/' : '/' + this.$i18n.locale)
      } catch (e) {
        this.formError = e.message
        this.showAlert()
      }
    }
  }
}
</script>