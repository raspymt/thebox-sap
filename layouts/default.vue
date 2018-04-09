<template>
  <div>
    <main-header/>
    <main>
      <b-container
        fluid
        class="mb-4"
      >
        <nuxt/>
      </b-container>
    </main>
    <!-- <page-footer/> -->
  </div>
</template>

<script>
import MainHeader from '~/components/MainHeader.vue'

export default {
  components: {
    MainHeader
  }
}
</script>