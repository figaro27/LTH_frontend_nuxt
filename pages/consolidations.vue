<template>
  <div class="consolidations">
    <div class="consolidations__hero">
      <img class="consolidations__hero-image" src="/images/consolidations/hero.png" />
      <label class="consolidations__hero-title">Consolidations</label>
    </div>

    <div class="consolidations__carousel-container">
      <div class="consolidations__carousel">
        <carousel
          :per-page-custom="[
            [768, 2],
            [1024, 3],
            [1148, 4]
          ]"
        >
          <slide v-for="index in halfLength" :key="index">
            <div class="consolidation-pair">
              <consolidation-item class="consolidation__item" :data="consolidations[(index - 1) * 2]" />
              <consolidation-item
                v-if="consolidations[(index - 1) * 2 + 1]"
                class="consolidation__item"
                :data="consolidations[(index - 1) * 2 + 1]"
              />
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

@Component({ name: 'consolidations' })
export default class Consolidations extends Vue {
  @State((state: RootState) => state.consolidation.consolidations) consolidations!: Array<Vendor>
  @State((state: RootState) => state.consolidation.consolidationsLoading) consolidationsLoading!: LoadingStatus

  get halfLength() {
    return Math.ceil(this.consolidations.length / 2)
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
  height: calc(100vh - 270px);
  padding: 60px;
  @include col--center;
  background: #b3dce0;
  overflow: hidden;
}

.consolidations__hero-image {
  flex: 1;
  height: calc(100% - 160px);
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
  margin: 100px 0;
  padding: 100px 50px;
  background: $colorBg2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;
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

.consolidation__item {
  width: 100%;
  padding: 20px;
}
</style>
