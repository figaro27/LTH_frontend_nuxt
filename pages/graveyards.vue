<template>
  <div class="graveyards">
    <div class="graveyards__carousel-container">
      <div class="graveyards__carousel">
        <div class="graveyards__hero">
          <img class="graveyards__hero-image" src="/images/graveyards/graveyards_banner.png" />
        </div>
        <carousel :per-page="1" :navigate-to="-1">
          <slide v-for="slideIndex in slideCount" :key="slideIndex" :navigate-to="0">
            <div class="graveyard-slide">
              <div v-for="index in 12" :key="index" class="graveyard__item">
                <graveyard-item
                  v-if="graveyards[(slideIndex - 1) * 12 + index - 1]"
                  :data="graveyards[(slideIndex - 1) * 12 + index - 1]"
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

@Component({ name: 'graveyards' })
export default class Graveyards extends Vue {
  @State((state: RootState) => state.graveyard.graveyards) graveyards!: Array<Vendor>
  @State((state: RootState) => state.graveyard.graveyardsLoading) graveyardsLoading!: LoadingStatus

  get slideCount() {
    return Math.ceil(this.graveyards.length / 12)
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
  margin-top: 32px;
  padding-bottom: 60px;
}

.graveyards__hero {
  width: 100%;
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
  margin: 32px 0;
  padding: 0px 0px;
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

.graveyard-slide {
  display: flex;
  flex-wrap: wrap;
}

.graveyard__item {
  width: 25%;
}
</style>
