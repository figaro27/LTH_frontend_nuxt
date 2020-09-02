<template>
  <div class="main">
    <default-header />
    <nuxt class="main__content" />
    <default-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DefaultHeader from './components/Header.vue'
import DefaultFooter from './components/Footer.vue'

@Component({
  name: 'DefaultLayout',
  components: { DefaultHeader, DefaultFooter }
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped>
.main {
  @include col;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.main__content {
  width: 100%;
  z-index: 10;
}
</style>
