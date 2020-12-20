<template>
  <div class="events-calendar__container">
    <!-- <FullCalendar ref="fullCalendar" :options="calendarOptions" class="calendar" @event-render="eventRender" /> -->
    <v-calendar
      ref="eventCalendar"
      class="calendar"
      :masks="masks"
      :attributes="eventsData"
      disable-page-swipe
      is-expanded
    >
      <template #day-content="{ day, attributes }">
        <div>
          <span>{{ day.day }}</span>
          <div>
            <div v-for="(attr, key) in attributes" :key="key" class="event-calendar__event">
              <p>
                <a :href="attr.customData.url" class="event-calendar__event__title">{{ attr.customData.title }} | </a>
                <span class="event-calendar__event__desc">{{ attr.customData.location }}</span>
              </p>
              <p class="event-calendar__event__desc">{{ attr.customData.info }}</p>
              <p v-if="attr.customData.desc.length < 45" class="event-calendar__event__desc">
                {{ attr.customData.desc }}
              </p>
              <p v-else class="event-calendar__event__desc">
                {{ attr.customData.desc.slice(0, 45) }} ... <a :href="attr.customData.url">see more</a>
              </p>
            </div>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { Event } from '@/models'

@Component({
  name: 'events-calendar',
  components: {}
})
export default class EventsCalendar extends Vue {
  @Prop({ required: true }) events!: Event[]
  @Prop({ required: true }) date!: any

  @Watch('date', { immediate: true, deep: true })
  async onDateChange(val: any) {
    if (this.$refs.eventCalendar) {
      const calendar = this.$refs.eventCalendar as any
      await calendar.move({ month: val.monthIndex, year: val.year })
    }
  }

  mounted() {
    this.onDateChange(this.date)
  }

  masks = { weekdays: 'WWW' }
  showDate = new Date(this.date.year, this.date.monthIndex - 1)

  get eventsData() {
    return this.events.map((item, ind) => {
      const event = {
        key: ind,
        customData: {
          title: item.title,
          location: `${item.city}, ${item.country}`,
          info: `${item.audiences.length}, ${item.duration.name}`,
          desc: item.description,
          url: `/event/${item.id}`,
          backgroundColor: '#c2d5fe',
          textColor: '#546E7A',
          borderColor: '#c2d5fe'
        },
        dates: item.date
      }
      return event
    })
  }
}
</script>

<style lang="scss">
.events-calendar__container {
  height: 150%;
  .calendar {
    background-color: transparent;
    padding: 12px 40px;
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
  .event-calendar__event {
    background: $colorLightNavy;
    border-radius: 5px;
    padding: 8px 4px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
  .event-calendar__event__title {
    @include typography(lg, default, bold);
    color: black;
  }
  .event-calendar__event__desc {
    @include typography(md, default, normal);
    color: $colorDarkGrey;
  }
}
</style>
<style lang="scss" scoped>
.events-calendar__container {
  margin: 10px;
}
</style>
