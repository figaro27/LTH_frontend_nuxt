<template>
  <nuxt-link v-if="data.consolidationData" class="consolidation-item" :to="`/vendor/${data.id}`">
    <img class="consolidation-item__background" src="./assets/background.svg" />
    <div class="consolidation-item__content">
      <label class="consolidation-item__title">{{ name }}</label>
      <img class="consolidation-item__icon" src="./assets/consolidation_item.svg" />
      <label class="consolidation-item__with">{{ consolidatedWith }}</label>
      <label class="consolidation-item__date">{{ date }}</label>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import { Vendor } from '@/models'

@Component({ name: 'consolidation-item' })
export default class ConsolidationItem extends Vue {
  @Prop({ required: true }) data!: Vendor

  get name() {
    return this.data.name
  }

  get date() {
    return this.data.consolidationData!.date
  }

  get consolidatedWith() {
    return this.data.consolidationData!.consolidatedWith
  }
}
</script>

<style lang="scss" scoped>
.consolidation-item {
  position: relative;
  width: 100%;
  @include col--center;
  padding: 2.5rem;
}

.consolidation-item__background {
  width: 100%;
}

.consolidation-item__content {
  position: absolute;
  top: 30px;
  left: 0;
  bottom: 0;
  right: 0;
  @include col--center;
  color: #546e7a;
  z-index: 1;
}

.consolidation-item__title {
  @include typography(xl-1, narrow, bold);
  color: #8ea5bb;
}

.consolidation-item__with {
  @include typography(xl-1, narrow, bold);
  color: #8ea5bb;
}

.consolidation-item__icon {
  margin-top: 4px;
  margin-bottom: 4px;
}

.consolidation-item__date {
  @include typography(lg, narrow, bold);
  color: #8ea5bb;
  margin-top: 4px;
}
</style>
