<template>
  <nuxt-link class="vendor-item" :to="url">
    <div class="vendor-item__row">
      <span v-if="data.tool" class="vendor-item__tool">{{ data.tool }}</span>
      <span v-if="data.name" class="vendor-item__title">{{ data.name }}</span>
      <span v-if="data.jurisdiction" class="vendor-item__jurisdiction">{{
        data.jurisdiction
      }}</span>
    </div>
    <div class="vendor-item__row">
      <span v-if="data.functionality" class="vendor-item__functionality">{{
        data.functionality
      }}</span>
      <span
        v-if="data.platformLanguage"
        class="vendor-item__platform_language"
        >{{ data.platformLanguage }}</span
      >
      <span
        v-if="data.linguisticFunctionality"
        class="vendor-item__linguistic_functionality"
        >{{ data.linguisticFunctionality }}</span
      >
      <span v-if="data.targetEntity" class="vendor-item__target_entity">{{
        data.targetEntity
      }}</span>
      <span v-if="data.installation" class="vendor-item__installation">{{
        data.installation
      }}</span>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Vendor } from '@/models'

@Component({ name: 'vendor-item' })
export default class VendorItem extends Vue {
  @Prop({ required: true }) data!: Vendor

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
