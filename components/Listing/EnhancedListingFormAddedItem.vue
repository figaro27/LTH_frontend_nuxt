<template>
  <div class="listing-form__item-container">
    <radial-progress-bar
      v-if="isUploading && isFile"
      class="listing-form__item-button"
      :diameter="30"
      stroke-width="4"
      inner-stroke-width="4"
      :completed-steps="completedSpeed"
      total-steps="1"
      animate-speed="5000"
    />
    <img v-if="!isUploading && isFile" class="listing-form__item-button" src="/images/svgs/tick.svg" />
    <label class="listing-form__item-text">{{ title }}</label>
    <img class="listing-form__item-button" src="/images/svgs/close.svg" @click="removeLink" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import RadialProgressBar from 'vue-radial-progress'
@Component({
  name: 'enhanced-listing-form-added-item',
  components: {
    RadialProgressBar
  }
})
export default class EnhancedListingFormAddedItem extends Vue {
  @Prop({ default: '' }) title!: string
  @Prop({ default: false }) isFile!: boolean
  @Prop() index!: number
  @Prop() isUploading!: boolean
  @Prop() completedSpeed!: number
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
  padding: 8px 16px;
}
.listing-form__item-text {
  @include typography(lg, default);
  width: 100%;
  margin: auto 20px;
  color: $colorNavy;
  font-size: 13px;
}
.listing-form__item-button {
  width: 20px;
  height: 20px;
  margin: 4px;
}
</style>
