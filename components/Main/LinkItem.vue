<template>
  <component
    :is="tag"
    v-tooltip="data.tooltip ? { content: data.tooltip } : undefined"
    class="link-item"
    :href="data.url"
    :target="target"
  >
    <div class="link-item__icon">
      <img class="link-item__icon__img" :src="data.icon" />
    </div>
    <div class="link-item__title">{{ data.title }}</div>
  </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export type LinkItemData = {
  icon: string
  title: string
  url: string
  tooltip?: string
}

@Component({ name: 'link-item' })
export default class LinkItem extends Vue {
  @Prop({ required: true }) data!: LinkItemData

  get tag() {
    return this.data.url ? 'a' : 'div'
  }

  get target() {
    return this.data.url && this.data.url.startsWith('/') ? '' : '_blank'
  }
}
</script>

<style lang="scss" scoped>
.link-item {
  @include col--center;
  width: 100%;
  height: 200px;
  border-radius: 30px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
  cursor: pointer;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  &:hover {
    background: $colorNeutralsSnow;
  }
  &:active {
    background: $colorLightGrey2;
  }

  @include respondTo(mobile) {
    height: 110px;
    border-radius: 15px;
  }
}

.link-item__icon {
  width: 100%;

  position: absolute;
  top: 0;
}

.link-item__icon__img {
  object-fit: cover;
  width: 100%;
}

.link-item__title {
  @include typography(lg, narrow, bold);
  height: 48px;
  color: $colorNavy;
  text-align: center;
  padding: 8px;
  width: 100%;
  position: absolute;
  bottom: 1em;
  background-color: white;

  @include respondTo(mobile) {
    @include typography(sm, narrow, bold);
    height: auto;
    bottom: 0;
  }
}
</style>
