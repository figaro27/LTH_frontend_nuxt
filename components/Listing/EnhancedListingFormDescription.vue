<template>
  <div class="listing-form-description">
    <label class="listing-form-description__label">{{ name }} *</label>
    <textarea v-model="_value" class="listing-form-description__textarea" @keydown="onKeydown" />
    <label v-if="!error" class="listing-form-description__chars">{{ value.length }} / {{ length }}</label>
    <label v-else class="listing-form-description__error">{{ error }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'enhanced-listing-form-description'
})
export default class EnhancedListingFormDescription extends Vue {
  @Prop({ required: true }) value!: string
  @Prop({ required: true }) length!: number
  @Prop({ required: true }) name!: string
  @Prop({ default: null }) error!: string | null

  get _value() {
    return this.value
  }

  set _value(newVal: string) {
    this.$emit('input', newVal)
    this.$emit('change', newVal)
  }

  onKeydown(event: KeyboardEvent) {
    if (this.value.length >= this.length && !['Backspace', 'Delete'].includes(event.key)) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
.listing-form-description {
  width: 100%;
  text-align: left;
  margin: 12px 12px;
}

.listing-form-description__label {
  @include typography(lg, default, bold);
  color: $colorDarkGrey;
}

.listing-form-description__textarea {
  width: 100%;
  height: 280px;
  margin: auto auto 8px auto;
  padding: 8px 16px 0;
  @include row--center;
  @include typography(lg);
  border-radius: 4px;
  border: 1px solid $colorDarkGrey;
  background: transparent;

  &:focus {
    border-color: $colorGreen;
  }
}

.listing-form-description__chars {
  @include typography(md);
  color: $colorDarkGrey;
}
.listing-form-description__error {
  @include typography(md);
  color: red;
}
</style>
