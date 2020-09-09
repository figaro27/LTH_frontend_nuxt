<template>
  <div class="region">
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
import { api } from '@/utils'

@Component({
  name: 'single-region',
  async asyncData(ctx) {
    const { params } = ctx
    const res = await api.get(`saved-searchs/${params.slug}`)
    return {
      savedSearch: res.data.data
    }
  }
})
export default class SingleRegion extends Vue {
  savedSearch: SavedSearch | null = null

  async mounted() {
    if (this.savedSearch) {
      return
    }
    const res = await api.get(`vendors/${this.$route.params.slug}`)
    this.savedSearch = res.data.data
  }

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
