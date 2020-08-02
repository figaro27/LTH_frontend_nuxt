<template>
  <div class="main">
    <div class="header">
      <logo class="header__logo" />
      <h2 class="header__label">
        Your legaltech needs. In your area. In your language.
      </h2>
      <div class="header__links">
        <nuxt-link
          v-for="(link, index) of links"
          :key="index"
          class="header__link"
          active-class="header__link--active"
          :to="link.to"
        >
          {{ link.label }}
        </nuxt-link>
      </div>
    </div>

    <nuxt class="main__content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Logo from './Header/Logo.vue'

@Component({
  name: 'DefaultLayout',
  components: { Logo }
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

.header {
  width: 100%;
  @include col--center;
  padding-top: 20px;
}

.header__logo {
  width: 280px;
}

.header__label {
  @include typography(xl, narrow, bold);
  text-align: center;
  color: $colorNavy;
  margin-bottom: 30px;
}

.header__links {
  @include row;
  justify-content: center;
}

.header__link {
  margin: 0 10px;
  color: $colorDarkGrey;
  @include typography(xl, narrow, bold);
  text-decoration: none;

  &:hover,
  &:active {
    opacity: 0.8;
  }
}

.header__link--active {
  color: $colorGreen;
}

.main__content {
  width: 100%;
  flex: 1;
  overflow: hidden;
}
</style>
