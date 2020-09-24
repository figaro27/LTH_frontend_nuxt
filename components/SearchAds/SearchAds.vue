<template>
  <div class="search-ads">
    <tool-of-week class="search-ads__tool-of-the-week" />
    <popular-searchs class="search-ads__popular-searchs" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'search-ads'
})
export default class SearchAds extends Vue {}
</script>

<style lang="scss" scoped>
.search-ads {
  width: $widgetWidth;
  @include col;

  @media (max-width: 640px) {
    display: none;
  }
}

.search-ads__tool-of-the-week {
  width: 100%;
  margin-bottom: 40px;
}

.search-ads__popular-searchs {
  width: 100%;
}
</style>
