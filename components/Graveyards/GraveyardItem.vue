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

  @media (max-width: 640px) {
    padding: 0.5rem;
  }
}

.graveyard-item__background {
  width: 100%;
}

.graveyard-item__rip {
  @include typography(xl-1, narrow, bold);
  color: #979797;
  font-size: 3rem;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    margin-bottom: 0;
    font-size: 1rem;
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
  @include typography(xxl, narrow, bold);
  margin-bottom: 10px;
  color: $colorNavy;
  @media (max-width: 640px) {
    font-size: 1rem;
    margin-bottom: 0;
  }
}

.graveyard-item__date {
  @include typography(xl, narrow, bold);
  color: #979797;

  @media (max-width: 640px) {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }
}
</style>
