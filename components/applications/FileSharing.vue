<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="filesharingSwitch"
        class="float-left pr-3 mt-3 mb-0"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="float-left mb-0 mt-2">{{ $t('applications.filesharing.title') }}</h4>
      <icon class="switch-icon" name="refresh" v-if="busy" pulse/>
    </b-card-header>
    <b-card-body>
      <div class="small" v-html="$t('applications.filesharing.description')"></div>
      <action-button
        v-b-toggle.collapsePassword
        icon="key"
        class="text-white pl-0 small"
        color="dark"
        :labelOpened="$t('applications.filesharing.password.close')"
        :labelClosed="$t('applications.filesharing.password.open')"
      />
    <b-collapse id="collapsePassword">
      <file-sharing-credentials/>
    </b-collapse>
    </b-card-body>
  </b-card>
</template>

<script>
import Switcher from '~/components/actions/Switch'
import FileSharingCredentials from '~/components/applications/FileSharingCredentials'
import Icon from 'vue-awesome/components/Icon'
import ActionButton from '~/components/actions/ActionButton'

export default {
  components: {
    Switcher,
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
      this.$store.dispatch('enableDisableNow', { name: 'filesharing', enable: val })
    })
  }
}
</script>