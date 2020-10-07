<template>
  <paginate
    v-model="_page"
    :page-count="pageCount"
    :margin-pages="2"
    :page-range="5"
    container-class="pagination"
    page-class="pagination-item"
    prev-class="prev-item"
    next-class="next-item"
    :first-last-button="true"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ name: 'pagination' })
export default class Pagination extends Vue {
  @Prop({ required: true }) pageCount!: number
  @Prop({ required: true }) page!: number

  get _page() {
    return this.page
  }

  set _page(page: number) {
    this.$emit('change', page)
  }
}
</script>

<style lang="scss">
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
  margin-top: 0;
  margin-bottom: 10px;
}

.pagination-item {
  display: inline;

  &:first-child {
    > a,
    > span {
      margin-left: 0;
      border-radius: 3px 0 0 3px;
    }
  }
  &:last-child {
    > a,
    > span {
      border-radius: 0 3px 3px 0;
    }
  }
}

.pagination-item > a,
.pagination-item > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  line-height: 20px;
  text-decoration: none;
  color: $colorNavy;
  background-color: $colorBg2;
  border: 1px solid transparent;
  margin-left: -1px;

  &:hover,
  &:focus {
    z-index: 3;
    color: #ffffff;
    background-color: $colorLightGreen;
  }

  @media (max-width: 640px) {
    padding: 6px 8px;
  }
}

.pagination-item.active > a,
.pagination-item.active > span {
  &,
  &:hover,
  &:focus {
    z-index: 2;
    color: #ffffff;
    background-color: $colorGreen;
    cursor: pointer;
  }
}

.pagination-item.disabled {
  & > span,
  & > span:hover,
  & > span:focus,
  & > a,
  & > a:hover,
  & > a:focus {
    color: #ffffff;
    background-color: $colorGreen;
  }
}

.prev-item,
.next-item {
  display: inline;

  & > a,
  & > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    line-height: 20px;
    text-decoration: none;
    color: $colorNavy;
    background-color: $colorBg2;
    border: 1px solid transparent;
    margin-left: -1px;

    &:hover,
    &:focus {
      z-index: 3;
      color: #ffffff;
      background-color: $colorLightGreen;
    }
  }
}
</style>
