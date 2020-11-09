<template>
  <header class="header">
    <div class="header__logo">
      <logo-label />
    </div>
    <div class="header__links">
      <nuxt-link
        v-for="(link, index) of links"
        :key="index"
        class="header__link"
        active-class="header__link--active"
        :to="link.path"
        :exact="link.exact"
      >
        <span v-if="!link.children || link.children.length === 0">{{ link.text }}</span>
        <header-submenu v-else :link="link" />
      </nuxt-link>
    </div>

    <div class="header__mobile-popup-menu" @click="showMenu">
      <img src="/images/svgs/popup-menu.svg" />
    </div>

    <div v-if="isPopupMenuClicked" v-on-clickaway="away" class="sidebar">
      <ul class="sidebar__menu">
        <li v-for="(item, index) in links" :key="index" class="sidebar__menu__item" @click="collapseItem(index, item)">
          <nuxt-link :to="item.path">
            <span
              class="sidebar__menu__item-name"
              :class="{ 'sidebar__menu__item-name--active': item.path === selectedMenu }"
            >
              {{ item.text }}
            </span>
            <div
              v-if="item.children && item.children.length"
              class="sidebar__menu__item-icon"
              :class="{ 'sidebar__menu__item-icon--active': item.path === selectedMenu }"
            />

            <transition name="slide-fade">
              <ul v-if="openedItems[index]" class="sidebar__menu__child">
                <li
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                  class="sidebar__menu__child--item"
                  @click="hideMenu(child)"
                >
                  <nuxt-link
                    :to="child.path"
                    :exact="child.exact"
                    class="header__link"
                    active-class="header__link--active"
                    @click.stop
                  >
                    {{ child.text }}
                  </nuxt-link>
                </li>
              </ul>
            </transition>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mixin as ClickAway } from 'vue-clickaway'
import { ComponentOptions } from 'vue'

import HeaderSubmenu from './HeaderSubmenu.vue'
import LogoLabel from './LogoLabel.vue'

import { HeaderLink } from './types'

@Component({
  name: 'default-header',
  components: { HeaderSubmenu, LogoLabel },
  mixins: [ClickAway as ComponentOptions<Vue>]
})
export default class DefaultHeader extends Vue {
  openedItems: Record<number, boolean> = {}
  isPopupMenuClicked: boolean = false
  selectedMenu: string = 'home'

  get links(): HeaderLink[] {
    return [
      {
        text: 'Home',
        path: '/',
        exact: true,
        children: [
          {
            text: 'Tools',
            path: '/search',
            exact: true
          },
          {
            text: 'Events',
            path: '/',
            exact: true
          },
          {
            text: 'Awards',
            path: '/',
            exact: true
          },
          {
            text: 'Graveyard',
            path: '/graveyards',
            exact: true
          },
          {
            text: 'Consolidations',
            path: '/consolidations',
            exact: true
          }
        ]
      },
      {
        text: 'About Us',
        path: '/about-us',
        exact: true
      },
      {
        text: 'How LTH works',
        path: '/how-lth-works',
        exact: true
      },
      {
        text: 'Regional Snapshots',
        path: '/regional-snapshots',
        exact: true,
        children: [
          {
            text: 'USA & Canada',
            path: '/regional-snapshots/us-canada',
            exact: true
          },
          {
            text: 'UK & Ireland',
            path: '/regional-snapshots/uk-ireland',
            exact: true
          },
          {
            text: 'Europe',
            path: '/regional-snapshots/europe',
            exact: true
          },
          {
            text: 'LatAm & Carib',
            path: '/regional-snapshots/latam-carib',
            exact: true
          },
          {
            text: 'Asia & Middle East',
            path: '/regional-snapshots/asia-middle-east',
            exact: true
          },
          {
            text: 'Africa',
            path: '/regional-snapshots/africa',
            exact: true
          },
          {
            text: 'Australia & NZ',
            path: '/regional-snapshots/australia-nz',
            exact: true
          }
        ]
      },
      {
        text: 'Legaltech Resources',
        path: '/blogs',
        exact: true
      },
      {
        text: 'Add/Update your Listing',
        path: '/listing',
        exact: true
      },
      {
        text: 'Contact Us',
        path: '/contact-us',
        exact: true
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
    this.openedItems[index] = !this.openedItems[index]
    this.$forceUpdate()

    for (const i in this.openedItems) {
      if (parseInt(i) !== index) {
        this.openedItems[i] = false
      }
    }

    if (item.children != null) {
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
  padding-top: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.header__logo {
  width: 20%;
  margin-left: 100px;

  @include respondTo(lg) {
    width: 50%;
    margin-left: 0;
  }
}

.header__label {
  @include typography(xl, narrow, bold);
  text-align: center;
  color: $colorNavy;
  margin-bottom: 30px;
}
.header__label__small {
  @include typography(lg, narrow, bold);
  text-align: left;
  color: $colorNavy;
  margin-top: 4px;
  margin-left: 35%;
}
.header__links {
  @include row;
  width: 70%;
  margin-right: 10%;
  justify-content: center;

  @include respondTo(lg) {
    display: none;
  }
}

.header__link {
  margin: 0 10px;
  color: $colorDarkGrey;
  text-decoration: none;

  span {
    @include typography(xl, narrow, bold);
  }
}

.header__link--active {
  color: $colorGreen;

  ::v-deep .header__link__chevron {
    background-color: $colorGreen;
  }
}

ul li {
  list-style-type: none;
}

.header__mobile-popup-menu {
  position: absolute;
  top: 35px;
  left: 35px;
  display: none;
  @include respondTo(lg) {
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

.sidebar__menu__item a {
  color: white;
}

.sidebar__menu__item-icon {
  width: 25px;
  height: 10px;
  grid-area: item-icon;
  float: left;
  margin-left: 2px;
  background-color: white; /* defines the background color of the image */
  mask: url(/images/svgs/arrow-down.svg) no-repeat center / contain;
  -webkit-mask: url(/images/svgs/arrow-down.svg) no-repeat center / contain;
}

.sidebar__menu__item-icon {
  padding-top: 5px;
  padding-right: 15px;
  margin-top: 4px;
}

.sidebar__menu__item-icon--active {
  background-color: $colorGreen !important;
}

.sidebar__menu__item-name {
  grid-area: item-name;
  position: static;
  float: left;
  @include typography(lg, narrow);
}

.sidebar__menu__item-name--active {
  color: $colorGreen;
}

.sidebar__menu__child {
  padding-top: 36px;
  padding-left: 0;
  font-size: 12px;
}

.sidebar__menu__child--item {
  @include typography(md-1, narrow);
  padding-bottom: 15px;
  white-space: nowrap;
  text-align: left;
  color: white;
  a {
    text-decoration: none;
  }
}

li a {
  text-decoration: none;
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
