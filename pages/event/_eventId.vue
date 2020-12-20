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

  async asyncData(ctx) {
    const { params } = ctx
    const res = await api.get(`events/${params.eventId}`)
    return {
      data: res.data.data as Event
    }
  },

  head() {
    const { title } = this.$data.data
    return buildMeta({
      title: `${title} - Legaltech Hub`,
      description: `${title} - Legaltech Hub`
    })
  }
})
export default class SingleEvent extends Vue {
  data: Event | null = null

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
