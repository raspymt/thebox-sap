<template>
    <label :class="classObject">
        <span class="vue-switcher__label" v-if="shouldShowLabel">
            <span v-if="label" v-text="label"></span>
            <span v-if="!label && value" v-text="textEnabled"></span>
            <span v-if="!label && !value" v-text="textDisabled"></span>
        </span>

        <input type="checkbox" :disabled="disabled" @change="trigger" :checked="value">
        <div></div>
    </label>
</template>

<script>
export default {
  props: {
    typeBold: {
      default: false
    },
    checked: {
      default: false
    },
    disabled: {
      default: false
    },
    label: {
      default: ''
    },
    textEnabled: {
      default: ''
    },
    textDisabled: {
      default: ''
    },
    color: {
      default: 'primary'
    },
    emitOnMount: {
      default: true
    }
  },
  mounted () {
    if (this.emitOnMount) {
      this.$emit('input', this.value)
    }
  },
  methods: {
    trigger (e) {
      this.$emit('input', e.target.checked)
    }
  },
  computed: {
    value () {
      return this.checked
    },
    classObject () {
      const { color, value, typeBold, disabled } = this
      return {
        'vue-switcher': true,
        'vue-switcher--unchecked': !value,
        'vue-switcher--disabled': disabled,
        'vue-switcher--bold': typeBold,
        'vue-switcher--bold--unchecked': typeBold && !value,
        [`vue-switcher-color--${color}`]: color
      }
    },
    shouldShowLabel () {
      return this.label !== '' || this.textEnabled !== '' || this.textDisabled !== ''
    }
  }
}
</script>
