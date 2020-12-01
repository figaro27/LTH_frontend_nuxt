<template>
  <div class="subscribe">
    <div class="subscribe_form">
      <h1 class="subscribe_form_title">Subscribe To Our Newsletter</h1>
      <label class="subscribe_form_desc">
        Join our subscribers list to get the latest news and updates delivered directly to your inbox
      </label>
      <div class="subscribe_form_input_section">
        <input
          id="email"
          v-model="data.email"
          class="subscribe_form_input"
          name="email"
          type="email"
          required="required"
          placeholder="Your Email"
        />
        <button class="sumscribe_form__submit" type="button" @click="submit">Subscribe</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Subscribe from './Subscribe.vue'

type SubscribeData = {
  email: string
}

@Component({
  name: 'default-subscribe',
  components: { Subscribe }
})
export default class DefaultSubscribe extends Vue {
  data: SubscribeData = {
    email: ''
  }

  submit() {
    console.log('submit')
  }
}
</script>

<style lang="scss" scoped>
.subscribe {
  height: 540px;
  @media (max-width: 640px) {
    height: 250px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background: $colorNeutralsSnow;
  background-image: url('/images/subscribe/background.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.subscribe_background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.subscribe_form {
  display: flex;
  flex-direction: column;
  margin: 30px 0 0 250px;
  @media (max-width: 900px) {
    margin: 20px 30px 0 360px;
  }
  @media (max-width: 768px) {
    margin: 20px 30px 0 400px;
  }
  @media (max-width: 620px) {
    margin: 25px 30px 0 320px;
  }
  @media (max-width: 580px) {
    margin: 30px 30px 0 280px;
  }
  @media (max-width: 465px) {
    margin: 35px 30px 0 200px;
  }
  text-align: left;
}

.subscribe_form_title {
  font-size: 36px;
  font-family: 'PT Sans';
  font-style: bold;
  color: $colorNavy;
  margin: 15px 0;
  @media (max-width: 640px) {
    font-size: 20px;
    margin: 5px;
  }
}

.subscribe_form_desc {
  font-size: 18px;
  font-family: 'PT Sans';
  color: $colorNavy;
  margin: 15px 0;
  @media (max-width: 640px) {
    margin: 5px;
  }
}

.subscribe_form_input_section {
  display: flex;
  align-items: center;
  margin: 15px 0;
  @media (max-width: 640px) {
    margin: 5px;
  }
}

.subscribe_form_input {
  font-size: 18px;
  font-family: 'PT Sans';
  padding: 15px;
  width: 530px;
  height: 65px;
  @media (max-width: 640px) {
    width: 200px;
    height: 40px;
  }
  border-radius: 20px 0 0 20px;
}

.sumscribe_form__submit {
  font-size: 18px;
  font-family: 'PT Sans';
  font-style: bold;
  width: 170px;
  height: 66px;
  @media (max-width: 640px) {
    width: 100px;
    height: 40px;
  }
  background: $colorLightGreen;
  border-radius: 0 20px 20px 0;
}
</style>
