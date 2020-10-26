<template>
  <div class="single-vendor">
    <div class="single-vendor__content">
      <ad class="single-vendor__left-ad" position="left" direction="vertical" />

      <template v-if="data">
        <div class="single-vendor__header">
          <a
            v-if="JSON.stringify(data.consolidationData) !== '{}'"
            href="#"
            class="single-vendor-header__link"
            @click="historyBack()"
          >
            Consolidations
          </a>
          <a
            v-else-if="JSON.stringify(data.graveyardData) !== '{}'"
            href="#"
            class="single-vendor-header__link"
            @click="historyBack()"
          >
            Graveyards
          </a>
          <a v-else href="#" class="single-vendor-header__link" @click="historyBack()">Search Results</a>
          <label class="single-vendor-header__link">&gt;</label>
          <div class="single-vendor__name">{{ data.tool }}</div>
        </div>
        <div class="single-vendor__row">
          <div class="single-vendor__frame single-vendor__main">
            <div class="single-vendor__logo">
              <img :src="logo" />
            </div>
            <div class="single-vendor__tool">
              {{
                JSON.stringify(data.graveyardData) === '{}' && JSON.stringify(data.consolidationData) === '{}'
                  ? tool
                  : data.tool
              }}
            </div>
            <div v-if="JSON.stringify(data.graveyardData) !== '{}'" class="single-vendor__state">
              <img src="/images/svgs/graveyard.svg" />
              <label class="single-vendor__graveyard">Died {{ data.graveyardData.date }} </label>
            </div>
            <div v-if="JSON.stringify(data.consolidationData) !== '{}'" class="single-vendor__state">
              <img src="/images/svgs/consolidation.svg" />
              <label class="single-vendor__consolidation"
                >Acquired by {{ data.consolidationData.consolidatedWith }}
              </label>
              <label class="single-vendor__consolidation"> {{ data.consolidationData.date }} </label>
            </div>
            <div class="single-vendor__details">
              <div class="single-vendor__property">
                <div class="single-vendor__property-name">Functionality</div>
                <label class="single-vendor__property-value">{{ functionalities }}</label>
              </div>
              <div class="single-vendor__property">
                <div class="single-vendor__property-name">Sub-Functionality</div>
                <label class="single-vendor__property-value">{{ subFunctionalities }}</label>
              </div>
              <div class="single-vendor__property">
                <div class="single-vendor__property-name">Platform Language</div>
                <label class="single-vendor__property-value">{{ platformLanguages }}</label>
              </div>
              <div class="single-vendor__property">
                <div class="single-vendor__property-name">Linguistic Efficacy</div>
                <label class="single-vendor__property-value">{{ linguisticFunctionalities }}</label>
              </div>
              <div v-if="features" class="single-vendor__property">
                <div class="single-vendor__property-name">Features</div>
                <label class="single-vendor__property-value">{{ features }}</label>
              </div>
              <a
                v-if="data.website && data.type !== 'consolidation'"
                class="single-vendor__link"
                :href="data.website"
                target="_blank"
              >
                Go to Website <img src="/images/svgs/link.svg" />
              </a>
            </div>
          </div>
          <div class="single-vendor__side">
            <div class="single-vender__side__left">
              <div class="single-vendor__frame single-vendor__offices">
                <div class="single-vendor__property">
                  <div class="single-vendor__property-name">HQ</div>
                  <label class="single-vendor__property-value">{{ hqs }}</label>
                </div>
                <div class="single-vendor__property">
                  <div class="single-vendor__property-name">Offices</div>
                  <label class="single-vendor__property-value">{{ offices }}</label>
                </div>
              </div>
              <div class="single-vendor__frame single-vendor__others">
                <div class="single-vendor__property">
                  <div class="single-vendor__property-name">Practice Area</div>
                  <label class="single-vendor__property-value">{{ practiceAreas }}</label>
                </div>
                <div class="single-vendor__property">
                  <div class="single-vendor__property-name">Target Entity</div>
                  <div class="single-vendor__property__demographics">
                    <div
                      v-for="(demographic, index) of data.demographics"
                      :key="`demographic${index}`"
                      class="single-vendor__property__demographic"
                    >
                      {{ index &lt; data.demographics.length - 1 ? `${demographic.name}, ` : demographic.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="single-vendor__frame single-vendor__others">
              <div class="single-vendor__property">
                <div class="single-vendor__property-name">Deployment</div>
                <label class="single-vendor__property-value">{{ installations }}</label>
              </div>
              <div class="single-vendor__property">
                <div class="single-vendor__property-name">Integrations</div>
                <label class="single-vendor__property-value">{{ integrations }}</label>
              </div>
              <div class="single-vendor__property">
                <div class="single-vendor__property-name">Existing Customers</div>
                <label class="single-vendor__property-value">{{ existingCustomers }}</label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="data.description" class="single-vendor__row">
          <div class="single-vendor__frame single-vendor__description">
            <client-only>
              <div v-html="data.description" />
            </client-only>
          </div>
        </div>
        <div class="single-vendor__row">
          <div class="single-vendor__enhanced-description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras efficitur metus vitae malesuada interdum.
              Proin Proin leo lacus, eleifend ut libero quis, faucibus tincidunt elit. Quisque imperdiet vulputate
              vehicula, viverra augue at, ornare quam. Aenean a erat eu libero tristique molestie eget a turpis. Nulla
              scelerisque lorem eget risus iaculis, non congue nulla ultrices. Nam pharetra neque sit amet viverra
              Aenean luctus odio ac mauris blandit, et sodales nunc egestas. Sed imperdiet ut libero non dignissim.
              Curabitur pellentesque dolor vitae nibh venenatis, quis tempus elit elementum. Morbi hendrerit, neque
              vitae imperdiet aliquet, velit massa cursus nisl, eget tincidunt est enim elementum nulla. Donec porta
              ornare sem ornare sem hendrerit. Maecenas nunc ipsum, finibus non tellus vitae, ullamcorper bibendum
              lectus. Ut elit quis erat eget, iaculis commodo nisi. Quisque diam neque, fermentum id tellus vitae,
              egestas sollicitudin sollicitudin lectus. Sed tristique felis et blandit porttitor. Duis ac erat id purus
              sollicitudin tincidunt. Aliquam ligula nisi, facilisis sed lacus vel, ornare imperdiet nibh. Praesent arcu
              nisi, dapibus in volutpat quis, vulputate a odio. Sed quis accumsan ipsum, eget consectetur nisi. Etiam
              sem nisi, porta non venenatis ac, consectetur in est. Vivamus ultrices, augue malesuada rhoncus blandit,
              magna nisi bibendum nunc, consequat mollis enim mauris volutpat lectus. Nulla fermentum vitae ex vel
              efficitur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam
              finibus quam euismod dolor fringilla, ut mollis elit feugiat. Sed sollicitudin venenatis pellentesque.
              Etiam vehicula hendrerit urna non sagittis. Nunc non dignissim diam. Aliquam congue sodales neque sed
              sollicitudin. Vivamus sed odio mattis ante vulputate molestie. Duis sit amet malesuada elit. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus id gravida arcu.
              Cras tincidunt efficitur augue id rhoncus. Nam mollis magna vitae mauris vehicula, in egestas.
            </p>
          </div>
          <div class="single-vendor__enhanced-side">
            <div class="single-vendor__enhanced-frame">
              <no-ssr placeholder="Loading...">
                <youtube ref="youtube" video-id="lG0Ys-2d4MA"></youtube>
              </no-ssr>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ante tortor. Vivamus elementum vulputate
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
      </template>

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

  get tool() {
    if (this.data === null) {
      return null
    }
    if (this.data.tool === null) {
      return this.data.name
    } else if (this.data.tool !== this.data.name) {
      return `${this.data.tool} by ${this.data.name}`
    }
    return this.data.name
  }

  get logo() {
    if (!this.data) return '/images/logo-small.png'
    return this.data.logo || '/images/logo-small.png'
  }

  get functionalities() {
    if (!this.data) return ''
    return this.data.functionalities.map((data) => data.name).join(', ')
  }

  get subFunctionalities() {
    if (!this.data) return ''
    return this.data.subFunctionalities.map((data) => data.name).join(', ')
  }

  get platformLanguages() {
    if (!this.data) return ''
    return this.data.platformLanguages.map((data) => data.name).join(', ')
  }

  get linguisticFunctionalities() {
    if (!this.data) return ''
    return this.data.linguisticFunctionalities.map((data) => data.name).join(', ')
  }

  get hqs() {
    if (!this.data) return ''
    return this.data.hqs.map((data) => data.name).join(', ')
  }

  get offices() {
    if (!this.data) return ''
    return this.data.offices.map((data) => data.name).join(', ')
  }

  get practiceAreas() {
    if (!this.data) return ''
    return this.data.practiceAreas.map((data) => data.name).join(', ')
  }

  get installations() {
    if (!this.data) return ''
    return this.data.installations.map((data) => data.name).join(', ')
  }

  get integrations() {
    if (!this.data) return ''
    return this.data.integrations.map((data) => data.name).join(', ')
  }

  get existingCustomers() {
    if (!this.data) return ''
    return this.data.existingCustomers.map((data) => data.name).join(', ')
  }

  get features() {
    if (!this.data) return ''
    return this.data.features.map((data) => data.name).join(', ')
  }

  historyBack() {
    window.history.back()
  }
}
</script>

<style lang="scss" scoped>
.single-vendor__header {
  width: 100%;
  background-color: #cbef95;
  padding: 16px;
  display: flex;

  .single-vendor-header__link {
    margin-left: 16px;
    color: #979797;
    text-decoration: none;
  }

  .single-vendor__name {
    margin-left: 16px;
    font-size: 1.125rem;
    color: #011d58;
  }
}

.single-vendor {
  @include desktop-max-width-layout;
  padding: 40px;
  text-align: left;
  background: white;
  position: relative;
}

$adMaxWidth: calc(50% - #{$desktopMaxWidth / 2} - 40px);

.single-vendor__left-ad {
  position: absolute;
  top: 110px;
  left: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}

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

.single-vendor__main {
  flex: 3;
  padding: 20px 30px;
  margin-right: 40px;
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
  height: 100%;
  color: #546e7a;
  text-align: center;
  align-items: center;
  margin: 16px 8px 16px 8px;
}

.single-vendor__enhanced-avatar {
  width: 100%;
  display: flex;
  flex-direct: row;
  padding: 24px 36px 16px 16px;
}

.single-vendor__enhanced-username {
  @include col--center;
  @include typography(xl, none, bold);
  margin-left: 24px;
}

.single-vendor__enhanced-link {
  @include typography(xl, narrow, bold);
  text-align: right;
  color: #212353;
  margin-left: auto;
  padding: 24px;
}
.single-vendor__side {
  flex: 2;
  @include col;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }

  @include respondTo(mobile) {
    flex-flow: row;
    margin-top: 20px;
  }
}

.single-vendor__enhanced-side {
  flex: 1;
  @include col;
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
    width: 200px;
    height: 200px;
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
    width: 150px;
    height: 150px;
    padding: 32px;
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
}

.single-vendor__logo {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
  }
}

.single-vendor__tool {
  @include typography(xl-2, narrow, bold);
  margin-bottom: 8px;
  color: $colorNavy;
}

.single-vendor__state {
  display: flex;
  margin-bottom: 32px;
  @include col;
}

.single-vendor__graveyard {
  color: #546e7a;
  justify-content: center;
  display: flex;
  align-items: center;
}

.single-vendor__consolidation {
  color: #fbb540;
  justify-content: center;
  display: flex;
  align-items: center;
}

.single-vendor__details {
  width: 100%;
  margin-top: 16px;
  flex: 1;
  @include col;
}

.single-vendor__property {
  width: 100%;
  @include row;
  min-height: 55px;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
}

.single-vendor__property-name {
  @include typography(lg-1, default, bold);
  color: $colorNavy;
}

.single-vendor__property-value {
  @include typography(lg, default);
  color: $colorLightGrey;
}

.single-vendor__main {
  .single-vendor__property-name {
    min-width: 240px;
  }
}

.single-vendor__side {
  flex: 1;
  @include col;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }

  @include respondTo(mobile) {
    flex-flow: row;
    margin-top: 20px;
  }
}

.single-vender__side__left {
  @include respondTo(mobile) {
    margin-right: 15px;
    margin-bottom: 0px !important;
    .single-vendor__others {
      margin-top: 20px;
    }
  }
}

.single-vendor__offices {
  padding: 15px;

  .single-vendor__property-name {
    min-width: 100px;
  }

  margin-bottom: 20px;
}

.single-vendor__others {
  padding: 15px;

  .single-vendor__property {
    @include col;
    align-items: flex-start;
    justify-content: flex-start;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  .single-vendor__property-name {
    margin-bottom: 5px;
  }
}

.single-vendor__property__demographics {
  display: flex;
  flex-wrap: wrap;
}

.single-vendor__property__demographic {
  @include row--center;
  @include typography(lg, default);
  height: 20px;
  color: $colorLightGrey;
  margin: 3px;
}

.single-vendor__link {
  @include row;
  align-items: center;
  margin-top: 10px;
  @include typography(lg-1);
  color: $colorGreen;
  text-decoration: underline;
  text-decoration-color: $colorGreen;

  img {
    margin-left: 10px;
  }
}

.single-vendor__description {
  width: 100%;
  @include row;
  @include typography(lg-1);
  color: $colorDarkGrey;
  padding: 20px 30px;
  margin-bottom: 40px;
  text-align: left;
  overflow: hidden;
}

.single-vendor__similar-results {
  width: 100%;
  margin: 20px 0;
}
</style>

<style lang="scss">
.single-vendor__description {
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
