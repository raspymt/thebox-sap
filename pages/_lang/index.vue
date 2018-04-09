<template>
  <div>
    <page-header/>
    <p>
      Hello {{ $store.getters.getUsername }}
    </p>
    <p>
      {{ $t('index.content.description') }}
    </p>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'

export default {
  middleware: 'authenticated',
  components: {
    PageHeader
  },
  head () {
    return { title: this.$t('index.title') }
  },
  mounted () {
    this.$store.commit('SET_PAGE', 'index')
  }
}
</script>
