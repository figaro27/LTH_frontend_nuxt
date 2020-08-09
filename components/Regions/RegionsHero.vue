<template>
  <div class="regions-hero">
    <div class="regions-hero__content">
      <div class="regions-hero__title-section">
        <h1 class="regions-hero__title" :style="{ color: data.titleColor }">
          {{ data.name }}
        </h1>
        <p class="regions-hero__description">
          {{ data.description }}
        </p>
      </div>

      <img class="regions-hero__map" :src="data.map" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { SavedSearch } from '@/models'

@Component({ name: 'regions-hero' })
export default class RegionsHero extends Vue {
  @Prop({ required: true }) data!: SavedSearch
}
</script>

<style lang="scss" scoped>
.regions-hero {
  width: 100%;
  @include row--center;
  padding: 80px 50px;
  background: #f2f2f2;
}

.regions-hero__content {
  @include row;
  width: $desktopMaxWidth;
}

.regions-hero__title-section {
  flex: 1;
  @include col;
  margin-right: 60px;
}

.regions-hero__title {
  @include typography(xxl-3, narrow, bold);
  margin-bottom: 20px;
  text-align: left;
}

.regions-hero__description {
  @include typography(lg);
  color: $colorDarkGrey;
  text-align: left;
}

.regions-hero__map {
  width: 40%;
  margin: 50px 0 30px;
  object-fit: contain;
}
</style>
