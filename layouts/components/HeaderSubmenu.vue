<template>
  <client-only>
    <v-popover trigger="manual" placement="bottom" popover-class="popover--sub-menu" :open.sync="open">
      <span class="header__link__text" @mouseover="onMouseover">
        {{ link.text }} <span class="header__link__chevron" />
      </span>
      <template #popover>
        <div v-on-clickaway="closeMenu" class="header__link-sub-menus" @click="closeMenu">
          <router-link
            v-for="(child, idx) in link.children"
            :key="`child${idx}`"
            :to="child.path"
            class="header__link-sub-menu"
          >
            {{ child.text }}
          </router-link>
        </div>
      </template>
    </v-popover>
  </client-only>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { mixin as ClickAway } from 'vue-clickaway'
import { ComponentOptions } from 'vue'

import { HeaderLink } from './types'

@Component({
  name: 'default-header',
  mixins: [ClickAway as ComponentOptions<Vue>]
})
export default class HeaderSubmenu extends Vue {
  @Prop({ required: true }) link!: HeaderLink

  open: boolean = false

  onMouseover() {
    setTimeout(() => {
      this.open = true
    }, 200)
  }

  closeMenu() {
    this.open = false
  }
}
</script>

<style lang="scss" scoped>
.header__link__text {
  @include row--center;
  @include typography(xl, narrow, bold);
}

.header__link__chevron {
  width: 25px;
  height: 10px;
  grid-area: item-icon;
  float: left;
  margin-left: 2px;
  background-color: $colorDarkGrey; /* defines the background color of the image */
  mask: url(/images/svgs/arrow-down.svg) no-repeat center / contain;
  -webkit-mask: url(/images/svgs/arrow-down.svg) no-repeat center / contain;
}

.header__link-sub-menus {
  width: 100%;
  @include col;
  background: white;
}

.header__link-sub-menu {
  display: block;
  border-bottom: 1px solid #d8d8d8;
  width: 100%;
  padding: 6px 12px;
  color: $colorDarkGrey;
  text-decoration: none;
  white-space: nowrap;
  text-align: left;
  @include typography(md-1, narrow);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>

<style lang="scss">
.popover--sub-menu {
  background: white;
  box-shadow: 0 0 black;
  margin: 0;

  .popover-inner {
    background: white;
    width: 160px;
    overflow: hidden;
    padding: 0;
  }

  .popover-arrow {
    display: none;
  }
}
</style>
