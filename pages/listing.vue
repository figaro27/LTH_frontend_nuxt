<template>
  <listing-form class="listing-form__container" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { buildMeta } from '~/utils'

@Component({
  name: 'listing',
  head() {
    return buildMeta({
      title: 'Add/Update Listings - Legaltech Hub',
      description: 'Add/Update Listings - Legaltech Hub'
    })
  }
})
export default class Listing extends Vue {}
</script>

<style lang="scss" scoped>
.listing-form__container {
  margin: 70px auto;
  padding: 24px 24px 36px 24px;
  width: 60%;
  @include respondTo(mobile) {
    padding: 24px 8px 36px 8px;
  }
}

.listing__content {
  padding: 30px 70px;
}

.listing__title {
  @include typography(xxl-1, narrow, bold);
  color: $colorNavy;

  span {
    color: $colorGreen;
  }
}

.listing__image {
  width: 100%;
}

.listing__description {
  @include typography(xl-1, narrow, bold);
  color: $colorNavy;
  margin: 40px 40px 60px;
}

.listing__description-guide {
  @include typography(xl-1, narrow);
  color: $colorNavy;
  margin: 40px 40px 60px;
}

.listing__description-link {
  @include typography(xl-1, narrow);
  color: $colorNavy;
}

.listing__buttons {
  @include row--center;
}

.listing__button {
  @include col--center;
  margin: 20px;
  text-decoration: none;
}

.listing__button__icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
  background: $colorTransGreen;
  border: 3px solid #ffffff;
  padding: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.listing__button__label {
  @include typography(xl, narrow, bold);
  color: $colorDarkGrey;
}
</style>
