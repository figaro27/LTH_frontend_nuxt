<template>
  <router-link class="search-page__logo" to="/">
    <img alt="LegalTech Hub" class="search-page__logo-img" src="@/assets/logo-label.svg" />
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'logo-label' })
export default class LogoLabel extends Vue {}
</script>

<style lang="scss" scoped>
.search-page__logo {
  overflow: hidden;
}
.search-page__logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
}
</style>
