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
        :to="link.path"
        :exact="link.exact"
        @click.native="collapseItem(index, link)"
      >
        {{ link.text }}
        <div
          v-if="link.children && link.children.length"
          class="header__link--icon"
          :class="{ 'header__link--icon-active': link.path === selectedMenu }"
        ></div>
        <transition v-if="link.children && link.children.length && selectedMenu === link.path" name="slide-fade">
          <ul v-if="openedItems[index]" class="header__links__nested">
            <li v-for="(child, childIndex) in link.children" :key="childIndex" class="header__links__nested--item">
              <router-link :to="child.path" @click.stop>
                {{ child.text }}
              </router-link>
            </li>
          </ul>
        </transition>
      </nuxt-link>
    </div>
    <div class="header__popup-menu" @click="showMenu()">
      <img src="/images/svgs/popup-menu.svg" />
    </div>
    <div v-if="isPopupMenuClicked" v-on-clickaway="away" class="sidebar">
      <ul class="sidebar__menu">
        <li v-for="(item, index) in links" :key="index" class="sidebar__menu__item" @click="collapseItem(index, item)">
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
  selectedMenu: string = 'home'

  get links() {
    return [
      {
        text: 'Home',
        path: '/',
        exact: true
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

.sidebar__menu__item a {
  color: white;
}

.sidebar__menu__item--icon,
.header__link--icon {
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

.sidebar__menu__item--icon-active,
.header__link--icon-active {
  background-color: $colorGreen !important;
}

.header__link--icon {
  margin-top: 8px;
  float: right;
  background-color: $colorDarkGrey;
}

.sidebar__menu__item--name {
  grid-area: item-name;
  position: static;
  float: left;
  @include typography(lg, narrow);
}

.sidebar__menu__child,
.header__links__nested {
  padding-top: 36px;
  padding-left: 0;
  font-size: 12px;
}

.sidebar__menu__child--item,
.header__links__nested--item {
  padding-bottom: 15px;
  white-space: nowrap;
  text-align: left;
  color: white;
  @include typography(md-1, narrow);
}

.header__links__nested--item {
  padding-bottom: 0;
}

.header__links__nested {
  z-index: 9999;
  position: absolute;
  padding-top: 1em;
  background-color: white;
  box-shadow: 0 0 black;
  width: 150px;
}

.header__links__nested--item a {
  display: block;
  border-bottom: 1px solid #d8d8d8;
  width: 100%;
  padding: 12px;
  color: #092c4c;
}

.header__links__nested--item:last-child a {
  border: none;
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
