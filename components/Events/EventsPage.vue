<template>
  <div class="events-page">
    <div class="events-page__header">
      <div class="search-box-container">
        <search-box :value="filters.keyword" :contents="'events'" :change-calendar="onChangeCalendar" />
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
          id="organizations"
          v-model="filters.organizations"
          name="organizations"
          label="Organizations:"
          :options="organizations"
          @change="onFilterUpdate"
        />
        <!-- <select-filter
          id="names"
          v-model="filters.names"
          name="names"
          label="Names:"
          :options="names"
          @change="onFilterUpdate"
        /> -->
        <select-filter
          id="locations"
          v-model="filters.locations"
          name="locations"
          label="Locations:"
          :options="locations"
          @change="onFilterUpdate"
        />
        <select-filter
          id="audiences"
          v-model="filters.audiences"
          name="audiences"
          label="Audiences:"
          :options="audiences"
          @change="onFilterUpdate"
        />
        <select-filter
          id="dates"
          v-model="filters.dates"
          name="dates"
          label="Format:"
          :options="dates"
          @change="onFilterUpdate"
        />
        <select-filter
          id="durations"
          v-model="filters.durations"
          name="durations"
          label="Durations:"
          :options="durations"
          @change="onFilterUpdate"
        />
        <select-filter
          id="recurrences"
          v-model="filters.recurrences"
          name="recurrences"
          label="Reccurrences:"
          :options="recurrences"
          @change="onFilterUpdate"
        />

        <ad class="events-page__left-ad" direction="vertical" position="left" />
      </div>
      <div v-loading="eventsLoading !== 2" class="events-page__content">
        <div class="events-page__content-wrapper">
          <h4 v-if="true" class="events-page__count">
            <span>Search result ({{ total }})</span>
            <nuxt-link v-if="showClearFilter" v-tooltip="{ content: 'Clear Search' }" to="/search">
              <fa :icon="['fas', 'times-circle']" />
            </nuxt-link>
          </h4>
          <div class="events-page__events">
            <div v-if="!isCalendar">
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
            <events-calendar v-if="isCalendar" :events="events" :date="selectedDate" />
          </div>
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
import { Component, State, Vue, Watch } from 'nuxt-property-decorator'

import { DEFAULT_VENDORS_LIMIT } from '@/assets/consts'
import { EventFilters, SearchResultEvent } from '@/models'
import { RootState, LoadingStatus } from '@/store/types'
import { EventsRouteQuery } from '@/store/events/types'

@Component({ name: 'search-events' })
export default class SearchEvents extends Vue {
  @State((state: RootState) => state.events.organizations) organizations!: any[]
  @State((state: RootState) => state.events.names) names!: any[]
  @State((state: RootState) => state.events.locations) locations!: any[]
  @State((state: RootState) => state.events.audiences) audiences!: any[]
  @State((state: RootState) => state.events.dates) dates!: any[]
  @State((state: RootState) => state.events.durations) durations!: any[]
  @State((state: RootState) => state.events.recurrences) recurrences!: any[]
  @State((state: RootState) => state.events.events) events!: SearchResultEvent[]
  @State((state: RootState) => state.events.eventsLoading) eventsLoading!: LoadingStatus
  @State((state: RootState) => state.events.totalEvents) total!: number
  @State((state: RootState) => state.events.eventsLastFilter) lastSearch!: EventFilters
  @State((state: RootState) => state.events.eventsPage) curPageNum!: EventFilters

  @State((state: RootState) => state.events.routeQuery) lastSearchQuery!: EventsRouteQuery

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
    organizations: [],
    names: [],
    locations: [],
    audiences: [],
    dates: [],
    durations: [],
    recurrences: []
  }

  get routeQuery() {
    return this.$route.query
  }

  get searchRouteQuery() {
    const { keyword, organizations, names, locations, audiences, dates, durations, recurrences } = this.filters
    return {
      keyword: keyword === '' ? undefined : keyword,
      organizations: organizations.length === 0 ? undefined : organizations.map((item) => item.name).join(','),
      names: names.length === 0 ? undefined : names.map((item) => item.name).join(','),
      locations: locations.length === 0 ? undefined : locations.map((item) => item.name).join(','),
      audiences: audiences.length === 0 ? undefined : audiences.map((item) => item.name).join(','),
      dates: dates.length === 0 ? undefined : dates.map((item) => item.name).join(','),
      durations: durations.length === 0 ? undefined : durations.map((item) => item.name).join(','),
      recurrences: recurrences.length === 0 ? undefined : recurrences.map((item) => item.name).join(',')
    }
  }

  get searchQuery() {
    const { keyword, organizations, names, locations, audiences, dates, durations, recurrences } = this.filters
    return {
      keyword: keyword === '' ? undefined : keyword,
      organizations: organizations.length === 0 ? undefined : organizations.map((item) => item.id),
      names: names.length === 0 ? undefined : names.map((item) => item.id),
      locations: locations.length === 0 ? undefined : locations.map((item) => item.id),
      audiences: audiences.length === 0 ? undefined : audiences.map((item) => item.id),
      dates: dates.length === 0 ? undefined : dates.map((item) => item.id),
      durations: durations.length === 0 ? undefined : durations.map((item) => item.id),
      recurrences: recurrences.length === 0 ? undefined : recurrences.map((item) => item.id)
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
      this.$store.dispatch('events/loadOrganizations'),
      this.$store.dispatch('events/loadNames'),
      this.$store.dispatch('events/loadLocations'),
      this.$store.dispatch('events/loadAudiences'),
      this.$store.dispatch('events/loadDates'),
      this.$store.dispatch('events/loadDurations'),
      this.$store.dispatch('events/loadRecurrences')
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
    this.isCalendar = true
    this.selectedDate = date
  }

  updatedSelectedValueFromRouteParam(id: keyof EventFilters, options: any[] = []) {
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
    this.updatedSelectedValueFromRouteParam('organizations', this.organizations)
    this.updatedSelectedValueFromRouteParam('names', this.names)
    this.updatedSelectedValueFromRouteParam('locations', this.locations)
    this.updatedSelectedValueFromRouteParam('audiences', this.audiences)
    this.updatedSelectedValueFromRouteParam('dates', this.dates)
    this.updatedSelectedValueFromRouteParam('durations', this.durations)
    this.updatedSelectedValueFromRouteParam('recurrences', this.recurrences)
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
    width: 40%;
    min-width: 35%;
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
