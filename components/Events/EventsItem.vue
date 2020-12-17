<template>
  <nuxt-link class="events-item" :to="url">
    <div class="events-item__row">
      <h4 v-if="data.title" class="events-item__title">
        <text-highlight :queries="highlightQueries">{{ data.title }}</text-highlight>
      </h4>
    </div>
    <div class="events-item__row">
      <span class="events-item__property">
        <text-highlight :queries="highlightQueries">{{ `${data.city}, ${data.country}` }}</text-highlight>
      </span>
    </div>
    <div class="events-item__row">
      <span v-if="data.month" class="events-item__property">
        <text-highlight :queries="highlightQueries">{{ data.month }}</text-highlight>
      </span>
      <span v-if="data.audience" class="events-item__property">
        <text-highlight :queries="highlightQueries">{{ data.audience }}</text-highlight>
      </span>
      <span v-if="data.duration" class="events-item__property">
        <text-highlight :queries="highlightQueries">{{ data.duration }}</text-highlight>
      </span>
      <span v-if="data.recurrence" class="events-item__property">
        <text-highlight :queries="highlightQueries">{{ data.recurrence }}</text-highlight>
      </span>
    </div>
    <div class="events-item__row">
      <span v-if="data.description" class="events-item__des">
        <text-highlight :queries="highlightQueries">{{ data.description }}</text-highlight>
      </span>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Getter, Prop, Vue } from 'nuxt-property-decorator'

import { SearchResultEvent } from '@/models'

@Component({ name: 'events-item' })
export default class VendorItem extends Vue {
  @Prop({ required: true }) data!: SearchResultEvent
  @Getter('highlightQueries', { namespace: 'search' }) highlightQueries!: string[]

  get title() {
    const { title } = this.data
    return title
  }

  get url() {
    return `/event/${this.data.id}`
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
.events-item {
  width: calc(100% - 40px);
  @include col;
  padding: 10px 15px;
  margin: 10px 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  color: $colorNavy;

  @include respondTo(mobile) {
    width: 90%;
  }
}

.events-item__title {
  @include typography(lg, default, bold);
  color: $colorNavy;
  margin-bottom: 3px;
}

.events-item__dash {
  @include typography(lg, default, bold);
  color: $colorNeutralsGrey;
  margin: 0 5px;

  @include respondTo(mobile) {
    display: none;
  }
}

.events-item__des {
  @include typography(lg, default);
  color: $colorDarkGrey;
  margin-top: 16px;
}

.events-item__row {
  width: 100%;
  @include row;
  @include respondTo(mobile) {
    flex-wrap: wrap;
    &:first-child {
      flex-direction: column;
    }
  }
}

.events-item__property {
  @include typography(md-1);
  color: $colorLightGrey;
  padding: 0 5px;
  margin: 3px 0;
  &:not(:last-child) {
    border-right: 1px solid;
  }

  @media (min-width: 640px) {
    @include ellipsis(1, md-1);
  }

  @include respondTo(mobile) {
    font-size: 12px;
    line-height: 1.125rem;
    white-space: nowrap;
  }
}
</style>
