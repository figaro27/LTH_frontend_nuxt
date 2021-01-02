<template>
  <div v-loading="!data" class="single-vendor">
    <div class="single-vendor__content">
      <ad class="single-vendor__left-ad" position="left" direction="vertical" />

      <div class="single-vendor__main">
        <vendor-detail :data="data" />
        <enhanced-vendor v-if="isEnhancedVendor" class="single-vendor__enhanced" :data="data" />
      </div>

      <similar-vendors :vendor-id="vendorId" class="single-vendor__similar-results" />
      <ad class="single-vendor__right-ad" position="right" direction="vertical" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Vendor } from '@/models'
import { api, buildMeta } from '@/utils'

@Component({
  name: 'single-vendor',

  async fetch() {
    const { vendorId } = this.$route.params
    const res = await api.get(`vendors/${vendorId}`)
    this.$data.data = res.data.data as Vendor
  },

  head() {
    if (!this.$data.data) {
      return buildMeta({
        title: 'Legaltech Hub',
        description: 'Legaltech Hub'
      })
    }
    const { name } = this.$data.data
    return buildMeta({
      title: `${name} - Legaltech Hub`,
      description: `${name} - Legaltech Hub`
    })
  }
})
export default class SingleVendor extends Vue {
  data: Vendor | null = null

  get isEnhancedVendor() {
    const { data } = this
    return data && data.enhancedListingEnabled && !!data.enhancedListingData
  }

  get vendorId() {
    return this.$route.params.vendorId
  }
}
</script>

<style lang="scss" scoped>
.single-vendor {
  @include desktop-max-width-layout;
  padding: 40px;
  text-align: left;
  background: white;
  position: relative;
}

$adMaxWidth: calc(50% - #{$desktopMaxWidth / 2} - 40px);

.single-vendor__left-ad {
  position: absolute;
  top: 110px;
  left: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}

.single-vendor__right-ad {
  position: absolute;
  top: 110px;
  right: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}

.single-vendor__main {
  width: 100%;
  @include col;

  @include respondTo(mobile) {
    @include col;
  }
}

.single-vendor__enhanced {
  margin-bottom: 40px;
}

.single-vendor__similar-results {
  width: 100%;
  margin: 20px 0;
}
</style>
