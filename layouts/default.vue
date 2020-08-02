<template>
  <div class="main">
    <default-header />
    <nuxt class="main__content" />
    <default-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultHeader from './components/Header.vue'
import DefaultFooter from './components/Footer.vue'

@Component({
  name: 'DefaultLayout',
  components: { DefaultHeader, DefaultFooter }
})
export default class DefaultLayout extends Vue {
  get links() {
    return [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about-us' },
      { label: 'How LTH works', to: '/how-lth-works' },
      { label: 'Regional Snapshots', to: '/regional-snapshots' },
      { label: 'Add/Update your Listing', to: '/listing' },
      { label: 'Legaltech Resources', to: '/legaltech-resources' },
      { label: 'Contact Us', to: '/contact-us' }
    ]
  }
}
</script>

<style lang="scss" scoped>
.main {
  @include col;
  width: 100vw;
  min-height: 100vh;
  overflow: auto;
}

.main__content {
  z-index: 10;
}
</style>
