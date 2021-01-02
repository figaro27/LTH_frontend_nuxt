<template>
  <div v-if="savedSearch" class="region">
    <regions-hero class="region__hero" :data="savedSearch" />
    <div class="region__content">
      <search-page :saved-search="savedSearch" class="region__search" />
      <search-ads class="region__ads" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { SavedSearch } from '@/models'
import { api, buildMeta } from '@/utils'

@Component({
  name: 'single-region',
  async fetch() {
    const { slug } = this.$route.params
    const res = await api.get(`saved-searchs/${slug}`)
    this.$data.savedSearch = res.data.data
  },
  head() {
    if (!this.$data.savedSearch) {
      return buildMeta({
        title: 'Legaltech Hub',
        description: 'Legaltech Hub'
      })
    }
    const { name } = this.$data.savedSearch
    return buildMeta({
      title: `${name} - Legaltech Hub`,
      description: `${name} - Legaltech Hub`
    })
  }
})
export default class SingleRegion extends Vue {
  savedSearch: SavedSearch | null = null

  get title() {
    return this.savedSearch ? this.savedSearch.name : ''
  }
}
</script>

<style lang="scss" scoped>
.region {
  width: 100vw;
  @include col;
  margin-top: 70px;
}

.region__hero {
  width: 100%;
}

.region__content {
  width: 100%;
  @include row;
  padding: 20px 30px;
  position: relative;
}

.region__search {
  flex: 1;
  width: 100%;
}

.region__ads {
  width: $widgetWidth;
  margin-right: 20px;
  margin-top: 30px;
}
</style>
