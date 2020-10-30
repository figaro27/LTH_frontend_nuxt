<template>
  <div class="listing">
    <client-only>
      <h1 class="listing__title">Add/Update <span>Your Listing</span></h1>
      <div class="listing-form__header">
        <label class="listing-form__tip">I want to</label>
        <div class="listing-action__group">
          <button
            class="listing-action__container"
            :class="{ 'listing-action__container--selected': vendorRequest.type === 'create' }"
            @click="vendorRequest.type = 'create'"
          >
            <img
              :src="vendorRequest.type === 'create' ? '/images/listings/add_selected.svg' : '/images/listings/add.svg'"
            />
            <label class="listing-action__label">
              Add a new listing
            </label>
          </button>
          <button
            class="listing-action__container"
            :class="{ 'listing-action__container--selected': vendorRequest.type === 'update' }"
            @click="vendorRequest.type = 'update'"
          >
            <img
              :src="
                vendorRequest.type === 'update'
                  ? '/images/listings/form-pencil_selected.svg'
                  : '/images/listings/form-pencil.svg'
              "
            />
            <label class="listing-action__label">
              Update an existing listing
            </label>
          </button>
        </div>
      </div>
      <form class="listing-form" @submit.prevent="submit">
        <listing-form-input
          v-model="vendorRequest.name"
          :error="errors.name"
          label="Vendor Name *"
          name="name"
          placeholder="The organization that produces the tool"
          required
        />
        <listing-form-input
          v-model="vendorRequest.tool"
          :error="errors.tool"
          label="Tool *"
          name="tool"
          placeholder="The name of the tool"
          required
        />
        <select-filter
          id="hqs"
          v-model="vendorRequest.hqs"
          :error="errors.hqs"
          below-text="The country where the vendor is based"
          name="hqs"
          label="HQ *"
          :options="offices"
          required
        />
        <select-filter
          id="offices"
          v-model="vendorRequest.offices"
          :error="errors.offices"
          below-text="Countries where the vendor has a physical presence"
          name="offices"
          label="Office *"
          :options="offices"
          required
        />
        <select-filter
          id="functionalities"
          v-model="vendorRequest.functionalities"
          :error="errors.functionalities"
          below-text="The primary function of the tool"
          name="functionality"
          label="Functionality *"
          :options="functionalities"
          required
        />
        <select-filter
          id="subfunctionalities"
          v-model="vendorRequest.subFunctionalities"
          below-text="Secondary functions of the tool"
          name="subfunctionality"
          label="Sub-Functionality"
          :options="functionalities"
        />
        <select-filter
          id="practiceAreas"
          v-model="vendorRequest.practiceAreas"
          :error="errors.practiceAreas"
          below-text="The area(s) of law to which the tool is targeted "
          name="practiceArea"
          label="Practice Area *"
          :options="practiceAreas"
          required
        />
        <select-filter
          id="platformLanguages"
          v-model="vendorRequest.platformLanguages"
          :error="errors.platformLanguages"
          below-text="Language(s) of the tool interface"
          name="platformLanguage"
          label="Platform Language *"
          :options="platformLanguages"
          required
        />
        <select-filter
          id="linguisticFunctionalities"
          v-model="vendorRequest.linguisticFunctionalities"
          :error="errors.linguisticFunctionalities"
          below-text="Language(s) in which the tool can be utilized"
          name="linguisticFunctionality"
          label="Linguistic Efficacy *"
          :options="platformLanguages"
          required
        />
        <select-filter
          id="demographics"
          v-model="vendorRequest.demographics"
          :error="errors.demographics"
          below-text=" "
          name="demographic"
          label="Target Entity *"
          :options="demographics"
          required
        />
        <select-filter
          id="installations"
          v-model="vendorRequest.installations"
          below-text=" "
          name="installation"
          label="Deployment"
          :options="installations"
        />
        <editable-filter
          id="integrations"
          v-model="vendorRequest.integrations"
          below-text="Other tools with which the tool is designed to integrate"
          name="integrations"
          label="Integrations"
        />
        <editable-filter
          id="existingCustomers"
          v-model="vendorRequest.existingCustomers"
          below-text=" "
          name="existingCustomer"
          label="Existing Customers"
        />

        <listing-form-input
          v-model="vendorRequest.website"
          :error="errors.website"
          label="Website *"
          name="website"
          required
        />
        <listing-form-input
          v-model="vendorRequest.email"
          :error="errors.email"
          label="Your Email *"
          name="email"
          placeholder="For correspondence with LTH only, not to be published"
          required
        />

        <listing-form-description v-model="vendorRequest.description" :error="errors.description" />

        <button type="submit" :disabled="loading" class="listing-form__button">Submit</button>
      </form>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, State, Vue } from 'nuxt-property-decorator'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

import { getEmptyVendorRequest, VendorRequest } from '@/models'
import { RootState } from '@/store/types'
import { api } from '@/utils'

type VendorRequestErrors = {
  name?: string
  tool?: string
  email?: string
  description?: string
  demographics?: string
  functionalities?: string
  hqs?: string
  linguisticFunctionalities?: string
  offices?: string
  platformLanguages?: string
  practiceAreas?: string
  website?: string
}

@Component({
  name: 'listing-form'
})
export default class ListingForm extends Vue {
  @State((state: RootState) => state.search.demographics) demographics!: any[]
  @State((state: RootState) => state.search.functionalities) functionalities!: any[]
  @State((state: RootState) => state.search.installations) installations!: any[]
  @State((state: RootState) => state.search.offices) offices!: any[]
  @State((state: RootState) => state.search.platformLanguages) platformLanguages!: any[]
  @State((state: RootState) => state.search.practiceAreas) practiceAreas!: any[]

  filterOptionsLoaded: boolean = false
  vendorRequest: VendorRequest = getEmptyVendorRequest()
  errors: VendorRequestErrors = {}
  loading: boolean = false

  async mounted() {
    this.filterOptionsLoaded = false

    const promises = [
      this.$store.dispatch('search/loadDemographics'),
      this.$store.dispatch('search/loadFunctionalities'),
      this.$store.dispatch('search/loadInstallations'),
      this.$store.dispatch('search/loadIntegrations'),
      this.$store.dispatch('search/loadOffices'),
      this.$store.dispatch('search/loadPlatformLanguages'),
      this.$store.dispatch('search/loadPracticeAreas')
    ]
    try {
      await Promise.all(promises)
    } catch (err) {
      this.filterOptionsLoaded = true
      return
    }
    this.filterOptionsLoaded = true
  }

  validateForm() {
    const errors: VendorRequestErrors = {}
    const { vendorRequest: data } = this
    if (isEmpty(data.name)) errors.name = 'Vendor Name cannot be empty'
    if (isEmpty(data.tool)) errors.tool = 'Tool Name cannot be empty'
    if (!isEmail(data.email)) errors.email = 'Should be a valid email'
    if (isEmpty(data.description)) errors.description = 'Description cannot be empty'
    if (isEmpty(data.website)) errors.website = 'Website cannot be empty'
    else if (data.description.length > 500) errors.description = 'You can only add descriptions up to 500 characters'
    if (!data.demographics || data.demographics.length === 0) {
      errors.demographics = 'At least one target entity required'
    }
    if (!data.functionalities || data.functionalities.length === 0) {
      errors.functionalities = 'At least one functionality required'
    }
    if (!data.hqs || data.hqs.length === 0) errors.hqs = 'At least one HQ office required'
    if (!data.linguisticFunctionalities || data.linguisticFunctionalities.length === 0) {
      errors.linguisticFunctionalities = 'At least one linguistic efficacy required'
    }
    if (!data.offices || data.offices.length === 0) {
      errors.offices = 'At least one office required'
    }
    if (!data.platformLanguages || data.platformLanguages.length === 0) {
      errors.platformLanguages = 'At least one platform language required'
    }
    if (!data.practiceAreas || data.practiceAreas.length === 0) {
      errors.practiceAreas = 'At least one practice area required'
    }

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
    this.loading = true

    await this.$recaptchaLoaded()
    const token: string = await this.$recaptcha('vendor_request')

    const params = {
      ...this.vendorRequest,
      token
    }

    await api.post('contact/listing', params)

    this.vendorRequest = getEmptyVendorRequest()
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
  flex-direction: column;

  & > * {
    margin: 5px 0;
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

.listing-form__tip {
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

.listing-form {
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

.listing-form__header {
  margin: 24px auto 0 0;
  padding-left: 12px;
  @include col;
}

.listing-form .search-filter,
.listing-form .editable-filter {
  width: 50%;
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
    border-radius: 8px;
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

.listing-form__button {
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
