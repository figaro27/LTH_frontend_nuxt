<template>
  <footer class="footer">
    <logo class="footer__logo" />

    <div class="footer__sections">
      <div class="footer__section">
        <h5 class="footer__section__title">Follow Us</h5>
        <div class="footer__section__items">
          <a href="tel:+13473355458">+1 347 335 5458</a>

          <div class="footer__section__socials">
            <a href="https://twitter.com">
              <img src="@/assets/icons/twitter.svg" />
            </a>
            <a href="https://linkedin.com">
              <img src="@/assets/icons/linkedin.svg" />
            </a>
          </div>
        </div>
      </div>

      <div class="footer__section">
        <h5 class="footer__section__title">Help</h5>
        <div class="footer__section__items">
          <nuxt-link v-for="(link, index) of helpLinks" :key="`help-${index}`" class="footer__link" :to="link.to">
            {{ link.label }}
          </nuxt-link>
        </div>
      </div>

      <div class="footer__section">
        <h5 class="footer__section__title">About Us</h5>
        <div class="footer__section__items">
          <nuxt-link v-for="(link, index) of aboutLinks" :key="`about-${index}`" class="footer__link" :to="link.to">
            {{ link.label }}
          </nuxt-link>
        </div>
      </div>

      <div class="footer__section">
        <h5 class="footer__section__title">Legal</h5>
        <div class="footer__section__items">
          <nuxt-link v-for="(link, index) of legalLinks" :key="`legal-${index}`" class="footer__link" :to="link.to">
            {{ link.label }}
          </nuxt-link>
        </div>
      </div>
    </div>

    <hr class="footer__hr" />

    <div class="footer__copyright">
      @ Copyright, 2020
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from './Logo.vue'

@Component({
  name: 'default-footer',
  components: { Logo }
})
export default class DefaultFooter extends Vue {
  get helpLinks() {
    return [
      { label: 'Contact Us', to: '/contact-us' },
      { label: 'How LTH works', to: '/how-lth-works' },
      { label: 'Regional Snapshots', to: '/regional-snapshots' },
      { label: 'Add/Update your Listing', to: '/listing' },
      { label: 'FAQ', to: '/faq' }
    ]
  }

  get aboutLinks() {
    return [{ label: 'About Us', to: '/about-us' }]
  }

  get legalLinks() {
    return [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookie-policy' }
    ]
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding: 30px 60px;
  @include col;
  background: $colorNeutralsSnow;
  text-align: left;
}

.footer__logo {
  width: 190px;
}

.footer__sections {
  @include row;
  margin: 50px 50px 30px 50px;
}

.footer__section {
  flex: 1;
  @include col;
}

.footer__section__title {
  @include typography(lg);
  color: $colorNavy;
  margin-bottom: 10px;
}

.footer__section__items {
  @include col;

  a {
    @include typography(md-1, default, 500);
    text-decoration: none;
    color: $colorNavy;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}

.footer__section__socials {
  margin-top: 20px;
  @include row;

  a {
    width: 24px;
    height: 24px;
    text-decoration: none;
    margin-right: 5px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.footer__hr {
  width: 100%;
  height: 1px;
  background: $colorNeutralsGrey;
  opacity: 0.2;
  margin: 20px 0;
}

.footer__copyright {
  @include typography(md);
  color: $colorNeutralsGrey;
}
</style>
