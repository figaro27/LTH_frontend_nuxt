<template>
  <div class="listing-form-input">
    <label class="listing-form-input__label">{{ label }}</label>
    <div class="listing-form-input__input">
      <label class="listing-form-input__name">{{ value.name }}</label>
      <button class="listing-form-input__upload" @click="onPickFile">Add</button>
      <input
        ref="fileInput"
        type="file"
        :required="required ? 'required' : ''"
        style="dispaly: none"
        class="listing-form-input__file"
      />
    </div>
    <label v-if="error" class="listing-form-input__error">{{ error }}</label>
    <label v-else class="listing-form-input__placeholder">{{ placeholder }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ name: 'enhanced-listing-form-file' })
export default class EnhancedListingFormFile extends Vue {
  @Prop({ required: true }) label!: string
  @Prop({ default: '' }) name!: string
  @Prop({ default: null }) error!: string | null
  @Prop({ default: '' }) placeholder!: string
  @Prop({ type: Boolean, default: false }) required!: boolean

  value = {}
  get _value() {
    return this.value
  }

  onPickFile() {
    if (this.$refs.fileInput) {
      const fileInput = this.$refs.fileInput as any
      fileInput.click()
    }
  }

  changeFile(event: any) {
    this.value = event.target.files[0]
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
  padding: 0 0 0 16px;
  @include row--center;
  @include typography(lg);
  border-radius: 4px;
  border: 1px solid $colorDarkGrey;
  background: transparent;
  justify-content: space-between;

  &:focus {
    border-color: $colorGreen;
  }
}

.listing-form-input__upload {
  width: 108px;
  height: 90%;
  margin: 2px;
  background-color: navy;
  color: white;
  border-radius: 4px;
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
