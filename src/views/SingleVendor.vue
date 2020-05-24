<template>
  <div class="single-vendor">
    <div v-if="loading" class="single-vendor__loading">
      Loading...
    </div>
    <template v-else-if="data">
      <div class="single-vendor__header">
        <img alt="Vue logo" src="@/assets/logo.png" class="single-vendor__logo">
        <span v-if="data.tool" class="single-vendor__tool">{{data.tool}}</span>
        <span v-if="data.name" class="single-vendor__title">{{data.name}}</span>
        <span v-if="data.jurisdiction" class="single-vendor__jurisdiction">{{data.jurisdiction}}</span>
      </div>
      <div class="single-vendor__main">
        <span v-if="data.functionality" class="single-vendor__functionality">
          <strong>Functionality</strong>: {{data.functionality}}
        </span>
        <span v-if="data.platformLanguage" class="single-vendor__platform_language">
          <strong>Platform Language</strong>: {{data.platformLanguage}}
        </span>
        <span v-if="data.linguisticFunctionality" class="single-vendor__linguistic_functionality">
          <strong>Linguistic Functionality</strong>: {{data.linguisticFunctionality}}
        </span>
        <span v-if="data.targetEntity" class="single-vendor__target_entity">
          <strong>Target Entity</strong>: {{data.targetEntity}}
        </span>
        <span v-if="data.installation" class="single-vendor__installation">
          <strong>Installation</strong>: {{data.installation}}
        </span>
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
  @State(state => state.vendor.currentVendor) data!: Vendor

  loading = false

  get queryId () {
    return this.$route.params.vendorId
  }

  @Watch('queryId', { immediate: true })
  async onQueryId () {
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
</style>
