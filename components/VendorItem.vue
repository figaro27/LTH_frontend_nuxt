<template>
  <nuxt-link class="vendor-item" :to="url">
    <div class="vendor-item__row">
      <h4 v-if="data.name" class="vendor-item__title">
        <text-highlight :queries="highlightQueries">{{ title }}</text-highlight>
      </h4>
      <span class="vendor-item__dash">-</span>
      <h5 v-if="hq" class="vendor-item__hq">
        <text-highlight :queries="highlightQueries">{{ hq }}</text-highlight>
      </h5>
    </div>
    <div class="vendor-item__row">
      <span v-if="functionality" class="vendor-item__property">
        <text-highlight :queries="highlightQueries">{{ functionality }}</text-highlight>
      </span>
      <span v-if="subFunctionality" class="vendor-item__property">
        <text-highlight :queries="highlightQueries">{{ subFunctionality }}</text-highlight>
      </span>
      <span v-if="targetEntity" class="vendor-item__property">
        <text-highlight :queries="highlightQueries">{{ targetEntity }}</text-highlight>
      </span>
      <span v-if="platformLanguage" class="vendor-item__property">
        <text-highlight :queries="highlightQueries">{{ platformLanguage }}</text-highlight>
      </span>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Getter, Prop, Vue } from 'nuxt-property-decorator'

import { SearchResultVendor } from '@/models'

@Component({ name: 'vendor-item' })
export default class VendorItem extends Vue {
  @Prop({ required: true }) data!: SearchResultVendor
  @Getter('highlightQueries', { namespace: 'search' }) highlightQueries!: string[]

  get title() {
    let title = ''
    const { name, tool } = this.data
    if (tool) title += `${tool}, `
    if (name) title += name
    return title
  }

  get hq() {
    return this.data.hqs.map((item) => item.name).join(',')
  }

  get functionality() {
    return this.getKeywordPrioritizedString(this.data.functionalities, 3)
  }

  get subFunctionality() {
    return this.getKeywordPrioritizedString(this.data.subFunctionalities, 3)
  }

  get platformLanguage() {
    return this.getKeywordPrioritizedString(this.data.platformLanguages, 5)
  }

  get targetEntity() {
    return this.getKeywordPrioritizedString(this.data.demographics, 5)
  }

  get url() {
    return `/vendor/${this.data.id}`
  }

  getKeywordPrioritizedString(items: { id: string; name: string }[], maxLength: number = 5) {
    const polishedItems = []
    const polishedIndexes = []
    for (let i = 0; i < this.highlightQueries.length; i++) {
      const idx = items.findIndex((item) => item.name.includes(this.highlightQueries[i]))
      if (idx < 0) continue
      polishedIndexes.push(idx)
      polishedItems.push(items[idx])
      if (polishedItems.length >= maxLength) break
    }
    for (let i = 0; i < items.length; i++) {
      if (polishedItems.length >= maxLength) break
      if (polishedIndexes.includes(i)) continue
      polishedItems.push(items[i])
    }
    return polishedItems.map((item) => item.name).join(', ')
  }
}
</script>

<style lang="scss" scoped>
.vendor-item {
  width: calc(100% - 40px);
  @include col;
  padding: 10px 15px;
  margin: 10px 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  color: $colorNavy;

  @media (max-width: 640px) {
    width: 90%;
  }
}

.vendor-item__title {
  @include typography(lg, default, bold);
  color: $colorNavy;
  margin-bottom: 3px;
}

.vendor-item__dash {
  @include typography(lg, default, bold);
  color: $colorNeutralsGrey;
  margin: 0 5px;

  @media (max-width: 640px) {
    display: none;
  }
}

.vendor-item__hq {
  @include typography(lg, default, bold);
  color: $colorNeutralsGrey;
  margin-bottom: 8px;
}

.vendor-item__row {
  width: 100%;
  @include row;
  @media (max-width: 640px) {
    flex-wrap: wrap;
    &:first-child {
      flex-direction: column;
    }
  }
}

.vendor-item__property {
  @include typography(md-1);
  color: $colorDarkGrey;
  padding: 0px 5px;
  &:not(:last-child) {
    border-right: 1px solid;
  }

  @media (min-width: 640px) {
    @include ellipsis(1, md-1);
  }

  @media (max-width: 640px) {
    font-size: 12px;
    line-height: 1.125rem;
    white-space: nowrap;
  }
}
</style>
