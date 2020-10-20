<template>
  <div class="listing">
    <h1 class="listing__title">Add/Update <span>Your Listing</span></h1>
    <div class="listing-form__header">
      <p class="listing__label">I want to</p>
      <div class="listing-action__group">
        <button
          :class="!isAddSelected ? 'listing-action__container' : 'listing-action__container__selected'"
          @click="updateSelection(true)"
        >
          <img :src="!isAddSelected ? '/images/listings/add.svg' : '/images/listings/add_selected.svg'" />
          <label :class="!isAddSelected ? 'listing-action__label' : 'listing-action__label__selected'"
            >Add a new listing</label
          >
        </button>
        <button
          :class="!isUpdateSelected ? 'listing-action__container' : 'listing-action__container__selected'"
          @click="updateSelection(false)"
        >
          <img
            :src="!isUpdateSelected ? '/images/listings/form-pencil.svg' : '/images/listings/form-pencil_selected.svg'"
          />
          <label :class="!isUpdateSelected ? 'listing-action__label' : 'listing-action__label__selected'"
            >Update an existing listing</label
          >
        </button>
      </div>
    </div>

    <form class="listing-form__function" @submit="submit">
      <div class="listing-form__input">
        <label class="listing__label">Vendor Name *</label>
        <input class="listing-action__container" />
        <label class="listing__label__placeholder">the name of the tool</label>
      </div>

      <div class="listing-form__input">
        <label class="listing__label">Tool *</label>
        <input class="listing-action__container" />
        <label class="listing__label__placeholder">the organization that produces the tool</label>
      </div>
      <select-filter id="hqs" v-model="filters.hqs" name="hqs" label="HQ" :options="offices" @change="onFilterUpdate" />

      <select-filter
        id="offices"
        v-model="filters.offices"
        name="offices"
        label="Office"
        :options="offices"
        @change="onFilterUpdate"
      />
      <select-filter
        id="functionalities"
        v-model="filters.functionalities"
        name="functionality"
        label="Functionality"
        :options="functionalities"
        @change="onFilterUpdate"
      />
      <select-filter
        id="subfunctionalities"
        v-model="filters.functionalities"
        name="subfunctionality"
        label="Sub-Functionality"
        :options="functionalities"
        @change="onFilterUpdate"
      />

      <select-filter
        id="practiceAreas"
        v-model="filters.practiceAreas"
        name="practiceArea"
        label="Practice Area"
        :options="practiceAreas"
        @change="onFilterUpdate"
      />
      <select-filter
        id="platformLanguages"
        v-model="filters.platformLanguages"
        name="platformLanguage"
        label="Platform Language"
        :options="platformLanguages"
        @change="onFilterUpdate"
      />
      <div class="listing-form__input">
        <label class="listing__label">Linguistic Efficacy *</label>
        <input class="listing-action__container" />
        <label class="listing__label__placeholder">language(s) in which the tool can be utilized</label>
      </div>
      <div class="listing-form__input">
        <label class="listing__label">Target Entity *</label>
        <input class="listing-action__container" />
        <label class="listing__label__placeholder"></label>
      </div>
      <div class="listing-form__input">
        <label class="listing__label">Deployment *</label>
        <input class="listing-action__container" />
        <label class="listing__label__placeholder">select functions</label>
      </div>
      <select-filter
        id="integrations"
        v-model="filters.integrations"
        name="integrations"
        label="Integrations"
        :options="integrations"
        @change="onFilterUpdate"
      />
      <div class="listing-form__input">
        <label class="listing__label">Existing Customers </label>
        <input class="listing-action__container" />
        <label class="listing__label__placeholder"></label>
      </div>
      <div class="listing-form__input">
        <label class="listing__label">Website *</label>
        <input class="listing-action__container" />
        <label class="listing__label__placeholder">the area(s) of law to which the tool is targeted </label>
      </div>
      <div class="listing-form__input">
        <label class="listing__label">Your Email *</label>
        <input class="listing-action__container" />
        <label class="listing__label__placeholder">for correspondence with LTH only, not to be published </label>
      </div>
      <div class="listing-form__description">
        <label class="listing__label">Description *</label>
        <textarea class="listing-action__container" />
        <label class="listing__label__placeholder">0/500</label>
      </div>
    </form>
    <button class="listing-form__button">Submit</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, State, Vue } from 'nuxt-property-decorator'
import { Filters, SearchResultVendor, SavedSearch } from '@/models'
import { isMobile } from 'mobile-device-detect'
import { RootState, LoadingStatus } from '@/store/types'

@Component({ name: 'listing-form' })
export default class ListingForm extends Vue {
  @Prop({ default: null }) savedSearch!: SavedSearch | null

  @State((state: RootState) => state.search.demographics) demographics!: any[]
  @State((state: RootState) => state.search.functionalities) functionalities!: any[]
  @State((state: RootState) => state.search.installations) installations!: any[]
  @State((state: RootState) => state.search.integrations) integrations!: any[]
  @State((state: RootState) => state.search.offices) offices!: any[]
  @State((state: RootState) => state.search.platformLanguages) platformLanguages!: any[]
  @State((state: RootState) => state.search.practiceAreas) practiceAreas!: any[]
  @State((state: RootState) => state.search.vendors) vendors!: SearchResultVendor[]
  @State((state: RootState) => state.search.vendorsLoading) vendorsLoading!: LoadingStatus
  @State((state: RootState) => state.search.totalVendors) total!: number
  @State((state: RootState) => state.search.vendorsLastFilter) lastSearch!: Filters
  @State((state: RootState) => state.search.vendorsPage) curPageNum!: Filters

  isAddSelected: boolean = false
  isUpdateSelected: boolean = false

  filterOptionsLoaded: boolean = false

  isMobile: boolean = false

  filters: Filters = {
    keyword: '',
    demographics: [],
    functionalities: [],
    hqs: [],
    integrations: [],
    installations: [],
    offices: [],
    platformLanguages: [],
    practiceAreas: []
  }

  async mounted() {
    this.filterOptionsLoaded = false
    this.isMobile = isMobile

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

  updateSelection(isAdd: boolean) {
    this.isAddSelected = isAdd
    this.isUpdateSelected = !isAdd
  }

  submit() {}
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
    width: 40%;
    min-width: 35%;
    margin-right: 0;
  }
}

.listing__title {
  @include typography(xxl-1, narrow, bold);
  color: $colorNavy;

  span {
    color: $colorGreen;
  }
}

.listing__label {
  @include typography(xl, narrow, bold);
  color: #546e7a;
  text-align: left;
  margin-left: 12px;
  margin-bottom: 8px;
}

.listing__label__placeholder {
  @include typography(lg, narrow);
  color: #546e7a;
  text-align: left;
  margin-left: 12px;
}

.listing-action__group {
  display: flex;
  flex-direction: row;
  margin-top: 16px;
}

.listing-action__container__selected {
  min-width: 200px;
  padding-right: 16px;
  padding-left: 16px;
  height: 48px;
  @include row--center;
  @include typography(lg, narrow, bold);
  border-radius: 8px;
  border: 1px solid #80c41c;
  outline: none;
  background: #dbf4bc;
  align-self: flex-center;
  margin-right: 8px;
  margin-left: 8px;
  cursor: pointer;
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
  background: #00000000;
  align-self: flex-center;
  margin-right: 8px;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    background: $colorNeutralsSnow;
  }
  &:active {
    background: $colorLightGrey2;
  }

  @include respondTo(mobile) {
    margin-top: 10px;
  }
}

.listing-action__label {
  @include typography(xl, narrow);
  color: #546e7a;
  margin-left: 8px;
}

.listing-action__label__selected {
  @include typography(xl, narrow);
  color: #80c41c;
  margin-left: 8px;
}

.listing-form__header {
  margin-right: auto;
  padding-left: 12px;
}

.listing-form__function {
  display: flex;
  margin: 24px 0px;
  flex-wrap: wrap;

  .search-filter {
    width: 50%;
    text-align: left;
    padding: 0px 12px;

    ::v-deep .search-filter__label {
      @include typography(xl, narrow, bold);
      color: #546e7a;
      text-align: left;
      margin-left: 12px;
      margin-bottom: 8px;
    }

    ::v-deep .multiselect {
      padding-right: 4px;
      padding-left: 4px;
      border-radius: 8px;
      background: #00000000;
      border: 1px solid #546e7a;
      span {
        color: $colorDarkGrey;
      }
    }

    ::v-deep .multiselect__tags {
      .multiselect__input {
        background: #00000000;
      }
      background: #00000000;
      border: 0px solid #00000000;
    }
  }
  .listing-form__input {
    width: 50%;
    text-align: left;
    padding: 12px;
    .listing-action__container {
      width: 100%;
      margin-top: 8px;
    }
  }
  .listing-form__description {
    width: 100%;
    text-align: left;
    margin: 24px 12px;
    textarea {
      min-width: 100%;
      height: 280px;
      margin: auto;
      padding-top: 8px;
    }
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
}

.lth__functionalities {
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  background: #e0e0e0;
}

.lth__functionality {
  width: calc(50% - 20px);
  height: 50px;
  margin: 5px 10px;
  @include row--center;
  color: #000000;
  border: 1px solid #bdbdbd;
  border-top: none;
  border-left: none;
  border-right: none;
  @include typography(md-1);
  @include ellipsis(1, lg);
}
</style>
