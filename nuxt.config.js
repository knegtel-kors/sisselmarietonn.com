export default {
  mode: 'spa',
  telemetry: false,
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#262626',
    height: '2px'
  },
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    duration: 200,
  },
  generate: {
    fallback: true,
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  router: {
    base: '/'
  },
  plugins: ['~/plugins/konva'],

  prismic: {
    endpoint: 'https://sisselmarietonn.cdn.prismic.io/api/v2',
    preview: true
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/prismic',
    ['nuxt-social-meta', {
      url: 'https://www.sisselmarietonn.com',
      title: 'Sissel Marie Tonn',
      description: 'About Sissel',
      img: 'https://www.sisselmarietonn.com/social.jpg',
      locale: 'en_EN',
      themeColor: '#ffffff'
    }]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  
  build: {
    /*
     ** You can extend webpack config here
     */
    devtools: true,
    extend(config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common',
      config.externals = [ {
        whitelist: ['vue-konva', 'konva', 'vue']
      }]
    }
  }
}
