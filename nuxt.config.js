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
    '@/assets/styles/bootstrap.scss',
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
    analyze: { analyzerMode: 'static' },
    extractCSS: true,
    ssr: false,
    vendor: [
      'vue-awesome/icons/stop',
      'vue-awesome/icons/globe',
      'vue-awesome/icons/user',
      'vue-awesome/icons/power-off',
      'vue-awesome/icons/refresh',
      'vue-awesome/icons/lock',
      'vue-awesome/icons/signal',
      'vue-awesome/icons/eject',
      'vue-awesome/icons/key'
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
  // generate: {
  //   minify: {
  //     collapseBooleanAttributes: true,
  //     collapseWhitespace: true,
  //     decodeEntities: true,
  //     minifyCSS: true,
  //     minifyJS: true,
  //     processConditionalComments: true,
  //     removeAttributeQuotes: true,
  //     removeComments: true,
  //     removeEmptyAttributes: true,
  //     removeOptionalTags: true,
  //     removeRedundantAttributes: true,
  //     removeScriptTypeAttributes: false,
  //     removeStyleLinkTypeAttributes: false,
  //     removeTagWhitespace: true,
  //     sortAttributes: true,
  //     sortClassName: true,
  //     trimCustomFragments: true,
  //     useShortDoctype: true
  //   }
  // },
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
