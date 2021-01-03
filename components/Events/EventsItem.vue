<template>
  <nuxt-link class="events-item" :to="url">
    <div class="events-item__row">
      <h4 v-if="title" class="events-item__title">
        <text-highlight :queries="highlightQueries">{{ title }}</text-highlight>
      </h4>
    </div>
    <div class="events-item__row">
      <span class="events-item__property">
        <text-highlight :queries="highlightQueries">{{ location }}</text-highlight>
      </span>
    </div>
    <div class="events-item__row">
      <span v-if="data.month" class="events-item__property">
        <text-highlight :queries="highlightQueries">{{ data.month }}</text-highlight>
      </span>
      <span v-if="audiences" class="events-item__property">
        <text-highlight :queries="highlightQueries">{{ audiences }}</text-highlight>
      </span>
      <span v-if="duration" class="events-item__property">
        <text-highlight :queries="highlightQueries">{{ duration }}</text-highlight>
      </span>
      <span v-if="recurrence" class="events-item__property">
        <text-highlight :queries="highlightQueries">{{ recurrence }}</text-highlight>
      </span>
    </div>
    <div class="events-item__row">
      <span v-if="data.description" class="events-item__des">
        <client-only>
          <text-highlight :queries="highlightQueries" v-html="data.description" />
        </client-only>
      </span>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Getter, Prop, Vue } from 'nuxt-property-decorator'

import { SearchResultEvent } from '@/models'

@Component({ name: 'events-item' })
export default class VendorItem extends Vue {
  @Prop({ required: true })
  data!: SearchResultEvent

  @Getter('highlightQueries', { namespace: 'events' })
  highlightQueries!: string[]

  get title() {
    const { data } = this
    if (data === null) {
      return null
    }
    if (data.title === null) {
      return data.organizer
    } else if (data.organizer !== data.title) {
      return `${data.organizer}, ${data.title}`
    }
    return this.data.title
  }

  get location() {
    const { data } = this
    if (!data) return ''
    if (data.city) return `${data.city}, ${data.country}`
    return data.country
  }

  get url() {
    return `/event/${this.data.id}`
  }

  get duration() {
    const { data } = this
    return (data && data.duration.name) || ''
  }

  get audiences() {
    const { data } = this
    if (!data) return ''
    return data.audiences.map((data) => data.name).join(', ')
  }

  get recurrence() {
    const { data } = this
    return (data && data.recurrence.name) || ''
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
  margin: 3px 0;

  &:not(:first-child) {
    padding-left: 5px;
  }

  &:not(:last-child) {
    border-right: 1px solid;
    padding-right: 5px;
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
