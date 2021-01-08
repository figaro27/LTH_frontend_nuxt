<template>
  <div class="events-calendar__container">
    <client-only>
      <full-calendar
        v-if="!isMobile"
        ref="eventCalendar"
        :config="config"
        :events="fullCalendarEvents"
        class="events-calendar__calendar"
      />
    </client-only>

    <div v-if="isMobile">
      <v-calendar
        v-if="isMobile"
        ref="eventMobileCalendar"
        :attributes="mobileCalendarDates"
        class="events-calendar__mobile_calendar"
      ></v-calendar>
      <div class="events-calenar__mobile_event_container">
        <h2 class="events-calendar__mobile_event_list">Upcoming Events</h2>
        <div v-for="(data, key) in fullCalendarEvents" :key="key" class="events-calenar__mobile_event_box">
          <div class="events-calenar__mobile_event_date_container">
            <p class="events-calenar__mobile_event_date">{{ data.start.getDate() }}-{{ data.end.getDate() }}</p>
          </div>
          <div>
            <a :href="data.url" class="event-calendar__mobile_event__title">{{ data.title }}</a>
            <p class="event-calendar__mobile_event__location">
              {{ data.location }}
            </p>
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
import { Event } from '@/models'
import { isMobile } from 'mobile-device-detect'
import EventsCalendarDetail from './EventsCalendarDetail.vue'
const EventsCalendarDetailClass = Vue.extend(EventsCalendarDetail)

@Component({ name: 'events-calendar', components: {} })
export default class EventsCalendar extends Vue {
  @Prop({ required: true }) events!: Event[]
  @Prop({ required: true }) date!: any

  isMobile: boolean = false

  mounted() {
    this.isMobile = isMobile
    setTimeout(() => {
      this.onDateChange(this.date)
    }, 100)
  }

  @Watch('date', { immediate: true, deep: true })
  async onDateChange(val: any) {
    if (this.$refs.eventCalendar) {
      const calendar = this.$refs.eventCalendar as any
      calendar.fireMethod('gotoDate', val)
    }
    if (this.$refs.eventMobileCalendar) {
      const mobileCalendar = this.$refs.eventMobileCalendar as any
      await mobileCalendar.move(val)
    }
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
        location: `${item.city}, ${item.country}`,
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

  config = {
    defaultView: 'month',
    fixedWeekCount: false,
    eventStartEditable: false,
    eventRender: (event: any, element: any) => {
      const EventsCalendarDetailInstance: any = new EventsCalendarDetailClass()
      EventsCalendarDetailInstance.setEvent(event)
      EventsCalendarDetailInstance.$mount()
      const eventHTML = EventsCalendarDetailInstance.$el.outerHTML
      element.find('.fc-title').html(eventHTML)
      event.editable = false
      element.draggable = false
    }
  }

  masks = { weekdays: 'WWW' }
  showDate = new Date(this.date.year, this.date.monthIndex - 1)

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

.events-calendar__container {
  height: 100%;
  .events-calendar__calendar {
    background-color: transparent;
    padding: 0 20px;
    width: 100%;
    height: 100%;
    .fc-other-month * {
      opacity: 70%;
    }
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
</style>
<style lang="scss" scoped></style>
