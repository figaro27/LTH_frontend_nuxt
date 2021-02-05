<template>
  <div class="listing">
    <div class="listing__container">
      <h1 class="listing__title">Upgrade <span>to Premium Listing</span></h1>
      <h4 class="listing__note">
        Make your product stand out and attract users with a premium listing. Add a direct call-to-action, show off your
        partners, explain just how you solve problems, promote features and benefits, and add images or videos
      </h4>
      <img src="/images/listings/frame.png" class="listing__frame__img" />
      <h4 class="listing__note">
        If you need to update your basic listing info as well, or you haven’t yet added your tool to LTH please also go
        to <a href="https://legaltechnologyhub.com/listing">https://legaltechnologyhub.com/listing</a> and send us the
        right form.
      </h4>
      <div class="listing__form">
        <enhanced-listing-form-input
          v-model="enhancedRequest.name"
          :error="errors.name"
          label="Vendor Name *"
          name="name"
          placeholder="as it appears on LTH"
          required
        />
        <enhanced-listing-form-input
          v-model="enhancedRequest.contactName"
          :error="errors.contactName"
          label="Vendor Contact Name"
          name="contactName"
          required
        />
        <enhanced-listing-form-input
          v-model="enhancedRequest.contactEmail"
          :error="errors.contactEmail"
          label="Vendor Contact Email"
          name="contactEmail"
          required
        />
        <enhanced-listing-form-input
          v-model="enhancedRequest.link"
          :error="errors.link"
          label="Link to Demo/Appointment Booking or Contact"
          name="link"
          required
        />
        <editable-filter
          id="featuredCustomers"
          v-model="enhancedRequest.customers"
          below-text="UP to 7 Customers"
          name="featuredCustomers"
          label="Featured Customers *"
          :error="errors.customers"
        />
        <enhanced-listing-form-description
          v-model="enhancedRequest.useCases"
          name="Use Cases - What problems does the product solve, for whom, how?"
          :error="errors.useCases"
          length="200"
        />
        <enhanced-listing-form-description
          v-model="enhancedRequest.description"
          name="Extra Description - What else does the audience need to know about the product?"
          :error="errors.description"
          length="400"
        />
        <enhanced-listing-form-file
          :images="enhancedRequest.image"
          label="Add Images"
          placeholder="Up to 3 Links"
          @updateImage="onUpdateImage"
        />
        <enhanced-listing-form-link
          :video="enhancedRequest.video"
          type="video"
          label="Add Video"
          placeholder="Add video link from Youtube, Vimeo"
          @updateVideo="onUpdateVideo"
        />
        <enhanced-listing-form-link
          :links="enhancedRequest.articles"
          type="link"
          label="Add Links for Articles"
          placeholder="Up to 3 Links"
          @updateLink="onUpdateLink"
        />
        <enhanced-listing-premium @onSubmit="submit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

import { getEmptyEnhancedRequest, EnhancedRequest } from '@/models'
import { api } from '@/utils'

type EnhancedRequestErrors = {
  name?: string
  contactName?: string
  contactEmail?: string
  link?: string[]
  customers?: string
  useCases?: string
  description?: string
  image?: []
  video?: string
  articles?: []
}

@Component({
  name: 'enhance-listing'
})
export default class EnhancedListing extends Vue {
  filterOptionsLoaded: boolean = true
  enhancedRequest: EnhancedRequest = getEmptyEnhancedRequest()
  errors: EnhancedRequestErrors = {}
  loading: boolean = false

  onUpdateLink(value: []) {
    this.enhancedRequest.articles = value
  }

  onUpdateVideo(value: string) {
    this.enhancedRequest.video = value
  }

  onUpdateImage(value: File[]) {
    this.enhancedRequest.image = [...value]
  }

  validateForm() {
    const errors: EnhancedRequestErrors = {}
    const { enhancedRequest: data } = this
    if (isEmpty(data.name)) errors.name = 'Vendor Name cannot be empty'
    if (!isEmail(data.contactEmail)) errors.contactEmail = 'Should be a valid email'
    if (isEmpty(data.customers)) errors.customers = 'Customers cannot be empty'
    if (isEmpty(data.useCases)) errors.useCases = 'Cannot be empty'
    else if (data.useCases.length > 200) errors.useCases = 'You can only add up to 200 characters'
    if (isEmpty(data.description)) errors.description = 'Cannot be empty'
    else if (data.description.length > 400) errors.description = 'You can only add up to 400 characters'

    if (Object.keys(errors).length > 0) {
      this.errors = errors
      return false
    }
    return true
  }

  async submit() {
    if (!this.validateForm()) {
      return
    }
    await this.$recaptchaLoaded()
    const token: string = await this.$recaptcha('vendor_request')

    const params = {
      ...this.enhancedRequest,
      token
    }

    await api.post('contact/listing', params)

    this.enhancedRequest = getEmptyEnhancedRequest()
    this.loading = false

    this.$emit('submitted')
  }
}
</script>

<style lang="scss" scoped>
.listing {
  background: #f9f9fb;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 70px 0 0 0;
  padding: 24px 24px 36px 24px;
  @include respondTo(lg) {
    padding: 24px 8px 36px 8px;
  }

  & > * {
    margin: 5px 0;
  }
}
.listing__container {
  width: 60%;
}
.listing__title {
  @include typography(xxl-2, narrow, bold);
  color: $colorNavy;

  span {
    color: $colorGreen;
  }
}
.listing__note {
  @include typography(xl-1, default);
  margin: 10px 0;
  color: $colorDarkGrey;
  width: 100%;

  a {
    font-weight: bold;
    color: $colorDarkGrey;
  }
}
.listing__frame__img {
  width: 100%;
  height: auto;
  padding: 20px 40px;
}
.listing__form {
  margin: 40px 0;
  padding: 20px 60px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}

.listing {
  background: #f9f9fb;
  min-width: 200px;
  display: flex;
  flex-direction: column;

  & > * {
    margin: 5px 0;
  }
  @include respondFromTo(mobile, lg) {
    width: 80%;
  }
  @include respondTo(mobile) {
    width: 100%;
    min-width: 35%;
  }
}

.listing__title {
  @include typography(xxl-1, narrow, bold);
  color: $colorNavy;

  span {
    color: $colorGreen;
  }
}

.listing__form__tip {
  @include typography(xl-1, narrow, bold);
  text-align: left;
  color: $colorDarkGrey;
}

.listing-action__group {
  display: flex;
  flex-direction: row;
  margin-top: 16px;
}

.listing-action__container {
  min-width: 200px;
  padding-right: 16px;
  padding-left: 16px;
  height: 48px;
  @include row--center;
  @include typography(lg, narrow, bold);
  border-radius: 8px;
  border: 1px solid #546e7a;
  outline: none;
  background: transparent;
  align-self: flex-center;
  margin-right: 8px;
  cursor: pointer;

  @include respondTo(mobile) {
    padding-right: 8px;
    padding-left: 8px;
  }

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.7;
  }
}

.listing__form {
  display: flex;
  margin: 24px 0px;
  flex-wrap: wrap;

  & > * {
    margin-bottom: 20px;
  }
}

.listing-action__label {
  @include typography(xl, narrow);
  color: #546e7a;
  margin-left: 8px;
  cursor: pointer;

  @include respondTo(mobile) {
    @include typography(lg, narrow);
  }
}

.listing-action__container--selected {
  border: 1px solid #80c41c;
  background: #dbf4bc;

  .listing-action__label {
    color: #80c41c;
  }
}

.listing__form__header {
  margin: 24px auto 0 0;
  padding-left: 12px;
  @include col;
}

.listing__form .search-filter,
.listing__form .editable-filter {
  width: 100%;
  text-align: left;
  padding: 8px 12px 12px 12px;

  @include respondTo(mobile) {
    padding: 0 6px 6px 6px;
  }

  ::v-deep .search-filter__label,
  ::v-deep .search-filter__below,
  ::v-deep .editable-filter__label,
  ::v-deep .editable-filter__below {
    @include typography(lg, default, bold);
    color: $colorDarkGrey;
    padding: 0;
    text-align: left;
  }

  ::v-deep .search-filter__below,
  ::v-deep .editable-filter__below {
    @include typography(md);
  }

  ::v-deep .multiselect {
    margin: 4px 0;
    padding: 2px 4px;
    border-radius: 4px;
    background: transparent;
    border: 1px solid $colorDarkGrey;
    span {
      color: $colorDarkGrey;
    }
  }

  ::v-deep .multiselect__tags {
    .multiselect__input {
      background: transparent;
    }
    background: transparent;
    border: 0px solid transparent;
  }
}

.listing__form__button {
  @include typography(lg, narrow, bold);
  background: #011d58;
  padding: 0px 36px;
  margin-left: 12px;
  width: 25%;
  color: #ffffff;
  height: 60px;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.8;
  }
}
</style>
