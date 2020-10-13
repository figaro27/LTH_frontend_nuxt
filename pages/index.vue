<template>
  <div class="home">
    <div class="home__main-section">
      <img src="/images/svgs/bubbles.svg" class="home__top-bubbles" />
      <img src="/images/svgs/bubbles2.svg" class="home__bottom-bubbles" />

      <div class="home__main__left-side">
        <popular-searchs class="home__popular-searchs" />
        <ad v-if="!isMobile" direction="vertical" type="home" />
      </div>

      <div class="home__main__content">
        <div class="home__main__title">
          <h1>Find Legaltech Tools, Events and more</h1>
          <h3>Search across our global directories</h3>
        </div>
        <div class="home__main__search-box">
          <search-box v-model="keyword" @search="onSearch" />
        </div>
        <saved-searchs class="home__saved-searchs" />
        <ad v-if="isMobile" class="home__horizontal-ad" direction="horizontal" type="home" />
      </div>
      <div class="home__main__popular-searchs">
        <nuxt-link
          v-for="(item, index) of popularSearchs"
          :key="index"
          class="home__main__popular-searchs__item"
          :to="item.to"
        >
          <label>{{ item.label }}</label>
        </nuxt-link>
      </div>
      <div class="home__main__right-side">
        <tool-of-week class="home__tool-of-the-week" />
        <ad v-if="!isMobile" direction="vertical" type="home" />
      </div>
    </div>

    <div class="home__summary-section">
      <img class="home__summary__background-icon" src="/images/svgs/main/summary.svg" />
      <h1 class="home__summary__title">LegaltechHub</h1>
      <h2 class="home__summary">
        is where legal professionals find the right resources, anywhere in the world.
      </h2>
      <div class="home__summary__content">
        <div class="home__summary__links">
          <div v-for="(item, index) of links" :key="index" class="home__summary__link-container">
            <link-item class="home__summary__link" :data="item" />
          </div>
        </div>
        <div class="home__summary__twitter">
          <twitter-feed class="home__twitter-feed" />
        </div>
      </div>
      <div class="home__summary-listing">
        <main-listing-card class="home__summary-listing__card" />
        <img src="/images/svgs/bubbles.svg" class="home__summary-listing__left-bubbles" />
        <img src="/images/svgs/bubbles2.svg" class="home__summary-listing__right-bubbles" />
      </div>
    </div>

    <div class="home__others">
      <nuxt-link class="link-item home__summary__link" to="/graveyards">
        <img class="link-item__icon" :src="others[0].icon" />
        <div class="link-item__title">{{ others[0].title }}</div>
      </nuxt-link>
      <nuxt-link class="link-item home__summary__link" to="/consolidations">
        <img class="link-item__icon" :src="others[1].icon" />
        <div class="link-item__title">{{ others[1].title }}</div>
      </nuxt-link>
    </div>

    <ad v-if="isMobile" class="home__horizontal-ad" direction="horizontal" type="home" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { isMobile } from 'mobile-device-detect'
import { buildMeta, CONSTS } from '@/utils'

@Component({
  name: 'home',
  head() {
    return buildMeta({
      title: 'Legaltech Hub',
      description: 'Legaltech Hub'
    })
  }
})
export default class Home extends Vue {
  keyword = ''
  isMobile = isMobile

  get layout() {
    return 'default'
  }

  get links() {
    return [
      { title: 'Global Directory of Legaltech Tools', icon: '/images/svgs/main/tools.svg', url: '/search' },
      { title: 'Legaltech Jobs', icon: '/images/svgs/main/jobs.svg', url: 'https://legaltechjobs.com' },
      { title: 'Legaltech Events', icon: '/images/svgs/main/events.svg', tooltip: 'Coming soon' },
      { title: 'Recommended Legaltech Resources', icon: '/images/svgs/main/resources.svg', url: '/blogs' },
      {
        title: 'Legal Innovation and Design Resources (LID)',
        icon: '/images/svgs/main/innovation.svg',
        url: 'https://www.innovatinglegal.com'
      },
      {
        title: 'Interested in Studying Legal Technology?',
        icon: '/images/svgs/main/study.svg',
        tooltip: 'Coming soon'
      },
      { title: 'Nominate your Team for an Award', icon: '/images/svgs/main/award.svg', tooltip: 'Coming soon' }
    ]
  }

  get others() {
    return [
      { title: 'Graveyard', icon: '/images/svgs/main/graveyard.svg', url: '/graveyards' },
      { title: 'Consolidations', icon: '/images/svgs/main/consolidation.svg', url: '/consolidations' }
    ]
  }

  onSearch(keyword: string) {
    if (keyword) {
      const polishedKeyword = keyword.toLowerCase().replace(/ /g, '_')
      if (CONSTS.keywordLinkMap[polishedKeyword]) {
        this.$router.push(CONSTS.keywordLinkMap[polishedKeyword])
      } else {
        this.$router.push({ name: 'search', query: { keyword } })
      }
    } else {
      this.$router.push({ name: 'search' })
    }
  }

  get popularSearchs() {
    return [
      { label: 'AI Tools', to: '/search?keyword=AI Tools' },
      { label: 'Contract Automation', to: '/search?keyword=Contract Automation' },
      { label: 'Data Analytics', to: '/search?keyword=Data Analytics' },
      { label: 'eDiscovery', to: '/search?keyword=eDiscovery' },
      { label: 'Practice Management', to: '/search?keyword=Practice Management' }
    ]
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
  display: flex;
  margin-top: 40px;
  position: relative;
  width: 100vw;
  @include row;
  justify-content: center;
  @media (max-width: 640px) {
    flex-direction: column;
  }
}

.home__top-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  @media (max-width: 640px) {
    display: none;
  }
}

.home__bottom-bubbles {
  position: absolute;
  bottom: -20px;
  right: 0;
  @media (max-width: 640px) {
    display: none;
  }
}

.home__main__left-side {
  width: 16%;
  max-width: 210px;
  margin: 20px;
  z-index: 1;
  margin-left: 40px;

  @media (max-width: 640px) {
    display: none;
  }
}

.home__popular-searchs {
  margin-bottom: 10px;
}

.home__main__content {
  flex: 1;
  @include col;
  align-items: center;
  margin-top: 16px;
  z-index: 2;
}

.home__main__right-side {
  width: 270px;
  min-width: 270px;
  margin: 0 20px 20px 20px;
  z-index: 1;
  padding-right: 30px;

  @media (max-width: 640px) {
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    padding-right: 0;
  }
}

.home__tool-of-the-week {
  margin-bottom: 5px;
}

.home__twitter-feed {
  width: 243px;
  min-width: 215px;
  margin: 0 50px 20px 20px;
  z-index: 1;
}

.home__main__title {
  width: 80%;
  text-align: left;
  color: $colorNavy;

  @media (max-width: 640px) {
    display: none;
  }
}

.home__main__search-box {
  margin-top: 40px;
  width: 80%;
}

.home__saved-searchs {
  width: 85%;
  margin-top: 20px;
}

.home__main__popular-searchs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 640px) {
    display: none;
  }
}

.home__main__popular-searchs__item {
  background: #f2f8ee;
  border-radius: 16px;
  min-width: 80px;
  @include typography(lg, narrow, bold);
  margin: 8px;
  padding: 8px 24px;
  color: $colorDarkGrey;
  text-decoration: none;
  cursor: pointer;

  label {
    cursor: pointer;
  }
}

.home__summary-section {
  width: 100vw;
  min-height: 100vh;
  @include col;
  position: relative;
  background: rgba(249, 249, 251, 0.5);
  padding: 46px 0px 40px;

  @media (max-width: 640px) {
    min-height: auto;
  }
}

.home__summary__title {
  font-family: $fontPTSansNarrow;
  font-size: 48px;
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
  font-size: 32px;
  width: 678px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 640px) {
    width: auto;
  }
}

.home__summary__content {
  display: flex;
  justify-content: space-between;
  padding-left: calc(50% - 400px);
}

.home__summary__links {
  align-self: center;
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 1;
}

.home__summary__link-container {
  width: 25%;
  padding: 8px;
}

.home__summary__twitter {
  @media (max-width: 640px) {
    display: none;
  }
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

  @media (max-width: 640px) {
    margin: 20px 0 0;
    padding: 0;
  }
}

.home__summary-listing__card {
  width: 70%;
  height: 100%;
  z-index: 1;

  @media (max-width: 640px) {
    width: 90%;
    padding: 1.1875rem 5rem 0.875rem !important;
  }
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
  z-index: 1;
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

.link-item {
  @include col--center;
  width: 300px;
  height: 300px;
  border-radius: 30px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  margin-right: 10px;
  &:hover {
    background: $colorNeutralsSnow;
  }
  &:active {
    background: $colorLightGrey2;
  }

  @media (max-width: 640px) {
    width: 200px;
    height: 200px;
    border-radius: 15px;
  }
}

.link-item__icon {
  width: 100%;
  object-fit: cover;
}

.link-item__title {
  @include typography(xl-1, narrow, bold);
  height: 48px;
  color: #546e7a;
  text-align: center;
  margin: 16px 8px 16px 8px;
}

.home__horizontal-ad {
  width: 70%;

  @media (max-width: 640px) {
    width: 90%;
  }
}
</style>
