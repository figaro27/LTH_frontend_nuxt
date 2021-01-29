<template>
  <div class="enhanced-listing-premium">
    <div class="enhanced-listing-premium__container">
      <div class="enhanced-listing-premium__description-container">
        <p class="enhanced-listing-premium__light">Introductory offer, valid for payment received before</p>
        <p class="enhanced-listing-premium__bold">midnight ET(US), December 31st, 2020</p>
        <p class="enhanced-listing-premium__light">for your premium listing until the end of 2021</p>
      </div>
      <p class="enhanced-listing-premium__price__container">
        <span class="enhanced-listing-premium__price">
          <span class="enhanced-listing-premium__price__symbol">$</span>
          <span class="enhanced-listing-premium__price__number">499</span>
        </span>
      </p>
    </div>
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
  border-color: #80c41c;
  border-width: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  width: 80%;
  padding: 15px 0px 0px 0px;
  margin: 12px auto;
}
.enhanced-listing-premium__container {
  display: flex;
  flex-direction: row;
  margin-top: 16px;
}
.enhanced-listing-premium__description-container {
  margin-left: 24px;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  width: 60%;
}
.enhanced-listing-premium__light {
  @include typography(lg, default);
  width: 100%;
  text-align: left;
  color: $colorDarkGrey;
}
.enhanced-listing-premium__bold {
  @include typography(lg, bold);
  width: 100%;
  text-align: left;
  color: $colorDarkGrey;
  font-weight: bold;
}
.enhanced-listing-premium__price__container {
  width: 40%;
  margin: auto;
}
.enhanced-listing-premium__price {
  @include typography(xxl-3, default);
  color: #71878f;
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
  border-radius: 0px 0px 10px 10px;
  background-color: #80c41c;
  color: white;
  width: 100%;
  margin-top: 32px;
  padding: 10px;
}
</style>
