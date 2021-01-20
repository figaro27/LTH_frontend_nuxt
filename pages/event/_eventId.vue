<template>
  <div class="single-event">
    <div class="single-event__content">
      <ad class="single-event__left-ad" position="left" direction="vertical" />

      <div class="single-event__main">
        <event-detail v-if="data" :data="data" />
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

  async fetch() {
    const { eventId } = this.$route.params
    const res = await api.get(`events/${eventId}`)
    this.$data.data = res.data.data
  },

  head() {
    const event = this.$data.data as Event | null
    if (!event) {
      return buildMeta({
        title: 'Legaltech Hub',
        description: 'Legaltech Hub'
      })
    }

    const { logo, title } = event
    return buildMeta({
      title: `${title} - Legaltech Hub`,
      description: `${title} - Legaltech Hub`,
      imageUrl: logo
    })
  }
})
export default class SingleEvent extends Vue {
  data: Event | null = null

  async mounted() {
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
