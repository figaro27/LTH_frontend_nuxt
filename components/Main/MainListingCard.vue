<template>
  <div class="listing-card">
    <h3 class="listing-card__title">Add/Update Your Listing</h3>
    <div class="listing-card__title-border" />
    <div class="listing-card__content">
      <div class="listing-card__icon">
        <img src="/images/svgs/main/pencil.svg" />
      </div>

      <p class="listing-card__description">
        Legaltech professionals need relevant information on products, services and events. Help us get the right
        content to them. Click here to add or update your listing.
      </p>
    </div>
    <button v-tooltip="{ content: 'Coming soon' }" class="listing-card__button">
      Add
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'main-listing-card' })
export default class MainListingCard extends Vue {}
</script>

<style lang="scss" scoped>
.listing-card {
  @include col--center;
  padding: 35px 80px 30px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.listing-card__title {
  @include typography(xl, narrow, bold);
  color: $colorDarkGrey;
  margin-bottom: 5px;
}

.listing-card__title-border {
  width: 56px;
  height: 2px;
  background: $colorDarkGrey;
}

.listing-card__content {
  width: 100%;
  @include row;
  align-items: center;
  margin-top: 15px;
}

.listing-card__icon {
  width: 110px;
  @include row--center;
  border-radius: 50%;
  background: $colorTransGreen;
  padding: 10px;
  margin-right: 30px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.listing-card__description {
  @include typography(lg);
  color: $colorDarkGrey;
  text-align: left;
}

.listing-card__button {
  width: 110px;
  height: 40px;
  @include row--center;
  @include typography(lg, narrow, bold);
  border-radius: 27px;
  border: 1px solid $colorGreen;
  color: $colorGreen;
  outline: none;
  background: white;
  align-self: flex-end;
  cursor: pointer;

  &:hover {
    background: $colorNeutralsSnow;
  }
  &:active {
    background: $colorLightGrey2;
  }

  @media (max-width: 640px) {
    margin-top: 10px;
  }
}
</style>
