<template>
  <search-page class="search" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import SearchPage from '@/components/SearchPage.vue'

@Component({
  name: 'search',
  components: { SearchPage }
})
export default class Search extends Vue {}
</script>

<style lang="scss" scoped>
.search {
  width: 100vw;
  height: 100vh;
}
</style>
