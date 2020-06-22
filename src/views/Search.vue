<template>
  <div class="search">
    <div class="search__header">
      <img alt="Vue logo" src="@/assets/logo.jpg" class="search__logo">
      <div class="search-box-container">
        <search-box :value="searchQueryParam" @search="onSearch" />
      </div>
    </div>
    <div class="content-container">
      <div class="side-filter">
        <select-filter id="hq" name="hq" label="HQ" v-model="hq" :options="hqs" @change="onFilter"  />
        <select-filter id="functionality" name="functionality" label="Functionality" v-model="functionality" :options="functionalities" @change="onFilter" />
        <select-filter id="subFunctionality" name="subFunctionality" label="Functionality" v-model="subFunctionality" :options="functionalities" @change="onFilter" />
        <select-filter id="installation" name="installation" label="Installation" v-model="installation" :options="installations" @change="onFilter" />
        <select-filter id="jurisdiction" name="jurisdiction" label="Jurisdiction" v-model="jurisdiction" :options="jurisdictions" @change="onFilter" />
        <select-filter id="platformLanguage" name="platformLanguage" label="Platform Language" v-model="platformLanguage" :options="platformLanguages" @change="onFilter" />
        <select-filter id="practiceArea" name="practiceArea" label="Practice Area" v-model="practiceArea" :options="practiceAreas" @change="onFilter" />
        <select-filter id="demographic" name="demographic" label="Target Entity" v-model="demographic" :options="demographics" @change="onFilter" />
      </div>
      <div class="content">
        <vendor-item
          v-for="(vendor, index) of vendors"
          :key="index"
          class="content__vendor-item"
          :data="vendor"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

import SearchBox from '@/components/SearchBox.vue'
import SelectFilter from '@/components/SelectFilter.vue'
import VendorItem from '@/components/VendorItem.vue'
import { Vendor } from '../models'

@Component({
  name: 'search',
  components: { SearchBox, SelectFilter, VendorItem }
})
export default class Search extends Vue {
  @State(state => state.search.demographics) demographics!: any[]
  @State(state => state.search.functionalities) functionalities!: any[]
  @State(state => state.search.hqs) hqs!: any[]
  @State(state => state.search.installations) installations!: any[]
  @State(state => state.search.integrations) integrations!: any[]
  @State(state => state.search.jurisdictions) jurisdictions!: any[]
  @State(state => state.search.platformLanguages) platformLanguages!: any[]
  @State(state => state.search.practiceAreas) practiceAreas!: any[]
  @State(state => state.search.vendors) vendors!: Vendor[]

  get searchQueryParam () {
    return this.$route.query.keyword || ''
  }

  @Watch('searchQueryParam', { immediate: true })
  onKeywordChange () {
    this.submitQuery()
  }

  searchQuery: any = {}

  demographic: number | null = null
  functionality: number | null = null
  subFunctionality: number | null = null
  hq: number | null = null
  installation: number | null = null
  integration: number | null = null
  jurisdiction: number | null = null
  platformLanguage: number | null = null
  practiceArea: number | null = null

  mounted () {
    this.$store.dispatch('search/loadDemographics')
    this.$store.dispatch('search/loadFunctionalities')
    this.$store.dispatch('search/loadHqs')
    this.$store.dispatch('search/loadInstallations')
    this.$store.dispatch('search/loadIntegrations')
    this.$store.dispatch('search/loadJurisdictions')
    this.$store.dispatch('search/loadPlatformLanguages')
    this.$store.dispatch('search/loadPracticeAreas')
  }

  onFilter (params: { id: string; value: any }) {
    const { id, value } = params
    this.searchQuery[id] = value.name
    this.submitQuery()
  }

  onSearch (keyword: string) {
    if (!this.$route.name) { return }
    if (keyword === this.searchQueryParam) { return }
    this.$router.push({
      name: this.$route.name,
      query: { ...this.$route.query, keyword }
    })
  }

  async submitQuery () {
    this.searchQuery.keyword = this.searchQueryParam === '' ? null : this.searchQueryParam
    await this.$store.dispatch('search/runSearch', this.searchQuery)
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
  margin-bottom :20px;
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
  width: 200px;
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
