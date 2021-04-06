export default {
  ssr: false,

  target: 'static',

  head: {
    title: 'ศูนย์รับแจ้งเรื่องร้องเรียน',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0,user-scalable=0' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'ant-design-vue/dist/antd.css'
  ],

  plugins: [
    '@/plugins/antd-ui',
    '~/plugins/createInstanceAPI.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module'
  ],

  styleResources: {
    scss: ['~styles/vars/*.scss']
  },

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {},

  build: {
  }
}
