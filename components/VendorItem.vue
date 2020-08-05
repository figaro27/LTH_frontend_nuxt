<template>
  <nuxt-link class="vendor-item" :to="url">
    <h4 v-if="data.name" class="vendor-item__title">
      <text-highlight :queries="highlightQueries">{{ data.name }}</text-highlight>
    </h4>
    <h5 v-if="hq" class="vendor-item__hq">
      <text-highlight :queries="highlightQueries">{{ hq }}</text-highlight>
    </h5>
    <div class="vendor-item__row">
      <span v-if="data.tool" class="vendor-item__functionality">
        <text-highlight :queries="highlightQueries">{{ data.tool }}</text-highlight>
      </span>
      <span v-if="functionality" class="vendor-item__functionality">
        <text-highlight :queries="highlightQueries">{{ functionality }}</text-highlight>
      </span>
      <span v-if="platformLanguage" class="vendor-item__platform_language">
        <text-highlight :queries="highlightQueries">{{ platformLanguage }}</text-highlight>
      </span>
      <span v-if="targetEntity" class="vendor-item__target_entity">
        <text-highlight :queries="highlightQueries">{{ targetEntity }}</text-highlight>
      </span>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Getter, Prop, Vue } from 'nuxt-property-decorator'

import { Vendor } from '@/models'

@Component({ name: 'vendor-item' })
export default class VendorItem extends Vue {
  @Prop({ required: true }) data!: Vendor
  @Getter('highlightQueries', { namespace: 'search' }) highlightQueries!: string[]

  get hq() {
    return this.data.hqs.map((item) => item.name).join(',')
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
  width: calc(100% - 40px);
  @include col;
  padding: 10px 15px;
  margin: 10px 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  color: $colorNavy;
}

.vendor-item__title {
  @include typography(lg, default, bold);
  color: $colorNavy;
  margin-bottom: 3px;
}

.vendor-item__hq {
  @include typography(md-1, default, bold);
  color: $colorNeutralsGrey;
  margin-bottom: 8px;
}

.vendor-item__tool,
.vendor-item__functionality,
.vendor-item__platform_language,
.vendor-item__linguistic_functionality,
.vendor-item__target_entity,
.vendor-item__installation {
  @include typography(md-1);
  color: $colorDarkGrey;

  &:not(:last-child)::after {
    content: '|';
    font-size: 14px;
    margin: 0 2px 0 7px;
  }
}
</style>
