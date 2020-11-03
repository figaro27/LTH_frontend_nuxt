<template>
  <div>
    <div class="graveyard-tab">
      <client-only>
        <div class="graveyard-tab__container">
          <fa class="graveyard-tab__arrow" :icon="['fas', 'chevron-left']" />
        </div>
        <div class="graveyard-tab__container">
          <nuxt-link class="graveyard-tab__link" to="/graveyards">
            <label class="graveyard-tab__title" :class="{ 'graveyard-tab__title-active': status == 1 }">
              GRAVEYARD
            </label>
          </nuxt-link>
        </div>
        <div class="graveyard-tab__container">
          <nuxt-link class="graveyard-tab__link" to="/consolidations">
            <label class="graveyard-tab__title" :class="{ 'graveyard-tab__title-active': status == 2 }">
              CONSOLIDATION
            </label>
          </nuxt-link>
        </div>
        <div class="graveyard-tab__container">
          <fa class="graveyard-tab__arrow" :icon="['fas', 'chevron-right']" />
        </div>
      </client-only>
    </div>
    <div
      class="graveyard-tab-indicator"
      :class="{
        'graveyard-tab-indicator--graveyards': status === 1 && show,
        'graveyard-tab-indicator--consolidations': status === 2 && show
      }"
    ></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component({ name: 'graveyard-tab' })
export default class GraveyardTab extends Vue {
  @Prop({ required: true }) status!: number
  show: boolean = false
  mounted() {
    this.show = true
  }
}
</script>

<style lang="scss">
.graveyard-tab {
  @include row;
  padding: 16px;
  justify-content: center;
}

.graveyard-tab__container {
  margin: auto 16px;
}

.graveyard-tab__link {
  text-decoration: none;
}

.graveyard-tab__title {
  text-decoration: none;
  color: #333333;
  @include typography(xl-2, none);
  text-align: center;
}

.graveyard-tab__title-active {
  text-decoration: none;
  color: #80c41c;
  @include typography(xl-2, none);
  text-align: center;
}

.graveyard-tab__arrow {
  text-decoration: none;
  color: #333333;
  @include typography(lg, none);
  @include row--center;
  text-align: center;
  margin: auto;
}

.graveyard-tab-indicator {
  position: relative;
  width: calc(100% / 5);
  height: 2px;
  background: #80c41c;
  left: 0px;
  border-radius: 5px;
  margin: 0px calc(100% / 6);
  transition: 0.5s ease-in-out;
  transform: translateX(100px);
}

.graveyard-tab-indicator--consolidations {
  transform: translateX(200px);
}

.graveyard-tab-indicator--graveyards {
  transform: translateX(0px);
}
</style>
