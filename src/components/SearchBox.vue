<template>
  <div id="search-box">
    <img v-if="keywordsLoading" src="/img/svgs/spinner.svg" >
    <cool-select
      v-else
      ref="select"
      placeholder="Search with keyboard"
      item-value="value"
      item-text="label"
      v-model="selectedValue"
      :filter="filter"
      :items="feedItems"
      :search-text.sync="searchText"
      :reset-search-on-blur="false"
      @select="select"
    >
      <template v-if="searchText" #input-end>
        <button class="search-box__cancel" @click.stop="cancelSearch"></button>
      </template>

      <template #input-after>
        <button class="search-box__search" @click.stop="search">
          <img src="/img/svgs/search.svg">
        </button>
      </template>

      <template #no-data>
        No listings found
      </template>
    </cool-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { CoolSelect, VueCoolSelectComponentInterface } from 'vue-cool-select'

import { Keyword } from '@/store/search/types'

@Component({
  name: 'search-box',
  components: { CoolSelect }
})
export default class SearchBox extends Vue {
  @State(state => state.search.keywords) keywords!: Keyword[]
  @State(state => state.search.keywordsLoading) keywordsLoading!: boolean

  $refs!: {
    select: VueCoolSelectComponentInterface;
  }

  searchText = ''
  selectedValue = ''

  get feedItems () {
    const items = this.keywords.map(item => ({
      label: item.name.replace(/(\s)+/g, ' '),
      value: `${item.index}`
    }))
    if (this.searchText) {
      items.unshift({
        label: `Search for "${this.searchText}"`.replace(/(\s)+/g, ' '),
        value: this.searchText.replace(/(\s)+/g, ' ')
      })
    }
    return items
  }

  async mounted () {
    await this.$store.dispatch('search/loadPossibleKeywords')
  }

  cancelSearch () {
    this.reset()
  }

  filter (item: Keyword, keyword: string) {
    return (item.name && item.name.toLowerCase().includes(keyword.toLowerCase()))
  }

  search () {
    this.$emit('select', this.searchText)
  }

  select (selectedItem: Keyword) {
    this.$emit('select', selectedItem.name)
  }

  reset () {
    this.$refs.select.setSearchData('')
    this.selectedValue = ''
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
      font-family: "Avenir", Helvetica, Arial, sans-serif;
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
#search-box {
  width: 640px;
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
    background-color: rgba(0, 0, 0, .54);
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
  background: #D20038;
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover, &:active {
    background: #D20038CC;
  }
}
</style>
