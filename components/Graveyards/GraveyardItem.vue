<template>
  <nuxt-link v-if="data.graveyardData" class="graveyard-item" :to="`/vendor/${data.id}`">
    <img class="graveyard-item__background" src="./assets/background.svg" />
    <span class="graveyard-item__rip">R.I.P.</span>
    <div class="graveyard-item__content">
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
}

.graveyard-item__background {
  width: 100%;
}

.graveyard-item__rip {
  position: absolute;
  top: 30px;
  @include typography(xl-1, narrow, bold);
  color: $colorLightGrey2;
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
}

.graveyard-item__date {
  @include typography(xl, narrow, bold);
  color: $colorLightGrey2;
}
</style>
