import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, {
  siteKey: '6LcdrrwZAAAAAOdytQfzR0iShTLWFUhDX5dRQeah',
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true
  }
})
