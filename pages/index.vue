<template>
  <div class="home">
    <div class="home__main-section">
      <img src="/images/svgs/bubbles.svg" class="home__top-bubbles" />
      <img src="/images/svgs/bubbles2.svg" class="home__bottom-bubbles" />

      <div class="home__main__left-side">
        <popular-searchs class="home__popular-searchs" />
        <tool-of-week class="home__tool-of-the-week" />
      </div>

      <div class="home__main__content">
        <div class="home__main__search-box">
          <search-box v-model="keyword" @search="onSearch" />
        </div>
        <saved-searchs class="home__saved-searchs" />
      </div>

      <div class="home__main__right-side">
        <twitter-feed class="home__twitter-feed" />
      </div>
    </div>

    <div class="home__summary-section">
      <img class="home__summary__background-icon" src="/images/svgs/main/summary.svg" />
      <h1 class="home__summary__title">LegaltechHub</h1>
      <h2 class="home__summary">
        is where legal professionals find the right legaltech tools, events and more, anywhere in the world.
      </h2>
      <div class="home__summary__links">
        <link-item v-for="(item, index) of links" :key="index" class="home__summary__link" :data="item" />
      </div>
      <div class="home__summary-listing">
        <main-listing-card class="home__summary-listing__card" />
        <img src="/images/svgs/bubbles.svg" class="home__summary-listing__left-bubbles" />
        <img src="/images/svgs/bubbles2.svg" class="home__summary-listing__right-bubbles" />
      </div>
    </div>

    <div class="home__others">
      <nuxt-link class="home__graveyard" to="/graveyards">
        <img src="/images/main/graveyard.png" />
      </nuxt-link>
      <nuxt-link class="home__consolidations" to="/consolidations">
        <label class="home__consolidations-title">Consolidations</label>
        <img src="/images/main/consolidations.png" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'home' })
export default class Home extends Vue {
  keyword = ''

  get layout() {
    return 'default'
  }

  get links() {
    return [
      { title: 'Legaltech Events', icon: '/images/svgs/main/events.svg', url: '/' },
      { title: 'Legaltech Jobs', icon: '/images/svgs/main/jobs.svg', url: 'https://legaltechjobs.com' },
      { title: 'Recommended Legaltech Resources', icon: '/images/svgs/main/resources.svg', url: '/blogs' },
      {
        title: 'Legal Innovation and Design Resources (LID)',
        icon: '/images/svgs/main/innovation.svg',
        tooltip: 'Coming soon'
      },
      { title: 'Nominate your Team for an Award', icon: '/images/svgs/main/award.svg', tooltip: 'Coming soon' },
      { title: 'Interested in Studying Legal Technology?', icon: '/images/svgs/main/study.svg', tooltip: 'Coming soon' }
    ]
  }

  onSearch(keyword: string) {
    if (keyword) {
      this.$router.push({ name: 'search', query: { keyword } })
    } else {
      this.$router.push({ name: 'search' })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  @include col;
  align-items: center;
  flex: 1;
  width: 100%;
  overflow: visible;
}

.home__main-section {
  margin-top: 40px;
  position: relative;
  width: 100vw;
  @include row;
  justify-content: center;
}

.home__top-bubbles {
  position: absolute;
  top: 0;
  left: 0;
}

.home__bottom-bubbles {
  position: absolute;
  bottom: -20px;
  right: 0;
}

.home__main__left-side {
  width: $widgetWidth;
  margin: 20px;
  z-index: 1;
  margin-left: 50px;
}

.home__main__content {
  flex: 1;
  @include col;
  align-items: center;
  margin-top: 120px;
  z-index: 1;
}

.home__main__right-side {
  width: $widgetWidth;
  margin: 20px;
  z-index: 1;
  margin-right: 30px;
}

.home__main__search-box {
  width: 65%;
}

.home__saved-searchs {
  width: 50%;
  margin-top: 20px;
}

.home__summary-section {
  width: 100vw;
  min-height: 100vh;
  @include col;
  position: relative;
  background: rgba(249, 249, 251, 0.5);
  padding: 46px 95px 40px;
}

.home__summary__title {
  font-family: $fontPTSansNarrow;
  font-size: 64px;
  font-weight: bold;
  line-height: 83px;
  color: $colorNavy;
  margin-bottom: 20px;
  text-align: center;
  z-index: 1;
}

.home__summary {
  @include typography(xxl-3, narrow);
  color: $colorNavy;
  margin-bottom: 30px;
  text-align: center;
  z-index: 1;
  font-size: 38px;
  width: 775px;
  margin-left: auto;
  margin-right: auto;
}

.home__summary__links {
  align-self: center;
  width: 680px;
  display: grid;
  grid-template-columns: auto auto auto;
  z-index: 1;
}

.home__summary__link {
  margin: 20px;
}

.home__summary__background-icon {
  position: absolute;
  top: -50px;
  right: 0;
}

.home__summary-listing {
  margin: 100px 27px 0;
  position: relative;
  padding: 0 40px;
  @include row--center;
}

.home__summary-listing__card {
  width: 70%;
  height: 100%;
  z-index: 1;
}

.home__summary-listing__left-bubbles {
  position: absolute;
  left: 0;
  bottom: 0;
}

.home__summary-listing__right-bubbles {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

.home__others {
  @include row--center;
  margin: 80px 0;
}

.home__graveyard,
.home__consolidations {
  width: 450px;
  position: relative;
  @include row--center;
  text-decoration: none;
  cursor: pointer;

  img {
    width: 100%;
    height: 300px;
    object-fit: fill;
  }
}

.home__graveyard {
  margin-right: 70px;
}

.home__consolidations-title {
  position: absolute;
  top: 0;
  font-family: $fontRochester;
  font-size: 50px;
  color: #694c3f;
}
</style>
