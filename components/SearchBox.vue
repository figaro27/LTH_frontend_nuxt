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
    <div class="search-box__input_container">
      <cool-select
        ref="select"
        v-model="selectedValue"
        item-text="label"
        item-value="value"
        placeholder="Search for legaltech events..."
        :items="feedItems"
        :loading="isKeywordsLoading"
        :search-text.sync="searchText"
        @select="select"
      >
        <template #input-end>
          <button v-if="searchText" class="search-box__cancel" @click.stop="cancelSearch"></button>
        </template>
      </cool-select>
      <div v-if="contents === 'events'" ref="calendar" class="search-box__calendar_container">
        <img class="search-box__calendar_btn" src="/images/svgs/calendar.svg" @click="showCalendar = !showCalendar" />
        <div v-if="showCalendar" v-on-clickaway="hideCalendar" class="search-box__monthpicker_container">
          <div class="search-box__selectedDate">
            <label class="search-box__selectedDate_year">{{ selectedMonth.year }}</label>
            <label class="search-box__selectedDate_month">{{ selectedMonth.month }}</label>
          </div>
          <month-picker
            v-model="selectedMonth"
            class="search-box__monthpicker"
            no-default
            :months="months"
            @input="onInputCalendar"
          />
        </div>
      </div>
      <button class="search-box__search" @click.stop="search">
        <img src="/images/svgs/search.svg" />
      </button>
    </div>
    <Modal v-model="showCalendarModal" title="My first modal">
      <p>Modal content goes here...</p>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, State, Vue, Watch } from 'nuxt-property-decorator'
import { CoolSelect, VueCoolSelectComponentInterface } from 'vue-cool-select'
import { MonthPicker } from 'vue-month-picker'
import { mixin as ClickAway } from 'vue-clickaway'
import { ComponentOptions } from 'vue'
import { LoadingStatus, RootState } from '@/store/types'

@Component({
  name: 'search-box',
  components: { CoolSelect, MonthPicker },
  mixins: [ClickAway as ComponentOptions<Vue>]
})
export default class SearchBox extends Vue {
  @Prop({ required: true }) value!: string
  @Prop({ required: false }) contents!: string
  @Prop({ required: false }) changeCalendar: any
  @State((state: RootState) => state.vendors.autosuggestItems) autosuggestItems!: string[]
  @State((state: RootState) => state.vendors.autosuggestItemsLoading) autosuggestItemsLoading!: LoadingStatus

  $refs!: {
    select: VueCoolSelectComponentInterface
  }

  showCalendarModal = false
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  searchText = ''
  selectedValue = ''
  selectedMonth = {
    from: null,
    to: null,
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear()
  }

  showCalendar = false
  noDefault = true

  hideCalendar() {
    this.showCalendar = false
  }

  get tabs() {
    return [
      { tag: 'nuxt-link', id: 'tools', label: 'Tools', to: '/search/tools' },
      { tag: 'nuxt-link', id: 'events', label: 'Events', to: '/search/events' },
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
    this.$store.dispatch('vendors/loadAutosuggest', this.searchText)
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

  onInputCalendar(date: any) {
    this.changeCalendar(date)
    this.showCalendar = false
  }
}
</script>

<style lang="scss">
$searchBoxHeight: 50px;
$searchBoxWidth: 850px;

#search-box {
  .IZ-select {
    height: $searchBoxHeight;
    width: $searchBoxWidth;
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
.search-box__monthpicker_container {
  position: absolute;
  top: $searchBoxHeight;
  @media (max-width: 870px) {
    right: 10px;
  }
  @media (min-width: 870px) {
    left: 10px;
  }
  z-index: 10;
  background: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 20px;
  color: navy;
  .month-picker__container {
    width: 20rem;
  }
  .month-picker__year {
    display: flex;
    button {
      border: none;
      background: transparent;
      color: navy;
    }
  }
  .month-picker {
    display: flex;
    justify-content: center;
    box-shadow: none;
    .month-picker__month {
      border: none;
    }
  }
}
.search-box__input_container {
  display: flex;
  width: 100%;
}
</style>

<style lang="scss" scoped>
$searchBoxHeight: 50px;

.search-box__calendar_container {
  position: relative;
  height: $searchBoxHeight;
  border: 1px solid $colorLightGreen;
  border-left: none;
  border-right: none;
  align-items: center;
  display: flex;
  cursor: pointer;
}

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

// .search-box__monthpicker {
//   position: relative;
// }

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

.search-box__selectedDate {
  @include col;
  align-items: flex-end;
  background: $colorLightBlue;
  padding: 10px 30px;

  .search-box__selectedDate_year {
    color: $colorNavy;
    @include typography(xl, default, bold);
  }

  .search-box__selectedDate_month {
    color: $colorNavy;
    @include typography(xxl, default, bold);
  }
}
</style>
