<template>
  <div class="regions-hero" :class="{ 'regions-hero--main': isMain }">
    <ad class="regions-hero__left-ad" direction="vertical" />

    <div class="regions-hero__content">
      <div class="regions-hero__title-section">
        <h1 v-if="isMain" class="regions-hero__title">Regional <span>Snapshots</span></h1>
        <h1 v-else class="regions-hero__title" :style="{ color: data.titleColor }">
          {{ data.name }}
        </h1>
        <client-only>
          <div class="regions-hero__description" v-html="data.description" />
        </client-only>
      </div>

      <img class="regions-hero__map" :src="data.map" />
    </div>

    <ad class="regions-hero__right-ad" direction="vertical" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { SavedSearch } from '@/models'

@Component({ name: 'regions-hero' })
export default class RegionsHero extends Vue {
  @Prop({ required: true }) data!: SavedSearch
  @Prop({ type: Boolean, default: false }) isMain!: boolean
}
</script>

<style lang="scss" scoped>
.regions-hero {
  width: 100%;
  @include row;
  justify-content: center;
  background: $colorBg2;
  position: relative;

  @media (max-width: 640px) {
    background: none;
  }
}

$adMaxWidth: calc(50% - #{$desktopMaxWidth / 2} - 40px);

.regions-hero__left-ad {
  position: absolute;
  top: 30px;
  left: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}

.regions-hero__right-ad {
  position: absolute;
  top: 30px;
  right: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}

.regions-hero__content {
  @include row;
  padding: 80px 50px;
  width: $desktopMaxWidth;

  @media (max-width: 640px) {
    flex-direction: column;
    padding: 20px 50px;
  }
}

.regions-hero__title-section {
  flex: 1;
  @include col;
  margin: 0 60px 0 0;

  @media (max-width: 640px) {
    margin: 0;
  }
}

.regions-hero__title {
  @include typography(xxl-1, narrow, bold);
  text-align: left;

  @media (max-width: 640px) {
    text-align: center;
  }
}

.regions-hero__description {
  @include typography(lg);
  color: $colorDarkGrey;
  text-align: left;
  margin: 20px 0 0 0;
}

.regions-hero__map {
  width: 40%;
  height: fit-content;
  margin: 50px 0 30px;
  object-fit: contain;

  @media (max-width: 640px) {
    width: 100%;
  }
}

.regions-hero--main .regions-hero__content {
  padding: 30px 50px;
  @include col--center;
}

.regions-hero--main .regions-hero__title-section {
  @include col--center;
  color: $colorNavy;

  span {
    @include typography(xxl-1, narrow, bold);
    color: $colorGreen;
  }
}

.regions-hero--main .regions-hero__description {
  @include typography(xl);
  text-align: center;
  margin: 40px 40px 60px;
}

.regions-hero--main .regions-hero__map {
  width: 80%;
}
</style>
