<template>
  <div v-if="savedSearchesLoaded" class="saved-searchs">
    <router-link v-for="(item, index) of savedSearchsWithUrl" :key="index" class="saved-searchs__item" :to="item.url">
      <label>{{ item.name }}</label>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { SavedSearch } from '@/models'
import { RootState, LoadingStatus } from '@/store/types'

@Component({ name: 'saved-searchs' })
export default class SavedSearchs extends Vue {
  @State((state: RootState) => state.savedSearch.savedSearchs) savedSearchs!: Array<SavedSearch>
  @State((state: RootState) => state.savedSearch.savedSearchsLoading) savedSearchsLoading!: LoadingStatus

  get savedSearchsWithUrl() {
    return this.savedSearchs.map((item) => ({
      ...item,
      url: `/${item.slug}`
    }))
  }

  get savedSearchesLoaded() {
    return this.savedSearchsLoading === LoadingStatus.Loaded
  }

  mounted() {
    this.$store.dispatch('savedSearch/loadSavedSearchs')
  }
}
</script>

<style lang="scss" scoped>
.saved-searchs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.saved-searchs__item {
  background: #ebf1ff;
  border-radius: 20px;
  font-family: $fontPTSans;
  font-size: 12px;
  margin: 10px;
  padding: 7px 10px;
  color: #546e7a;
  text-decoration: none;
  cursor: pointer;

  label {
    cursor: pointer;
  }
}
</style>
