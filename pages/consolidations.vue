<template>
  <div class="consolidations">
    <div class="consolidations__carousel-container">
      <div class="consolidations__carousel">
        <div class="consolidations__hero">
          <img class="consolidations__hero-image" src="/images/consolidations/consolidation_banner.svg" />
        </div>
        <carousel :per-page="1" :navigate-to="-1">
          <slide v-for="slideIndex in slideCount" :key="slideIndex" :navigate-to="0">
            <div class="consolidation-slide">
              <div v-for="index in 12" :key="index" class="consolidation__item">
                <consolidation-item
                  v-if="consolidations[(slideIndex - 1) * 12 + index - 1]"
                  :data="consolidations[(slideIndex - 1) * 12 + index - 1]"
                />
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator'
import { RootState, LoadingStatus } from '@/store/types'
import { Vendor } from '@/models'
import { buildMeta } from '@/utils'

@Component({
  name: 'consolidations',
  head() {
    return buildMeta({
      title: 'Consolidations - Legaltech Hub',
      description: 'Consolidations - Legaltech Hub'
    })
  }
})
export default class Consolidations extends Vue {
  @State((state: RootState) => state.consolidation.consolidations) consolidations!: Array<Vendor>
  @State((state: RootState) => state.consolidation.consolidationsLoading) consolidationsLoading!: LoadingStatus

  get slideCount() {
    return Math.ceil(this.consolidations.length / 12)
  }

  mounted() {
    this.$store.dispatch('consolidation/loadConsolidations')
  }
}
</script>

<style lang="scss" scoped>
.consolidations {
  @include col;
  align-items: center;
  width: 100%;
  margin-top: 70px;
  padding-bottom: 60px;
}

.consolidations__hero {
  width: 100%;
  @include col--center;
  background: #b3dce0;
  overflow: hidden;
}

.consolidations__hero-image {
  flex: 1;
  width: 100%;
  object-fit: contain;
}

.consolidations__hero-title {
  font-family: $fontRochester;
  font-size: 120px;
  color: #694c3f;
}

.consolidations__carousel-container {
  max-width: $desktopMaxWidth;
  width: $desktopMaxWidth;
  margin: 32px 0;
  background: $colorBg2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 640px) {
    width: 90%;
  }
}

.consolidations__carousel {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.consolidation-pair {
  @include col;

  & > *:not(:first-child) {
    margin-top: 100px;
  }
}

.consolidation-slide {
  display: flex;
  flex-wrap: wrap;
}

.consolidation__item {
  width: 25%;

  @media (max-width: 640px) {
    width: 33%;
  }
}
</style>
