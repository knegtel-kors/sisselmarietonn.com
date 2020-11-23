export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
 mode: 'universal',
 /*
 ** Nuxt target
 ** See https://nuxtjs.org/api/configuration-target
 */
 target: 'static',
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
      // <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin></link>
      {
        rel: 'preload',
        href: '/_nuxt/assets/fonts/Sneak-Regular.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: true
      }
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
    preview: '/preview/'
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: 'UA-174157708-1'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
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
    // Doc: https://hackernoon.com/how-i-use-scss-variables-mixins-functions-globally-in-nuxt-js-projects-while-compiling-css-utilit-58bb6ff30438
    styleResources: {
      scss: ['assets/styles/values.scss', 'assets/styles/mixins.scss'],
    },
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
