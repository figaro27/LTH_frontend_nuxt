declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    $recaptchaLoaded: any
    $recaptcha: any
  }
}
