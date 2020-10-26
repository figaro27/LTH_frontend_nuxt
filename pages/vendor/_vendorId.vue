<template>
  <div>
    <common-vendor v-if="!isEnhancedVendor" :data="data" />
    <enhanced-vendor v-else :data="data" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Vendor } from '@/models'
import { api, buildMeta } from '@/utils'
@Component({
  name: 'single-vendor',
  async asyncData(ctx) {
    const { params } = ctx
    const res = await api.get(`vendors/${params.vendorId}`)
    const temp: Vendor = res.data.data
    return {
      data: temp
    }
  },
  head() {
    const { name } = this.$data.data
    return buildMeta({
      title: `${name} - Legaltech Hub`,
      description: `${name} - Legaltech Hub`
    })
  }
})
export default class SingleVendor extends Vue {
  data: Vendor | null = null
  isEnhancedVendor: boolean = false
  async mounted() {
    if (this.data) {
      return
    }
    const res = await api.get(`vendors/${this.vendorId}`)
    this.data = res.data.data
  }

  get vendorId() {
    return this.$route.params.vendorId
  }

  historyBack() {
    window.history.back()
  }
}
</script>
