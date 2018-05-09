<template>
  <b-card no-body bg-variant="dark" text-variant="white">
    <b-card-header class="clearfix">
      <action-button
        ref="syncButton"
        class="action-button-title"
        icon="sync"
        color="dark"
        :title="$t('medias.sync')"
      />
      <h4 class="card-title">{{ $t('medias.mounts.title') }}</h4>
      <collapse-card-button v-b-toggle.collapse-mounts/>
    </b-card-header>
    <b-collapse id="collapse-mounts">
      <b-card-body>
        <b-list-group>
          <b-list-group-item
            v-for="(val, key) in medias"
            :key="val"
            class="bg-dark text-light mb-1 clearfix"
          >
            <action-button
              icon="eject"
              class="text-light m-0 float-left"
              color="dark"
              @click="unmount(key)"
              :title="$t('medias.eject', { disk: val })"
            />
            <div class="float-left pl-1 mt-1">{{ val }}</div>
          </b-list-group-item>
        </b-list-group>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import CollapseCardButton from '~/components/actions/CollapseCardButton'
  import ActionButton from '~/components/actions/ActionButton'

  export default {
    components: {
      Icon,
      CollapseCardButton,
      ActionButton
    },
    computed: {
      medias () {
        return this.$store.state.medias
      }
    },
    mounted () {
      this.$refs.syncButton.$on('click', e => {
        this.$store.dispatch('medias')
      })
    },
    methods: {
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