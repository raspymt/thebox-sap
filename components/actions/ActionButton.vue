<template>
  <button :disabled="disabled" :class="classObject" @click="click" :title="title">
    <span>
      <icon :name="icon" v-if="icon" class="vue-action-button__icon"/>
    </span>
    <label v-if="label && !labelOpened && !labelClosed" v-text="label" class="vue-action-button__label"></label>
    <label v-if="labelOpened" v-text="labelOpened" class="vue-action-button__label vue-action-button__label-opened"></label>
    <label v-if="labelClosed" v-text="labelClosed" class="vue-action-button__label vue-action-button__label-closed"></label>
  </button>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    Icon
  },
  props: {
    type: {
      default: 'a'
    },
    disabled: {
      default: false
    },
    label: {
      default: ''
    },
    labelOpened: {
      default: ''
    },
    labelClosed: {
      default: ''
    },
    title: {
      default: ''
    },
    color: {
      default: 'primary'
    },
    icon: {
      default: ''
    },
    pulse: {
      default: false
    },
    pulseHover: {
      default: false
    }
  },
  methods: {
    click (e) {
      if (!this.disabled) {
        e.currentTarget.blur()
        this.$emit('click', e.currentTarget)
      }
    }
  },
  computed: {
    classObject () {
      const { color, disabled, pulse, pulseHover } = this
      return {
        'vue-action-button': true,
        'vue-action-button--disabled': disabled,
        'vue-action-button--pulse': pulse && !disabled,
        'vue-action-button--pulse-hover': pulseHover && !disabled,
        [`vue-action-button-color--${color}`]: color
      }
    }
  }
}
</script>