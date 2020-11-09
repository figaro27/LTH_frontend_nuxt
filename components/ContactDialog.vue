<template>
  <div class="contact-us">
    <img src="/images/svgs/check.svg" />
    <label class="contact-us__title">Thank you!</label>
    <label class="contact-us__description">Your message has been successfully sent.</label>
    <label class="contact-us__description">We will contact you soon.</label>
    <nuxt-link to="./" class="contact-us__link">Back to Home</nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  name: 'contact-dialog'
})
export default class ContactDialog extends Vue {}
</script>

<style lang="scss" scoped>
.contact-us {
  @include col--center;
}

.contact-us__title {
  color: #011d58;
  @include typography(xl-1, none, bold);
  margin-top: 36px;
}

.contact-us__description {
  color: #011d58;
  @include typography(xl, default);
  margin-top: 12px;
}

.contact-us__link {
  color: white;
  background: #80c41c;
  min-width: 275px;
  border-radius: 8px;
  padding: 16px 48px;
  @include typography(xl, default, bold);
  text-decoration: none;
  margin-top: 24px;
}
</style>
