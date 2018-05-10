<template>
  <b-form-group 
    :id="`passwordGroup${_uid}`"
    :label-for="`password${_uid}`"
    :feedback="passwordFeedback" 
    :state="repeatPasswordState"
    :description="$t('credentials.password.description')"
    >
    <b-form-input
      :id="`password${_uid}`"
      type="password"
      v-model.trim="formPassword"
      :state="passwordState"
      required
      :placeholder="$t(placeholderPassword)"
      v-on:input="updateField"
    ></b-form-input>
    <b-form-input
      :id="`repeatPassword${_uid}`"
      type="password"
      v-model.trim="formRepeatPassword"
      :state="repeatPasswordState"
      required
      :placeholder="$t(placeholderRepeatPassword)"
      v-on:input="updateField"
      class="mt-2"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: {
    placeholderPassword: {
      default: 'credentials.password.title'
    },
    placeholderRepeatPassword: {
      default: 'credentials.password.repeat'
    }
  },
  data () {
    return {
      formPassword: '',
      formRepeatPassword: ''
    }
  },
  methods: {
    updateField (e) {
      this.$emit('passwordChanged', e)
    },
    clear () {
      this.formPassword = ''
      this.formRepeatPassword = ''
    }
  },
  computed: {
    isValid () {
      return this.passwordState === 'valid' && this.repeatPasswordState === 'valid'
    },
    passwordFeedback () {
      if (this.formPassword.length === 0) {
        return null
      } else if (this.formPassword.length > 0 && this.formPassword.length < 7) {
        return this.$t('credentials.password.feedback.not_empty')
      } else if (this.formRepeatPassword.length !== 0 && this.formRepeatPassword !== this.formPassword) {
        return this.$t('credentials.password.feedback.password_no_match')
      } else {
        return null
      }
    },
    passwordState () {
      return this.formPassword.length === 0 ? null : this.formPassword.length > 6 ? 'valid' : 'invalid'
    },
    repeatPasswordState () {
      return this.formRepeatPassword === this.formPassword ? this.passwordState : 'invalid'
    },
    disabledSubmit () {
      return !(this.passwordState === 'valid' && this.repeatPasswordState === 'valid')
    }
  }
}
</script>