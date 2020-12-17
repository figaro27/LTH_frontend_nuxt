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
          id="names"
          v-model="filters.names"
          name="names"
          label="Names:"
          :options="names"
          @change="onFilterUpdate"
        />
        <select-filter
          id="locations"
          v-model="filters.locations"
          name="locations"
          label="Locations:"
          :options="dates"
          @change="onFilterUpdate"
        />
        <select-filter
          id="dates"
          v-model="filters.dates"
          name="dates"
          label="Dates:"
          :options="dates"
          @change="onFilterUpdate"
        />
        <select-filter
          id="reccurrences"
          v-model="filters.reccurrences"
          name="reccurrences"
          label="Reccurrences:"
          :options="reccurrences"
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
          id="organizations"
          v-model="filters.organizations"
          name="organizations"
          label="Organizations:"
          :options="organizations"
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

        <ad class="events-page__left-ad" direction="vertical" position="left" />
      </div>
      <div v-loading="false" class="events-page__content">
        <div class="events-page__content-wrapper">
          <h4 v-if="true" class="events-page__count">
            <span>Search result ({{ eventDatas.length }})</span>
            <nuxt-link v-if="showClearFilter" v-tooltip="{ content: 'Clear Search' }" to="/search">
              <fa :icon="['fas', 'times-circle']" />
            </nuxt-link>
          </h4>
          <div class="events-page__events">
            <div v-if="!isCalendar">
              <events-item
                v-for="(event, index) of eventDatas.slice(0, 10)"
                :key="index"
                class="events-page__event-item"
                :data="event"
              />
              <ad class="events-page__events__ad" direction="horizontal" />
              <events-item
                v-for="(event, index) of eventDatas.slice(10)"
                :key="10 + index"
                class="events-page__event-item"
                :data="event"
              />
            </div>
            <events-calendar v-if="isCalendar" :events="eventDatas" :date="selectedDate" />
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
import { Component, State, Vue } from 'nuxt-property-decorator'
import { EventFilters } from '@/models'
import { DEFAULT_VENDORS_LIMIT } from '@/assets/consts'
import { isMobile } from 'mobile-device-detect'
import { RootState, LoadingStatus } from '@/store/types'
import { RouteQuery } from '@/store/search/types'
import { EventsData } from './events_data'

@Component({ name: 'search-events' })
export default class SearchEvents extends Vue {
  @State((state: RootState) => state.search.vendorsLoading) vendorsLoading!: LoadingStatus
  @State((state: RootState) => state.search.routeQuery) lastSearchQuery!: RouteQuery

  names = []
  locations = []
  audiences = []
  dates = []
  reccurrences = []
  durations = []
  organizations = []
  isMobile: boolean = false
  isCalendar = false
  selectedDate = new Date()

  filters: EventFilters = {
    keyword: '',
    organizations: [],
    names: [],
    locations: [],
    audiences: [],
    dates: [],
    durations: [],
    reccurrences: []
  }

  mounted() {
    this.isMobile = isMobile
  }

  onFilterUpdate() {
    console.log('test update')
  }

  onKeywordCancelClick() {
    console.log('test cancel click')
  }

  onChangeCalendar(date: any) {
    this.isCalendar = true
    this.selectedDate = date
  }

  curPageNum() {
    return 1
  }

  onPageChange() {
    console.log('onPageCahnge')
  }

  get eventDatas() {
    console.log(EventsData)
    return EventsData
  }

  get pageCount() {
    return Math.ceil(150 / DEFAULT_VENDORS_LIMIT)
  }

  get showPagination() {
    return this.pageCount > 1
  }

  get eventsData() {
    return EventsData
  }

  get routeQuery() {
    return this.$route.query
  }

  get showClearFilter() {
    const { routeQuery } = this
    return Object.keys(routeQuery).filter((key) => !!routeQuery[key]).length > 0
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
