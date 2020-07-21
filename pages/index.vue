<template>
  <div class="home">
    <router-link class="home__logo" to="/">
      <img src="@/assets/logo.jpg" />
    </router-link>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.home__logo {
  margin: -200px 0 20px 0;
  cursor: pointer;

  img {
    width: 150px;
    object-fit: contain;
  }
}

.search-box-container {
  width: 640px;
}

.home__saved-searchs {
  width: 640px;
  margin-top: 20px;
}
</style>
