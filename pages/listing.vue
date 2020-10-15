<template>
  <div class="listing">
    <div class="listing__content">
      <h1 class="listing__title">Add/Update <span>Your Listing</span></h1>
      <p class="listing__description">
        Thanks for sending. Our team will verify this info and we will send you an email with how your listing looks
        when we post.
      </p>
      <img class="listing__image" src="/images/listings/listing.svg" />
      <p class="listing__description-guide">
        Remember that you have the option of supercharging your presence with an enhanced listing for a small annual
        fee. &nbsp;<nuxt-link class="listing__description-link" to="/contact-us">Contact Us</nuxt-link> to find out
        more.
      </p>
    </div>
  </div>
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
.listing {
  @include desktop-max-width-layout;
  background: #effadf;
  margin-top: 70px;
  padding-bottom: 60px;
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
