<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="resilioSwitch"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="card-title">{{ $t('applications.resilio.title') }}</h4>
      <collapse-card-button v-b-toggle.collapse-resilio/>
      <manage-link
        :href="$t('applications.resilio.link')"
        :visible="active && !busy"
        :title="$t('applications.resilio.linkhelp')"/>
      <div v-if="busy" class="card-header-progress"></div>
    </b-card-header>
    <b-collapse id="collapse-resilio">
      <b-card-body>
        <div class="small" v-html="$t('applications.resilio.description')"></div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
  import Switcher from '~/components/actions/Switch'
  import CollapseCardButton from '~/components/actions/CollapseCardButton'
  import ManageLink from '~/components/actions/ManageLink'

  export default {
    components: {
      Switcher,
      CollapseCardButton,
      ManageLink
    },
    computed: {
      active () {
        return this.$store.state.services.resilio.active
      },
      busy () {
        return this.$store.state.services.resilio.busy
      }
    },
    mounted () {
      this.$refs.resilioSwitch.$on('input', val => {
        this.$store.dispatch('startStopService', { name: 'resilio', enable: val })
      })
    }
  }
</script>