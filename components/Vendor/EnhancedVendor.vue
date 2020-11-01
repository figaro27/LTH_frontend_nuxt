<template>
  <div v-if="enhancedData" class="enhanced-vendor">
    <div class="enhanced-vendor__row">
      <div class="enhanced-vendor__frame-video">
        <div class="enhanced-vendor__video">
          <client-only>
            <youtube :video-id="youtubeVideoID" />
          </client-only>
        </div>
        <client-only>
          <div class="enhanced-vendor__video-description" v-html="enhancedData.videoDescription" />
        </client-only>
      </div>
    </div>
    <div class="enhanced-vendor__row">
      <client-only>
        <div class="enhanced-vendor__description" v-html="enhancedData.enhancedDescription" />
        <div class="enhanced-vendor__side">
          <div class="enhanced-vendor__picture">
            <img class="enhanced-vendor__picture__img" :src="enhancedData.picture1.imageUrl" />
            <div class="enhanced-vendor__title" v-html="enhancedData.picture1.description" />
          </div>

          <div class="enhanced-vendor__picture">
            <img class="enhanced-vendor__picture__img" :src="enhancedData.picture2.imageUrl" />
            <div class="enhanced-vendor__title" v-html="enhancedData.picture2.description" />
          </div>
        </div>
      </client-only>
    </div>
    <div class="enhanced-vendor__reviews">
      <div class="enhanced-vendor__reviews-title">
        Articles | Reviews | Testimonials
      </div>
      <div class="enhanced-vendor_reviews-container">
        <client-only>
          <carousel :per-page="perPage" :navigate-to="-1">
            <slide v-for="(testimonial, index) in testimonials" :key="index" :navigate-to="0">
              <div class="enhanced-vendor__frame">
                <div class="enhanced-vendor__avatar">
                  <avatar :username="testimonial.displayName" rounded />
                  <p class="enhanced-vendor__username">{{ testimonial.displayName }}</p>
                </div>
                <div class="enhanced-vendor__testimonial-content" v-html="testimonial.content" />
                <a class="enhanced-vendor__link" :href="testimonial.link" target="_blank">Read more ...</a>
              </div>
            </slide>
          </carousel>
        </client-only>
      </div>
    </div>
    <div class="enhanced-vendor__others-container">
      <div class="enhanced-vendor__others-frame">
        <p class="enhanced-vendor__others-title">{{ enhancedData.poc.title }}</p>
        <p class="enhanced-vendor__others-text" v-html="enhancedData.poc.description" />
        <a class="enhanced-vendor__link" :href="enhancedData.poc.url" target="_blank">Read more ...</a>
      </div>
      <div class="enhanced-vendor__others-frame">
        <p class="enhanced-vendor__others-title">
          Social
        </p>
        <p class="enhanced-vendor__social-text">
          Follow Us on Social Media
        </p>
        <div class="enhanced-vendor_social-container">
          <a v-if="enhancedData.linkedin" :href="enhancedData.linkedin" target="_blank">
            <img class="enhanced-vendor_social-icon" src="/images/svgs/listing/linkedin.svg" />
          </a>
          <a v-if="enhancedData.facebook" :href="enhancedData.facebook" target="_blank">
            <img class="enhanced-vendor_social-icon" src="/images/svgs/listing/facebook.svg" />
          </a>
          <a v-if="enhancedData.twitter" :href="enhancedData.twitter" target="_blank">
            <img class="enhanced-vendor_social-icon" src="/images/svgs/listing/twitter.svg" />
          </a>
          <a v-if="enhancedData.instagram" :href="enhancedData.instagram" target="_blank">
            <img class="enhanced-vendor_social-icon" src="/images/svgs/listing/instagram.svg" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { isMobile } from 'mobile-device-detect'
import getIdFromUrl from 'get-youtube-id'

import { Vendor } from '@/models'

@Component({
  name: 'enhanced-vendor'
})
export default class EnhancedVendor extends Vue {
  @Prop({ required: true }) data!: Vendor

  get enhancedData() {
    return this.data.enhancedListingData!
  }

  get youtubeVideoID() {
    const videoId = getIdFromUrl(this.enhancedData.videoUrl)
    return videoId
  }

  get testimonials() {
    return this.enhancedData.testimonials
  }

  get slideCount() {
    return 4
  }

  get perPage() {
    return isMobile ? 2 : 3
  }

  get vendorId() {
    return this.$route.params.vendorId
  }
}
</script>

<style lang="scss" scoped>
.enhanced-vendor {
  width: 100%;
  @include col--center;
}

.enhanced-vendor__row {
  width: 100%;
  @include row;

  &:not(:first-child) {
    margin-top: 40px;
  }

  @include respondTo(mobile) {
    flex-direction: column;
  }
}

.enhanced-vendor__frame-video {
  width: 100%;
  @include row;
  align-items: center;
  background: $colorNeutralsSnow;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @include respondTo(mobile) {
    @include col;
  }
}

.enhanced-vendor__video {
  height: 100%;
  @include row;
  overflow: hidden;

  @include respondTo(mobile) {
    width: 100%;
    height: auto;
    border-radius: 15px;
  }
}

.enhanced-vendor__video-description {
  height: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex: 1;
  padding: 20px 30px;
  color: $colorDarkGrey;

  p {
    @include typography(lg, normal);
    color: $colorDarkGrey;
  }
}

.enhanced-vendor__description {
  width: 100%;
  background: $colorNeutralsSnow;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex: 2;
  padding: 20px 30px;
  margin-right: 40px;
  color: $colorDarkGrey;

  p {
    @include typography(lg, normal);
    color: $colorDarkGrey;
  }
}

.enhanced-vendor__title {
  @include typography(lg, narrow, bold);
  color: $colorDarkGrey;
  text-align: center;
  margin: 16px 8px 16px 8px;
  padding: 8px 4px;
  @include respondTo(mobile) {
    @include typography(md, narrow, bold);
    margin: 8px 4px 8px 4px;
  }
}

.enhanced-vendor__avatar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direct: row;
  padding: 24px 36px 16px 16px;
  align-items: center;

  @include respondTo(mobile) {
    padding: 24px 8px 16px 4px;
  }
}

.enhanced-vendor__username {
  @include col--center;
  @include typography(xl, default, bold);
  margin-left: 24px;

  @include respondTo(mobile) {
    @include typography(md, default, bold);
    margin-left: 12px;
  }
}

.enhanced-vendor__testimonial-content {
  width: 100%;
  flex: 1;
  text-align: center;
}

.enhanced-vendor__link {
  @include typography(xl, narrow, bold);
  text-align: right;
  color: #212353;
  margin-left: auto;
  padding: 24px;
}

.enhanced-vendor__side {
  flex: 1;
  @include col;
  justify-content: center;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }

  @include respondTo(mobile) {
    flex-direction: row;
    margin-top: 20px;
  }
}

.enhanced-vendor__picture {
  @include col--center;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  &:hover {
    background: $colorNeutralsSnow;
  }
  &:active {
    background: $colorLightGrey2;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  @include respondTo(mobile) {
    border-radius: 15px;
  }
}

.enhanced-vendor__picture__img {
  width: 100%;
  object-fit: cover;
}

.enhanced-vendor__frame {
  @include col--center;
  border-radius: 16px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  overflow: hidden;
  margin: 8px 10px;
  padding: 10px;

  &:hover {
    background: $colorNeutralsSnow;
  }

  &:active {
    background: $colorLightGrey2;
  }

  @include respondTo(mobile) {
    border-radius: 15px;
  }
}

.enhanced-vendor__reviews {
  width: 100%;
  margin-top: 50px;
}

.enhanced-vendor__reviews-title {
  @include typography(xl, narrow, bold);
  color: #011d58;
}

.enhanced-vendor_reviews-container {
  @include col--center;
  display: flex;
  flex-direction: row;
  margin-top: 24px;

  & > * {
    min-width: 100%;
  }
}

.enhanced-vendor__others-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 360px;
  margin-top: 36px;
}

.enhanced-vendor__others-frame {
  width: 50%;
  @include col--center;
  border-radius: 32px;
  background: #f2f9e8;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  margin-right: 10px;
  padding: 64px 64px 0px 64px;
  @include respondTo(mobile) {
    padding: 16px;
    border-radius: 16px;
  }
}

.enhanced-vendor__others-title {
  width: 100%;
  text-align: left;
  @include col--left;
  @include typography(xl-2);
  color: $colorNavy;
  margin: 0 0 16px 0;

  @include respondTo(mobile) {
    @include typography(xl);
    padding: 16px;
    border-radius: 16px;
  }
}

.enhanced-vendor__others-text {
  flex: 1;
  @include typography(xl);
  text-align: center;
  color: #4b5d68;
  @include respondTo(mobile) {
    @include typography(md);
  }
}

.enhanced-vendor__social-text {
  flex: 1;
  @include typography(xl);
  width: 100%;
  color: #4b5d68;
}

.enhanced-vendor_social-container {
  @include col--center;
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
}

.enhanced-vendor_social-icon {
  margin-left: 8px;
  margin-right: 8px;
  @include respondTo(mobile) {
    margin: 0px 4px;
  }
}
</style>
