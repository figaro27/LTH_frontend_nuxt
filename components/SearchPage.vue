<template>
  <div class="search-page">
    <div class="search-page__header">
      <div class="search-page__header__row">
        <router-link class="search-page__logo" to="/">
          <img alt="Vue logo" src="@/assets/logo.jpg" />
        </router-link>
        <h1 v-if="savedSearch" class="search-page__title">{{ savedSearch.name }}</h1>
        <div class="search-box-container">
          <search-box :value="filters.keyword" @search="onKeywordSubmit" />
        </div>
      </div>
    </div>
    <div class="search-page__content-container">
      <div class="search-page__side-filter">
        <select-filter
          id="hqs"
          v-model="filters.hqs"
          name="hqs"
          label="HQ"
          :options="offices"
          @change="onFilterUpdate"
        />
        <select-filter
          id="functionalities"
          v-model="filters.functionalities"
          name="functionality"
          label="Functionality"
          :options="functionalities"
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
          id="platformLanguages"
          v-model="filters.platformLanguages"
          name="platformLanguage"
          label="Platform Language"
          :options="platformLanguages"
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
          label="Installation"
          :options="installations"
          @change="onFilterUpdate"
        />
        <select-filter
          id="integrations"
          v-model="filters.integrations"
          name="integrations"
          label="Integration"
          :options="integrations"
          @change="onFilterUpdate"
        />
      </div>
      <div v-loading="loading" class="search-page__content">
        <h4 v-if="!loading" class="search-page__content__count">
          <span>Search result ({{ total }})</span>
          <nuxt-link v-if="showClearFilter" to="/search">
            <fa :icon="['fas', 'times-circle']" />
          </nuxt-link>
        </h4>
        <div class="search-page__content__vendors">
          <vendor-item
            v-for="(vendor, index) of vendors"
            :key="index"
            class="search-page__content__vendor-item"
            :data="vendor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

import SearchBox from '@/components/SearchBox.vue'
import SelectFilter from '@/components/SelectFilter.vue'
import VendorItem from '@/components/VendorItem.vue'
import { Filters, Vendor, SavedSearch } from '@/models'
import { RootState } from '@/store/types'

@Component({
  name: 'search',
  components: { SearchBox, SelectFilter, VendorItem }
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
  @State((state: RootState) => state.search.vendors) vendors!: Vendor[]
  @State((state: RootState) => state.search.totalVendors) total!: number

  loading: boolean = true

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
      savedSearchId: this.savedSearch && this.savedSearch.id
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
    this.$router.push({
      name: this.$route.name,
      query: this.searchRouteQuery
    })
  }

  async submitQuery() {
    this.loading = true
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 1000)
    })
    this.$store.commit('search/SET_LAST_ROUTE_QUERY', this.searchRouteQuery)
    await this.$store.dispatch('search/runSearch', this.searchQuery)
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-page__header {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.search-page__header__row {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.search-page__header__row--clear {
  min-height: 25px;
  justify-content: flex-end;
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
  flex: 1;
}

.search-page__content-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.search-page__side-filter {
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  & > * {
    margin: 5px 0;
  }
}

.search-page__content {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  text-align: left;
  word-break: break-all;
  overflow: hidden;
  padding: 10px;
  border-left: 1px solid lightgray;
}

.search-page__content__count {
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  span {
    margin-right: 10px;
  }
}

.search-page__content__vendors {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden scroll;
}

.search-page__content__vendor-item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
