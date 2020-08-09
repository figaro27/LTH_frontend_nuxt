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

import RegionsHero from '@/components/Regions/RegionsHero.vue'
import SearchPage from '@/components/SearchPage.vue'
import SearchAds from '@/components/SearchAds/SearchAds.vue'

import { SavedSearch } from '@/models'
import { api } from '@/utils'

@Component({
  name: 'single-region',
  components: { RegionsHero, SearchPage, SearchAds }
})
export default class SingleRegion extends Vue {
  savedSearch!: SavedSearch

  async asyncData(payload: any) {
    const res = await api.get(`saved-searchs/${payload.params.slug}`)
    return {
      savedSearch: res.data.data
    }
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
  @include row;
  width: 100%;
  padding: 20px 30px;
}

.region__search {
  flex: 1;
}

.region__ads {
  width: $widgetWidth;
  margin-left: 40px;
  margin-right: 10px;
}
</style>
