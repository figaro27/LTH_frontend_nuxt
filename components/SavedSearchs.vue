<template>
  <div v-if="savedSearchesLoaded" class="saved-searchs">
    <nuxt-link
      v-for="(item, index) of savedSearchsWithUrl"
      :key="index"
      class="saved-searchs__item"
      :style="{ background: colorized ? getOpacityColor(item.titleColor) : '#ebf1ff' }"
      :to="item.url"
    >
      <label>{{ item.name }}</label>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, State, Vue, Prop } from 'nuxt-property-decorator'

import { SavedSearch } from '@/models'
import { RootState, LoadingStatus } from '@/store/types'

@Component({ name: 'saved-searchs' })
export default class SavedSearchs extends Vue {
  @Prop({ type: Boolean, default: false }) colorized!: boolean

  @State((state: RootState) => state.savedSearch.savedSearchs) savedSearchs!: Array<SavedSearch>
  @State((state: RootState) => state.savedSearch.savedSearchsLoading) savedSearchsLoading!: LoadingStatus

  getOpacityColor(color: string) {
    const newColor = color.replace('rgb', 'rgba')
    return newColor.substring(0, newColor.length - 1) + ', 0.25)'
  }

  get savedSearchsWithUrl() {
    return this.savedSearchs.map((item) => ({
      ...item,
      url: `/regional-snapshots/${item.slug}`
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
  border-radius: 16px;
  min-width: 80px;
  @include typography(lg, narrow, bold);
  margin: 8px;
  padding: 8px 24px;
  color: $colorDarkGrey;
  text-decoration: none;
  cursor: pointer;

  label {
    cursor: pointer;
  }
}
</style>
