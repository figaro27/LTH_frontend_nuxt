<template>
  <div class="popular-searchs">
    <h2 class="popular-searchs__title">
      Popular Searches
    </h2>
    <div class="popular-searchs__list">
      <nuxt-link v-for="(search, index) of popularSearchs" :key="index" :to="search.to">{{ search.label }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'popular-searchs' })
export default class PopularSearchs extends Vue {
  // TODO: Add backend support
  get popularSearchs() {
    return [
      { label: 'AI Tools', to: '/search?keyword=AI Tools' },
      { label: 'Contract Automation', to: '/search?keyword=Contract Automation' },
      { label: 'Data Analytics', to: '/search?keyword=Data Analytics' },
      { label: 'eDiscovery', to: '/search?keyword=eDiscovery' },
      { label: 'Practice Management', to: '/search?keyword=Practice Management' }
    ]
  }
}
</script>

<style lang="scss" scoped>
.popular-searchs {
  @include col;
  padding: 10px;
  border-radius: 10px;
  min-height: 180px;
  background: $colorBg2;
  text-align: left;
}

.popular-searchs__title {
  @include typography(xl, narrow, bold);
  color: $colorGreen;
  margin-bottom: 15px;
}

.popular-searchs__list {
  padding-left: 5px;
  @include col;

  a {
    color: $colorNavy;
    @include typography(lg);
    text-decoration: none;
    margin: 2px 0;
  }
}
</style>
