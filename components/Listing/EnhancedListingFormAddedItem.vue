<template>
  <div class="listing-form__item-container">
    <label class="listing-form__item-text">{{ link }}</label>
    <img class="calendar-button__icon" src="/images/svgs/close.svg" @click="removeLink" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({ name: 'enhanced-listing-form-added-item' })
export default class EnhancedListingFormAddedItem extends Vue {
  @Prop({ default: '' }) link!: string
  @Prop() index!: number

  removeLink() {
    this.$emit('remove', this.index)
  }
}
</script>
<style lang="scss" scoped>
.listing-form__item-container {
  @include row;
  border-radius: 4px;
  border: solid 1px $colorDarkGrey;
  padding: 8px;
}
.listing-form__item-text {
  @include typography(md, default);
  width: 100%;
  margin: auto 20px;
  color: $colorNavy;
  font-size: 13px;
}
</style>
