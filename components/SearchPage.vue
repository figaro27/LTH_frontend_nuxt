<template>
  <div class="search-page">
    <div class="search-page__header">
      <div class="search-box-container">
        <search-box :value="filters.keyword" @search="onKeywordSubmit" />
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
          label="Functionality"
          :options="functionalities"
          @change="onFilterUpdate"
        />
        <select-filter
          id="hqs"
          v-model="filters.hqs"
          name="hqs"
          label="HQ"
          :options="offices"
          @change="onFilterUpdate"
        />
        <select-filter
          id="offices"
          v-model="filters.offices"
          name="offices"
          label="Office"
          :options="offices"
          @change="onFilterUpdate"
        />
        <select-filter
          id="practiceAreas"
          v-model="filters.practiceAreas"
          name="practiceArea"
          label="Practice Area"
          :options="practiceAreas"
          @change="onFilterUpdate"
        />
        <select-filter
          id="platformLanguages"
          v-model="filters.platformLanguages"
          name="platformLanguage"
          label="Platform Language"
          :options="platformLanguages"
          @change="onFilterUpdate"
        />
        <select-filter
          id="demographics"
          v-model="filters.demographics"
          name="demographic"
          label="Target Entity"
          :options="demographics"
          @change="onFilterUpdate"
        />
        <select-filter
          id="installations"
          v-model="filters.installations"
          name="installation"
          label="Deployment"
          :options="installations"
          @change="onFilterUpdate"
        />
        <select-filter
          id="integrations"
          v-model="filters.integrations"
          name="integrations"
          label="Integrations"
          :options="integrations"
          @change="onFilterUpdate"
        />
      </div>
      <div v-loading="vendorsLoading !== 2" class="search-page__content">
        <div class="search-page__content-wrapper">
          <h4 v-if="vendorsLoading !== 0" class="search-page__count">
            <span>Search result ({{ total }})</span>
            <nuxt-link v-if="showClearFilter" v-tooltip="{ content: 'Clear Search' }" to="/search">
              <fa :icon="['fas', 'times-circle']" />
            </nuxt-link>
          </h4>
          <div class="search-page__vendors">
            <vendor-item
              v-for="(vendor, index) of vendors"
              :key="index"
              class="search-page__vendor-item"
              :data="vendor"
            />
          </div>
        </div>
        <div v-if="showPagination" class="search-page__vendors-pagination">
          <pagination :page-count="pageCount" @change="onPageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, State, Vue, Watch } from 'nuxt-property-decorator'

import { DEFAULT_VENDORS_LIMIT } from '@/assets/consts'
import { Filters, SearchResultVendor, SavedSearch } from '@/models'
import { RootState, LoadingStatus } from '@/store/types'

@Component({
  name: 'search'
})
export default class Search extends Vue {
  @Prop({ default: null }) savedSearch!: SavedSearch | null

  @State((state: RootState) => state.search.demographics) demographics!: any[]
  @State((state: RootState) => state.search.functionalities) functionalities!: any[]
  @State((state: RootState) => state.search.installations) installations!: any[]
  @State((state: RootState) => state.search.integrations) integrations!: any[]
  @State((state: RootState) => state.search.offices) offices!: any[]
  @State((state: RootState) => state.search.platformLanguages) platformLanguages!: any[]
  @State((state: RootState) => state.search.practiceAreas) practiceAreas!: any[]
  @State((state: RootState) => state.search.vendors) vendors!: SearchResultVendor[]
  @State((state: RootState) => state.search.vendorsLoading) vendorsLoading!: LoadingStatus
  @State((state: RootState) => state.search.totalVendors) total!: number

  get pageCount() {
    return Math.ceil(this.total / DEFAULT_VENDORS_LIMIT)
  }

  get showPagination() {
    return this.pageCount > 1
  }

  filterOptionsLoaded: boolean = false

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

  get searchRouteQuery() {
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

  @Watch('routeQuery', { immediate: true })
  async onRouteChange() {
    if (this.filterOptionsLoaded) {
      this.updateFromRouteQuery()
    }
    await this.submitQuery()
  }

  async mounted() {
    this.filterOptionsLoaded = false
    this.$store.commit('search/SET_VENDORS_PAGE_NUMBER', 1)
    const promises = [
      this.$store.dispatch('search/loadDemographics'),
      this.$store.dispatch('search/loadFunctionalities'),
      this.$store.dispatch('search/loadInstallations'),
      this.$store.dispatch('search/loadIntegrations'),
      this.$store.dispatch('search/loadOffices'),
      this.$store.dispatch('search/loadPlatformLanguages'),
      this.$store.dispatch('search/loadPracticeAreas')
    ]
    try {
      await Promise.all(promises)
    } catch (err) {
      console.error(err)
      this.filterOptionsLoaded = true
      return
    }
    this.updateFromRouteQuery()
    this.filterOptionsLoaded = true
  }

  onFilterUpdate() {
    this.updateRouteQuery()
  }

  onKeywordSubmit(keyword: string) {
    if (keyword === this.filters.keyword) {
      return
    }
    this.filters.keyword = keyword
    this.updateRouteQuery()
  }

  onKeywordCancelClick() {
    this.onKeywordSubmit('')
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
    if (!this.$route.name) {
      return
    }
    this.$store.commit('search/SET_VENDORS_PAGE_NUMBER', 1)
    this.$router.push({
      name: this.$route.name,
      params: this.$route.params,
      query: this.searchRouteQuery
    })
  }

  async onPageChange(pageNum: number) {
    this.$store.commit('search/SET_VENDORS_PAGE_NUMBER', pageNum)
    await this.$store.dispatch('search/runSearch', this.searchQuery)
  }

  async submitQuery() {
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 1000)
    })
    this.$store.commit('search/SET_LAST_ROUTE_QUERY', this.searchRouteQuery)
    await this.$store.dispatch('search/runSearch', this.searchQuery)
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

  @media (max-width: 640px) {
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

  @media (max-width: 640px) {
    width: 40%;
    min-width: 35%;
    margin-right: 0;
  }
}

.search-page__content {
  @include col;
  min-height: 100%;
  flex: 1;
  text-align: left;
  word-break: break-all;
  overflow: visible;
  padding: 10px;

  @media (max-width: 640px) {
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

.search-page__vendor-item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.search-page__vendors-pagination {
  width: 100%;
  @include row--center;
  margin-top: 50px;

  @media (max-width: 640px) {
    width: 300px;
  }
}
</style>
