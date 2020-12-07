<template>
  <div class="contact-us">
    <div class="contact-us__content">
      <h1 class="contact-us__title">Contact <span>Us</span></h1>

      <div class="contact-us__form-container">
        <div class="contact-us__form">
          <input-field
            id="email"
            v-model="data.email"
            class="contact-us__input"
            name="email"
            type="email"
            required="required"
            label="Email Address *"
          />
          <input-field
            id="firstName"
            v-model="data.firstName"
            class="contact-us__input"
            name="firstName"
            label="First Name *"
            required="required"
          />
          <input-field
            id="lastName"
            v-model="data.lastName"
            class="contact-us__input"
            name="lastName"
            label="Last Name *"
            required="required"
          />
          <input-field
            id="companyName"
            v-model="data.companyName"
            class="contact-us__input"
            name="companyName"
            label="Company Name"
          />
          <input-field id="country" v-model="data.country" class="contact-us__input" name="country" label="Country" />
          <text-area
            id="message"
            v-model="data.message"
            class="contact-us__input"
            name="message"
            label="Message *"
            required="required"
          />

          <button class="contact-us__submit" :disabled="disabled" type="button" @click="submit">Send Message</button>
        </div>

        <div class="contact-us__informations">
          <a class="contact-us__information" href="mailto:info@legaltechnologyhub.com">
            <img src="/images/contact-us/email.svg" />
            <label>info@legaltechnologyhub.com</label>
          </a>

          <a class="contact-us__information" href="tel:+13473355458">
            <img src="/images/contact-us/phone.svg" />
            <label>+1 347 335 5458</label>
          </a>

          <div class="contact-us__information">
            <img src="/images/contact-us/location.svg" />
            <label>Location</label>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <contact-dialog v-if="showModal" v-on-clickaway="away" class="contact-us__modal" />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { api, buildMeta } from '@/utils'
import { mixin as ClickAway } from 'vue-clickaway'
import { ComponentOptions } from 'vue'
type ContactData = {
  email: string
  firstName: string
  lastName: string
  companyName: string
  country: string
  message: string
}

@Component({
  name: 'contact-us',
  mixins: [ClickAway as ComponentOptions<Vue>],
  head() {
    return buildMeta({
      title: 'Contact Us - Legaltech Hub',
      description: 'Contact Us - Legaltech Hub'
    })
  }
})
export default class ContactUs extends Vue {
  data: ContactData = {
    email: '',
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    message: ''
  }

  showModal: boolean = false

  get disabled() {
    const { data } = this
    return !data.email || !data.firstName || !data.lastName || !data.message
  }

  async submit() {
    await this.$recaptchaLoaded()
    const token: string = await this.$recaptcha('contact_us')
    const params = {
      ...this.data,
      token
    }

    await api.post('contact', params)

    this.data = {
      email: '',
      firstName: '',
      lastName: '',
      companyName: '',
      country: '',
      message: ''
    }
    window.scrollTo(0, 0)
    this.showModal = true
  }

  away() {
    this.showModal = false
  }
}
</script>

<style lang="scss" scoped>
.contact-us {
  @include desktop-max-width-layout;
  margin-top: 70px;
  padding-bottom: 60px;
  @include col--center;

  @include respondTo(mobile) {
    background: none;
  }
}

.contact-us__content {
  padding: 30px 70px;

  @include respondTo(mobile) {
    padding: 30px 10px;
  }
}

.contact-us__title {
  @include typography(xxl-1, narrow, bold);
  text-align: center;
  color: $colorNavy;

  span {
    @include typography(xxl-1, narrow, bold);
    color: $colorGreen;
  }
}

.contact-us__form-container {
  width: 100%;
  @include row--center;
  margin-top: 50px;
  padding: 50px;
  background: $colorBg2;
  box-shadow: 0px 8px 40px rgba(9, 44, 76, 0.16);
  box-shadow: 5px;

  @include respondTo(mobile) {
    width: 95%;
    padding: 25px;
    flex-direction: column;
  }
}

.contact-us__form {
  flex: 3;
  @include col--center;

  @include respondTo(mobile) {
    width: 70%;
  }
}

.contact-us__input {
  width: 100%;
  margin: 10px 0;
}

.contact-us__informations {
  flex: 2;
  margin-left: 50px;
  @include col;

  @include respondTo(mobile) {
    margin-left: 0;
    margin-top: 20px;
  }
}

.contact-us__information {
  @include row;
  align-items: center;
  margin: 5px 0;
  text-decoration: none;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  label {
    color: $colorNavy;
    @include typography(lg-1);
  }
}

.contact-us__submit {
  width: fit-content;
  margin-top: 20px;
  background: $colorBg1;
  color: $colorNavy;
  @include typography(lg-1, default, bold);
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  &:disabled {
    color: $colorLighterDarkGrey;
  }

  &:not(:disabled) {
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.9;
    }
  }

  @include respondTo(mobile) {
    background: $colorNavy;
    color: $colorBg1;
  }
}

.contact-us__modal {
  position: absolute;
  top: 40%;
  width: 480px;
  z-index: 1;
  margin: 0 auto;
  padding: 40px 40px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
</style>
