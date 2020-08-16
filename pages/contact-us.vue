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
            placeholder="Email Address *"
            type="email"
            required="required"
          />
          <input-field
            id="firstName"
            v-model="data.firstName"
            class="contact-us__input"
            name="firstName"
            placeholder="First Name *"
            required="required"
          />
          <input-field
            id="lastName"
            v-model="data.lastName"
            class="contact-us__input"
            name="lastName"
            placeholder="Last Name *"
            required="required"
          />
          <input-field
            id="companyName"
            v-model="data.companyName"
            class="contact-us__input"
            name="companyName"
            placeholder="Company Name"
          />
          <input-field
            id="country"
            v-model="data.country"
            class="contact-us__input"
            name="country"
            placeholder="Country"
          />
          <text-area
            id="message"
            v-model="data.message"
            class="contact-us__input"
            name="message"
            placeholder="Message *"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { api } from '@/utils'

type ContactData = {
  email: string
  firstName: string
  lastName: string
  companyName: string
  country: string
  message: string
}

@Component({ name: 'contact-us' })
export default class ContactUs extends Vue {
  data: ContactData = {
    email: 'wang.minion.love@gmail.com',
    firstName: 'Chris',
    lastName: 'Wang',
    companyName: '',
    country: '',
    message: 'Test Message'
  }

  get disabled() {
    const { data } = this
    return !data.email || !data.firstName || !data.lastName || !data.message
  }

  async submit() {
    console.log('submit: ', this.data)
    await this.$recaptchaLoaded()
    const token: string = await this.$recaptcha('contact-us')
    console.log('token: ', token)
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
  }
}
</script>

<style lang="scss" scoped>
.contact-us {
  @include desktop-max-width-layout;
  margin-top: 70px;
  padding-bottom: 60px;
  @include col--center;
}

.contact-us__content {
  padding: 30px 70px;
}

.contact-us__title {
  @include typography(xxl-3, narrow, bold);
  text-align: center;
  color: $colorNavy;

  span {
    @include typography(xxl-3, narrow, bold);
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
}

.contact-us__form {
  flex: 3;
  @include col--center;
}

.contact-us__input {
  width: 100%;
  margin: 10px 0;
}

.contact-us__informations {
  flex: 2;
  margin-left: 50px;
  @include col;
}

.contact-us__information {
  @include row;
  align-items: center;
  margin: 5px 0;
  text-decoration: none;

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
  color: $colorLighterDarkGrey;
  @include typography(lg-1, default, bold);
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.9;
  }
}
</style>
