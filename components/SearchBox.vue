<template>
  <div class="search-box">
    <div class="search-box__input-container">
      <input v-model="searchText" class="search-box__input" placeholder="Search..." @keydown.enter="search" />
      <button v-if="searchText" class="search-box__cancel" @click.stop="cancelSearch"></button>
    </div>
    <button class="search-box__search" :disabled="keywordsLoading" @click.stop="search">
      <img src="/img/svgs/search.svg" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { Keyword } from '@/store/search/types'

@Component({
  name: 'search-box'
})
export default class SearchBox extends Vue {
  @Prop({ required: true }) value!: string
  @State((state) => state.search.keywords) keywords!: Keyword[]
  @State((state) => state.search.keywordsLoading) keywordsLoading!: boolean

  searchText = ''

  @Watch('value', { immediate: true })
  onValue() {
    this.searchText = this.value
  }

  search() {
    this.$emit('search', this.searchText)
  }

  cancelSearch() {
    this.reset()
  }

  filter(item: Keyword, keyword: string) {
    return item.name && item.name.toLowerCase().includes(keyword.toLowerCase())
  }

  reset() {
    this.searchText = ''
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
}

.search-box__input-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-right: none;
  border-radius: 5px 0 0 5px;
}

.search-box__input {
  width: 100%;
  padding: 5px 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.search-box__cancel {
  position: absolute;
  right: 5px;
  top: 7px;
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
