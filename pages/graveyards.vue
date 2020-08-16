<template>
  <div class="graveyards">
    <div class="graveyards__hero">
      <img class="graveyards__hero-image" src="/images/graveyards/hero.png" />
    </div>

    <div class="graveyards__carousel-container">
      <div class="graveyards__carousel">
        <carousel
          :per-page-custom="[
            [768, 2],
            [1024, 3],
            [1148, 4]
          ]"
        >
          <slide v-for="index in halfLength" :key="index">
            <div class="graveyard-pair">
              <graveyard-item class="graveyard__item" :data="graveyards[(index - 1) * 2]" />
              <graveyard-item
                v-if="graveyards[(index - 1) * 2 + 1]"
                class="graveyard__item"
                :data="graveyards[(index - 1) * 2 + 1]"
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

@Component({ name: 'graveyards' })
export default class Graveyards extends Vue {
  @State((state: RootState) => state.graveyard.graveyards) graveyards!: Array<Vendor>
  @State((state: RootState) => state.graveyard.graveyardsLoading) graveyardsLoading!: LoadingStatus

  get halfLength() {
    return Math.ceil(this.graveyards.length / 2)
  }

  mounted() {
    this.$store.dispatch('graveyard/loadGraveyards')
  }
}
</script>

<style lang="scss" scoped>
.graveyards {
  @include col;
  align-items: center;
  width: 100%;
  margin-top: 70px;
  padding-bottom: 60px;
}

.graveyards__hero {
  width: 100%;
  height: calc(100vh - 270px);
  @include col--center;
  background: #b3dce0;
  overflow: hidden;
}

.graveyards__hero-image {
  flex: 1;
  width: 100%;
  object-fit: cover;
}

.graveyards__hero-title {
  font-family: $fontRochester;
  font-size: 120px;
  color: #694c3f;
}

.graveyards__carousel-container {
  max-width: $desktopMaxWidth;
  width: $desktopMaxWidth;
  margin: 100px 0;
  padding: 100px 50px;
  background: $colorBg2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;
}

.graveyards__carousel {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.graveyard-pair {
  @include col;

  & > *:not(:first-child) {
    margin-top: 100px;
  }
}

.graveyard__item {
  width: 100%;
  padding: 20px;
}
</style>
