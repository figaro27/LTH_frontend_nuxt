<template>
  <div class="single-vendor">
    <div class="single-vendor__content">
      <vendor-detail :data="data" />
      <div class="single-vendor__row">
        <div class="single-vendor__frame-video">
          <div class="single-vendor__enhanced-video">
            <youtube ref="youtube" video-id="lG0Ys-2d4MA"></youtube>
          </div>
          <div class="single-vendor__enhanced-title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </div>
      </div>
      <div class="single-vendor__row">
        <div class="single-vendor__enhanced-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras efficitur metus vitae malesuada interdum.
            Proin Proin leo lacus, eleifend ut libero quis, faucibus tincidunt elit. Quisque imperdiet vulputate
            vehicula, viverra augue at, ornare quam. Aenean a erat eu libero tristique molestie eget a turpis. Nulla
            scelerisque lorem eget risus iaculis, non congue nulla ultrices. Nam pharetra neque sit amet viverra Aenean
            Aenean luctus odio ac mauris blandit, et sodales nunc egestas. Sed imperdiet ut libero non dignissim.
            Curabitur pellentesque dolor vitae nibh venenatis, quis tempus elit elementum. Morbi hendrerit, neque vitae
            vitae imperdiet aliquet, velit massa cursus nisl, eget tincidunt est enim elementum nulla. Donec porta
            ornare sem ornare sem hendrerit. Maecenas nunc ipsum, finibus non tellus vitae, ullamcorper bibendum lectus.
            lectus. Ut elit quis erat eget, iaculis commodo nisi. Quisque diam neque, fermentum id tellus vitae, egestas
            egestas sollicitudin sollicitudin lectus. Sed tristique felis et blandit porttitor. Duis ac erat id purus
            sollicitudin tincidunt. Aliquam ligula nisi, facilisis sed lacus vel, ornare imperdiet nibh. Praesent arcu
            nisi, dapibus in volutpat quis, vulputate a odio. Sed quis accumsan ipsum, eget consectetur nisi. Etiam sem
            sem nisi, porta non venenatis ac, consectetur in est. Vivamus ultrices, augue malesuada rhoncus blandit,
            magna nisi bibendum nunc, consequat mollis enim mauris volutpat lectus. Nulla fermentum vitae ex vel
            efficitur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam
            finibus quam euismod dolor fringilla, ut mollis elit feugiat. Sed sollicitudin venenatis pellentesque. Etiam
            Etiam vehicula hendrerit urna non sagittis. Nunc non dignissim diam. Aliquam congue sodales neque sed
            sollicitudin. Vivamus sed odio mattis ante vulputate molestie. Duis sit amet malesuada elit. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus id gravida arcu. Cras
            Cras tincidunt efficitur augue id rhoncus. Nam mollis magna vitae mauris vehicula, in egestas.
          </p>
        </div>
        <div class="single-vendor__enhanced-side">
          <div class="single-vendor__enhanced-frame">
            <img
              class="single-vendor__enhanced-icon"
              src="https://static.wixstatic.com/media/e49d9d_ab983c917c1341dfadc5ad8482125f62~mv2_d_5934_3961_s_4_2.jpg"
            />
            <div class="single-vendor__enhanced-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>

          <div class="single-vendor__enhanced-frame">
            <img
              class="single-vendor__enhanced-icon"
              src="https://static.wixstatic.com/media/e49d9d_ab983c917c1341dfadc5ad8482125f62~mv2_d_5934_3961_s_4_2.jpg"
            />
            <div class="single-vendor__enhanced-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>
        </div>
      </div>
      <div class="single-vendor__enhanced-reviews">
        <div class="single-vendor__reviews-title">
          Articles | Reviews | Testimonials
        </div>
        <div class="single-vendor_reviews-container">
          <div class="single-vendor__enhanced-frame">
            <div class="single-vendor__enhanced-avatar">
              <avatar username="Jane Doe" :rounded="true"></avatar>
              <p class="single-vendor__enhanced-username">Jane Doe</p>
            </div>
            <div class="single-vendor__enhanced-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
            <p class="single-vendor__enhanced-link">Read more ...</p>
          </div>
          <div class="single-vendor__enhanced-frame">
            <div class="single-vendor__enhanced-avatar">
              <avatar username="Jane Doe" :rounded="true"></avatar>
              <p class="single-vendor__enhanced-username">Jane Doe</p>
            </div>
            <div class="single-vendor__enhanced-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
            <p class="single-vendor__enhanced-link">Read more ...</p>
          </div>
          <div class="single-vendor__enhanced-frame">
            <div class="single-vendor__enhanced-avatar">
              <avatar username="Jane Doe" :rounded="true"></avatar>
              <p class="single-vendor__enhanced-username">Jane Doe</p>
            </div>
            <div class="single-vendor__enhanced-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
            <p class="single-vendor__enhanced-link">Read more ...</p>
          </div>
        </div>
      </div>
      <div class="single-vendor__enhanced-others-container">
        <div class="single-vendor__enhanced-others-frame">
          <p class="single-vendor_enhanced-others-title">
            Pilot | POC
          </p>
          <p class="single-vendor_enhanced-others-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ante tortor. Vivamus elementum vulputate ex
            ex eu auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos Aliquam
            Aliquam faucibus rutrum arcu vel cursus. Fusce fringilla felis et sapien porttitor maximus.
          </p>
          <p class="single-vendor__enhanced-link">Read more ...</p>
        </div>
        <div class="single-vendor__enhanced-others-frame">
          <p class="single-vendor_enhanced-others-title">
            Social
          </p>
          <p class="single-vendor_enhanced-social-text">
            Follow Us on Social Media
          </p>
          <div class="single-vendor_enhanced-social-container">
            <img class="single-vendor_enhanced-social-icon" src="/images/svgs/listing/linkedin.svg" />
            <img class="single-vendor_enhanced-social-icon" src="/images/svgs/listing/facebook.svg" />
            <img class="single-vendor_enhanced-social-icon" src="/images/svgs/listing/twitter.svg" />
            <img class="single-vendor_enhanced-social-icon" src="/images/svgs/listing/instagram.svg" />
          </div>
        </div>
      </div>
      <similar-vendors :vendor-id="vendorId" class="single-vendor__similar-results" />

      <ad class="single-vendor__right-ad" position="right" direction="vertical" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import { Vendor } from '@/models'

@Component({
  name: 'enhanced-vendor'
})
export default class EnhancedVendor extends Vue {
  @Prop({ required: true }) data!: Vendor
  videoData: any = null

  playing() {}

  async mounted() {}

  get vendorId() {
    return this.$route.params.vendorId
  }

  historyBack() {
    window.history.back()
  }
}
</script>

<style lang="scss" scoped>
.single-vendor {
  @include desktop-max-width-layout;
  padding: 40px;
  text-align: left;
  background: white;
  position: relative;
}

$adMaxWidth: calc(50% - #{$desktopMaxWidth / 2} - 40px);

.single-vendor__right-ad {
  position: absolute;
  top: 110px;
  right: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}

.single-vendor__row {
  width: 100%;
  @include row;

  &:not(:first-child) {
    margin-top: 40px;
  }

  @include respondTo(mobile) {
    flex-direction: column;
  }
}

.single-vendor__frame {
  width: 100%;
  @include col--center;
  background: $colorNeutralsSnow;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.single-vendor__frame-video {
  width: 100%;
  @include col--center;
  background: $colorNeutralsSnow;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @include respondTo(mobile) {
    flex-direction: column;
  }
}

.single-vendor__enhanced-description {
  width: 100%;
  background: $colorNeutralsSnow;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex: 2;
  padding: 20px 30px;
  margin-right: 40px;
  p {
    @include typography(lg, normal);
    color: #546e7a;
  }
}

.single-vendor__enhanced-icon {
  width: 100%;
  object-fit: cover;
}

.single-vendor__enhanced-title {
  @include typography(lg, narrow, bold);
  color: #546e7a;
  text-align: center;
  margin: 16px 8px 16px 8px;
  padding: 8px 4px;
  @include respondTo(mobile) {
    @include typography(md, narrow, bold);
    margin: 8px 4px 8px 4px;
  }
}

.single-vendor__enhanced-avatar {
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

.single-vendor__enhanced-username {
  @include col--center;
  @include typography(xl, none, bold);
  margin-left: 24px;

  @include respondTo(mobile) {
    @include typography(md, none, bold);
    margin-left: 12px;
  }
}

.single-vendor__enhanced-link {
  @include typography(xl, narrow, bold);
  text-align: right;
  color: #212353;
  margin-left: auto;
  padding: 24px;
}

.single-vendor__enhanced-side {
  flex: 1;
  @include col;
  justify-content: center;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }

  @include respondTo(mobile) {
    flex-flow: row;
    margin-top: 20px;
  }
}

.single-vendor__enhanced-frame {
  @include col--center;
  width: 300px;
  height: 300px;
  border-radius: 16px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  margin-right: 10px;
  &:hover {
    background: $colorNeutralsSnow;
  }
  &:active {
    background: $colorLightGrey2;
  }

  @include respondTo(mobile) {
    width: 40%;
    height: 40%;
    border-radius: 15px;
  }
}

.single-vendor__enhanced-video {
  width: 50%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    background: $colorNeutralsSnow;
  }
  &:active {
    background: $colorLightGrey2;
  }

  @include respondTo(mobile) {
    width: 100%;
    height: auto;
    border-radius: 15px;
  }
}

.single-vendor__enhanced-reviews {
  width: 100%;
  margin-top: 36px;

  .single-vendor__reviews-title {
    @include typography(xl, narrow, bold);
    color: #011d58;
  }

  .single-vendor_reviews-container {
    @include col--center;
    display: flex;
    flex-direction: row;
    margin-top: 24px;
  }
}
.single-vendor__enhanced-others-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 360px;
  margin-top: 36px;
}

.single-vendor__enhanced-others-frame {
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

.single-vendor_enhanced-others-title {
  @include col--left;
  @include typography(xl-2, none);
  color: #212353;
  margin-left: 8px;
  margin-right: auto;
  margin-bottom: 16px;
  @include respondTo(mobile) {
    @include typography(xl, none);
    padding: 16px;
    border-radius: 16px;
  }
}

.single-vendor_enhanced-social-text {
  @include col--left;
  @include typography(xl, none);
  color: #4b5d68;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 50%;
}

.single-vendor_enhanced-others-text {
  @include col--left;
  @include typography(lg, none);
  color: #4b5d68;
  @include respondTo(mobile) {
    @include typography(md, none);
  }
}

.single-vendor_enhanced-social-container {
  @include col--center;
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
}

.single-vendor_enhanced-social-icon {
  margin-left: 8px;
  margin-right: 8px;
  @include respondTo(mobile) {
    margin: 0px 4px;
  }
}

.single-vendor__similar-results {
  width: 100%;
  margin: 20px 0;
}
</style>
