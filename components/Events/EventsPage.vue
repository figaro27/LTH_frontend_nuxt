<template>
  <div class="events-page">
    <div class="events-page__header">
      <div class="search-box-container">
        <search-box
          contents="events"
          :autosuggest-items="autosuggestItems"
          :autosuggest-items-loading="autosuggestItemsLoading"
          :value="filters.keyword"
          @autosuggest="onAutoSuggest"
          @calendar="onChangeCalendar"
          @search="onKeywordSubmit"
        />
        <div v-if="filters.keyword" class="search-box__keywords">
          <div class="search-box__keyword">
            <span>{{ filters.keyword }}</span>
            <i class="search-box__keyword__close" @click.stop="onKeywordCancelClick" />
          </div>
        </div>
      </div>
    </div>

    <div class="events-page__content-container">
      <div class="events-page__side-filter">
        <select-filter
          id="organizers"
          v-model="filters.organizers"
          name="organizers"
          label="Organization:"
          :options="organizers"
          @change="onFilterUpdate"
        />
        <select-filter
          id="countries"
          v-model="filters.countries"
          name="countries"
          label="Location:"
          :options="countries"
          @change="onFilterUpdate"
        />
        <select-filter
          id="audiences"
          v-model="filters.audiences"
          name="audiences"
          label="Audience:"
          :options="audiences"
          @change="onFilterUpdate"
        />
        <select-filter
          id="formats"
          v-model="filters.formats"
          name="formats"
          label="Format:"
          :options="formats"
          @change="onFilterUpdate"
        />
        <select-filter
          v-if="!isCalendar"
          id="months"
          v-model="filters.months"
          name="months"
          label="Date:"
          :options="months"
          @change="onFilterUpdate"
        />
        <select-filter
          id="durations"
          v-model="filters.durations"
          name="durations"
          label="Duration:"
          :options="durations"
          @change="onFilterUpdate"
        />
        <select-filter
          id="features"
          v-model="filters.features"
          name="features"
          label="Features:"
          :options="features"
          @change="onFilterUpdate"
        />

        <ad class="events-page__left-ad" direction="vertical" position="left" />
      </div>
      <div v-loading="eventsLoading !== 2" class="events-page__content">
        <div class="events-page__content-wrapper">
          <template v-if="isCalendar">
            <div class="events-page__events">
              <events-calendar :events="events" :date="selectedDate" />
            </div>
          </template>
          <template v-else>
            <h4 class="events-page__count">
              <span>Search result ({{ total }})</span>
              <nuxt-link v-if="showClearFilter" v-tooltip="{ content: 'Clear Search' }" to="/search/events">
                <fa :icon="['fas', 'times-circle']" />
              </nuxt-link>
            </h4>
            <div class="events-page__events">
              <events-item
                v-for="(event, index) of events.slice(0, 10)"
                :key="index"
                class="events-page__event-item"
                :data="event"
              />
              <ad class="events-page__events__ad" direction="horizontal" />
              <events-item
                v-for="(event, index) of events.slice(10)"
                :key="10 + index"
                class="events-page__event-item"
                :data="event"
              />
            </div>
          </template>
        </div>
        <div v-if="showPagination && !isMobile" vclass="events-page__events-pagination">
          <pagination v-if="!isCalendar" :page-count="pageCount" :page="curPageNum" @change="onPageChange" />
        </div>
      </div>
    </div>
    <div v-if="showPagination && isMobile" class="events-page__events-pagination">
      <pagination v-if="!isCalendar" :page-count="pageCount" :page="curPageNum" @change="onPageChange" />
    </div>
  </div>
</template>

<script lang="ts">
import isEqual from 'lodash.isequal'
import { isMobile } from 'mobile-device-detect'
import moment from 'moment'
import { Component, State, Vue, Watch } from 'nuxt-property-decorator'

import { DEFAULT_VENDORS_LIMIT } from '@/assets/consts'
import { EventFilters, SearchResultEvent } from '@/models'
import { RootState, LoadingStatus } from '@/store/types'
import { EventsRouteQuery } from '@/store/events/types'

@Component({ name: 'search-events' })
export default class SearchEvents extends Vue {
  @State((state: RootState) => state.events.autosuggestItems) autosuggestItems!: string[]
  @State((state: RootState) => state.events.autosuggestItemsLoading) autosuggestItemsLoading!: LoadingStatus

  @State((state: RootState) => state.events.organizers) organizers!: any[]
  @State((state: RootState) => state.events.countries) countries!: any[]
  @State((state: RootState) => state.events.audiences) audiences!: any[]
  @State((state: RootState) => state.events.durations) durations!: any[]
  @State((state: RootState) => state.events.features) features!: any[]
  @State((state: RootState) => state.events.formats) formats!: any[]

  @State((state: RootState) => state.events.events) events!: SearchResultEvent[]
  @State((state: RootState) => state.events.eventsLoading) eventsLoading!: LoadingStatus
  @State((state: RootState) => state.events.totalEvents) total!: number
  @State((state: RootState) => state.events.eventsLastFilter) lastSearch!: EventFilters
  @State((state: RootState) => state.events.eventsPage) curPageNum!: EventFilters

  @State((state: RootState) => state.events.routeQuery) lastSearchQuery!: EventsRouteQuery

  get months() {
    return moment.monthsShort().map((month, index) => ({ id: index + 1, name: month }))
  }

  get pageCount() {
    return Math.ceil(this.total / DEFAULT_VENDORS_LIMIT)
  }

  get showPagination() {
    return this.pageCount > 1
  }

  isMobile: boolean = false
  isCalendar = false
  selectedDate = new Date()
  filterOptionsLoaded: boolean = false

  filters: EventFilters = {
    keyword: '',
    date: '',
    organizers: [],
    countries: [],
    audiences: [],
    months: [],
    features: [],
    formats: [],
    durations: []
  }

  get routeQuery() {
    return this.$route.query
  }

  get searchRouteQuery() {
    const { keyword, date, organizers, features, formats, countries, audiences, months, durations } = this.filters
    return {
      keyword: keyword === '' ? undefined : keyword,
      date: date === '' ? undefined : date,
      organizers: organizers.length === 0 ? undefined : organizers.map((item) => item.name).join(','),
      countries: countries.length === 0 ? undefined : countries.map((item) => item.name).join('$'),
      months: date || months.length === 0 ? undefined : months.map((item) => item.name).join(','),
      features: features.length === 0 ? undefined : features.map((item) => item.name).join(','),
      formats: formats.length === 0 ? undefined : formats.map((item) => item.name).join(','),
      audiences: audiences.length === 0 ? undefined : audiences.map((item) => item.name).join(','),
      durations: durations.length === 0 ? undefined : durations.map((item) => item.name).join(',')
    }
  }

  get searchQuery() {
    const { keyword, date, organizers, features, formats, countries, audiences, months, durations } = this.filters
    return {
      keyword: keyword === '' ? undefined : keyword,
      date: date === '' ? undefined : date,
      organizers: organizers.length === 0 ? undefined : organizers.map((item) => item.name),
      countries: countries.length === 0 ? undefined : countries.map((item) => item.name),
      months: months.length === 0 ? undefined : months.map((item) => item.id),
      features: features.length === 0 ? undefined : features.map((item) => item.id),
      formats: formats.length === 0 ? undefined : formats.map((item) => item.id),
      audiences: audiences.length === 0 ? undefined : audiences.map((item) => item.id),
      durations: durations.length === 0 ? undefined : durations.map((item) => item.id)
    }
  }

  get showClearFilter() {
    const { routeQuery } = this
    return Object.keys(routeQuery).filter((key) => !!routeQuery[key]).length > 0
  }

  @Watch('routeQuery', { immediate: true })
  async onRouteChange() {
    if (!this.filterOptionsLoaded) return
    this.updateFromRouteQuery()
    await this.submitQuery()
  }

  async mounted() {
    this.filterOptionsLoaded = false
    this.isMobile = isMobile

    this.$store.commit('events/SET_EVENTS_PAGE_NUMBER', this.curPageNum)

    const promises = [
      this.$store.dispatch('events/loadOrganizers'),
      this.$store.dispatch('events/loadCountries'),
      this.$store.dispatch('events/loadAudiences'),
      this.$store.dispatch('events/loadFeatures'),
      this.$store.dispatch('events/loadFormats'),
      this.$store.dispatch('events/loadDurations')
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

    if (this.filters.date) {
      this.isCalendar = true
      this.selectedDate = new Date(this.filters.date.replace('-', '/'))
    }
  }

  onAutoSuggest(searchText: string) {
    this.$store.dispatch('events/loadAutosuggest', searchText)
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

  onChangeCalendar(date: any) {
    const month = date.monthIndex >= 10 ? `${date.monthIndex}` : `0${date.monthIndex}`
    const strDate = `${date.year}-${month}`
    this.filters.date = strDate
    this.onFilterUpdate()
    this.isCalendar = true
    this.selectedDate = new Date(date.year, date.monthIndex - 1)
  }

  updatedSelectedValueFromRouteParam(id: keyof EventFilters, options: any[] = []) {
    const queryValue = this.$route.query[id] as string
    if (id === 'keyword') {
      this.filters.keyword = queryValue
      return
    } else if (id === 'date') {
      this.filters.date = queryValue
      return
    }

    this.filters[id] = queryValue
      ? queryValue
          .split(id === 'countries' ? '$' : ',')
          .map((item) => options.find((d) => d.name === item))
          .filter((item) => !!item)
      : []
  }

  updateFromRouteQuery() {
    this.updatedSelectedValueFromRouteParam('keyword')
    this.updatedSelectedValueFromRouteParam('date')
    this.updatedSelectedValueFromRouteParam('organizers', this.organizers)
    this.updatedSelectedValueFromRouteParam('countries', this.countries)
    this.updatedSelectedValueFromRouteParam('audiences', this.audiences)
    this.updatedSelectedValueFromRouteParam('months', this.months)
    this.updatedSelectedValueFromRouteParam('durations', this.durations)
    this.updatedSelectedValueFromRouteParam('features', this.features)
    this.updatedSelectedValueFromRouteParam('formats', this.formats)
  }

  updateRouteQuery() {
    if (!this.$route.name) {
      return
    }
    this.$store.commit('events/SET_EVENTS_PAGE_NUMBER', 1)
    this.$router.push({
      name: this.$route.name,
      params: this.$route.params,
      query: this.searchRouteQuery
    })
  }

  async onPageChange(pageNum: number) {
    this.$store.commit('events/SET_EVENTS_PAGE_NUMBER', pageNum)
    await this.$store.dispatch('events/runSearch', this.searchQuery)
    window.scrollTo(0, 0)
  }

  async submitQuery() {
    if (isEqual(this.searchRouteQuery, this.lastSearchQuery)) return

    this.$store.commit('events/SET_LAST_ROUTE_QUERY', this.searchRouteQuery)

    await this.$store.dispatch('events/runSearch', this.searchQuery)
  }
}
</script>

<style lang="scss" scoped>
.events-page {
  @include col;
  // overflow: hidden;
}

.events-page__header {
  width: 100%;
  display: flex;
  flex-direction: column;
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

.events-page__content-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.events-page__side-filter {
  width: 240px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  & > * {
    margin: 5px 0;
  }

  @include respondTo(mobile) {
    width: 25%;
    min-width: 25%;
    margin-right: 0;
  }
}

.events-page__left-ad {
  width: 100%;
}

.events-page__content {
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

.events-page__content-wrapper {
  @include col;
  height: 100%;
  border-left: 1px solid lightgray;
}

.events-page__count {
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

.events-page__events {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.events-page__events__ad {
  width: 100%;
  padding: 0 20px;
}

.events-page__event-item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.events-page__events-pagination {
  width: 100%;
  @include row--center;
  margin-top: 50px;

  @include respondTo(mobile) {
    width: 100%;
  }
}
</style>
