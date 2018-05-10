<template>
  <b-form-group
    :id="`usernameGroup${_uid}`"
    :label-for="`username${_uid}`"
    :feedback="usernameFeedback" 
    :state="usernameState"
    :description="$t(descriptionUsername)"
    >
    <b-form-input
      :id="`username${_uid}`"
      type="text"
      v-model.trim="formUsername"
      :state="usernameState"
      required
      :placeholder="$t(placeholderUsername)"
      v-on:input="updateField"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: {
    placeholderUsername: {
      default: 'credentials.username.title'
    },
    descriptionUsername: {
      default: 'credentials.username.description'
    }
  },
  data () {
    return {
      formUsername: ''
    }
  },
  methods: {
    updateField (e) {
      this.$emit('usernameChanged', e)
    },
    clear () {
      this.formUsername = ''
    }
  },
  computed: {
    isValid () {
      return this.usernameState === 'valid'
    },
    usernameFeedback () {
      if (this.formUsername.length === 0) {
        return null
      } else if (this.formUsername.length > 0 && this.formUsername.length < 3) {
        return this.$t('credentials.username.feedback.not_empty')
      } else {
        return null
      }
    },
    usernameState () {
      return this.formUsername.length === 0 ? null : this.formUsername.length > 2 ? 'valid' : 'invalid'
    },
    disabledSubmit () {
      return this.formUsername !== 'valid'
    }
  }
}
</script>