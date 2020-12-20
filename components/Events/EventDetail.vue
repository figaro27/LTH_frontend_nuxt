<template>
  <div class="single-event__content">
    <ad class="single-event__left-ad" position="left" direction="vertical" />

    <div class="single-event__header">
      <a href="#" class="single-event-header__link" @click="historyBack()">Search Results</a>
      <label class="single-event-header__link">&gt;</label>
      <div class="single-event__name">{{ data.title }}</div>
    </div>

    <div class="single-event__row">
      <div class="single-event__frame single-event__main">
        <div class="single-event__logo">
          <img :src="data.logo" />
        </div>
        <div class="single-event__tool">
          {{ data.title }}
        </div>
        <div class="single-event__details">
          <div class="single-event__property">
            <div class="single-event__property-name">Organization</div>
            <label class="single-event__property-value">{{ data.organizer }}</label>
          </div>
          <div class="single-event__property">
            <div class="single-event__property-name">Location</div>
            <label class="single-event__property-value">{{ `${data.city}, ${data.country}` }}</label>
          </div>
          <div class="single-event__property">
            <div class="single-event__property-name">Duration</div>
            <label class="single-event__property-value">{{ data.duration }}</label>
          </div>
          <div class="single-event__property">
            <div class="single-event__property-name">Audience</div>
            <label class="single-event__property-value">{{ data.audience }}</label>
          </div>
          <div class="single-event__property">
            <div class="single-event__property-name">Recurrence</div>
            <label class="single-event__property-value">{{ data.recurrence }}</label>
          </div>
          <div class="single-event__enhanced-links">
            <a v-if="data.website" class="single-event__enhanced-website" :href="data.website" target="_blank">
              Visit Website
            </a>
          </div>
        </div>
      </div>
      <div class="single-event__side">
        <div class="single-event__frame single-event__others">
          <v-calendar v-model="data.date" :attributes="attrs"></v-calendar>
        </div>
        <img :src="data.sideImage" class="single-event__sideImage" />
      </div>
    </div>

    <div v-if="data.description" class="single-event__row">
      <div class="single-event__frame single-event__description">
        <client-only>
          <div v-html="data.description" />
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
  attrs = [
    {
      key: 'today',
      highlight: true,
      date: new Date()
    }
  ]
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
    margin-top: 40px;
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

.single-vender__side__left {
  @include respondTo(mobile) {
    flex: 2;

    .single-event__others {
      margin-top: 20px;
    }
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

  .single-event__property {
    width: 100%;
    @include col;
    align-items: flex-start;
    justify-content: flex-start;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  .single-event__property-name {
    margin-bottom: 5px;
  }

  @include respondTo(mobile) {
    flex: 1;
    align-items: center;
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
  background: #8ea5bb55;
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

.single-event__frame single-event__sideImage {
  width: 100%;
  height: 100%;
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

.single-event__similar-results {
  width: 100%;
  margin: 20px 0;
}

.calendar >>> .not-in-month {
  color: rgba(0, 0, 0, 0.5); // change this
  opacity: 0.5;
}
</style>

<style lang="scss">
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
