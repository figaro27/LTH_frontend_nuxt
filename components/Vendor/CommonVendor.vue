<template>
  <div class="single-vendor">
    <div class="single-vendor__content">
      <vendor-detail :data="data" />
      <similar-vendors :vendor-id="vendorId" class="single-vendor__similar-results" />
      <ad class="single-vendor__right-ad" position="right" direction="vertical" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import { Vendor } from '@/models'

@Component({
  name: 'common-vendor'
})
export default class CommonVendor extends Vue {
  @Prop({ required: true }) data!: Vendor
  mounted() {}

  get vendorId() {
    return this.$route.params.vendorId
  }

  historyBack() {
    window.history.back()
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

.single-vendor__similar-results {
  width: 100%;
  margin: 20px 0;
}

.single-vendor__right-ad {
  position: absolute;
  top: 110px;
  right: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}
</style>
