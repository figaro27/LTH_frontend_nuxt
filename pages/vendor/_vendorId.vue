<template>
  <div v-loading="loading" class="single-vendor">
    <template v-if="data">
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
          <div v-if="data.description" class="single-vendor__property">
            <div class="single-vendor__property-name">Description</div>
            <label class="single-vendor__property-value">{{ data.description }}</label>
          </div>
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
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { Vendor } from '@/models'

@Component({ name: 'single-vendor' })
export default class SingleVendor extends Vue {
  @State((state) => state.vendor.currentVendor) data!: Vendor

  loading = false

  get queryId() {
    return this.$route.params.vendorId
  }

  get logo() {
    return this.data.logo || '/img/logo-small.png'
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

  @Watch('queryId', { immediate: true })
  async onQueryId() {
    this.loading = true
    try {
      await this.$store.dispatch('vendor/loadById', this.queryId)
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.single-vendor {
  width: 100%;
  @include row;
  padding: 40px;
  text-align: left;
}

.single-vendor__frame {
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
  width: 160px;
  height: 160px;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
  }
}

.single-vendor__tool {
  @include typography(xl, narrow, bold);
  margin-bottom: 30px;
}

.single-vendor__details {
  width: 100%;
  flex: 1;
  @include col;
}

.single-vendor__property {
  width: 100%;
  @include row;
  align-items: center;
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
</style>
