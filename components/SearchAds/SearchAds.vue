<template>
  <div class="search-ads">
    <tool-of-week class="search-ads__tool-of-the-week" />
    <popular-searchs class="search-ads__popular-searchs" />

    <ad class="search-ads__ad" direction="vertical" />
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

  @include respondTo(mobile) {
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

.search-ads__ad {
  width: 100%;
}
</style>
