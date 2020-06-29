<template>
  <div class="single-vendor">
    <div v-if="loading" class="single-vendor__loading">
      Loading...
    </div>
    <template v-else-if="data">
      <div class="single-vendor__header">
        <img
          v-if="data.logo"
          alt="Vue logo"
          :src="data.logo"
          class="single-vendor__logo"
        />
        <img
          v-else
          alt="Vue logo"
          src="@/assets/logo.jpg"
          class="single-vendor__logo"
        />
        <span v-if="data.tool" class="single-vendor__tool">{{
          data.tool
        }}</span>
        <span v-if="data.name" class="single-vendor__title">{{
          data.name
        }}</span>
        <span v-if="data.jurisdiction" class="single-vendor__jurisdiction">{{
          data.jurisdiction
        }}</span>
      </div>
      <div class="single-vendor__main">
        <span v-if="functionalities" class="single-vendor__functionality">
          <strong>Functionality</strong>: {{ functionalities }}
        </span>
        <span v-if="platformLanguages" class="single-vendor__platform_language">
          <strong>Platform Language</strong>: {{ platformLanguages }}
        </span>
        <span
          v-if="linguisticFunctionalities"
          class="single-vendor__linguistic_functionality"
        >
          <strong>Linguistic Functionality</strong>:
          {{ linguisticFunctionalities }}
        </span>
        <span v-if="demographics" class="single-vendor__target_entity">
          <strong>Target Entity</strong>: {{ demographics }}
        </span>
        <span v-if="installations" class="single-vendor__installation">
          <strong>Installation</strong>: {{ installations }}
        </span>
        <div
          v-if="description"
          class="single-vendor__description"
          v-html="description"
        ></div>
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

  get description() {
    return this.data.description
  }

  get functionalities() {
    return this.data.functionalities.map((data) => data.name).join(', ')
  }

  get platformLanguages() {
    return this.data.platformLanguages.map((data) => data.name).join(', ')
  }

  get linguisticFunctionalities() {
    return this.data.linguisticFunctionalities
      .map((data) => data.name)
      .join(', ')
  }

  get demographics() {
    return this.data.demographics.map((data) => data.name).join(', ')
  }

  get installations() {
    return this.data.installations.map((data) => data.name).join(', ')
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
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 40px;
}

.single-vendor__header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  font-size: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;
}

.single-vendor__logo {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}

.single-vendor__tool {
  font-weight: bold;

  &::after {
    content: ',';
    margin: 0 2px;
  }
}

.single-vendor__title {
  font-weight: bold;
  font-style: italic;

  &::after {
    content: '-';
    margin: 0 2px;
  }
}

.single-vendor__jurisdiction {
  font-style: italic;
}

.single-vendor__main {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding-left: 10px;
}

.single-vendor__functionality,
.single-vendor__platform_language,
.single-vendor__linguistic_functionality,
.single-vendor__target_entity,
.single-vendor__installation {
  font-size: 18px;
  text-align: left;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.single-vendor__description {
  width: 100%;
  text-align: left;
}
</style>
