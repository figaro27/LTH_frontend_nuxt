<template>
  <div class="search-page">
    <div class="search-page__header">
      <div class="search-box-container">
        <search-box contents="tools" :value="filters.keyword" @search="onKeywordSubmit" />
        <div v-if="filters.keyword" class="search-box__keywords">
          <div class="search-box__keyword">
            <span>{{ filters.keyword }}</span>
            <i class="search-box__keyword__close" @click.stop="onKeywordCancelClick" />
          </div>
        </div>
      </div>
    </div>

    <div class="search-page__content-container">
      <div class="search-page__side-filter">
        <select-filter
          id="functionalities"
          v-model="filters.functionalities"
          name="functionality"
          label="Functionality:"
          :options="functionalities"
          @change="onFilterUpdate"
        />
        <select-filter
          id="hqs"
          v-model="filters.hqs"
          name="hqs"
          label="HQ:"
          :options="offices"
          @change="onFilterUpdate"
        />
        <select-filter
          id="offices"
          v-model="filters.offices"
          name="offices"
          label="Office:"
          :options="offices"
          @change="onFilterUpdate"
        />
        <select-filter
          id="practiceAreas"
          v-model="filters.practiceAreas"
          name="practiceArea"
          label="Practice Area:"
          :options="practiceAreas"
          @change="onFilterUpdate"
        />
        <select-filter
          id="platformLanguages"
          v-model="filters.platformLanguages"
          name="platformLanguage"
          label="Platform Language:"
          :options="platformLanguages"
          @change="onFilterUpdate"
        />
        <select-filter
          id="demographics"
          v-model="filters.demographics"
          name="demographic"
          label="Target Entity:"
          :options="demographics"
          @change="onFilterUpdate"
        />
        <select-filter
          id="installations"
          v-model="filters.installations"
          name="installation"
          label="Deployment:"
          :options="installations"
          @change="onFilterUpdate"
        />
        <select-filter
          id="integrations"
          v-model="filters.integrations"
          name="integrations"
          label="Integrations:"
          :options="integrations"
          @change="onFilterUpdate"
        />

        <ad class="search-page__left-ad" direction="vertical" position="left" />
      </div>
      <div v-loading="vendorsLoading !== 2" class="search-page__content">
        <div class="search-page__content-wrapper">
          <h4 v-if="vendorsLoading !== 0" class="search-page__count">
            <span>Search result ({{ total }})</span>
            <nuxt-link v-if="showClearFilter" v-tooltip="{ content: 'Clear Search' }" :to="clearFilterPath">
              <fa :icon="['fas', 'times-circle']" />
            </nuxt-link>
          </h4>
          <div class="search-page__vendors">
            <vendor-item
              v-for="(vendor, index) of vendors.slice(0, 10)"
              :key="index"
              class="search-page__vendor-item"
              :data="vendor"
            />

            <ad class="search-page__vendors__ad" direction="horizontal" />

            <vendor-item
              v-for="(vendor, index) of vendors.slice(10)"
              :key="10 + index"
              class="search-page__vendor-item"
              :data="vendor"
            />
          </div>
        </div>
        <div v-if="showPagination && !isMobile" class="search-page__vendors-pagination">
          <pagination :page-count="pageCount" :page="curPageNum" @change="onPageChange" />
        </div>
      </div>
    </div>
    <div v-if="showPagination && isMobile" class="search-page__vendors-pagination">
      <pagination :page-count="pageCount" :page="curPageNum" @change="onPageChange" />
    </div>
  </div>
</template>

<script lang="ts">
/* global gtag */
import isEqual from 'lodash.isequal'
import { Component, Prop, State, Vue, Watch } from 'nuxt-property-decorator'
import { isMobile } from 'mobile-device-detect'

import { DEFAULT_VENDORS_LIMIT } from '@/assets/consts'
import { Filters, SearchResultVendor, SavedSearch } from '@/models'
import { VendorsRouteQuery } from '@/store/vendors/types'
import { RootState, LoadingStatus } from '@/store/types'

@Component({ name: 'vendors-page' })
export default class VendorsPage extends Vue {
  @Prop({ default: null }) savedSearch!: SavedSearch | null

  @State((state: RootState) => state.vendors.demographics) demographics!: any[]
  @State((state: RootState) => state.vendors.functionalities) functionalities!: any[]
  @State((state: RootState) => state.vendors.installations) installations!: any[]
  @State((state: RootState) => state.vendors.integrations) integrations!: any[]
  @State((state: RootState) => state.vendors.offices) offices!: any[]
  @State((state: RootState) => state.vendors.platformLanguages) platformLanguages!: any[]
  @State((state: RootState) => state.vendors.practiceAreas) practiceAreas!: any[]
  @State((state: RootState) => state.vendors.vendors) vendors!: SearchResultVendor[]
  @State((state: RootState) => state.vendors.vendorsLoading) vendorsLoading!: LoadingStatus
  @State((state: RootState) => state.vendors.totalVendors) total!: number
  @State((state: RootState) => state.vendors.vendorsLastFilter) lastSearch!: Filters
  @State((state: RootState) => state.vendors.vendorsPage) curPageNum!: Filters

  @State((state: RootState) => state.vendors.routeQuery) lastSearchQuery!: VendorsRouteQuery

  get pageCount() {
    return Math.ceil(this.total / DEFAULT_VENDORS_LIMIT)
  }

  get showPagination() {
    return this.pageCount > 1
  }

  isMobile: boolean = false
  filterOptionsLoaded: boolean = false
  lastSavedSearchId: number | null = null

  filters: Filters = {
    keyword: '',
    demographics: [],
    functionalities: [],
    hqs: [],
    integrations: [],
    installations: [],
    offices: [],
    platformLanguages: [],
    practiceAreas: []
  }

  get routeQuery() {
    return this.$route.query
  }

  get searchRouteQuery(): VendorsRouteQuery {
    const {
      keyword,
      demographics,
      functionalities,
      hqs,
      installations,
      integrations,
      offices,
      platformLanguages,
      practiceAreas
    } = this.filters
    return {
      keyword: keyword === '' ? undefined : keyword,
      demographics: demographics.length === 0 ? undefined : demographics.map((item) => item.name).join(','),
      functionalities: functionalities.length === 0 ? undefined : functionalities.map((item) => item.name).join(','),
      hqs: hqs.length === 0 ? undefined : hqs.map((item) => item.name).join(','),
      integrations: integrations.length === 0 ? undefined : integrations.map((item) => item.name).join(','),
      installations: installations.length === 0 ? undefined : installations.map((item) => item.name).join(','),
      offices: offices.length === 0 ? undefined : offices.map((item) => item.name).join(','),
      platformLanguages:
        platformLanguages.length === 0 ? undefined : platformLanguages.map((item) => item.name).join(','),
      practiceAreas: practiceAreas.length === 0 ? undefined : practiceAreas.map((item) => item.name).join(',')
    }
  }

  get searchQuery() {
    const {
      keyword,
      demographics,
      functionalities,
      hqs,
      integrations,
      installations,
      offices,
      platformLanguages,
      practiceAreas
    } = this.filters
    return {
      keyword: keyword === '' ? undefined : keyword,
      demographics: demographics.length === 0 ? undefined : demographics.map((item) => item.id),
      functionalities: functionalities.length === 0 ? undefined : functionalities.map((item) => item.id),
      hqs: hqs.length === 0 ? undefined : hqs.map((item) => item.id),
      integrations: integrations.length === 0 ? undefined : integrations.map((item) => item.id),
      installations: installations.length === 0 ? undefined : installations.map((item) => item.id),
      offices: offices.length === 0 ? undefined : offices.map((item) => item.id),
      platformLanguages: platformLanguages.length === 0 ? undefined : platformLanguages.map((item) => item.id),
      practiceAreas: practiceAreas.length === 0 ? undefined : practiceAreas.map((item) => item.id),
      savedSearchId: this.savedSearch && this.savedSearch.id ? this.savedSearch.id : undefined
    }
  }

  get showClearFilter() {
    const { routeQuery } = this
    return Object.keys(routeQuery).filter((key) => !!routeQuery[key]).length > 0
  }

  get clearFilterPath() {
    const { savedSearch } = this
    return savedSearch ? `/regional-snapshots/${savedSearch.slug}` : `/search/tools`
  }

  @Watch('routeQuery', { immediate: true })
  async onRouteChange() {
    if (!this.filterOptionsLoaded) return
    this.updateFromRouteQuery()
    await this.submitQuery()
  }

  @Watch('savedSearch')
  async onSavedSearchChange() {
    if (!this.filterOptionsLoaded) return
    this.updateFromRouteQuery()
    await this.submitQuery()
  }

  @Watch('filterOptionsLoaded')
  async onFilterOptionsLoaded() {
    if (!this.filterOptionsLoaded) return
    this.updateFromRouteQuery()
    await this.submitQuery()
  }

  async mounted() {
    this.filterOptionsLoaded = false
    this.isMobile = isMobile

    this.$store.commit('vendors/SET_VENDORS_PAGE_NUMBER', this.curPageNum)

    const promises = [
      this.$store.dispatch('vendors/loadDemographics'),
      this.$store.dispatch('vendors/loadFunctionalities'),
      this.$store.dispatch('vendors/loadInstallations'),
      this.$store.dispatch('vendors/loadIntegrations'),
      this.$store.dispatch('vendors/loadOffices'),
      this.$store.dispatch('vendors/loadPlatformLanguages'),
      this.$store.dispatch('vendors/loadPracticeAreas')
    ]
    try {
      await Promise.all(promises)
    } catch (err) {
      this.filterOptionsLoaded = true
      return
    }
    this.updateFromRouteQuery()
    this.filterOptionsLoaded = true
    await this.submitQuery()
  }

  onFilterUpdate() {
    this.updateRouteQuery()
  }

  onKeywordSubmit(params: { keyword: string }) {
    const { keyword } = params
    if (keyword === this.filters.keyword) return

    this.filters.keyword = keyword
    this.updateRouteQuery()
  }

  onKeywordCancelClick() {
    this.onKeywordSubmit({ keyword: '' })
  }

  updatedSelectedValueFromRouteParam(id: keyof Filters, options: any[] = []) {
    const queryValue = this.$route.query[id] as string
    if (id === 'keyword') {
      this.filters.keyword = queryValue
      return
    }
    this.filters[id] = queryValue
      ? queryValue
          .split(',')
          .map((item) => options.find((d) => d.name === item))
          .filter((item) => !!item)
      : []
  }

  updateFromRouteQuery() {
    this.updatedSelectedValueFromRouteParam('keyword')
    this.updatedSelectedValueFromRouteParam('demographics', this.demographics)
    this.updatedSelectedValueFromRouteParam('functionalities', this.functionalities)
    this.updatedSelectedValueFromRouteParam('hqs', this.offices)
    this.updatedSelectedValueFromRouteParam('installations', this.installations)
    this.updatedSelectedValueFromRouteParam('integrations', this.integrations)
    this.updatedSelectedValueFromRouteParam('offices', this.offices)
    this.updatedSelectedValueFromRouteParam('platformLanguages', this.platformLanguages)
    this.updatedSelectedValueFromRouteParam('practiceAreas', this.practiceAreas)
  }

  updateRouteQuery() {
    const { name } = this.$route
    if (!name) return

    this.$store.commit('vendors/SET_VENDORS_PAGE_NUMBER', 1)
    this.$router.push({
      name: name === 'regional-snapshots-slug' ? name : 'search-tools',
      params: this.$route.params,
      query: this.searchRouteQuery
    })
  }

  async onPageChange(pageNum: number) {
    this.$store.commit('vendors/SET_VENDORS_PAGE_NUMBER', pageNum)
    await this.$store.dispatch('vendors/runSearch', this.searchQuery)
    window.scrollTo(0, 0)
  }

  submitAnalyticsData() {
    if (process.env.environment !== 'production') return

    const {
      keyword,
      demographics,
      functionalities,
      hqs,
      integrations,
      installations,
      offices,
      platformLanguages,
      practiceAreas
    } = this.filters

    if (keyword) {
      gtag('event', 'search', { event_category: 'keyword', event_label: this.searchQuery.keyword })
    }

    if (functionalities.length > 0) {
      functionalities.forEach((item) => {
        gtag('event', 'search', { event_category: 'functionality', event_label: item.name })
      })
    }

    if (demographics.length > 0) {
      demographics.forEach((item) => {
        gtag('event', 'search', { event_category: 'demographic', event_label: item.name })
      })
    }

    if (hqs.length > 0) {
      hqs.forEach((item) => {
        gtag('event', 'search', { event_category: 'hq', event_label: item.name })
      })
    }

    if (integrations.length > 0) {
      integrations.forEach((item) => {
        gtag('event', 'search', { event_category: 'integration', event_label: item.name })
      })
    }

    if (installations.length > 0) {
      installations.forEach((item) => {
        gtag('event', 'search', { event_category: 'installation', event_label: item.name })
      })
    }

    if (offices.length > 0) {
      offices.forEach((item) => {
        gtag('event', 'search', { event_category: 'office', event_label: item.name })
      })
    }

    if (platformLanguages.length > 0) {
      platformLanguages.forEach((item) => {
        gtag('event', 'search', { event_category: 'platformLanguage', event_label: item.name })
      })
    }

    if (practiceAreas.length > 0) {
      practiceAreas.forEach((item) => {
        gtag('event', 'search', { event_category: 'practiceArea', event_label: item.name })
      })
    }
  }

  async submitQuery() {
    const { searchRouteQuery, lastSearchQuery, lastSavedSearchId, searchQuery, savedSearch } = this
    if (
      isEqual(searchRouteQuery, lastSearchQuery) &&
      ((!savedSearch && !lastSavedSearchId) || (savedSearch && lastSavedSearchId === savedSearch.id))
    ) {
      return
    }

    this.$store.commit('vendors/SET_LAST_ROUTE_QUERY', searchRouteQuery)
    this.lastSavedSearchId = savedSearch ? savedSearch.id : null

    this.submitAnalyticsData()
    await this.$store.dispatch('vendors/runSearch', searchQuery)
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  @include col;
  overflow: hidden;
}

.search-page__header {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.search-page__logo {
  height: 40px;
  margin-right: 20px;
  cursor: pointer;

  img {
    height: 100%;
    object-fit: contain;
  }
}

.search-page__title {
  font-family: $fontPTSans;
  font-size: 24px;
  margin-right: 15px;
}

.search-box-container {
  width: calc(100% - 200px);
  margin: 30px 170px 40px 30px;

  @include respondTo(mobile) {
    margin: 30px 0;
    width: 100%;
  }
}

.search-box__keywords {
  width: 100%;
  margin-top: 20px;
  @include row;
}

.search-box__keyword {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: $colorDarkGrey;
  line-height: 1;
  background: $colorLightGreen;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;

  span {
    @include typography(md-1, default, 700);
    line-height: 14px;
    color: $colorDarkGrey;
    cursor: pointer;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}

.search-box__keyword__close {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: normal;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;

  &::after {
    content: '\D7';
    color: #266d4d;
    font-size: 14px;
    line-height: 14px;
  }

  &:hover {
    background: $colorLightGreen;

    &::after {
      color: white;
    }
  }
}

.search-page__content-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.search-page__side-filter {
  width: 240px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  & > * {
    margin: 5px 0;
  }

  @include respondTo(mobile) {
    width: 40%;
    min-width: 35%;
    margin-right: 0;
  }
}

.search-page__left-ad {
  width: 100%;
}

.search-page__content {
  @include col;
  min-height: 100%;
  flex: 1;
  text-align: left;
  word-break: break-all;
  overflow: visible;
  padding: 10px;

  @include respondTo(mobile) {
    width: 50%;
  }
}

.search-page__content-wrapper {
  @include col;
  height: 100%;
  border-left: 1px solid lightgray;
}

.search-page__count {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 20px;
  color: $colorNavy;

  span {
    margin-right: 10px;
  }

  a {
    color: $colorGreen;
  }
}

.search-page__vendors {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-page__vendors__ad {
  width: 100%;
  padding: 0 20px;
}

.search-page__vendor-item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.search-page__vendors-pagination {
  width: 100%;
  @include row--center;
  margin-top: 50px;

  @include respondTo(mobile) {
    width: 100%;
  }
}
</style>
