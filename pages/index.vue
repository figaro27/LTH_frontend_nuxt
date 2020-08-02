<template>
  <div class="home">
    <div class="search-box-container">
      <search-box v-model="keyword" @search="onSearch" />
    </div>
    <saved-searchs class="home__saved-searchs" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import SavedSearchs from '@/components/SavedSearchs.vue'
import SearchBox from '@/components/SearchBox.vue'

@Component({
  name: 'home',
  components: { SavedSearchs, SearchBox }
})
export default class Home extends Vue {
  keyword = ''

  get layout() {
    return 'default'
  }

  onSearch(keyword: string) {
    if (keyword) {
      this.$router.push({ name: 'search', query: { keyword } })
    } else {
      this.$router.push({ name: 'search' })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  @include col;
  align-items: center;
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.search-box-container {
  width: 640px;
  margin-top: 60px;
}

.home__saved-searchs {
  width: 640px;
  margin-top: 20px;
}
</style>
