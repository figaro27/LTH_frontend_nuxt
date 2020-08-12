<template>
  <div class="search">
    <search-page class="search__content" />
    <search-ads class="search__ads" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import SearchPage from '@/components/SearchPage.vue'
import SearchAds from '@/components/SearchAds/SearchAds.vue'

@Component({
  name: 'search',
  components: { SearchPage, SearchAds }
})
export default class Search extends Vue {}
</script>

<style lang="scss" scoped>
.search {
  @include row;
  width: 100vw;
  padding: 20px 30px;
  position: relative;
}

.search__content {
  flex: 1;
  width: 100%;
}

.search__ads {
  width: $widgetWidth;
  margin-right: 20px;
  margin-top: 30px;
}
</style>
