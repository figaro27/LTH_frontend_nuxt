<template>
  <router-link class="similar-vendor-card" :to="`/vendor/${vendor.id}`">
    <div class="similar-vendor-card__logo" :class="{ 'similar-vendor-card__logo--default': isDefaultLogo }">
      <img :src="logo" />
    </div>
    <div class="similar-vendor-card__details">
      <label class="similar-vendor-card__name">{{ vendor.name }}</label>
      <label class="similar-vendor-card__tool">{{ vendor.tool }}</label>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { SimilarVendor } from '~/models'

@Component({
  name: 'similar-vendor-card'
})
export default class SimilarVendorCard extends Vue {
  @Prop({ required: true }) vendor!: SimilarVendor

  get logo() {
    return this.vendor.logo || '/images/logo-small.png'
  }

  get isDefaultLogo() {
    return !this.vendor.logo
  }
}
</script>

<style lang="scss" scoped>
.similar-vendor-card {
  @include col--center;
  height: 240px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  text-decoration: none;

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  }
}

.similar-vendor-card__logo {
  width: 100%;
  height: 150px;
  @include row--center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.similar-vendor-card__logo--default {
  padding: 10px 0;
}

.similar-vendor-card__details {
  flex: 1;
  width: 100%;
  @include col--center;
  padding: 10px;
}

.similar-vendor-card__name {
  @include typography(lg-1, default, bold);
  color: $colorDarkGrey;
  text-align: center;
  margin-bottom: 10px;
}

.similar-vendor-card__tool {
  @include typography(lg);
  color: $colorDarkGrey;
  text-align: center;
}
</style>
