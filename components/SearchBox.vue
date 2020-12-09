<template>
  <div id="search-box" class="search-box">
    <div class="search-box__tabs">
      <componet
        :is="tab.tag"
        v-for="(tab, index) of tabs"
        :key="index"
        v-tooltip="tab.isComingSoon ? { content: 'Coming Soon', trigger: 'hover' } : undefined"
        class="search-box__tab"
        :class="`search-box__tab--${tab.id}`"
        :to="tab.to"
        :active-class="`search-box__tab--active search-box__tab--${tab.id}--active`"
      >
        {{ tab.label }}
      </componet>
    </div>
    <cool-select
      ref="select"
      v-model="selectedValue"
      item-text="label"
      item-value="value"
      placeholder="Search for legaltech tools..."
      :items="feedItems"
      :loading="isKeywordsLoading"
      :search-text.sync="searchText"
      @select="select"
    >
      <template #input-end>
        <img class="search-box__calendar_btn" src="/images/svgs/calendar.svg" />
        <button v-if="searchText" class="search-box__cancel" @click.stop="cancelSearch"></button>
      </template>

      <template>
        <month-picker :no-default="true"></month-picker>
      </template>
      <template #input-after>
        <button class="search-box__search" @click.stop="search">
          <img src="/images/svgs/search.svg" />
        </button>
      </template>
    </cool-select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, State, Vue, Watch } from 'nuxt-property-decorator'
import { CoolSelect, VueCoolSelectComponentInterface } from 'vue-cool-select'
import { MonthPicker } from 'vue-month-picker'
import { LoadingStatus } from '@/store/types'

@Component({
  name: 'search-box',
  components: { CoolSelect, MonthPicker }
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

  get tabs() {
    return [
      { tag: 'nuxt-link', id: 'tools', label: 'Tools', to: '/search' },
      { tag: 'div', id: 'events', label: 'Events', isComingSoon: true },
      { tag: 'div', id: 'awards', label: 'Awards', isComingSoon: true }
    ]
  }

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
    this.$emit('search', '')
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
$searchBoxHeight: 50px;

#search-box {
  .IZ-select {
    height: $searchBoxHeight;
  }

  .IZ-select__input {
    border-radius: 0 0 0 10px !important;
    border-right: none !important;
    border-color: $colorLightGreen;

    input {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      font-weight: 500;
    }
  }

  .IZ-select__input--focused {
    box-shadow: none !important;
    border-radius: 0 !important;
  }

  .IZ-select__menu {
    border-radius: 0 0 10px 10px !important;
    border-color: $colorLightGreen;
    z-index: 100;
  }

  .IZ-select__item {
    text-align: left;
    color: $colorNavy;
  }
}

.search-box__search {
  background: $colorLightGreen;
  width: $searchBoxHeight;
  height: $searchBoxHeight;
  outline: none;
  border: none;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:active {
    background: lighten($colorLightGreen, 10%);
  }
}
</style>

<style lang="scss" scoped>
.search-box {
  @include col;
}

.search-box__tabs {
  width: 100%;
  @include row;
  margin-bottom: -1px;
  z-index: 1;
}

.search-box__tab {
  width: 90px;
  height: 40px;
  @include row--center;
  border-width: 1px;
  border-style: solid;
  color: $colorNavy;
  text-decoration: none;
  cursor: pointer;

  &--tools {
    background: $colorLightGreen;
    border-color: $colorLightGreen;

    &--active {
      color: $colorLightGreen;
    }
  }

  &--events {
    background: $colorLightNavy;
    border-color: $colorLightNavy;
  }

  &--awards {
    background: $colorLighterDarkGrey;
    border-color: $colorLighterDarkGrey;
  }

  &--active {
    border-bottom-color: white;
    background: white;
    font-weight: bold;
  }

  &:first-child {
    border-radius: 10px 0 0 0;
    border-right: none;
  }

  &:last-child {
    border-radius: 0 10px 0 0;
    border-left: none;
  }

  &:not(:first-child):not(:last-child) {
    border-left: none;
    border-right: none;
  }
}

.search-box__calendar_btn {
  width: 30px;
  height: 30px;
  margin: auto 10px;
}

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
</style>
