<template>
  <div>
    <div class="use-case">
      <label class="use-case__caption">Browse by Use Case</label>
      <img src="/images/faq/chevron-opened.svg" v-on:click="showMenu" />
    </div>
    <div v-if="isPopupMenuClicked" v-on-click="away" class="sidebar">
      <ul class="sidebar__menu">
        <li v-for="(item, index) in menus" :key="index" class="sidebar__menu__item" @click="collapseItem(index, item)">
          <router-link :to="{ path: '/search', query: { functionalities: item.filter.functionalities.join(',') } }">
            <span>{{ item.name }}</span>
            <div
              v-if="item.filter && item.filter.functionalities.length"
              class="sidebar__menu__item-icon"
              :class="{ 'sidebar__menu__item-icon--active': item.name === selectedMenu }"
            />
            <transition name="slide-fade">
              <ul v-if="openedItems[index]" class="sidebar__menu__child">
                <li
                  v-for="(child, childIndex) in item.filter.functionalities"
                  :key="childIndex"
                  class="sidebar__menu__child--item"
                  @click="hideMenu(child)"
                >
                  <router-link
                    :to="{ path: '/search', query: { functionalities: child } }"
                    class="header__link"
                    active-class="header__link--active"
                    @click.stop
                  >
                    {{ child.text }}
                  </router-link>
                </li>
              </ul>
            </transition>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mixin as ClickAway } from 'vue-clickaway'
import { ComponentOptions } from 'vue'
import { api } from '~/utils'

@Component({ name: 'use-cases', mixins: [ClickAway as ComponentOptions<Vue>] })
export default class UseCases extends Vue {
  open: boolean = false
  openedItems: Record<number, boolean> = {}
  isPopupMenuClicked: boolean = false
  selectedMenu: string = ''
  menus: any
  async getUseCases() {
    let res
    try {
      res = await api.get(`usecases/`)
    } catch (err) {
      return
    }
    this.menus = res.data.data
  }

  mounted() {
    this.getUseCases()
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

    if (item != null) {
      this.selectedMenu = item
    } else {
      this.hideMenu(item)
    }
  }

  hideMenu(item: any) {
    this.isPopupMenuClicked = false
    this.selectedMenu = item
  }

  showMenu() {
    this.isPopupMenuClicked = !this.isPopupMenuClicked
    console.log(this.menus)
  }
}
</script>

<style lang="scss" scoped>
.use-case {
  display: flex;
  min-width: 210px;
  min-height: 42px;
  padding: 10px 16px;
  border: 1px solid #e6f3d2;
  border-radius: 24px;
  background: #e6f3d2;
  justify-content: center;
  align-items: center;
  img {
    margin-left: 8px;
  }
}

.use-case__caption {
  display: flex;
  flex-direction: row;
  @include typography(xl, none, bold);
  color: #011d58;
  align-items: center;
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
