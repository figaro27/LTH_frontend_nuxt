<template>
  <div class="subscribe_container">
    <div v-if="status === 'snackbar'" class="snackbar">
      <label class="snackbar_text">
        <span class="snackbar_text_bold">Thank you!</span> You have subscribed to our monthly newsletter
      </label>
      <label class="snackbar_close" @click="reset">CLOSE</label>
    </div>
    <div v-else class="subscribe">
      <img class="subscribe_img" src="/images/subscribe/box.svg" />
      <div class="subscribe_form">
        <h1 class="subscribe_form_title">Subscribe To Our Newsletter</h1>
        <label class="subscribe_form_desc">
          Join our subscribers list to get the latest news and updates delivered directly to your inbox
        </label>
        <div class="subscribe_form_input_section">
          <input
            id="email"
            v-model="email"
            class="subscribe_form_input"
            :disabled="status === 'subscribing'"
            name="email"
            type="email"
            required="required"
            placeholder="Your email for newsletter subscription"
          />
          <button class="subscribe_form_submit" :disabled="status === 'subscribing'" type="button" @click="submit">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { api } from '@/utils'

import Subscribe from './Subscribe.vue'

@Component({
  name: 'default-subscribe',
  components: { Subscribe }
})
export default class DefaultSubscribe extends Vue {
  email: string = ''
  status: 'empty' | 'subscribing' | 'snackbar' = 'empty'

  validateEmail() {
    // Validate email address
  }

  async submit() {
    this.status = 'subscribing'
    this.validateEmail()
    await this.$recaptchaLoaded()
    const token: string = await this.$recaptcha('contact_us')

    try {
      await api.post('contact/subscribe', {
        email: this.email,
        token
      })
    } catch (error) {
      // eslint-disable-next-line no-undef
      gtag('event', 'exception', {
        fatal: true,
        description: error
      })
    }

    this.status = 'snackbar'
    setTimeout(() => this.reset(), 5000)
  }

  reset() {
    this.status = 'empty'
    this.email = ''
  }
}
</script>

<style lang="scss" scoped>
.subscribe_container {
  @include row;
  align-items: flex-end;
  justify-content: center;
  background: $colorNeutralsSnow;
}

.subscribe {
  @include row;
  align-items: flex-end;
  background-image: url('/images/subscribe/background.svg');
  background-repeat: no-repeat;
  background-size: 90% 90%;
  background-position: bottom;
  width: 1440px;
  height: 520px;

  @media (max-width: 1200px) {
    height: 400px;
    width: 1100px;
  }
  @media (max-width: 870px) {
    height: 285px;
    width: 750px;
  }
  @media (max-width: 640px) {
    height: 160px;
    width: 440px;
  }
}

.subscribe_img {
  width: 420px;
  height: 350px;

  @media (max-width: 1200px) {
    width: 310px;
    height: 270px;
  }
  @media (max-width: 870px) {
    width: 210px;
    height: 199px;
  }
  @media (max-width: 640px) {
    width: 140px;
    height: 120px;
  }
}

.subscribe_form {
  @include col;
  text-align: left;
  padding: 20px 100px 100px 60px;

  @media (max-width: 1200px) {
    padding: 0 85px 30px 0;
  }
  @media (max-width: 870px) {
    padding: 0 40px 30px 30px;
  }
  @media (max-width: 640px) {
    padding: 0 20px 10px 0;
  }
}

.subscribe_form_title {
  @include typography(xxl-1, default, bold);
  color: $colorNavy;
  margin: 15px 0;

  @media (max-width: 870px) {
    margin: 2px 5px;
    font-size: 18px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
    margin: 2px 5px;
  }
}

.subscribe_form_desc {
  @include typography(lg-1);
  color: $colorNavy;
  margin: 15px 0;

  @media (max-width: 870px) {
    margin: 2px 5px;
    font-size: 16px;
  }
  @media (max-width: 640px) {
    margin: 2px 5px;
    font-size: 12px;
  }
}

.subscribe_form_input_section {
  @include row;
  margin: 15px 0;

  @media (max-width: 640px) {
    margin: 2px 5px;
  }
}

.subscribe_form_input {
  @include typography(lg-1);

  padding: 0 20px;
  width: 530px;
  height: 65px;
  border-radius: 20px 0 0 20px;

  @media (max-width: 870px) {
    @include typography(md-1);
    width: 289px;
    height: 35px;
  }
  @media (max-width: 640px) {
    @include typography(md);
    width: 160px;
    height: 30px;
    padding: 0 10px;
  }
}

.subscribe_form_submit {
  @include typography(lg-1, default, bold);
  width: 170px;
  height: 66px;
  background: $colorLightGreen;
  border-radius: 0 20px 20px 0;

  &:disabled {
    opacity: 0.8;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  @media (max-width: 870px) {
    @include typography(sm, default, bold);
    width: 100px;
    height: 35px;
  }
  @media (max-width: 640px) {
    @include typography(sm, default, bold);
    width: 70px;
    height: 30px;
  }
}

.snackbar {
  @include row--distributed--center;
  position: fixed;
  width: 646px;
  height: 58px;
  z-index: 10;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  background: url('/images/subscribe/snackbar_background.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  @media (max-width: 640px) {
    width: 500px;
  }
}

.snackbar_text {
  @include typography(lg-1, narrow);

  color: $colorNavy;
  margin: 20px;
}

.snackbar_text_bold {
  font-weight: bold;
}

.snackbar_close {
  @include typography(lg, narrow);
  color: #5980d7;
  margin: 20px;
}
</style>
