<template>
  <div class="search">
    <search-page :saved-search="savedSearch" class="search__content" />
    <search-ads class="search__ads" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import SearchPage from '@/components/SearchPage.vue'
import SearchAds from '@/components/SearchAds/SearchAds.vue'

import { SavedSearch } from '@/models'
import { api } from '@/utils'

@Component({
  name: 'saved-search',
  components: { SearchPage, SearchAds }
})
export default class SavedSearchPage extends Vue {
  savedSearch!: SavedSearch

  async asyncData(payload: any) {
    const res = await api.get(`saved-searchs/${payload.params.slug}`)
    return {
      savedSearch: res.data
    }
  }

  get title() {
    return this.savedSearch ? this.savedSearch.name : ''
  }
}
</script>

<style lang="scss" scoped>
.search {
  @include row;
  width: 100vw;
  padding: 20px 30px;
}

.search__content {
  flex: 1;
}

.search__ads {
  width: 240px;
  margin-left: 40px;
  margin-right: 10px;
}
</style>
