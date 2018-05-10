<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="cloudstorageSwitch"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="card-title">{{ $t('applications.cloudstorage.title') }}</h4>
      <collapse-card-button v-b-toggle.collapse-cloudstorage/>
      <manage-link
        :href="$t('applications.cloudstorage.link')"
        :visible="active && !busy"
        :title="$t('applications.cloudstorage.linkhelp')"/>
      <div v-if="busy" class="card-header-progress"></div>
    </b-card-header>
    <b-collapse id="collapse-cloudstorage">
      <b-card-body>
        <div class="small" v-html="$t('applications.cloudstorage.description')"></div>
        <hr/>
        <action-button
          v-b-toggle.collapse-cloudstorage-storage
          icon="hdd"
          class="text-white"
          color="dark"
          :labelOpened="$t('applications.cloudstorage.storage.close')"
          :labelClosed="$t('applications.cloudstorage.storage.open')"
        />
        <b-button v-b-popover.hover="$t('applications.cloudstorage.storage.help')" variant="link" class="align-top pt-2">
          <icon name="question-circle"/>
        </b-button>
        <b-collapse ref="cloudstorageStorage" id="collapse-cloudstorage-storage">
          <cloudstorage-storage/>
        </b-collapse>
      </b-card-body>
  </b-collapse>
  </b-card>
</template>

<script>
  import Switcher from '~/components/actions/Switch'
  import CloudstorageStorage from '~/components/applications/cloudstorage/CloudstorageStorage'
  import CollapseCardButton from '~/components/actions/CollapseCardButton'
  import ManageLink from '~/components/actions/ManageLink'
  import Icon from 'vue-awesome/components/Icon'
  import ActionButton from '~/components/actions/ActionButton'

  export default {
    components: {
      Switcher,
      CloudstorageStorage,
      CollapseCardButton,
      ManageLink,
      Icon,
      ActionButton
    },
    data () {
      return {
        busyChildren: false
      }
    },
    computed: {
      active () {
        return this.$store.state.services.cloudstorage.active
      },
      busy () {
        return this.$store.state.services.cloudstorage.busy || this.busyChildren
      }
    },
    mounted () {
      this.$refs.cloudstorageStorage.$on('busy', val => {
        this.busyChildren = val
      })
      this.$refs.cloudstorageSwitch.$on('input', val => {
        this.$store.dispatch('startStopService', { name: 'cloudstorage', enable: val })
      })
    }
  }
</script>