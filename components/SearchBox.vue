<template>
  <div id="search-box" class="search-box">
    <div class="search-box__tabs">
      <componet
        :is="tab.tag"
        v-for="(tab, index) of tabs"
        :key="index"
        v-tooltip="tab.isComingSoon ? { content: 'Coming Soon', trigger: 'hover' } : undefined"
        class="search-box__tab"
        :class="{
          [`search-box__tab--${tab.id}`]: true,
          'search-box__tab--active': tab.id === currentTab
        }"
        :to="tab.to"
        active-class="search-box__tab--active"
        @click="onTabClick(tab)"
      >
        {{ tab.label }}
      </componet>
    </div>
    <div class="search-box__input_container">
      <cool-select
        ref="select"
        v-model="selectedValue"
        item-text="label"
        item-value="value"
        :placeholder="placeholder"
        :items="feedItems"
        :loading="isAutosuggestLoading"
        :search-text.sync="searchText"
        @select="select"
      >
        <template #input-end>
          <button v-if="searchText" class="search-box__cancel" @click.stop="cancelSearch" />
        </template>
      </cool-select>
      <calendar-button
        v-if="currentTab === 'events'"
        class="search-box__calendar"
        @calendar="$emit('calendar', $event)"
      />
      <button class="search-box__search" @click.stop="search">
        <img src="/images/svgs/search.svg" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, State, Vue, Watch } from 'nuxt-property-decorator'
import { CoolSelect, VueCoolSelectComponentInterface } from 'vue-cool-select'

import { LoadingStatus, RootState } from '@/store/types'

type TabItem = {
  tag: string
  id: 'tools' | 'events' | 'awards'
  label: string
  to?: string
  isComingSoon?: boolean
}

@Component({
  name: 'search-box',
  components: { CoolSelect }
})
export default class SearchBox extends Vue {
  @Prop({ required: true }) value!: string

  @State((state: RootState) => state.vendors.autosuggestItems)
  vendorsAutosuggestItems!: string[]

  @State((state: RootState) => state.vendors.autosuggestItemsLoading)
  vendorsAutosuggestItemsLoading!: LoadingStatus

  @State((state: RootState) => state.events.autosuggestItems)
  eventsAutosuggestItems!: string[]

  @State((state: RootState) => state.events.autosuggestItemsLoading)
  eventsAutosuggestItemsLoading!: LoadingStatus

  $refs!: {
    select: VueCoolSelectComponentInterface
  }

  searchText = ''
  selectedValue = ''

  currentTab: 'tools' | 'events' = 'tools'

  get autosuggestItems(): string[] {
    return this.currentTab === 'events' ? this.eventsAutosuggestItems : this.vendorsAutosuggestItems
  }

  get autosuggestItemsLoading(): LoadingStatus {
    return this.currentTab === 'events' ? this.eventsAutosuggestItemsLoading : this.vendorsAutosuggestItemsLoading
  }

  get placeholder() {
    return this.currentTab === 'events' ? 'Search for legaltech events...' : 'Search for legaltech tools...'
  }

  get isEventsPage() {
    const { name } = this.$route
    return name === 'search-events'
  }

  get isToolsPage() {
    const { name } = this.$route
    return name && ['search-tools', 'regional-snapshots-slug'].includes(name)
  }

  @Watch('$route.path', { immediate: true })
  onRoutePathChange() {
    if (this.isEventsPage) {
      this.currentTab = 'events'
    } else {
      this.currentTab = 'tools'
    }
  }

  get tabs(): TabItem[] {
    const { isEventsPage, isToolsPage } = this

    return [
      isEventsPage
        ? { tag: 'nuxt-link', id: 'tools', label: 'Tools', to: '/search/tools' }
        : { tag: 'div', id: 'tools', label: 'Tools' },
      isToolsPage
        ? { tag: 'nuxt-link', id: 'events', label: 'Events', to: '/search/events' }
        : { tag: 'div', id: 'events', label: 'Events' },
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

  get isAutosuggestLoading() {
    return this.autosuggestItemsLoading !== LoadingStatus.Loaded
  }

  onTabClick(tab: TabItem) {
    if (tab.id === 'awards') return
    if (this.currentTab === tab.id) return

    this.currentTab = tab.id
    this.loadAutoSuggest()
  }

  @Watch('value', { immediate: true })
  onValue() {
    this.searchText = this.value
  }

  @Watch('searchText', { immediate: true })
  onSearchText() {
    this.loadAutoSuggest()
  }

  loadAutoSuggest() {
    if (this.currentTab === 'events') {
      this.$store.dispatch('events/loadAutosuggest', this.searchText)
    } else {
      this.$store.dispatch('vendors/loadAutosuggest', this.searchText)
    }
  }

  search() {
    this.$emit('search', { keyword: this.searchText, tab: this.currentTab })
  }

  cancelSearch() {
    this.$refs.select.setSearchData('')
    this.selectedValue = ''
    this.$emit('search', { keyword: '', tab: this.currentTab })
  }

  select(selectedItem: { index: number; label: string; value: string }) {
    this.selectedValue = selectedItem.value
    if (selectedItem.index === 0) {
      this.searchText = selectedItem.value
    } else {
      this.searchText = selectedItem.label
    }
    this.$emit('search', { keyword: this.searchText, tab: this.currentTab })
  }
}
</script>

<style lang="scss" scoped>
$searchBoxWidth: 850px;
$searchBoxHeight: 50px;

.search-box {
  @include col;
}

.search-box__tabs {
  @include row;
  width: 100%;
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

    &.search-box__tab--active {
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

.search-box__input_container {
  position: relative;
  @include row;
  width: 100%;
}

#search-box ::v-deep {
  .IZ-select {
    flex: 1;
    height: $searchBoxHeight;
  }

  .IZ-select__input {
    border-radius: 0 0 0 10px !important;
    border-right: none !important;
    border-color: $colorLightGreen;
    display: flex;

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

.search-box__calendar {
  position: absolute;
  right: $searchBoxHeight;
  padding-right: 5px;
}

.search-box__search {
  @include row--center;
  background: $colorLightGreen;
  width: $searchBoxHeight;
  height: $searchBoxHeight;
  outline: none;
  border: none;
  border-radius: 0 10px 10px 0;
  cursor: pointer;

  &:hover,
  &:active {
    background: lighten($colorLightGreen, 10%);
  }
}
</style>
