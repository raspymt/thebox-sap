<template>
  <header>
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand :to="path('/')">
        <icon name="stop" scale="1.2"></icon>
        The Box
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav v-if="isAuthenticated">
          <b-nav-item :to="path('/applications')" exact>{{ $t('links.applications') }}</b-nav-item>
          <b-nav-item :to="path('/wifi')" exact>{{ $t('links.wifi') }}</b-nav-item>
          <b-nav-item :to="path('/medias')" exact>{{ $t('links.medias') }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          
          <b-nav-item-dropdown text="User" right v-if="isAuthenticated" no-caret>
            <template slot="button-content">
              <icon name="user" scale="1.5"></icon>
            </template>
            <b-dropdown-item :to="path('/user-settings')" exact>{{ $t('links.profile') }}</b-dropdown-item>
            <b-dropdown-item :to="path('/logout')" exact>{{ $t('links.logout') }}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Lang" right no-caret>
            <template slot="button-content">
              <icon name="globe" scale="1.5"></icon>
            </template>
            <b-dropdown-item v-if="$i18n.locale !== 'en'" :to="$route.fullPath.replace(/^\/[^\/]+/, '')" exact>
              EN
            </b-dropdown-item>
            <b-dropdown-item v-if="$i18n.locale !== 'fr'" :to="`/fr` + $route.fullPath" exact>
              FR
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Power" right v-if="isAuthenticated" no-caret>
            <template slot="button-content">
              <icon name="power-off" scale="1.5"></icon>
            </template>
            <b-dropdown-item @click="shutdownModal()">{{ $t('links.shutdown') }}</b-dropdown-item>
            <b-dropdown-item @click="restartModal()">{{ $t('links.restart') }}</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>

      </b-collapse>

    </b-navbar>
    <b-modal ref="powerModal"
      centered
      :ok-title="okTitle"
      :cancel-title="cancelTitle"
      hide-header
      :hide-footer="hideFooter"
      :body-bg-variant="bodyBgVariant"
      body-text-variant="white"
      footer-bg-variant="dark"
      ok-variant="light"
      cancel-variant="danger">
      <p class="text-center">
        <icon name="sync" v-if="restarting" pulse scale="3"/>
      </p>
      <p class="text-center">{{ textModal }}</p>
    </b-modal>
  </header>
</template>


<script>
import { mapGetters } from 'vuex'
import Icon from 'vue-awesome/components/Icon'
import testAPIonline from '~/utils/testapi'

export default {
  components: {
    Icon
  },
  data () {
    return {
      bodyBgVariant: 'dark',
      textModal: '',
      okTitle: '',
      cancelTitle: '',
      hideFooter: false,
      restarting: false
    }
  },
  computed: mapGetters(['isAuthenticated']),
  methods: {
    hideModal () {
      this.$refs.powerModal.$off('hide')
      this.$refs.powerModal.$off('ok')
      this.$refs.powerModal.hide()
      this.textModal = ''
      this.okTitle = ''
      this.cancelTitle = ''
      this.bodyBgVariant = 'dark'
      this.restarting = false
      this.hideFooter = false
      // reload global status
      this.$store.dispatch('statuses', require('../thebox.config.js').api)
    },
    shutdownModal () {
      this.textModal = this.$i18n.t('system.power.modal.shutdowntext')
      this.okTitle = this.$i18n.t('system.power.modal.shutdownok')
      this.cancelTitle = this.$i18n.t('system.power.modal.shutdowncancel')
      this.$refs.powerModal.show()
      this.$refs.powerModal.$on('ok', e => {
        e.preventDefault()
        this.$refs.powerModal.$on('hide', e => {
          e.preventDefault()
        })
        this.bodyBgVariant = 'danger'
        this.hideFooter = true
        this.textModal = this.$i18n.t('system.power.modal.shutdownconfirmation')
        this.$store.dispatch('poweroff')
        testAPIonline(this.$axios, this.hideModal)
      })
    },
    restartModal () {
      this.textModal = this.$i18n.t('system.power.modal.restarttext')
      this.okTitle = this.$i18n.t('system.power.modal.restartok')
      this.cancelTitle = this.$i18n.t('system.power.modal.restartcancel')
      this.$refs.powerModal.show()
      this.$refs.powerModal.$on('ok', e => {
        e.preventDefault()
        this.$refs.powerModal.$on('hide', e => {
          e.preventDefault()
        })
        this.bodyBgVariant = 'warning'
        this.hideFooter = true
        this.textModal = this.$i18n.t('system.power.modal.restartconfirmation')
        this.restarting = true
        this.$store.dispatch('reboot')
        testAPIonline(this.$axios, this.hideModal)
      })
    },
    path (url) {
      return (this.$i18n.locale === 'en' ? url : '/' + this.$i18n.locale + url)
    },
    title () {
      return 'The box'
    }
  }
}
</script>