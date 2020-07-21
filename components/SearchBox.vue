<template>
  <div id="search-box">
    <!-- <img v-if="isKeywordsLoading" src="/img/svgs/spinner.svg" /> -->
    <cool-select
      ref="select"
      v-model="selectedValue"
      item-text="label"
      item-value="value"
      placeholder="Search..."
      :items="feedItems"
      :loading="isKeywordsLoading"
      :search-text.sync="searchText"
      @select="select"
    >
      <template v-if="searchText" #input-end>
        <button class="search-box__cancel" @click.stop="cancelSearch"></button>
      </template>

      <template #input-after>
        <button class="search-box__search" @click.stop="search">
          <img src="/img/svgs/search.svg" />
        </button>
      </template>
    </cool-select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { CoolSelect, VueCoolSelectComponentInterface } from 'vue-cool-select'
import { LoadingStatus } from '@/store/types'

@Component({
  name: 'search-box',
  components: { CoolSelect }
})
export default class SearchBox extends Vue {
  @Prop({ required: true }) value!: string
  @State((state) => state.search.autosuggestItems) autosuggestItems!: string[]
  @State((state) => state.search.autosuggestItemsLoading) autosuggestItemsLoading!: LoadingStatus

  $refs!: {
    select: VueCoolSelectComponentInterface
  }

  searchText = ''
  selectedValue = ''

  get feedItems() {
    const items = []
    if (this.searchText) {
      items.unshift({
        index: 0,
        label: `Search for "${this.searchText}"`,
        value: this.searchText
      })
    }
    items.push(
      ...this.autosuggestItems.map((item, index) => ({
        index: index + 1,
        label: item,
        value: item
      }))
    )

    return items
  }

  get isKeywordsLoading() {
    return this.autosuggestItemsLoading === LoadingStatus.Loading
  }

  @Watch('value', { immediate: true })
  onValue() {
    this.searchText = this.value
  }

  @Watch('searchText', { immediate: true })
  onSearchText() {
    this.$store.dispatch('search/loadAutosuggest', this.searchText)
  }

  search() {
    this.$emit('search', this.searchText)
  }

  cancelSearch() {
    this.$refs.select.setSearchData('')
    this.selectedValue = ''
  }

  select(selectedItem: { index: number; label: string; value: string }) {
    this.selectedValue = selectedItem.value
    if (selectedItem.index === 0) {
      this.searchText = selectedItem.value
    } else {
      this.searchText = selectedItem.label
    }
    this.$emit('search', this.searchText)
  }
}
</script>

<style lang="scss">
#search-box {
  .IZ-select {
    height: 40px;
  }

  .IZ-select__input {
    border-radius: 5px 0 0 5px !important;
    border-right: none !important;

    input {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      font-weight: 500;
    }
  }

  .IZ-select__input--focused {
    box-shadow: none !important;
  }

  .IZ-select__item {
    text-align: left;
  }
}
</style>

<style lang="scss" scoped>
.search-box__cancel {
  position: relative;
  width: 25px;
  height: 25px;
  margin: 0 5px;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.54);
    border-radius: 2px;
    height: 2px;
    width: 18px;
    left: 50%;
    top: 46%;
    transform-origin: left;
  }

  &::before {
    transform: rotate(45deg) translate(-50%);
  }
  &::after {
    transform: rotate(-45deg) translate(-50%);
  }
}

.search-box__search {
  background: #d20038;
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:active {
    background: #d20038cc;
  }
}
</style>
