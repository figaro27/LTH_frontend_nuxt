<template>
  <div class="search">
    <events-page class="search__content" />
    <search-ads class="search__ads" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { buildMeta } from '~/utils'

@Component({
  name: 'search-events',
  head() {
    return buildMeta({
      title: 'Events - Legaltech Hub',
      description: 'Events - Legaltech Hub'
    })
  }
})
export default class SearchEvents extends Vue {}
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
  @include respondTo(lg) {
    display: none;
  }
}
</style>
