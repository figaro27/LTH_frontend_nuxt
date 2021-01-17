<template>
  <div class="enhanced-listing-premium">
    <p class="enhanced-listing-premium__light">Introductory offer, valid for payment received before</p>
    <p class="enhanced-listing-premium__bold">midnight ET(US), December 31st, 2020</p>
    <p class="enhanced-listing-premium__price__container">
      <span class="enhanced-listing-premium__price">
        <span class="enhanced-listing-premium__price__symbol">$</span>
        <span class="enhanced-listing-premium__price__number">499</span>
      </span>
    </p>
    <p class="enhanced-listing-premium__light">
      for your premium listing
      <span class="enhanced-listing-premium__bold">until the end of 2021</span>
    </p>
    <button class="enhanced-listing-premium__button" @click="onClick">Go Premium</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'enhanced-listing-premium'
})
export default class EnhancedListingPremium extends Vue {
  onClick() {
    this.$emit('onSubmit')
  }
}
</script>

<style lang="scss" scoped>
.enhanced-listing-premium {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 15px 40px;
  margin: 12px 12px;
}
.enhanced-listing-premium__light {
  @include typography(lg, default);
  width: 100%;
  text-align: center;
  color: $colorDarkGrey;
}
.enhanced-listing-premium__bold {
  @include typography(lg, bold);
  width: 100%;
  text-align: center;
  color: $colorDarkGrey;
  font-weight: bold;
}
.enhanced-listing-premium__price__container {
  margin: 30px 20px;
}
.enhanced-listing-premium__price {
  @include typography(xxl-3, default);
  color: #fedb77;
  font-weight: bold;
  position: relative;
}
.enhanced-listing-premium__price__number {
  padding: 30px 10px;
}
.enhanced-listing-premium__price__symbol {
  position: absolute;
  @include typography(lg, default);
  color: $colorDarkGrey;
}
.enhanced-listing-premium__button {
  @include typography(xl, default);
  border-radius: 20px;
  background-color: #f2c94c;
  color: white;
  box-shadow: 0px 6px 6px #f2c94ccc;
  width: 50%;
  margin: 20px auto;
  padding: 10px;
}
</style>
