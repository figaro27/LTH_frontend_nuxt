<template>
  <div class="single-event">
    <div class="single-event__content">
      <ad class="single-event__left-ad" position="left" direction="vertical" />

      <div class="single-event__main">
        <event-detail :data="data" />
      </div>

      <ad class="single-event__right-ad" position="right" direction="vertical" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Event } from '@/models'
import { api, buildMeta } from '@/utils'

@Component({
  name: 'single-event',

  asyncData() {
    const res = {
      id: 14,
      organizer: 'organizer',
      title: 'Title of the event',
      website: 'http://localhost:3000/',
      description: 'where these are the same, only the title of the event should be listed',
      city: 'Madrid',
      country: 'Spain',
      date: new Date(),
      audience: 'IT',
      duration: 'Two days',
      recurrence: 'Annual',
      sideImage: '/images/sideImage_test.png',
      logo: '/images/event_avatar.png'
    }
    return {
      data: res as Event
    }
  },

  head() {
    const { name } = this.$data.data
    return buildMeta({
      title: `${name} - Legaltech Hub`,
      description: `${name} - Legaltech Hub`
    })
  }
})
export default class SingleEvent extends Vue {
  data: Event | null = null

  get isEnhancedEvent() {
    const { data } = this
    return data
  }

  async mounted() {
    if (this.data) {
      return
    }
    const res = await api.get(`events/${this.eventId}`)
    this.data = res.data.data
  }

  get eventId() {
    return this.$route.params.eventId
  }
}
</script>

<style lang="scss" scoped>
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

.single-event__main {
  width: 100%;
  @include col;

  @include respondTo(mobile) {
    @include col;
  }
}

.single-event__enhanced {
  margin-bottom: 40px;
}

.single-event__similar-results {
  width: 100%;
  margin: 20px 0;
}
</style>
