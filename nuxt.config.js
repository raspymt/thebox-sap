module.exports = {
  /*
  ** Modules
  */
  modules: [
    [ '@nuxtjs/axios', {
      browserBaseURL: require('./thebox.config').browserBaseURL,
      baseURL: require('./thebox.config').baseURL,
      credentials: false
      // debug: true
    } ]
  ],
  /*
  ** Mode Single Page Application
  */
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'the-box-web-management',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The Box web management' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** CSS
  */
  css: [
    // '@/assets/styles/bootstrap.scss',
    '@/assets/styles/switch.scss',
    '@/assets/styles/action-button.scss',
    '@/assets/styles/style.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  // loading: false,
  // loading: { color: '#fff' },
  loading: {
    name: 'circle',
    color: '#fff',
    background: '#000'
  },
  /*
  ** Build configuration
  */
  build: {
    // buildDir: '../thebox-api/dist/',
    // analyze: { analyzerMode: 'static' },
    extractCSS: true,
    ssr: false,
    vendor: [
      'vue-awesome/icons/chevron-right',
      'vue-awesome/icons/arrow-circle-up',
      'vue-awesome/icons/plus-circle',
      'vue-awesome/icons/hdd',
      'vue-awesome/icons/external-link-square-alt',
      'vue-awesome/icons/database',
      'vue-awesome/icons/question-circle',
      'vue-awesome/icons/plus-square',
      'vue-awesome/icons/minus-square',
      'vue-awesome/icons/stop',
      'vue-awesome/icons/globe',
      'vue-awesome/icons/user',
      'vue-awesome/icons/power-off',
      'vue-awesome/icons/sync',
      'vue-awesome/icons/lock',
      'vue-awesome/icons/signal',
      'vue-awesome/icons/eject',
      'vue-awesome/icons/key',
      'vue-awesome/icons/circle',
      'vue-awesome/icons/circle-notch',
      'vue-awesome/icons/square',
      'vue-awesome/icons/times-circle',
      'vue-awesome/icons/check-circle',
      'vue-awesome/icons/check-square',
      'vue-awesome/icons/check',
      'vue-awesome/icons/folder',
      'vue-awesome/icons/plus',
      'vue-awesome/icons/level-up-alt',
      'vue-awesome/icons/home'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    dir: '../thebox-api/dist/',
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeTagWhitespace: true,
      sortAttributes: true,
      sortClassName: true,
      trimCustomFragments: true,
      useShortDoctype: true
    }
  },
  router: {
    // middleware: ['check-auth', 'i18n']
    middleware: ['i18n']
  },
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/bootstrap.js'
  ],
  // generate: {
  //   routes: ['/', '/login', '/logout', '/wifi', '/fr', '/fr/login', '/fr/logout', '/fr/wifi']
  // },
  transition: {
    name: 'page',
    mode: 'out-in'
  }
}
