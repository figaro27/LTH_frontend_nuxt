<template>
  <div class="search">
    <div class="search__header">
      <img alt="Vue logo" src="../assets/logo.png" class="search__logo">
      <div class="search-box-container">
        <search-box @search="onSearch" />
      </div>
    </div>
    <div class="content-container">
      <div class="side-filter">
        <select-filter id="demographic" name="demographic" v-model="demographic" :options="demographics" @change="onFilter" />
        <select-filter id="functionality" name="functionality" v-model="functionality" :options="functionalities" @change="onFilter" />
        <select-filter id="hq" name="hq" v-model="hq" :options="hqs" @change="onFilter"  />
        <select-filter id="installation" name="installation" v-model="installation" :options="installations" @change="onFilter" />
        <select-filter id="integration" name="integration" v-model="integration" :options="integrations" @change="onFilter" />
        <select-filter id="jurisdiction" name="jurisdiction" v-model="jurisdiction" :options="jurisdictions" @change="onFilter" />
        <select-filter id="platformLanguage" name="platformLanguage" v-model="platformLanguage" :options="platformLanguages" @change="onFilter" />
        <select-filter id="practiceArea" name="practiceArea" v-model="practiceArea" :options="practiceAreas" @change="onFilter" />
      </div>
      <div class="content" v-html="result">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import SearchBox from '@/components/SearchBox.vue'
import SelectFilter from '@/components/SelectFilter.vue'

@Component({
  name: 'search',
  components: { SearchBox, SelectFilter }
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

  searchQuery: any = {}

  demographic: number | null = null
  functionality: number | null = null
  hq: number | null = null
  installation: number | null = null
  integration: number | null = null
  jurisdiction: number | null = null
  platformLanguage: number | null = null
  practiceArea: number | null = null

  result: any = []

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
    this.searchQuery.keyword = keyword === '' ? null : keyword
    this.submitQuery()
  }

  async submitQuery () {
    const result = await this.$store.dispatch('search/runSearch', this.searchQuery)
    this.result = result.map((r: any) => JSON.stringify(r)).join('<br><br>')
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
}

.search__header {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  margin-bottom :20px;
}

.search__logo {
  width: 40px;
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
}
</style>
