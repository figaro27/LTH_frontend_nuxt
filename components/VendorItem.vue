<template>
  <nuxt-link class="vendor-item" :to="url">
    <div class="vendor-item__row">
      <span v-if="data.tool" class="vendor-item__tool">
        <text-highlight :queries="highlightQueries">{{ data.tool }}</text-highlight>
      </span>
      <span v-if="data.name" class="vendor-item__title">
        <text-highlight :queries="highlightQueries">{{ data.name }}</text-highlight>
      </span>
      <span v-if="jurisdiction" class="vendor-item__jurisdiction">
        <text-highlight :queries="highlightQueries">{{ jurisdiction }}</text-highlight>
      </span>
    </div>
    <div class="vendor-item__row">
      <span v-if="functionality" class="vendor-item__functionality">
        <text-highlight :queries="highlightQueries">{{ functionality }}</text-highlight>
      </span>
      <span v-if="platformLanguage" class="vendor-item__platform_language">
        <text-highlight :queries="highlightQueries">{{ platformLanguage }}</text-highlight>
      </span>
      <span v-if="linguisticFunctionality" class="vendor-item__linguistic_functionality">
        <text-highlight :queries="highlightQueries">{{ linguisticFunctionality }}</text-highlight>
      </span>
      <span v-if="targetEntity" class="vendor-item__target_entity">
        <text-highlight :queries="highlightQueries">{{ targetEntity }}</text-highlight>
      </span>
      <span v-if="installation" class="vendor-item__installation">
        <text-highlight :queries="highlightQueries">{{ installation }}</text-highlight>
      </span>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { Vendor } from '@/models'

@Component({ name: 'vendor-item' })
export default class VendorItem extends Vue {
  @Prop({ required: true }) data!: Vendor
  @Getter('highlightQueries', { namespace: 'search' }) highlightQueries!: string[]

  get jurisdiction() {
    return this.data.jurisdictions.map((item) => item.name).join(',')
  }

  get functionality() {
    return this.data.functionalities.map((item) => item.name).join(',')
  }

  get platformLanguage() {
    return this.data.functionalities.map((item) => item.name).join(',')
  }

  get linguisticFunctionality() {
    return this.data.linguisticFunctionalities.map((item) => item.name).join(',')
  }

  get targetEntity() {
    return this.data.demographics.map((item) => item.name).join(',')
  }

  get installation() {
    return this.data.installations.map((item) => item.name).join(',')
  }

  get url() {
    return `/vendor/${this.data.id}`
  }
}
</script>

<style lang="scss" scoped>
.vendor-item {
  width: calc(100% - 10px);
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 3px 5px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  text-decoration: none;
}

.vendor-item__row {
  display: flex;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
}

.vendor-item__tool {
  font-size: 16px;
  font-weight: bold;

  &::after {
    content: ',';
    font-size: 16px;
    margin: 0 2px;
  }
}

.vendor-item__title {
  font-size: 16px;
  font-weight: bold;
  font-style: italic;

  &::after {
    content: '-';
    font-size: 16px;
    margin: 0 2px;
  }
}

.vendor-item__jurisdiction {
  font-size: 16px;
  font-style: italic;
}

.vendor-item__functionality,
.vendor-item__platform_language,
.vendor-item__linguistic_functionality,
.vendor-item__target_entity,
.vendor-item__installation {
  font-size: 14px;

  &:not(:last-child)::after {
    content: '|';
    font-size: 14px;
    margin: 0 2px;
  }
}
</style>
