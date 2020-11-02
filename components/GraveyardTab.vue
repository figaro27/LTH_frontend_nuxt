<template>
  <div>
    <div class="graveyard-tab">
      <client-only>
        <div class="graveyard-tab__container">
          <fa class="graveyard-tab__arrow" :icon="['fas', 'chevron-left']" />
        </div>
        <div class="graveyard-tab__container">
          <nuxt-link class="graveyard-tab__link" to="/graveyards">
            <label class="graveyard-tab__title" :class="{ 'graveyard-tab__title-active': status == 1 }"
              >GRAVEYARD</label
            >
          </nuxt-link>
        </div>
        <div class="graveyard-tab__container">
          <nuxt-link class="graveyard-tab__link" to="/consolidations">
            <label class="graveyard-tab__title" :class="{ 'graveyard-tab__title-active': status == 2 }"
              >CONSOLIDATION</label
            >
          </nuxt-link>
        </div>
        <div class="graveyard-tab__container">
          <fa class="graveyard-tab__arrow" :icon="['fas', 'chevron-right']" />
        </div>
      </client-only>
    </div>
    <div
      :class="[
        status == '2' ? 'tab-indicator__consolidations' : 'tab-indicator__graveyards',
        show ? (status == '2' ? 'tab-indicator__anim-right' : 'tab-indicator__anim-left') : ''
      ]"
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

.tab-indicator__consolidations {
  position: relative;
  width: calc(100% / 5);
  height: 2px;
  background: #80c41c;
  left: 0px;
  border-radius: 5px;
  margin: 0px calc(100% / 6);
  transition: 0.5s ease;
}

.tab-indicator__graveyards {
  position: relative;
  width: calc(100% / 5);
  height: 2px;
  background: #80c41c;
  left: 0px;
  border-radius: 5px;
  margin: 0px calc(100% / 6);
  transition: 0.5s ease;
  transform: translateX(200px);
}

.tab-indicator__anim-right {
  transition-delay: 0.1s;
  transform: translateX(200px);
}

.tab-indicator__anim-left {
  transition-delay: 0.1s;
  transform: translateX(0px);
}
</style>
