import axios from 'axios'

const apiUrl =
  process.env.NUXT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://api.legaltechnologyhub.com' : 'http://localhost:4000')

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  env: {
    apiUrl
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
    ]
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
    { src: '@/plugins/loading.js', ssr: false },
    { src: '@/plugins/v-tooltip.js', ssr: false },
    { src: '@/plugins/vue-cool-select.js', ssr: false },
    { src: '@/plugins/vue-multiselect.js', ssr: false },
    { src: '@/plugins/vue-paginate.js', ssr: false },
    { src: '@/plugins/vue-text-highlight.js', ssr: false }
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
    }
  },

  generate: {
    routes() {
      const client = axios.create({ baseURL: apiUrl })
      return Promise.all([
        client.request({ method: 'GET', url: 'vendors/all' }),
        client.request({ method: 'GET', url: 'saved-searchs' })
      ]).then(([res1, res2]) => {
        const vendorRoutes = res1.data.data.map((vendor) => `/vendor/${vendor.id}`)
        const savedSearchsRoutes = res2.data.data.map((savedSearch) => `/search/${savedSearch.slug}`)
        return [...vendorRoutes, ...savedSearchsRoutes]
      })
    }
  }
}
