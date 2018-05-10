<template>
  <div class="cloudstorage-storage_wrapper">
    <div class="cloudstorage-storage border p-1">
      <p class="small mb-1">
        {{ $t('applications.cloudstorage.storage.storagefolder') }}
        <b>
          <icon name="home" scale="0.7" class="mr-1"/>
          <span v-for="(sf, index) in storageFolder" :key="index">
            <icon name="chevron-right" scale="0.7"/>
            {{ sf }}
          </span>
        </b>
      </p>
      <b-form-checkbox v-model="storageLocationRecovery" class="mb-2">
        {{ $t('applications.cloudstorage.storage.recoverymode') }}
      </b-form-checkbox>
      <div
        class="cloudstorage-storage_breadcrumbs clearfix mb-1"
        >
        <div @click="readDirectory('/', true)" class="float-left">
          <span><icon name="home" scale="0.75"/></span>
        </div>
        <div v-for="(item, index) in breadcrumbs"
          @click="readDirectory(item.path, true)"
          :key="index"
          class="float-left">
          <span v-if="index !== breadcrumbs.length - 1" :title="item.name">
            {{ item.name }} 
          </span>
          <span v-else-if="checkRecoveryStorageLocation"
            v-b-tooltip
            :title="$t('applications.cloudstorage.storage.recoverydir')"
            class="text-success">{{ item.name }}</span>
          <span v-else-if="pathEmpty"
            v-b-tooltip
            :title="$t('applications.cloudstorage.storage.emptydir')"
            class="text-success">{{ item.name }}</span>
          <span v-else>{{ item.name }}</span>
        </div>
      </div>
      <b-button-toolbar
        class="mb-1"
        key-nav
        :aria-label="$t('applications.cloudstorage.storage.selectfolder.toolbar')">
        <b-button-group size="sm">
          <b-button
            class="cloudstorage-storage_action text-info"
            :disabled="!canUpFolder"
            :title="$t('applications.cloudstorage.storage.upfolder')"
            @click="readDirectory('..')">
            <icon name="level-up-alt" scale="0.75"/>
            <span class="small"> {{ $t('applications.cloudstorage.storage.upfolder') }}</span>
          </b-button>
          <b-button
            class="cloudstorage-storage_action text-warning"
            :disabled="!canCreateFolder"
            :title="$t('applications.cloudstorage.storage.createfolder')"
            @click="showInputFolder = !showInputFolder">
            <icon name="folder" scale="0.75"/>
            <span class="small"> {{ $t('applications.cloudstorage.storage.createfolder') }}</span>
          </b-button>
          <b-button
            class="cloudstorage-storage_action text-success"
            :disabled="!canSelectFolder"
            :title="$t('applications.cloudstorage.storage.selectfolder')"
            @click="chooseDirectory()">
            <icon name="check" scale="0.75"/>
            <span class="small"> {{ $t('applications.cloudstorage.storage.selectfolder') }}</span>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
      <transition name="slide" v-on:after-enter="setInputFolderFocus">
        <b-input-group v-if="showInputFolder && canCreateFolder">
          <b-form-input
            v-model.trim="inputFolder"
            ref="inputFolderForm"
            type="text"
            :state="inputFolderFormState"
            :formatter="formatInputFolder"
            :placeholder="$t('applications.cloudstorage.storage.createfolderinput')"/>
          <b-input-group-append>
            <b-button
              @click="createDirectory()"
              :variant="inputFolderFormState ? 'outline-success' : 'outline-danger'"
              :disabled="!inputFolderFormState"
              :title="$t('applications.cloudstorage.storage.createfolderinputvalidate')">
              <icon name="check"/>
            </b-button>
          </b-input-group-append>
          <b-form-invalid-feedback>{{ $t(`applications.cloudstorage.storage.error.${errorInputFolder}`) }}</b-form-invalid-feedback>
        </b-input-group>
      </transition>


      <b-list-group class="cloudstorage-storage_max-height">
<!--         <b-list-group-item v-if="path !== '/'" @click="readDirectory('..')"
          :title="$t('applications.cloudstorage.storage.upfolder')">..</b-list-group-item> -->
        <b-list-group-item
          v-for="dir in directories"
          :key="dir"
          :title="dir"
          @click="readDirectory(dir)">
          {{ dir }}
        </b-list-group-item>
      </b-list-group>    
    </div>
    <transition name="fade">
      <overlay v-if="busy"/>
    </transition>
  </div>
</template>

<script>
  import Overlay from '~/components/Overlay'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    components: {
      Icon,
      Overlay
    },
    data () {
      return {
        path: '/',
        breadcrumbs: [{ path: '/', name: 'media' }],
        directories: [],
        pathEmpty: false,
        storageLocationRecovery: false,
        showInputFolder: false,
        errorInputFolder: 'empty',
        inputFolder: '',
        busy: false
      }
    },
    computed: {
      storageFolder () {
        return this.$store.state.services.cloudstorage.storageFolder.split('/').slice(1)
      },
      checkRecoveryStorageLocation () {
        console.log('checkRecoveryStorageLocation', this.storageLocationRecovery &&
          this.directories.indexOf('commits') !== -1 &&
          this.directories.indexOf('fs') !== -1 &&
          this.directories.indexOf('storage') !== -1)
        return this.storageLocationRecovery &&
          this.directories.indexOf('commits') !== -1 &&
          this.directories.indexOf('fs') !== -1 &&
          this.directories.indexOf('storage') !== -1
      },
      canCreateFolder () {
        return this.path !== '/' && !this.storageLocationRecovery
      },
      canSelectFolder () {
        return (this.path !== '/' && this.pathEmpty && !this.storageLocationRecovery) || this.checkRecoveryStorageLocation
      },
      canUpFolder () {
        return this.path !== '/'
      },
      inputFolderFormState () {
        const notExists = this.directories.indexOf(this.inputFolder) === -1
        const empty = this.inputFolder === undefined || this.inputFolder === ''
        if (empty) {
          this.errorInputFolder = 'empty'
        } else if (!notExists) {
          this.errorInputFolder = 'exist'
        }
        return notExists && !empty
      }
    },
    methods: {
      getDirectories (dir) {
        return this.$store.dispatch('listDirectories', dir)
      },
      toggleStorageLocationRecovery () {
        this.storageLocationRecovery = !this.storageLocationRecovery
      },
      setInputFolderFocus () {
        this.$refs.inputFolderForm.focus()
      },
      formatInputFolder (value, event) {
        if (event.type === 'change') {
          return value.replace(/\//g, '')
        }
        return value
      },
      async createDirectory () {
        const result = await this.$store.dispatch('createCloudStorageDirectory', `${this.path}/${this.inputFolder}`)
        if (result === true) {
          this.readDirectory(this.path, true)
          this.showInputFolder = false
          this.inputFolder = ''
        } else if (result.error === 'exist') {
          this.errorInputFolder = 'exist'
        }
      },
      async chooseDirectory () {
        this.busy = true
        this.$parent.$emit('busy', true)
        const result = await this.$store.dispatch('setCloudStorageDirectory', { directory: this.path, recovery: this.storageLocationRecovery })
        if (result === true) {
          this.readDirectory(this.path, true)
          this.$store.dispatch('statuses')
          this.busy = false
          this.$parent.$emit('busy', false)
        } else {
          this.$store.dispatch('statuses')
          this.busy = false
          this.$parent.$emit('busy', false)
        }
      },
      async readDirectory (dir, absolute = false) {
        let directory = absolute === false ? `${this.path}/${dir}` : dir
        // if (directory !== this.path) {
        const result = await this.getDirectories(directory)
        if (result.error === undefined) {
          this.directories = result.directories
          this.path = result.path
          this.pathEmpty = result.empty
          let pathsArray = result.path.split('/')
          let paths = []
          let p = pathsArray.pop()
          while (p) {
            let ele = {}
            ele[`${pathsArray.join('/')}/${p}`] = p
            paths.unshift({ path: `${pathsArray.join('/')}/${p}`, name: p })
            p = pathsArray.pop()
          }
          this.breadcrumbs = paths
        }
        // }
      }
    },
    async mounted () {
      await this.readDirectory('')
      // this.directories = result.directories
      // this.path = result.path
    }
  }
</script>