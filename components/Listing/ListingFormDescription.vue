<template>
  <div class="listing-form-description">
    <label class="listing-form-description__label">Description *</label>
    <textarea v-model="_value" class="listing-form-description__textarea" @keydown="onKeydown" />
    <label v-if="!error" class="listing-form-description__chars">{{ value.length }} / 500</label>
    <label v-else class="listing-form-description__error">{{ error }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'listing-form-description'
})
export default class ListingFormDescription extends Vue {
  @Prop({ required: true }) value!: string
  @Prop({ default: null }) error!: string | null

  get _value() {
    return this.value
  }

  set _value(newVal: string) {
    this.$emit('input', newVal)
    this.$emit('change', newVal)
  }

  onKeydown(event: KeyboardEvent) {
    if (this.value.length >= 500 && !['Backspace', 'Delete'].includes(event.key)) {
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
  margin: 24px 12px;
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
  border-radius: 8px;
  border: 1px solid $colorDarkGrey;
  background: transparent;

  &:focus {
    border-color: $colorGreen;
  }
}

.listing-form-input__chars {
  @include typography(md);
  color: $colorDarkGrey;
}
</style>
