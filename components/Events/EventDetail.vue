<template>
  <div class="single-event__content">
    <ad class="single-event__left-ad" position="left" direction="vertical" />

    <div class="single-event__header">
      <nuxt-link class="single-event-header__link" :to="searchPageRoute">Search Results</nuxt-link>
      <label class="single-event-header__link">&gt;</label>
      <div class="single-event__name">{{ title }}</div>
    </div>

    <div class="single-event__row">
      <div class="single-event__frame single-event__main">
        <div class="single-event__logo">
          <img :src="logo" />
        </div>
        <div class="single-event__tool">
          {{ title }}
        </div>
        <div class="single-event__details">
          <div class="single-event__property">
            <div class="single-event__property-name">Organization</div>
            <label class="single-event__property-value">{{ organizer }}</label>
          </div>
          <div class="single-event__property">
            <div class="single-event__property-name">Location</div>
            <label class="single-event__property-value">{{ location }}</label>
          </div>
          <div class="single-event__property">
            <div class="single-event__property-name">Duration</div>
            <label class="single-event__property-value">{{ duration }}</label>
          </div>
          <div class="single-event__property">
            <div class="single-event__property-name">Audience</div>
            <label class="single-event__property-value">{{ audiences }}</label>
          </div>
          <div class="single-event__property">
            <div class="single-event__property-name">Format</div>
            <label class="single-event__property-value">{{ format }}</label>
          </div>
          <div class="single-event__property">
            <div class="single-event__property-name">Recurrence</div>
            <label class="single-event__property-value">{{ recurrence }}</label>
          </div>
          <div class="single-event__property">
            <div class="single-event__property-name">Features</div>
            <label class="single-event__property-value">{{ features }}</label>
          </div>
          <div class="single-event__enhanced-links">
            <a v-if="website" class="single-event__enhanced-website" :href="website" target="_blank"> Visit Website </a>
          </div>
        </div>
      </div>
      <div class="single-event__side">
        <div class="single-event__frame single-event__others">
          <v-calendar ref="eventCalendar" :attributes="attrs" :disabled-dates="{}" class="single-event__calendar" />
        </div>
        <div v-if="notes" class="single-event__frame single-event__others single-event__notes">
          {{ notes }}
        </div>
      </div>
    </div>

    <div v-if="description" class="single-event__row">
      <div class="single-event__frame single-event__description">
        <client-only>
          <div v-html="description" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Event } from '@/models'

@Component({
  name: 'event-detail',
  components: {}
})
export default class EventDetail extends Vue {
  @Prop({ required: true }) data!: Event

  get searchPageRoute() {
    return '/search/events'
  }

  mounted() {
    setTimeout(() => {
      this.onDateChange(this.data.date)
    }, 100)
  }

  async onDateChange(date: any) {
    if (this.$refs.eventCalendar) {
      const startDate = new Date(date.toString().slice(0, 10).replace('-', '/'))
      const calendar = this.$refs.eventCalendar as any
      await calendar.move(startDate)
    }
  }

  get attrs() {
    const startDate = new Date(this.data.date.toString().slice(0, 10).replace('-', '/'))
    const endDate = new Date(startDate)
    const duration = this.data.duration.id > 1 ? this.data.duration.id - 2 : 1
    endDate.setDate(endDate.getDate() + duration)
    const eventsDates = [{ start: startDate, end: endDate }]

    return [
      {
        key: 'today',
        highlight: true,
        dates: eventsDates
      }
    ]
  }

  get title() {
    const { data } = this
    if (data === null) {
      return null
    }
    if (data.title === null) {
      return data.organizer
    } else if (data.organizer !== data.title) {
      return `${data.organizer}, ${data.title}`
    }
    return this.data.title
  }

  get sideImage() {
    if (!this.data) return '/images/logo-small.png'
    return this.data.sideImage || '/images/logo-small.png'
  }

  get logo() {
    if (!this.data) return '/images/logo-small.png'
    return this.data.logo || '/images/logo-small.png'
  }

  get organizer() {
    const { data } = this
    return (data && data.organizer) || ''
  }

  get location() {
    const { data } = this
    if (!data) {
      return ''
    }
    return `${data.city}, ${data.country}`
  }

  get duration() {
    const { data } = this
    return (data && data.duration.name) || ''
  }

  get features() {
    const { data } = this
    if (!data) return ''
    return data.features.map((data) => data.name).join(', ')
  }

  get audiences() {
    const { data } = this
    if (!data) return ''
    return data.audiences.map((data) => data.name).join(', ')
  }

  get recurrence() {
    const { data } = this
    return (data && data.recurrence.name) || ''
  }

  get format() {
    const { data } = this
    return (data && data.format.name) || ''
  }

  get description() {
    const { data } = this
    return (data && data.description) || ''
  }

  get notes() {
    const { data } = this
    return (data && data.notes) || ''
  }

  get website() {
    const { data } = this
    return (data && data.website) || ''
  }
}
</script>

<style lang="scss" scoped>
.single-event__header {
  width: 100%;
  background-color: #c2d5fe;
  padding: 16px;
  display: flex;

  .single-event-header__link {
    margin-left: 16px;
    color: #979797;
    text-decoration: none;
  }

  .single-event__name {
    margin-left: 16px;
    font-size: 1.125rem;
    color: #011d58;
  }
}

.single-event {
  @include desktop-max-width-layout;
  padding: 40px;
  text-align: left;
  background: white;
  position: relative;
}

$adMaxWidth: calc(50% - #{$desktopMaxWidth / 2} - 40px);

.single-event__left-ad {
  position: absolute;
  top: 110px;
  left: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}

.single-event__right-ad {
  position: absolute;
  top: 110px;
  right: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}

.single-event__row {
  width: 100%;
  @include row;

  &:not(:first-child) {
    margin-top: 20px;
  }

  @include respondTo(mobile) {
    flex-direction: column;
  }
}

.single-event__frame {
  width: 100%;
  @include col--center;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
}

.single-event__main {
  flex: 3;
  padding: 20px 30px;
  margin-right: 40px;

  .single-event__property-name {
    min-width: 240px;
  }
}

.single-event__logo {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
  }
}

.single-event__tool {
  @include typography(xl-2, narrow, bold);
  margin-bottom: 8px;
  color: $colorNavy;
}

.single-event__state {
  display: flex;
  margin-bottom: 32px;
  @include col;
}

.single-event__graveyard {
  color: #546e7a;
  justify-content: center;
  display: flex;
  align-items: center;
}

.single-event__consolidation {
  color: #fbb540;
  justify-content: center;
  display: flex;
  align-items: center;
}

.single-event__details {
  width: 100%;
  margin-top: 16px;
  flex: 1;
  @include col;
}

.single-event__property {
  width: 100%;
  @include row;
  min-height: 55px;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
}

.single-event__property-name {
  @include typography(lg-1, default, bold);
  color: $colorNavy;
}

.single-event__property-value {
  @include typography(lg, default);
  color: $colorLightGrey;
}

.single-event__side {
  flex: 1;
  @include col;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }

  @include respondTo(mobile) {
    margin-top: 20px;
  }
}

.single-event__offices {
  padding: 15px;

  .single-event__property-name {
    min-width: 100px;
  }

  margin-bottom: 20px;
}

.single-event__others {
  @include col;
  align-items: center;
  padding: 15px;
  overflow: hidden;

  @include respondTo(mobile) {
    flex: 1;
    align-items: center;
  }
}

.single-event__notes {
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  color: $colorDarkGrey;

  @include respondTo(mobile) {
    justify-content: flex-start;
    align-items: flex-start;
  }
}

.single-event__enhanced-links {
  @include row;
  margin: 10px 10px 0 0;
}

.single-event__enhanced-website {
  @include row--center;
  height: 40px;
  padding: 5px 15px;
  @include typography(lg-1);
  background: rgba(203, 239, 149, 0.4);
  text-decoration: none;
  color: $colorNavy;
  border-radius: 50px;
  margin-right: 20px;
}

.single-event__enhanced-link {
  @include row--center;
  height: 40px;
  padding: 5px 10px;
  @include typography(lg-1);
  color: $colorNavy;
  text-decoration: none;
  background: white;
  box-shadow: 0px 5px 5px rgba(75, 93, 104, 0.1);
  border-radius: 50px;

  img {
    margin-left: 10px;
  }
}

.single-event__side-image {
  width: 100%;
  object-fit: cover;
}

.single-event__description {
  width: 100%;
  @include row;
  @include typography(lg-1);
  color: $colorDarkGrey;
  padding: 20px 30px;
  margin-bottom: 40px;
  text-align: left;
  overflow: hidden;
}

.calendar >>> .not-in-month {
  color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
}
</style>

<style lang="scss">
.vc-arrows-container {
  display: none;
}
.vc-title-layout[data-v-ea3333ec] {
  justify-content: left;
}
.vc-popover-content-wrapper[data-v-4cb7b681] {
  display: none;
}
.vc-weekday[data-v-ea3333ec] {
  color: navy;
}
.vc-title[data-v-ea3333ec] {
  color: navy;
}
.vc-day-content.is-disabled[data-v-4bf08813] {
  color: black;
}
.single-event__description {
  & > div {
    width: 100%;
    overflow: hidden;

    & > * {
      width: 100%;
      overflow: hidden;
    }

    & > p:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
