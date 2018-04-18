<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="cloudstorageSwitch"
        class="float-left pr-3 mt-3 mb-0"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="float-left mb-0 mt-2">{{ $t('applications.cloudstorage.title') }}</h4>
      <icon class="switch-icon" name="sync" v-if="busy" pulse/>
    </b-card-header>
    <b-card-body>
      <div class="small" v-html="$t('applications.cloudstorage.description')"></div>
      <transition name="slide">
        <p v-if="active && !busy" v-html="$t('applications.cloudstorage.link')" class="small"></p>
      </transition>
    </b-card-body>
  </b-card>
</template>

<script>
  import Switcher from '~/components/actions/Switch'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    components: {
      Switcher,
      Icon
    },
    computed: {
      active () {
        return this.$store.state.services.cloudstorage.active
      },
      busy () {
        return this.$store.state.services.cloudstorage.busy
      }
    },
    mounted () {
      this.$refs.cloudstorageSwitch.$on('input', val => {
        this.$store.dispatch('enableDisableNow', { name: 'cloudstorage', enable: val })
      })
    }
  }
</script>