<template>
  <span v-html="name"></span>
</template>

<script>
export default {
  props: {
    name: {
      default: ''
    }
  }
}
</script>
