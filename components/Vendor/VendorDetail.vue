<template>
  <div v-show="data" class="single-vendor__content">
    <ad class="single-vendor__left-ad" position="left" direction="vertical" />

    <div class="single-vendor__header">
      <a v-if="isConsolidation" href="#" class="single-vendor-header__link" @click="historyBack()"> Consolidations </a>
      <a v-else-if="isGraveyard" href="#" class="single-vendor-header__link" @click="historyBack()"> Graveyards </a>
      <a v-else href="#" class="single-vendor-header__link" @click="historyBack()">Search Results</a>
      <label class="single-vendor-header__link">&gt;</label>
      <div class="single-vendor__name">{{ tool }}</div>
    </div>
    <div class="single-vendor__row">
      <div class="single-vendor__frame single-vendor__main">
        <div class="single-vendor__logo">
          <img :src="logo" />
        </div>
        <div class="single-vendor__tool">
          {{ tool }}
        </div>
        <div v-if="isGraveyard" class="single-vendor__state">
          <img src="/images/svgs/graveyard.svg" />
          <label class="single-vendor__graveyard">Died {{ data.graveyardData.date }} </label>
        </div>
        <div v-if="isConsolidation" class="single-vendor__state">
          <img src="/images/svgs/consolidation.svg" />
          <label class="single-vendor__consolidation">Acquired by {{ data.consolidationData.consolidatedWith }} </label>
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
          <div
            v-if="data && data.enhancedListingEnabled && !!data.enhancedListingData"
            class="single-vendor__enhanced-links"
          >
            <a
              v-if="data.website && data.type !== 'consolidation'"
              class="single-vendor__enhanced-website"
              :href="data.website"
              target="_blank"
            >
              Visit Website
            </a>

            <a
              v-if="data.enhancedListingData.demoUrl"
              class="single-vendor__enhanced-link"
              :href="data.enhancedListingData.demoUrl"
              target="_blank"
            >
              Request Demo <img src="/images/svgs/link.svg" />
            </a>
          </div>
          <template v-else-if="data">
            <a
              v-if="data.website && data.type !== 'consolidation'"
              class="single-vendor__link"
              :href="data.website"
              target="_blank"
            >
              Go to Website <img src="/images/svgs/link.svg" />
            </a>
          </template>
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
                  v-for="(demographic, index) of demographics"
                  :key="`demographic${index}`"
                  class="single-vendor__property__demographic"
                >
                  {{ index &lt; demographics.length - 1 ? `${demographic.name}, ` : demographic.name }}
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import { Vendor } from '@/models'

@Component({
  name: 'vendor-detail'
})
export default class VendorDetail extends Vue {
  @Prop({ required: true }) data!: Vendor | null | undefined

  get tool() {
    if (!this.data) {
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

  get demographics() {
    if (!this.data) return ''
    return this.data.demographics.map((data) => data.name).join(', ')
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

  get isConsolidation(): boolean {
    const { data } = this
    if (!data) return false
    return !!data.consolidationData && JSON.stringify(data.consolidationData) !== '{}'
  }

  get isGraveyard(): boolean {
    const { data } = this
    if (!data) return false
    return !!data.graveyardData && JSON.stringify(data.graveyardData) !== '{}'
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

  .single-vendor__property-name {
    min-width: 240px;
  }
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

.single-vendor__side {
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
  @include col;
  align-items: center;
  padding: 15px;
  overflow: hidden;

  .single-vendor__property {
    width: 100%;
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

  @include respondTo(mobile) {
    flex: 1;
    align-items: center;
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
  margin: 10px 0 0 10px;
  @include typography(lg-1);
  color: $colorGreen;
  text-decoration: underline;
  text-decoration-color: $colorGreen;

  img {
    margin-left: 10px;
  }
}

.single-vendor__enhanced-links {
  @include row;
  margin: 10px 10px 0 0;
}

.single-vendor__enhanced-website {
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

.single-vendor__enhanced-link {
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
