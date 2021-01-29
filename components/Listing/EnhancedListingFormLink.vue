<template>
  <div class="listing-form-input">
    <label class="listing-form-input__label">{{ label }}</label>
    <div class="listing-form-input__input">
      <input
        ref="fileInput"
        v-model="value"
        type="text"
        :required="required ? 'required' : ''"
        style="dispaly: none"
        class="listing-form-input__file"
      />
      <button class="listing-form-input__upload" @click="onAddLink">Add</button>
    </div>
    <label v-if="error" class="listing-form-input__error">{{ error }}</label>
    <label v-else class="listing-form-input__placeholder">{{ placeholder }}</label>
    <div v-for="(item, index) in links" :key="index">
      <enhanced-listing-form-added-item
        class="listing-form__added-item"
        :link="item"
        :index="index"
        @remove="onRemoved"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ name: 'enhanced-listing-form-link' })
export default class EnhancedListingFormLink extends Vue {
  @Prop({ required: true }) label!: string
  @Prop({ default: '' }) name!: string
  @Prop({ default: null }) error!: string | null
  @Prop({ default: '' }) placeholder!: string
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ default: null }) links!: any | null

  value = ''
  get _value() {
    return this.value
  }

  onAddLink() {
    if (this._value !== '') {
      this.links = this.links != null ? [...this.links, this._value] : [...this._value]
      this.error = ''
    } else {
      this.error = 'Cannot be empty'
    }
  }

  onRemoved(index: number) {
    this.links.splice(index, 1)
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

.listing-form__added-item {
  margin-top: 8px;
}
</style>
