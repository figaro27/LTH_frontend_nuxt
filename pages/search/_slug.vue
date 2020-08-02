<template>
  <div class="search">
    <search-page :saved-search="savedSearch" class="search__content" />
    <search-ads class="search__ads" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import SearchPage from '@/components/SearchPage.vue'
import SearchAds from '@/components/SearchAds/SearchAds.vue'

import { SavedSearch } from '@/models'
import { RootState } from '@/store/types'

@Component({
  name: 'saved-search',
  components: { SearchPage, SearchAds }
})
export default class SavedSearchPage extends Vue {
  @State((state: RootState) => state.savedSearch.currentSavedSearch) savedSearch!: SavedSearch | null

  get title() {
    return this.savedSearch ? this.savedSearch.name : ''
  }

  mounted() {
    this.$store.dispatch('savedSearch/loadSingleSavedSearch', this.$route.params.slug)
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
