<template>
  <div class="listing-form-input">
    <label class="listing-form-input__label">{{ label }}</label>
    <div class="listing-form-input__input">
      <label class="listing-form-input__name"></label>
      <button class="listing-form-input__upload" @click="onPickFile">Browser</button>
      <input
        ref="fileInput"
        type="file"
        :required="required ? 'required' : ''"
        style="dispaly: none"
        class="listing-form-input__file"
        @change="changeFile"
      />
    </div>
    <label v-if="error" class="listing-form-input__error">{{ error }}</label>
    <label v-else class="listing-form-input__placeholder">{{ placeholder }}</label>
    <div v-for="(item, index) in addedImages" :key="index">
      <enhanced-listing-form-added-item
        :key="index"
        class="listing-form__added-item"
        :is-file="true"
        :is-uploading="isUploading"
        :title="item.name"
        :index="index"
        :completed-speed="completedSpeed"
        @remove="onRemove"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})
@Component({ name: 'enhanced-listing-form-file' })
export default class EnhancedListingFormFile extends Vue {
  @Prop({ required: true }) label!: string
  @Prop({ default: '' }) name!: string
  @Prop({ default: null }) error!: string | null
  @Prop({ default: '' }) placeholder!: string
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ default: null }) images!: any | []

  isPicked = false
  isUploading: boolean = false
  completedSpeed: number = 0
  addedImages: File[] = this.images
  onPickFile() {
    if (this.$refs.fileInput) {
      const fileInput = this.$refs.fileInput as any
      this.isUploading = true
      setTimeout(() => {
        this.completedSpeed = 1
      }, 2000)
      setTimeout(() => {
        this.isUploading = false
      }, 5000)
      fileInput.click()
    }
  }

  changeFile(event: any) {
    this.isPicked = true
    const file = event.target.files[0]
    if (file) {
      this.addedImages = this.addedImages ? [...this.addedImages, file] : [file]
      this.error = ''
    } else {
      this.error = 'Cannot be empty'
    }
  }

  updateImage() {
    this.$emit('updateImage', this.addedImages)
  }

  onRemove(index: number) {
    this.addedImages.splice(index, 1)
    this.updateImage()
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
.listing-form__added-item {
  margin-top: 8px;
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

.listing-form-input__file {
  display: none;
}

.listing-form-input__progress {
  width: 100%;
  height: 16px;
  margin-top: 16px;
}
</style>
