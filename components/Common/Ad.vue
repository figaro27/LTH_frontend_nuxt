<template>
  <a v-if="activeAd" class="ad" :href="activeAd.redirectUrl" target="_blank">
    <img :src="adImage" />
  </a>
</template>

<script lang="ts">
import { Component, Prop, State, Vue } from 'nuxt-property-decorator'
import { isMobile } from 'mobile-device-detect'

import { Ad } from '~/models'
import { RootState } from '~/store/types'

@Component({ name: 'ad' })
export default class ad extends Vue {
  @Prop({ required: true }) direction!: 'vertical' | 'horizontal'
  @Prop({ required: false, default: 'common' }) type!: 'home' | 'common'
  @State((state: RootState) => state.ads.activeAd) activeAd!: Ad | null

  get adImage() {
    const { activeAd, direction, type } = this
    if (!activeAd) {
      return null
    }

    if (isMobile) {
      if (direction === 'horizontal') {
        return activeAd.mobileCommonHorizontalAd
      } else {
        return activeAd.mobileCommonVerticalAd
      }
    }
    if (type === 'home') {
      if (direction === 'horizontal') return activeAd.desktopHomeHorizontalAd
      else return activeAd.desktopHomeVerticalAd
    }

    if (direction === 'horizontal') return activeAd.desktopCommonHorizontalAd
    else return activeAd.desktopCommonVerticalAd
  }

  mounted() {
    if (!this.activeAd) {
      this.$store.dispatch('ads/loadActiveAd')
    }
  }
}
</script>

<style lang="scss" scoped>
.ad {
  overflow: hidden;
  text-decoration: none;
  margin: 25px 0;

  img {
    width: 100%;
    overflow: hidden;
    object-fit: contain;
  }
}
</style>
