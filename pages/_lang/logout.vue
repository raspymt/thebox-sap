<template>
  <p>{{ $t('logout.title') }}</p>
</template>


<script>
export default {
  head () {
    return { title: this.$t('logout.title') }
  },
  mounted () {
    this.$store.dispatch('logout')
    this.$router.replace(this.$i18n.locale === 'en' ? '/' : '/' + this.$i18n.locale)
  }
}
</script>