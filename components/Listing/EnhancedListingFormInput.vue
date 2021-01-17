<template>
  <div class="listing-form-input">
    <label class="listing-form-input__label">{{ label }}</label>
    <input v-model="_value" :name="name" class="listing-form-input__input" :required="required ? 'required' : ''" />
    <label v-if="error" class="listing-form-input__error">{{ error }}</label>
    <label v-else class="listing-form-input__placeholder">{{ placeholder }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ name: 'enhanced-listing-form-input' })
export default class EnhancedListingFormInput extends Vue {
  @Prop({ required: true }) label!: string
  @Prop({ default: '' }) name!: string
  @Prop({ default: null }) error!: string | null
  @Prop({ default: '' }) placeholder!: string
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ default: '' }) value!: string

  get _value() {
    return this.value
  }

  set _value(newVal: string) {
    this.$emit('input', newVal)
    this.$emit('change', newVal)
  }
}
</script>

<style lang="scss" scoped>
.listing-form-input {
  width: 100%;
  text-align: left;
  padding: 12px;

  @include respondTo(mobile) {
    padding: 6px;
  }
}

.listing-form-input__label {
  @include typography(lg, default, bold);
  color: $colorDarkGrey;
}

.listing-form-input__input {
  width: 100%;
  height: 48px;
  min-width: 200px;
  margin: 4px 8px 4px 0;
  padding: 0 16px;
  @include row--center;
  @include typography(lg);
  border-radius: 4px;
  border: 1px solid $colorDarkGrey;
  background: transparent;

  &:focus {
    border-color: $colorGreen;
  }
}

.listing-form-input__error {
  @include typography(md);
  color: $colorRed;
}

.listing-form-input__placeholder {
  @include typography(md);
  color: $colorDarkGrey;
}
</style>
