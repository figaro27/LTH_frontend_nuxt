<template>
  <div v-if="loaded && similarVendors.length > 0" class="similar-vendors">
    <h3 class="similar-vendors__title">Similar Results</h3>
    <div class="similar-vendors__list">
      <similar-vendor-card
        v-for="(vendor, index) of similarVendors"
        :key="index"
        class="similar-vendors__vendor"
        :vendor="vendor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import SimilarVendorCard from './SimilarVendorCard.vue'

import { SimilarVendor } from '~/models'
import { LoadingStatus } from '~/store/types'
import { api } from '~/utils'

@Component({
  name: 'similar-vendors',
  components: { SimilarVendorCard }
})
export default class SimilarVendors extends Vue {
  @Prop({ required: true }) vendorId!: string

  similarVendors: SimilarVendor[] = []
  loadingStatus: LoadingStatus = LoadingStatus.Unloaded

  get loaded() {
    return this.loadingStatus === LoadingStatus.Loaded
  }

  @Watch('vendorId', { immediate: true })
  async onVendorIdChange() {
    this.loadingStatus = LoadingStatus.Loading

    let res
    try {
      res = await api.get(`vendors/${this.vendorId}/similar`)
    } catch (err) {
      this.loadingStatus = LoadingStatus.Loaded
      return
    }

    this.similarVendors = res.data.data
    this.loadingStatus = LoadingStatus.Loaded
  }
}
</script>

<style lang="scss" scoped>
.similar-vendors {
  width: 100%;
  @include col;
  padding-top: 60px;
  border-top: 4px solid $colorLightGreen;
}

.similar-vendors__title {
  @include typography(lg-1, default, bold);
  color: $colorNavy;
  text-align: left;
}

.similar-vendors__list {
  width: 100%;
  padding: 35px 10px 20px;
  @include row;
  overflow-x: auto;

  @include respondTo(mobile) {
    @include col;
  }
}

.similar-vendors__vendor {
  width: 27%;
  min-width: 200px;

  &:not(:last-child) {
    margin-right: 9.5%;
  }

  @include respondTo(mobile) {
    width: 100%;

    &:not(:last-child) {
      margin-right: 0;
      margin-bottom: 30px;
    }
  }
}
</style>
