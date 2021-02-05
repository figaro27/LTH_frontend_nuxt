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
        class="listing-form__input__link"
      />
      <button class="listing-form-input__upload" @click="onAddLink">Add</button>
    </div>
    <label v-if="error" class="listing-form-input__error">{{ error }}</label>
    <label v-else class="listing-form-input__placeholder">{{ placeholder }}</label>
    <div v-for="(item, index) in links" v-show="type === 'link'" :key="index">
      <enhanced-listing-form-added-item
        v-show="type === 'link'"
        class="listing-form__added-item"
        :is-file="false"
        :title="item"
        :index="index"
        @remove="onRemoved"
      />
    </div>
    <enhanced-listing-form-added-item
      v-show="type === 'video' && video"
      class="listing-form__added-item"
      :is-file="false"
      :title="video"
      @remove="onRemoved"
    />
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
  @Prop({ type: String, default: '' }) video!: string
  @Prop({ type: String, default: 'link' }) type!: string

  value = ''
  addedLinks = this.links ? [...this.links] : []
  get _value() {
    return this.value
  }

  onAddLink() {
    if (this.type === 'link') {
      if (this.value !== '' && this.validateArticleUrl()) {
        this.addedLinks = [...this.addedLinks, this.value]
        this.error = ''
        this.updateListingForm()
      } else if (this.value === '') {
        this.error = 'Cannot be empty'
      } else if (!this.validateArticleUrl()) {
        this.error = 'Please input valid link'
      }
    } else if (this.type === 'video') {
      if (this.value !== '' && this.validateVideoUrl()) {
        this.video = this.value
        this.error = ''
        this.updateListingForm()
      } else if (this.value === '') {
        this.error = 'Cannot be empty'
      } else if (!this.validateVideoUrl()) {
        this.error = 'Please input valid video link'
      }
    }
  }

  onRemoved(index: number) {
    if (this.type === 'link') {
      this.links.splice(index, 1)
    } else {
      this.video = ''
    }
    this.updateListingForm()
  }

  updateListingForm() {
    this.value = ''
    if (this.type === 'link') {
      this.$emit('updateLink', this.addedLinks)
    } else {
      this.$emit('updateVideo', this.video)
    }
  }

  validateArticleUrl() {
    const regex = RegExp(
      '(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+@]*)*(\\?[;&a-z\\d%_.~+=-@]*)?(\\#[-a-z\\d_@]*)?$',
      'i'
    )
    return this.value.match(regex)
  }

  validateVideoUrl() {
    const regExp = RegExp(
      '^(http:\\/\\/|https:\\/\\/)(vimeo\\.com|youtu\\.be|www\\.youtube\\.com)\\/([\\w\\/]+)([\\?].*)?$'
    )
    const match = this.value.match(regExp)
    return !!match
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

.listing-form__input__link {
  width: 100%;
  height: 48px;
  min-width: 200px;
  margin: 4px 8px 4px 0;
  padding: 0 0 0 16px;
  @include row--center;
  @include typography(lg);
  background: transparent;
  justify-content: space-between;
}
</style>
