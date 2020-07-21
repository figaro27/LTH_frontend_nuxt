<template>
  <search-page :saved-search="savedSearch" class="saved-search" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import SearchPage from '@/components/SearchPage.vue'
import { SavedSearch } from '@/models'
import { RootState } from '@/store/types'

@Component({
  name: 'saved-search',
  components: { SearchPage }
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
.saved-search {
  width: 100vw;
  height: 100vh;
}
</style>
