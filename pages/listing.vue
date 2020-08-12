<template>
  <div class="listing">
    <div class="listing__content">
      <h1 class="listing__title">Add/Update Your Listing</h1>
      <p class="listing__description">
        Legal professionals need relevant information on legaltech products, services and events. Help us get the right
        content to them. Click <nuxt-link to="/">here</nuxt-link> to add or update your listing.
      </p>
      <div class="listing__buttons">
        <nuxt-link class="listing__button" to="/">
          <div class="listing__button__icon"><img src="/images/listings/plus.svg" /></div>
          <label class="listing__button__label"> Add a new Listing </label>
        </nuxt-link>
        <nuxt-link class="listing__button" to="/">
          <div class="listing__button__icon"><img src="/images/listings/pencil.svg" /></div>
          <label class="listing__button__label"> Update Listing </label>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'listing' })
export default class Listing extends Vue {}
</script>

<style lang="scss" scoped>
.listing {
  @include desktop-max-width-layout;
  margin-top: 70px;
  padding-bottom: 60px;
}

.listing__content {
  padding: 60px 70px;
}

.listing__title {
  @include typography(xxl-1, narrow, bold);
  color: $colorNavy;
  margin-bottom: 20px;
}

.listing__description {
  @include typography(xl);
  color: $colorDarkGrey;
  margin-bottom: 50px;
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
