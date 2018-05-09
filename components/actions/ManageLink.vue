<template>
  <transition name="fade">
    <b-button
      :href="href"
      variant="link"
      target="_blank"
      class="external-control"
      v-if="visible"
      v-b-tooltip
      :title="title">
      <icon name="external-link-square-alt"/>
    </b-button>
  </transition>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    Icon
  },
  props: {
    href: {
      default: ''
    },
    visible: {
      default: false
    },
    title: {
      default: ''
    }
  }
}
</script>