<template>
  <div class="search">
    <div class="search__header">
      <img alt="Vue logo" src="@/assets/logo.jpg" class="search__logo" />
      <div class="search-box-container">
        <search-box :value="filters.keyword" @search="onKeywordSubmit" />
      </div>
    </div>
    <div class="content-container">
      <div class="side-filter">
        <select-filter id="hqs" v-model="filters.hqs" name="hq" label="HQ" :options="hqs" @change="onFilterUpdate" />
        <select-filter
          id="functionalities"
          v-model="filters.functionalities"
          name="functionality"
          label="Functionality"
          :options="functionalities"
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
          id="jurisdictions"
          v-model="filters.jurisdictions"
          name="jurisdiction"
          label="Office"
          :options="jurisdictions"
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
      </div>
      <div class="content">
        <vendor-item v-for="(vendor, index) of vendors" :key="index" class="content__vendor-item" :data="vendor" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { Vendor } from '../models'
import SearchBox from '@/components/SearchBox.vue'
import SelectFilter from '@/components/SelectFilter.vue'
import VendorItem from '@/components/VendorItem.vue'

type Filters = {
  keyword: string
  demographics: any[]
  functionalities: any[]
  hqs: any[]
  installations: any[]
  integrations: any[]
  jurisdictions: any[]
  platformLanguages: any[]
  practiceAreas: any[]
}
@Component({
  name: 'search',
  components: { SearchBox, SelectFilter, VendorItem }
})
export default class Search extends Vue {
  @State((state) => state.search.demographics) demographics!: any[]
  @State((state) => state.search.functionalities) functionalities!: any[]
  @State((state) => state.search.hqs) hqs!: any[]
  @State((state) => state.search.installations) installations!: any[]
  @State((state) => state.search.integrations) integrations!: any[]
  @State((state) => state.search.jurisdictions) jurisdictions!: any[]
  @State((state) => state.search.platformLanguages) platformLanguages!: any[]
  @State((state) => state.search.practiceAreas) practiceAreas!: any[]
  @State((state) => state.search.vendors) vendors!: Vendor[]

  filterOptionsLoaded: boolean = false

  filters: Filters = {
    keyword: '',
    demographics: [],
    functionalities: [],
    hqs: [],
    integrations: [],
    installations: [],
    jurisdictions: [],
    platformLanguages: [],
    practiceAreas: []
  }

  get searchQueryParam() {
    return this.$route.query
  }

  get searchQuery() {
    const {
      keyword,
      demographics,
      functionalities,
      hqs,
      integrations,
      installations,
      jurisdictions,
      platformLanguages,
      practiceAreas
    } = this.filters
    return {
      keyword,
      demographics: demographics.map((item) => item.name).join(','),
      functionalities: functionalities.map((item) => item.name).join(','),
      hqs: hqs.map((item) => item.name).join(','),
      integrations: integrations.map((item) => item.name).join(','),
      installations: installations.map((item) => item.name).join(','),
      jurisdictions: jurisdictions.map((item) => item.name).join(','),
      platformLanguages: platformLanguages.map((item) => item.name).join(','),
      practiceAreas: practiceAreas.map((item) => item.name).join(',')
    }
  }

  @Watch('searchQueryParam', { immediate: true })
  async onRouteChange() {
    await this.submitQuery()
    if (this.filterOptionsLoaded) {
      this.updateFromRouteQuery()
    }
  }

  async mounted() {
    this.filterOptionsLoaded = false
    const promises = [
      this.$store.dispatch('search/loadDemographics'),
      this.$store.dispatch('search/loadFunctionalities'),
      this.$store.dispatch('search/loadHqs'),
      this.$store.dispatch('search/loadInstallations'),
      this.$store.dispatch('search/loadIntegrations'),
      this.$store.dispatch('search/loadJurisdictions'),
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
    this.updatedSelectedValueFromRouteParam('hqs', this.hqs)
    this.updatedSelectedValueFromRouteParam('installations', this.installations)
    this.updatedSelectedValueFromRouteParam('jurisdictions', this.jurisdictions)
    this.updatedSelectedValueFromRouteParam('platformLanguages', this.platformLanguages)
    this.updatedSelectedValueFromRouteParam('practiceAreas', this.practiceAreas)
  }

  updateRouteQuery() {
    if (!this.$route.name) {
      return
    }
    this.$router.push({
      name: this.$route.name,
      query: this.searchQuery
    })
  }

  submitQuery() {
    // await this.$store.dispatch('search/runSearch', this.searchQuery)
    console.log('submitQuery', this.searchQuery)
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding: 20px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search__header {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.search__logo {
  height: 40px;
  object-fit: contain;
  margin-right: 20px;
}

.search-box-container {
  flex: 1;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.side-filter {
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  & > * {
    margin: 5px 0;
  }
}

.content {
  flex: 1;
  text-align: left;
  word-break: break-all;
  overflow: hidden scroll;
  padding: 10px;
  border-left: 1px solid lightgray;
}

.content__vendor-item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
