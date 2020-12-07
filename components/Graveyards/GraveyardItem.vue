<template>
  <nuxt-link v-if="data.graveyardData" class="graveyard-item" :to="`/vendor/${data.id}`">
    <img class="graveyard-item__background" src="./assets/background.svg" />
    <div class="graveyard-item__content">
      <span class="graveyard-item__rip">RIP</span>
      <label class="graveyard-item__title">{{ name }}</label>
      <label class="graveyard-item__date">{{ date }}</label>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import { Vendor } from '@/models'

@Component({ name: 'graveyard-item' })
export default class GraveyardItem extends Vue {
  @Prop({ required: true }) data!: Vendor

  get name() {
    return this.data.name
  }

  get date() {
    return this.data.graveyardData!.date
  }
}
</script>

<style lang="scss" scoped>
.graveyard-item {
  position: relative;
  width: 100%;
  @include col--center;
  padding: 2.5rem;

  @include respondTo(mobile) {
    padding: 0.5rem;
  }
}

.graveyard-item__background {
  width: 100%;
}

.graveyard-item__rip {
  @include typography(xl-2, narrow, bold);
  color: #979797;
  font-size: 3rem;
  margin-bottom: 16px;

  @include respondTo(lg) {
    margin-bottom: 0;
    @include typography(xl-2, narrow, bold);
  }
}

.graveyard-item__content {
  position: absolute;
  top: 30px;
  left: 0;
  bottom: 0;
  right: 0;
  @include col--center;
  z-index: 1;
}

.graveyard-item__title {
  @include typography(xl, narrow, bold);
  margin-bottom: 10px;
  color: $colorNavy;
  @include respondTo(mobile) {
    @include typography(lg, narrow, bold);
    margin-bottom: 0;
  }
}

.graveyard-item__date {
  @include typography(xl, narrow, bold);
  color: #979797;

  @include respondTo(mobile) {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }
}
</style>
