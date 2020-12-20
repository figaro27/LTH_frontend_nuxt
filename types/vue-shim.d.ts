/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _Vue from 'vue'

declare module '*.vue' {
  export default _Vue
}
export declare class VueAnalytics {
  static install(Vue: typeof _Vue, options: any): void
  analyticsMiddleware: any
  onAnalyticsReady: any
  event: any
  ecommerce: any
  set: any
  page: any
  query: any
  screenview: any
  time: any
  require: any
  exception: any
  social: any
  disable: any
  enable: any
}

export declare class VueYoutube {
  getIdFromUrl: (url: string) => string
}

declare module 'vue-analytics' {
  export const event: any
  export const analyticsMiddleware: any
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends _Vue> {
    ga?: VueAnalytics
    $youtube?: VueYoutube
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $ga: VueAnalytics
    $youtube: VueYoutube
  }
}
