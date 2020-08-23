import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, {
  siteKey: '6LdXaMAZAAAAALDCMyvs7C4al4PgZUcqj0RgJKdv',
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true
  }
})
