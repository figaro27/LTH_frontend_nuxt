<template>
  <client-only>
    <v-popover trigger="click" popover-class="popover--usecase">
      <div class="use-case">
        <label class="use-case__caption">Browse by Use Case</label>
        <img src="/images/faq/chevron-opened.svg" />
      </div>

      <template #popover>
        <div class="use-cases__menu">
          <template v-for="(item, index) in usecases">
            <div :key="`parent-${index}`" class="use-cases__menu-item">
              <nuxt-link
                class="use-cases__menu-item__link"
                :to="{ path: '/search', query: { functionalities: item.filter.functionalities.join(',') } }"
              >
                {{ item.name }}
              </nuxt-link>
              <div
                class="use-cases__menu-item__icon"
                :class="{ 'use-cases__menu-item__icon--active': selectedMenuIndex === index }"
                @click="onMenu(index)"
              >
                <img v-if="item.filter && item.filter.functionalities.length" src="/images/faq/chevron-opened.svg" />
              </div>
            </div>

            <div v-if="selectedMenuIndex === index" :key="`child-${index}`" class="use-cases__menu__children">
              <nuxt-link
                v-for="(child, childIndex) of item.filter.functionalities"
                :key="childIndex"
                :to="{ path: '/search', query: { functionalities: child } }"
                class="use-cases__menu__child"
                @click.stop
              >
                {{ child }}
              </nuxt-link>
            </div>
          </template>
        </div>
      </template>
    </v-popover>
  </client-only>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Usecase } from '@/store/types'
import { api } from '@/utils'

@Component({ name: 'use-cases' })
export default class UseCases extends Vue {
  usecases: Array<Usecase> = []

  selectedMenuIndex: number | null = null

  async loadUseCases() {
    let res
    try {
      res = await api.get(`usecases`)
    } catch (err) {
      return
    }
    this.usecases = res.data.data as Array<Usecase>
  }

  async mounted() {
    await this.loadUseCases()
  }

  onMenu(index: number) {
    if (this.selectedMenuIndex === index) {
      this.selectedMenuIndex = null
    } else {
      this.selectedMenuIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.use-case {
  @include row--center;
  min-width: 210px;
  min-height: 42px;
  padding: 10px 16px;
  border: 1px solid #e6f3d2;
  border-radius: 24px;
  background: #e6f3d2;
  cursor: pointer;

  img {
    margin-left: 8px;
  }
}

.use-case__caption {
  display: flex;
  flex-direction: row;
  @include typography(lg, default, bold);
  color: $colorNavy;
  align-items: center;
  cursor: pointer;
}

.use-cases__menu {
  @include col;
  max-height: 50vh;
  overflow-y: auto;
}

.use-cases__menu-item {
  @include row--center;
  padding: 4px 10px;

  &:hover {
    background: rgba(203, 239, 149, 0.2);
  }
}

.use-cases__menu-item__link {
  flex: 1;
  @include typography(md);
  color: $colorNavy;
  text-decoration: none;
  text-align: left;
}

.use-cases__menu-item__icon {
  width: 20px;
  height: 20px;
  @include row--center;
  margin-left: 5px;
  border-radius: 50%;
  background: $colorNeutralsSnow;
  cursor: pointer;

  &:hover {
    background: $colorLightGrey2;
  }

  img {
    width: 10px;
    height: 10px;
  }
}

.use-cases__menu-item__icon--active {
  img {
    transform: rotateX(180deg);
  }
}

.use-cases__menu__children {
  @include col;
}

.use-cases__menu__child {
  @include typography(md);
  text-decoration: none;
  color: $colorDarkGrey;
  padding: 4px 10px 4px 14px;
  white-space: nowrap;
  text-align: left;

  &:hover {
    background: $colorLightGrey2;
  }
}
</style>

<style lang="scss">
.popover--usecase {
  background: white;
  box-shadow: 0 0 black;
  margin: 0;

  .popover-inner {
    background: white;
    width: 240px;
    overflow: hidden;
    padding: 0;
  }

  .popover-arrow {
    display: none;
  }
}
</style>
