<template>
  <div class="home">
    <img class="home__logo" src="@/assets/logo.jpg" />
    <div class="search-box-container">
      <search-box v-model="keyword" @search="onSearch" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SearchBox from '@/components/SearchBox.vue'

@Component({
  name: 'home',
  components: { SearchBox }
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
  width: 150px;
  object-fit: contain;
  margin: -200px 0 20px 0;
}

.search-box-container {
  width: 640px;
}
</style>
