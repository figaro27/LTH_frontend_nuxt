<template>
  <div class="search">
    <search-page class="search__content" />
    <search-ads class="search__ads" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

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
