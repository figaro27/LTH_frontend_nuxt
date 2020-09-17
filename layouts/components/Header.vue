<template>
  <header class="header">
    <logo class="header__logo" />
    <h2 class="header__label">
      Your legaltech needs. In your area. In your language.
    </h2>
    <div class="header__links">
      <nuxt-link
        v-for="(link, index) of links"
        :key="index"
        class="header__link"
        active-class="header__link--active"
        :to="link.to"
        :exact="link.exact"
      >
        {{ link.label }}
      </nuxt-link>
    </div>
    <div class="header__popup-menu" @click="showMenu()">
      <img src="/images/svgs/popup-menu.svg" />
    </div>
    <div v-if="isPopupMenuClicked" v-on-clickaway="away" class="sidebar">
      <ul class="sidebar__menu">
        <li
          v-for="(item, index) in nestedLinks"
          :key="index"
          class="sidebar__menu__item"
          @click="collapseItem(index, item)"
        >
          <router-link :to="item.path">
            <p class="sidebar__menu__item--name" :class="{ 'header__link--active': item.path === selectedMenu }">
              {{ item.text }}
            </p>
            <div
              v-if="item.children && item.children.length"
              class="sidebar__menu__item--icon"
              :class="{ 'sidebar__menu__item--icon-active': item.path === selectedMenu }"
            ></div>

            <transition name="slide-fade">
              <ul v-if="openedItems[index]" class="sidebar__menu__child">
                <li
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                  class="sidebar__menu__child--item"
                  @click="hideMenu(child)"
                >
                  <router-link :to="child.path" @click.stop>
                    {{ child.text }}
                  </router-link>
                </li>
              </ul>
            </transition>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mixin as ClickAway } from 'vue-clickaway'
import { ComponentOptions } from 'vue'
import Logo from './Logo.vue'

@Component({
  name: 'default-header',
  components: { Logo },
  mixins: [ClickAway as ComponentOptions<Vue>]
})
export default class DefaultHeader extends Vue {
  openedItems: Record<number, boolean> = {}
  isPopupMenuClicked: boolean = false
  selectedMenu: string | null | undefined

  get links() {
    return [
      { label: 'Home', to: '/', exact: true },
      { label: 'About Us', to: '/about-us', exact: true },
      { label: 'How LTH works', to: '/how-lth-works', exact: true },
      { label: 'Regional Snapshots', to: '/regional-snapshots' },
      { label: 'Legaltech Resources', to: '/blogs', exact: true },
      { label: 'Add/Update your Listing', to: '/listing', exact: true },
      { label: 'Contact Us', to: '/contact-us', exact: true }
    ]
  }

  get nestedLinks() {
    return [
      {
        text: 'Home',
        path: '/'
      },
      {
        text: 'About Us',
        path: '/about-us'
      },
      {
        text: 'How LTH works',
        path: '/how-lth-works'
      },
      {
        text: 'Regional Snapshots',
        path: '/regional-snapshots',
        children: [
          {
            text: 'USA & Canada',
            path: '/regional-snapshots/us-canada'
          },
          {
            text: 'UK & Ireland',
            path: '/regional-snapshots/uk-ireland'
          },
          {
            text: 'Europe',
            path: '/regional-snapshots/europe'
          },
          {
            text: 'LatAm & Carib',
            path: '/regional-snapshots/latam-carib'
          },
          {
            text: 'Asia & Middle East',
            path: '/regional-snapshots/asia-middle-east'
          },
          {
            text: 'Africa',
            path: '/regional-snapshots/africa'
          },
          {
            text: 'Australia & NZ',
            path: '/regional-snapshots/australia-nz'
          }
        ]
      },
      {
        text: 'Legaltech Resources',
        path: '/blogs'
      },
      {
        text: 'Add/Update your Listing',
        path: '/listing'
      },
      {
        text: 'Contact Us',
        path: '/contact-us'
      }
    ]
  }

  mounted() {
    this.selectedMenu = '/' + this.$router.currentRoute.name
  }

  away() {
    this.isPopupMenuClicked = false
  }

  collapseItem(index: number, item: any) {
    if (item.children != null) {
      this.openedItems[index] = !this.openedItems[index]
      this.$forceUpdate()
      this.selectedMenu = item.path
    } else {
      this.hideMenu(item)
    }
  }

  hideMenu(item: any) {
    this.isPopupMenuClicked = false
    this.selectedMenu = item.path
  }

  showMenu() {
    this.isPopupMenuClicked = !this.isPopupMenuClicked
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  @include col--center;
  padding-top: 20px;
}

.header__logo {
  width: 280px;
}

.header__label {
  @include typography(xl, narrow, bold);
  text-align: center;
  color: $colorNavy;
  margin-bottom: 30px;
}

.header__links {
  @include row;
  justify-content: center;

  @media (max-width: 640px) {
    display: none;
  }
}

.header__link {
  margin: 0 10px;
  color: $colorDarkGrey;
  @include typography(xl, narrow, bold);
  text-decoration: none;

  &:hover,
  &:active {
    opacity: 0.8;
  }
}

.header__link--active {
  color: $colorGreen;
}

.main__content {
  width: 100%;
  flex: 1;
  overflow: hidden;
}

a {
  color: white;
  text-decoration: none;
}

ul li {
  list-style-type: none;
}

.header__popup-menu {
  position: absolute;
  top: 35px;
  left: 35px;
  display: none;
  @media (max-width: 640px) {
    display: block;
  }
}

.sidebar {
  background: $colorNavy;
  top: 62px;
  left: 35px;
  width: 240px;
  position: absolute;
  z-index: 9999;
  color: #ffffff;
  display: grid;
  grid-template-columns: 45px 155px 30px 45px;
  grid-template-areas: '. items . ';

  @media (min-width: 640px) {
    display: none;
  }
}

.sidebar__menu {
  padding-top: 20px;
  padding-bottom: 20px;
  grid-area: items;
  margin-left: -70px;
  display: flex;
  flex-direction: column;
}

.sidebar__menu__item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 10px;
}

.sidebar__menu__item--icon {
  width: 25px;
  height: 10px;
  padding-top: 5px;
  padding-right: 15px;
  grid-area: item-icon;
  float: left;
  margin-left: 2px;
  margin-top: 4px;
  background-color: white; /* defines the background color of the image */
  mask: url(/images/svgs/arrow-down.svg) no-repeat center / contain;
  -webkit-mask: url(/images/svgs/arrow-down.svg) no-repeat center / contain;
}

.sidebar__menu__item--icon-active {
  background-color: $colorGreen;
}

.sidebar__menu__item--name {
  grid-area: item-name;
  position: static;
  float: left;
  @include typography(lg, narrow);
}

.sidebar__menu__child {
  padding-top: 36px;
  padding-left: 0;
  font-size: 12px;
}

.sidebar__menu__child--item {
  padding-bottom: 15px;
  white-space: nowrap;
  text-align: left;
  @include typography(md-1, narrow);
}

.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 1, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
