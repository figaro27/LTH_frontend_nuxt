<template>
  <nuxt-link v-if="data.consolidationData" class="consolidation-item" :to="`/vendor/${data.id}`">
    <img class="consolidation-item__background" src="./assets/background.svg" />
    <div class="consolidation-item__content">
      <label class="consolidation-item__title">{{ name }}</label>
      <span class="consolidation-item__plus">+</span>
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
}

.consolidation-item__background {
  width: 100%;
}

.consolidation-item__content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @include col--center;
  color: #546e7a;
  z-index: 1;
}

.consolidation-item__title {
  @include typography(xl-2, narrow, bold);
}

.consolidation-item__plus {
  @include typography(xl-2, narrow, bold);
}

.consolidation-item__with {
  @include typography(xl-2, narrow, bold);
}

.consolidation-item__date {
  @include typography(xl, narrow, bold);
}
</style>
