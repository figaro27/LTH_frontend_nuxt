<template>
  <div class="events-calendar__container">
    <!-- <v-calendar
      v-if="!isMobile"
      ref="eventCalendar"
      class="calendar"
      :masks="masks"
      :attributes="eventsData"
      disable-page-swipe
      is-expanded
      trim-weeks
    >
      <template #day-content="{ day, attributes }">
        <div>
          <span>{{ day.day }}</span>
          <div class="event-calendar__event__container">
            <div v-for="(attr, key) in attributes" :key="key" class="event-calendar__event">
              <p>
                <a :href="attr.customData.url" class="event-calendar__event__title">{{ attr.customData.title }} | </a>
                <span class="event-calendar__event__desc">{{ attr.customData.location }}</span>
              </p>
              <p class="event-calendar__event__desc">{{ attr.customData.info }}</p>
              <template v-if="attr.customData.desc">
                <p v-if="attr.customData.desc.length < 45" class="event-calendar__event__desc">
                  {{ attr.customData.desc }}
                </p>
                <p v-else class="event-calendar__event__desc">
                  {{ attr.customData.desc.slice(0, 45) }} ... <a :href="attr.customData.url">see more</a>
                </p>
              </template>
            </div>
          </div>
        </div>
      </template>
    </v-calendar> -->
    <full-calendar :config="config" :events="fullCalendarEvents" class="events-calendar__calendar" />

    <div v-if="isMobile">
      <v-calendar
        v-if="isMobile"
        trim-weeks
        :attributes="mobileCalendarDates"
        class="events-calendar__mobile_calendar"
      ></v-calendar>
      <div class="events-calenar__mobile_event_container">
        <h2 class="events-calendar__mobile_event_list">Upcoming Events</h2>
        <div v-for="(data, key) in eventsData" :key="key" class="events-calenar__mobile_event_box">
          <div class="events-calenar__mobile_event_date">
            <p>{{ data.dates.getDate() }}</p>
          </div>
          <div>
            <a :href="data.customData.url" class="event-calendar__mobile_event__title">{{ data.customData.title }}</a>
            <p class="event-calendar__mobile_event__location">
              {{ data.customData.location }}
            </p>
            <p class="event-calendar__mobile_event__info">{{ data.customData.info }}</p>
            <template v-if="data.customData.desc">
              <p v-if="data.customData.desc.length < 35" class="event-calendar__mobile_event__desc">
                {{ data.customData.desc }}
              </p>
              <template v-else>
                <p class="event-calendar__mobile_event__desc">{{ data.customData.desc.slice(0, 35) }} ...</p>
                <a :href="data.customData.url">see more</a>
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
import { Event } from '@/models'
import EventsCalendarDetail from './EventsCalendarDetail.vue'
const EventsCalendarDetailClass = Vue.extend(EventsCalendarDetail)

@Component({ name: 'events-calendar' })
export default class EventsCalendar extends Vue {
  @Prop({ required: true }) events!: Event[]
  @Prop({ required: true }) date!: any

  isMobile: boolean = false

  @Watch('date', { immediate: true, deep: true })
  async onDateChange(val: any) {
    if (this.$refs.eventCalendar) {
      const calendar = this.$refs.eventCalendar as any
      await calendar.move({ month: val.monthIndex, year: val.year })
    }
  }

  renderHTML() {
    const spanNode = document.createElement('span')
    const textNode = document.createTextNode('there.')
    spanNode.appendChild(textNode)
    /* this is the currently interpreted <script> element
   so you can append a child to its parent.
*/
    // document.scripts[document.scripts.length - 1].parentNode.appendChild(spanNode)
  }

  get fullCalendarEvents() {
    return this.events.map((item, index) => {
      const audiences = item.audiences.map((audience) => audience.name).join(', ')
      const endDate = new Date(item.date)
      endDate.setDate(endDate.getDate() + 2)
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
        start: new Date(item.date),
        end: endDate
      }
      return event
    })
  }

  config = {
    defaultView: 'month',
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

  mounted() {
    this.isMobile = isMobile
    this.onDateChange(this.date)
  }

  masks = { weekdays: 'WWW' }
  showDate = new Date(this.date.year, this.date.monthIndex - 1)

  get eventsData() {
    return this.events.map((item, index) => {
      const audiences = item.audiences.map((audience) => audience.name).join(', ')
      const event = {
        key: index,
        customData: {
          title: item.title,
          location: `${item.city}, ${item.country}`,
          info: `${audiences} | ${item.duration.name}`,
          desc: item.description,
          url: `/event/${item.id}`,
          backgroundColor: '#c2d5fe',
          textColor: '#546E7A',
          borderColor: '#c2d5fe'
        },
        dates: new Date(item.date)
      }
      return event
    })
  }

  get mobileCalendarDates() {
    const eventsDates: any = this.events.map((item: any) => {
      return { start: item.date, end: item.date }
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
    padding: 0 100px;
  }
  .fc-button {
    outline: none;
    border: none;
    box-shadow: none;
    color: navy;
    background: transparent;
  }
}

.events-calendar__container {
  height: 150%;
  .events-calendar__calendar {
    background-color: transparent;
    padding: 12px 20px;
    width: 100%;
    height: 100%;
    .vc-weeks {
      padding: 0;
    }
    .vc-grid-cell {
      position: relative;
      .vc-weekday {
        position: absolute;
        right: 0.5rem;
        top: 0.05rem;
        z-index: 5;
      }
    }
    .vc-arrows-container {
      justify-content: center;
      align-items: center;
      padding: 5px;
      .vc-arrow {
        color: navy;
        @include typography(xxl, default, bold);
        margin: auto 10rem;
      }
    }
    .vc-header {
      padding: 0;
      .vc-title {
        @include typography(xxl, default, bold);
        color: navy;
        margin-bottom: 0.5rem;
      }
    }
    .vc-day {
      padding: 0 5px 3px 5px;
      text-align: left;
      height: 8rem;
      background-color: white;
      border-bottom: 1px solid #b8c2cc;
      color: $colorLightGrey;
      &.weekday-1 {
        border-bottom: 1px solid #b8c2cc;
      }
      border-right: 1px solid #b8c2cc;
      &.on-top {
        border-top: 1px solid #b8c2cc;
      }
      &.on-left {
        border-left: 1px solid #b8c2cc;
      }
    }
    .is-not-in-month * {
      opacity: 70%;
    }
    .vc-day-dots {
      margin-bottom: 5px;
    }
  }
  .event-calendar__event__container {
    height: 6rem;
    overflow: auto;
  }
  .event-calendar__event {
    background: $colorLightNavy;
    border-radius: 5px;
    padding: 6px 4px;
    margin: 4px 2px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
  .event-calendar__event__title {
    @include typography(md, default, bold);
    color: black;
  }
  .event-calendar__event__desc {
    @include typography(sm, default, normal);
    color: $colorDarkGrey;
    color: $colorLightGrey;
  }
}

.events-calendar__mobile_calendar {
  width: 100%;
  overflow: show;
  margin-left: 5px;
  .vc-title {
    @include typography(xl-1, default, bold);
    color: navy;
  }
  .vc-arrows-container {
    // justify-content: center;
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
  .events-calendar__mobile_event_list {
    color: navy;
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
  .events-calenar__mobile_event_date {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $colorLightNavy;
  }
}
</style>
<style lang="scss" scoped></style>
