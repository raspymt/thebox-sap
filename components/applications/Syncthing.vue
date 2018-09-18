<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="syncthingSwitch"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="card-title">{{ $t('applications.syncthing.title') }}</h4>
      <collapse-card-button v-b-toggle.collapse-syncthing/>
      <manage-link
        :href="$t('applications.syncthing.link')"
        :visible="active && !busy"
        :title="$t('applications.syncthing.linkhelp')"/>
      <div v-if="busy" class="card-header-progress"></div>
    </b-card-header>
    <b-collapse id="collapse-syncthing">
      <b-card-body>
        <div class="small" v-html="$t('applications.syncthing.description')"></div>
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
        return this.$store.state.services.syncthing.active
      },
      busy () {
        return this.$store.state.services.syncthing.busy
      }
    },
    mounted () {
      this.$refs.syncthingSwitch.$on('input', val => {
        this.$store.dispatch('startStopService', { name: 'syncthing', enable: val })
      })
    }
  }
</script>