<template>
  <div class="events-calendar__container">
    <div v-if="!isMobile">
      <nuxt-link :to="listViewUrl">
        <img v-tooltip="{ content: 'List View' }" class="search-box__calendar_btn" src="/images/svgs/list.svg" />
      </nuxt-link>
      <client-only>
        <full-calendar
          ref="eventCalendar"
          :config="config"
          :events="fullCalendarEvents"
          height="100%"
          class="events-calendar__calendar"
        />
      </client-only>
    </div>
    <div v-else>
      <div class="events-calendar__mobile__link-container">
        <nuxt-link :to="listViewUrl" class="events-calendar__mobile__link">
          <img class="search-box__calendar_btn" src="/images/svgs/list.svg" />
          <span class="events-calendar__mobile__link-text">List view</span>
        </nuxt-link>
      </div>
      <v-calendar
        v-if="isMobile"
        ref="eventMobileCalendar"
        :attributes="mobileCalendarDates"
        class="events-calendar__mobile_calendar"
      />
      <div class="events-calenar__mobile_event_container">
        <h2 class="events-calendar__mobile_event_list">Upcoming Events</h2>
        <div v-for="(data, key) in fullCalendarEvents" :key="key" class="events-calenar__mobile_event_box">
          <div class="events-calenar__mobile_event_date_container">
            <p class="events-calenar__mobile_event_date">{{ data.start.getDate() }}-{{ data.end.getDate() }}</p>
          </div>
          <div>
            <a :href="data.url" class="event-calendar__mobile_event__title">{{ data.title }}</a>
            <p class="event-calendar__mobile_event__location">{{ data.location }}</p>
            <p class="event-calendar__mobile_event__info">{{ data.info }}</p>
            <template v-if="data.desc">
              <p v-if="data.desc.length < 35" class="event-calendar__mobile_event__desc">
                {{ data.desc }}
              </p>
              <template v-else>
                <p class="event-calendar__mobile_event__desc">{{ data.desc.slice(0, 35) }} ...</p>
                <a :href="data.url">see more</a>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { isMobile } from 'mobile-device-detect'
import moment from 'moment'

import { MonthPickerDate } from '@/components/SearchBox/types'
import { Event } from '@/models'

import EventsCalendarDetail from './EventsCalendarDetail.vue'

const EventsCalendarDetailClass = Vue.extend(EventsCalendarDetail)

@Component({ name: 'events-calendar', components: {} })
export default class EventsCalendar extends Vue {
  @Prop({ required: true }) events!: Event[]
  @Prop({ required: true }) date!: String
  isCalendarMounted: boolean = false
  get config() {
    return {
      defaultView: 'month',
      fixedWeekCount: false,
      showNonCurrentDates: true,
      eventStartEditable: false,
      height: 'auto',
      contentHeight: 'auto',
      eventRender: (event: any, element: any) => {
        const EventsCalendarDetailInstance: any = new EventsCalendarDetailClass()
        EventsCalendarDetailInstance.setEvent(event)
        EventsCalendarDetailInstance.$mount()
        const eventHTML = EventsCalendarDetailInstance.$el.outerHTML
        element.find('.fc-title').html(eventHTML)
        event.editable = false
        element.draggable = false
      },
      viewRender: (event: any) => {
        let month: number = 1
        let year: number = 0
        if (this.isCalendarMounted) {
          const viewingMonth = moment(event.dateProfile.date, 'YYYY/MM/DD')
          month = parseInt(viewingMonth.format('M'))
          year = parseInt(viewingMonth.format('YYYY'))
        } else {
          month = parseInt(this.date.split('-')[1])
          year = parseInt(this.date.split('-')[0])
          this.isCalendarMounted = true
        }
        const dateInfo: MonthPickerDate = {
          monthIndex: month,
          year
        }
        this.$emit('calendar', dateInfo)
      }
    }
  }

  get isMobile() {
    return isMobile
  }

  get fullCalendarEvents() {
    return this.events.map((item, index) => {
      const audiences = item.audiences.map((audience) => audience.name).join(', ')
      const startDate = new Date(item.date.toString().slice(0, 10).replace('-', '/'))
      const endDate = new Date(startDate)
      const duration = item.duration.id > 1 ? item.duration.id - 1 : 1
      endDate.setDate(endDate.getDate() + duration)
      const event = {
        key: index,
        title: item.title,
        location: item.city != null ? `${item.city}, ${item.country}` : `${item.country}`,
        info: `${audiences} | ${item.duration.name}`,
        desc: item.description,
        url: `/event/${item.id}`,
        backgroundColor: '#c2d5fe',
        textColor: '#546E7A',
        borderColor: '#c2d5fe',
        start: startDate,
        end: endDate
      }
      return event
    })
  }

  get mobileCalendarDates() {
    const eventsDates: any = this.events.map((item: any) => {
      const startDate = new Date(item.date.slice(0, 10).replace('-', '/'))
      const endDate = new Date(startDate)
      const duration = item.duration.id > 1 ? item.duration.id - 2 : 1
      endDate.setDate(endDate.getDate() + duration)
      return { start: startDate, end: endDate }
    })
    return [
      {
        key: 'today',
        highlight: true,
        dates: eventsDates
      }
    ]
  }

  get eventsDates() {
    return this.events.map((item) => {
      return item.date
    })
  }

  get listViewUrl() {
    return {
      name: 'search-events',
      query: { ...this.$route.query, date: undefined }
    }
  }

  mounted() {
    setTimeout(() => {
      this.onDateChange()
    }, 100)
  }

  @Watch('date', { immediate: true })
  async onDateChange() {
    if (this.$refs.eventCalendar) {
      const calendar = this.$refs.eventCalendar as any
      calendar.fireMethod('gotoDate', this.date)
    }
    if (this.$refs.eventMobileCalendar) {
      const mobileCalendar = this.$refs.eventMobileCalendar as any
      await mobileCalendar.move(this.date)
    }
  }
}
</script>

<style lang="scss">
.fc-right,
.fc-today-button {
  display: none;
}
.fc-toolbar {
  position: relative;
  margin-bottom: 4px !important;
}
.fc-center {
  h2 {
    color: navy;
  }
}
.fc-left {
  position: absolute;
  width: 100%;
  .fc-button-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 200px;
  }
  .fc-button {
    outline: none;
    border: none;
    box-shadow: none;
    color: navy;
    background: transparent;
  }
}
.fc-head-container {
  position: absolute;
  border: none !important;
  .fc-day-header {
    border: none;
    text-align: left;
    padding: 2px 4px;
    color: $colorLightGrey;
  }
}
.fc-event {
  background: none !important;
  border: none !important;
}
.fc-time {
  display: none;
}
.fc-unselectable {
  height: 100%;
}

.events-calendar__container {
  height: 100%;
  .events-calendar__calendar {
    background-color: transparent;
    padding: 0 20px;
    width: 100%;
    .fc-other-month * {
      opacity: 70%;
    }
  }
}

.search-box__calendar_btn {
  width: 30px;
  height: 30px;
  margin: auto 10px;
  @include respondTo(mobile) {
    width: 24px;
    height: 24px;
  }
}

.events-calendar__mobile_calendar {
  width: 100%;
  overflow: show;
  margin-left: 5px;
  border: none;
  .vc-title {
    @include typography(xl-1, default, bold);
    color: navy;
  }
  .vc-arrows-container {
    align-items: center;
    padding: 5px 40px;
    .vc-arrow {
      color: navy;
      @include typography(xxl, default, bold);
    }
  }
}

.events-calenar__mobile_event_container {
  padding: 10px 0px 10px 15px;
  border: none;
  .events-calendar__mobile_event_list {
    color: navy;
    margin: 10px 0;
  }
  .events-calenar__mobile_event_box {
    display: flex;
    padding: 10px 0px;
  }
  .event-calendar__mobile_event__title {
    @include typography(xl, default, bold);
    color: navy;
    text-decoration: blink;
  }
  .event-calendar__mobile_event__location {
    @include typography(lg, default, bold);
    color: $colorLightGrey;
  }
  .event-calendar__mobile_event__info {
    @include typography(lg, default, normal);
    color: $colorLightGrey;
  }
  .events-calenar__mobile_event_date_container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $colorLightNavy;
    .events-calenar__mobile_event_date {
      width: 50px;
      text-align: center;
      margin: auto;
    }
  }
}
.events-calendar__mobile__link-container {
  display: flex;
  margin-bottom: 12px;
}

.events-calendar__mobile__link {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-bottom: 1px solid #c2d5fe;
  margin-left: auto;
  text-decoration: none;
  padding: 4px;
  nuxt-link {
    display: flex;
    align-items: center;
  }
}

.events-calendar__mobile__link-text {
  color: #c2d5fe;
  @include typography(lg, default);
  text-align: center;
}
</style>
<style lang="scss" scoped></style>
