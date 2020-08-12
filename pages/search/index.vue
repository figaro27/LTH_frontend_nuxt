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
  @include row--center;
  width: 100vw;
  padding: 20px 30px;
  position: relative;
}

.search__content {
  width: 100%;
  max-width: $desktopMaxWidth;
}

.search__ads {
  width: $widgetWidth;
  position: absolute;
  right: 20px;
  top: 30px;
}
</style>
