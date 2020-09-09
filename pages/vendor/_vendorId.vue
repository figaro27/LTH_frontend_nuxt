<template>
  <div class="single-vendor">
    <div class="single-vendor__content">
      <template>
        <div class="single-vendor__row">
          <div class="single-vendor__frame single-vendor__main">
            <div class="single-vendor__logo">
              <img :src="logo" />
            </div>
            <div class="single-vendor__tool">{{ data.tool }}</div>
            <div class="single-vendor__details">
              <div class="single-vendor__property">
                <div class="single-vendor__property-name">Vendor</div>
                <label class="single-vendor__property-value">{{ data.name }}</label>
              </div>
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
              <a v-if="data.website" class="single-vendor__link" :href="data.website" target="_blank">
                Go to Website <img src="/images/svgs/link.svg" />
              </a>
            </div>
          </div>
          <div class="single-vendor__side">
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
                    {{ demographic.name }}
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
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

import { Vendor } from '@/models'
import { api } from '@/utils'

@Component({
  name: 'single-vendor',
  async asyncData(ctx) {
    const { params, payload } = ctx
    if (payload) {
      return { data: payload }
    } else {
      const res = await api.get(`vendors/${params.vendorId}`)
      console.log('res: ', res.data.data)
      return {
        data: res.data.data
      }
    }
  }
})
export default class SingleVendor extends Vue {
  data!: Vendor

  @Watch('$route.params.vendorId', { immediate: true })
  async onVendorIdChange() {
    const { data } = await api.get(`vendors/${this.$route.params.vendorId}`)
    this.data = data.data
  }

  get logo() {
    return this.data.logo || '/images/logo-small.png'
  }

  get functionalities() {
    return this.data.functionalities.map((data) => data.name).join(', ')
  }

  get subFunctionalities() {
    return this.data.subFunctionalities.map((data) => data.name).join(', ')
  }

  get platformLanguages() {
    return this.data.platformLanguages.map((data) => data.name).join(', ')
  }

  get linguisticFunctionalities() {
    return this.data.linguisticFunctionalities.map((data) => data.name).join(', ')
  }

  get hqs() {
    return this.data.hqs.map((data) => data.name).join(', ')
  }

  get offices() {
    return this.data.offices.map((data) => data.name).join(', ')
  }

  get practiceAreas() {
    return this.data.practiceAreas.map((data) => data.name).join(', ')
  }

  get installations() {
    return this.data.installations.map((data) => data.name).join(', ')
  }

  get integrations() {
    return this.data.integrations.map((data) => data.name).join(', ')
  }

  get features() {
    return this.data.features.map((data) => data.name).join(', ')
  }
}
</script>

<style lang="scss" scoped>
.single-vendor {
  @include desktop-max-width-layout;
  padding: 40px;
  text-align: left;
  background: white;
}

.single-vendor__row {
  width: 100%;
  @include row;

  &:not(:first-child) {
    margin-top: 40px;
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
  margin-bottom: 30px;
  color: $colorNavy;
}

.single-vendor__details {
  width: 100%;
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
}

.single-vendor__offices {
  padding: 15px;

  .single-vendor__property-name {
    min-width: 100px;
  }
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
  @include typography(sm);
  background: #d8d8d8;
  border-radius: 20px;
  height: 20px;
  padding: 0 5px;
  color: $colorDarkGrey;
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
  }
}
</style>
