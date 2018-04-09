<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <action-button
        ref="refresh"
        icon="refresh"
        class="float-left text-light pr-3 mt-1 mb-0"
        color="dark"
        pulse-hover="true"
        :title="$t('medias.refresh')"
      />
      <h4 class="float-left mb-0 mt-2">{{ $t('medias.mounts.title') }}</h4>
    </b-card-header>
    <b-card-body>
      <transition name="slide">
        <b-list-group v-if="medias.length">
          <b-list-group-item
            v-for="(media, index) in medias"
            :key="index"
            class="bg-dark text-light mb-1 clearfix"
          >
            <action-button
              icon="eject"
              class="text-light m-0 float-left"
              color="dark"
              @click="unmount(media)"
              :title="$t('medias.eject', { disk: media })"
            />
            <div class="float-left pl-1 mt-1">{{ media }}</div>
          </b-list-group-item>
        </b-list-group>
      </transition>
    </b-card-body>
  </b-card>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import ActionButton from '~/components/actions/ActionButton'

export default {
  components: {
    Icon,
    ActionButton
  },
  computed: {
    medias () {
      return this.$store.state.medias
    }
  },
  mounted () {
    this.$refs.refresh.$on('click', e => {
      this.$store.dispatch('medias')
    })
  },
  methods: {
    refreshMedias () {
      try {
        const baseClass = this.$refs.refreshButton.className
        this.$refs.refreshButton.className = baseClass + ' btn-pulse'
        this.$refs.refreshButton.setAttribute('disabled', true)
        this.$store.dispatch('medias')
          .then(mounts => {
            this.$refs.refreshButton.removeAttribute('disabled')
            this.$refs.refreshButton.className = baseClass
          })
          .catch(error => {
            this.$refs.refreshButton.removeAttribute('disabled')
            this.$refs.refreshButton.className = baseClass
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    },
    unmount (media) {
      try {
        this.$store.dispatch('unmount', media)
          .then(unmounted => {
            if (unmounted === true) {
              this.$store.dispatch('medias')
            }
          })
          .catch(error => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>