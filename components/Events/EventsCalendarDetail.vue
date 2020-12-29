<template>
  <div>
    <p>
      <a :href="event.url" class="event-calendar__event__title">{{ event.title }} | </a>
      <span class="event-calendar__event__desc">{{ event.location }}</span>
    </p>
    <p class="event-calendar__event__desc">{{ event.info }}</p>
    <template v-if="event.desc">
      <p v-if="event.desc.length < 45" class="event-calendar__event__desc">
        {{ event.desc }}
      </p>
      <p v-else class="event-calendar__event__desc">
        {{ event.desc.slice(0, 45) }} ... <a :href="event.url">see more</a>
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'events-calendar-detail' })
export default class EventsCalendarDetail extends Vue {
  event = {}
  setEvent(value: any) {
    this.event = value
  }
}
</script>

<style lang="scss">
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
</style>
