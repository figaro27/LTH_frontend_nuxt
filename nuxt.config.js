import axios from 'axios'

const apiUrl = process.env.NUXT_APP_API_URL || 'http://localhost:4000'
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  env: {
    baseURL: apiUrl,
    environment: process.env.NODE_ENV
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Legal Tech Hub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=PT+Sans' },
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=PT+Sans+Narrow' },
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=Rochester' }
    ],
    script:
      process.env.NODE_ENV === 'production'
        ? [{ src: 'https://www.googletagmanager.com/gtag/js?id=G-KJZ26BZ4WK', async: true }, { src: '/js/gtag.js' }]
        : []
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/styles/global/index.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '@/plugins/loading.js', mode: 'client' },
    { src: '@/plugins/v-tooltip.js', mode: 'client' },
    { src: '@/plugins/vue-carousel.js', mode: 'client' },
    { src: '@/plugins/vue-cool-select.js', mode: 'client' },
    { src: '@/plugins/vue-multiselect.js', mode: 'client' },
    { src: '@/plugins/vue-paginate.js', mode: 'client' },
    { src: '@/plugins/vue-recaptcha-v3.js', mode: 'client' },
    { src: '@/plugins/vue-text-highlight.js', mode: 'client' },
    { src: '@/plugins/vue-avatar.js', mode: 'client' },
    { src: '@/plugins/vue-youtube.js', mode: 'client' }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          }
        ]
      }
    ]
  ],
  styleResources: {
    scss: ['./assets/styles/main.scss']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    babel: {
      presets() {
        return [['@nuxt/babel-preset-app', { loose: true }]]
      }
    },
    postcss: {
      plugins: {
        'postcss-url': {},
        'postcss-import': {},
        'postcss-plugin-px2rem': {
          rootValue: 16,
          unitPrecision: 5,
          propWhiteList: [],
          propBlackList: [
            'border',
            'border-width',
            'border-bottom',
            'border-top',
            'border-left',
            'border-right',
            'border-radius',
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-left-radius',
            'border-bottom-right-radius'
          ],
          selectorBlackList: [],
          ignoreIdentifier: false,
          replace: true,
          mediaQuery: false,
          minPixelValue: 3
        }
      }
    },
    transpile: ['get-youtube-id', 'lodash.isequal', 'validator']
  },

  generate: {
    concurrency: 20,
    interval: 500,
    subFolders: false,
    minify: {
      collapseWhitespace: false
    },
    routes() {
      const client = axios.create({ baseURL: apiUrl })
      return Promise.all([
        client.request({ method: 'GET', url: 'vendors/all' }),
        client.request({ method: 'GET', url: 'saved-searchs' })
      ]).then(([res1, res2]) => {
        const vendorRoutes = res1.data.data.map((vendor) => `/vendor/${vendor.id}`)
        const savedSearchsRoutes = res2.data.data.map((savedSearch) => `/regional-snapshots/${savedSearch.slug}`)
        return [...vendorRoutes, ...savedSearchsRoutes]
      })
    }
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
}
