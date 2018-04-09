<template>
  <h2 class="text-white pt-5 mt-5 mb-3">{{ title }}</h2>
</template>

<script>
export default {
  computed: {
    title () {
      return this.$t(this.$store.state.page + '.title')
    }
  }
}
</script>