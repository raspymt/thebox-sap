<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="filesharingSwitch"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="card-title">{{ $t('applications.filesharing.title') }}</h4>
      <collapse-card-button v-b-toggle.collapse-filesharing/>
      <div v-if="busy" class="card-header-progress"></div>
    </b-card-header>
    <b-collapse id="collapse-filesharing">
      <b-card-body>
        <div class="small" v-html="$t('applications.filesharing.description')"></div>
        <hr/>
        <action-button
          v-b-toggle.collapse-filesharing-password
          icon="key"
          class="text-white"
          color="dark"
          :labelOpened="$t('applications.filesharing.password.close')"
          :labelClosed="$t('applications.filesharing.password.open')"
        />
        <b-button v-b-popover.hover="$t('applications.filesharing.password.help')" variant="link" class="align-top pt-2">
            <icon name="question-circle"/>
          </b-button>
        <b-collapse id="collapse-filesharing-password">
          <file-sharing-credentials/>
        </b-collapse>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import Switcher from '~/components/actions/Switch'
import CollapseCardButton from '~/components/actions/CollapseCardButton'
import FileSharingCredentials from '~/components/applications/form/FileSharingCredentials'
import Icon from 'vue-awesome/components/Icon'
import ActionButton from '~/components/actions/ActionButton'

export default {
  components: {
    Switcher,
    CollapseCardButton,
    FileSharingCredentials,
    Icon,
    ActionButton
  },
  computed: {
    active () {
      return this.$store.state.services.filesharing.active
    },
    busy () {
      return this.$store.state.services.filesharing.busy
    }
  },
  mounted () {
    this.$refs.filesharingSwitch.$on('input', val => {
      this.$store.dispatch('startStopService', { name: 'filesharing', enable: val })
    })
  }
}
</script>