<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="search-box-container">
      <search-box @search="onSearch" />
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
  onSearch (keyword: string) {
    this.$router.push(`/search?keyword=${keyword}`)
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.search-box-container {
  width: 640px;
}
</style>
