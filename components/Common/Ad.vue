<template>
  <a v-if="adImage" class="ad" :href="adRedirectUrl" target="_blank">
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
  @Prop({ required: false, default: 'right' }) position!: 'right' | 'left'
  @Prop({ required: false, default: 'common' }) type!: 'home' | 'common'

  @State((state: RootState) => state.ads.activeAd) activeAd!: Ad | null

  get adPosition() {
    const { activeAd, direction, position, type } = this
    if (!activeAd) {
      return null
    }

    const { adPositions } = activeAd
    if (isMobile) {
      if (direction === 'horizontal') {
        return adPositions.mobileCommonHorizontalAd
      } else {
        return position === 'left' ? adPositions.mobileCommonLeftVerticalAd : adPositions.mobileCommonRightVerticalAd
      }
    }
    if (type === 'home') {
      if (direction === 'horizontal') {
        return adPositions.desktopHomeHorizontalAd
      } else {
        return position === 'left' ? adPositions.desktopHomeLeftVerticalAd : adPositions.desktopHomeRightVerticalAd
      }
    }

    if (direction === 'horizontal') {
      return adPositions.desktopCommonHorizontalAd
    } else {
      return position === 'left' ? adPositions.desktopCommonLeftVerticalAd : adPositions.desktopCommonRightVerticalAd
    }
  }

  get adImage() {
    return this.adPosition && this.adPosition.image
  }

  get adRedirectUrl() {
    return this.adPosition && this.adPosition.redirectUrl
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
