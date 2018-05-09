<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <switcher
        ref="upnpdlnaSwitch"
        color="dark"
        typeBold="true"
        :checked="active"
        :disabled="busy"
      />
      <h4 class="card-title">{{ $t('applications.upnpdlna.title') }}</h4>
      <collapse-card-button v-b-toggle.collapse-upnpdlna/>
      <manage-link
        :href="$t('applications.upnpdlna.link')"
        :visible="active && !busy"
        :title="$t('applications.upnpdlna.linkhelp')"/>
      <div v-if="busy" class="card-header-progress"></div>
    </b-card-header>
      <b-collapse id="collapse-upnpdlna">
      <b-card-body>
        <div class="small" v-html="$t('applications.upnpdlna.description')"></div>
        <hr/>
        <!-- <transition name="slide">
          <div v-if="active && !rescanning"> -->
            <action-button
              icon="sync"
              :disabled="rescanning || !active || busy"
              class="text-light"
              color="dark"
              @click="rescan"
              :label="$t('applications.upnpdlna.rescan')"
            />
            <b-button id="testpopover" 
              v-b-popover.hover="$t('applications.upnpdlna.rescanhelp')"
              variant="link"
              :disabled="rescanning || !active || busy"
              class="align-top pt-2">
              <icon name="question-circle"/>
            </b-button>
          <!-- </div>
        </transition> -->
        <!-- <transition name="slide">
          <div v-if="active && !rebuilding"> -->
            <action-button
              icon="database"
              :disabled="rebuilding || !active || busy"
              class="text-light"
              color="dark"
              @click="rebuild"
              :label="$t('applications.upnpdlna.rebuild')"
            />
            <b-button id="testpopover"
              v-b-popover.hover="$t('applications.upnpdlna.rebuildhelp')"
              variant="link"
              :disabled="rebuilding || !active || busy"
              class="align-top pt-2">
              <icon name="question-circle"/>
            </b-button>
          <!-- </div>
        </transition> -->
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
  import Switcher from '~/components/actions/Switch'
  import CollapseCardButton from '~/components/actions/CollapseCardButton'
  import ManageLink from '~/components/actions/ManageLink'
  import Icon from 'vue-awesome/components/Icon'
  import ActionButton from '~/components/actions/ActionButton'

  export default {
    components: {
      Switcher,
      CollapseCardButton,
      ManageLink,
      Icon,
      ActionButton
    },
    computed: {
      active () {
        return this.$store.state.services.upnpdlna.active
      },
      busy () {
        return this.$store.state.services.upnpdlna.busy
      },
      rescanning () {
        return this.$store.state.services.upnpdlna.rescanning
      },
      rebuilding () {
        return this.$store.state.services.upnpdlna.rebuilding
      }
    },
    mounted () {
      this.$refs.upnpdlnaSwitch.$on('input', val => {
        this.$store.dispatch('startStopService', { name: 'upnpdlna', enable: val })
      })
    },
    methods: {
      rescan () {
        this.$store.dispatch('rescanUpnpDlna')
      },
      rebuild () {
        this.$store.dispatch('rebuildUpnpDlna')
      }
    }
  }
</script>