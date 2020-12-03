<template>
  <div class="subscribe_container">
    <div v-if="isSubscribe" class="subscribe">
      <img class="subscribe_img" src="/images/subscribe/box.svg" />
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
          <button class="sumscribe_form_submit" type="button" @click="submit">Subscribe</button>
        </div>
      </div>
    </div>
    <div v-if="isSnackbar" class="snackbar">
      <label class="snackbar_text">
        <span class="snackbar_text_bold">Thank you!</span> You have subscribed to our monthly newsletter
      </label>
      <label class="snackbar_close" @click="isSnackbar = false">CLOSE</label>
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

  isSnackbar: boolean = false
  isSubscribe: boolean = true

  submit() {
    console.log('submit')
    this.isSubscribe = false
    this.isSnackbar = true
    setTimeout(() => {
      this.isSnackbar = false
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.subscribe_container {
  background: $colorNeutralsSnow;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.subscribe {
  display: flex;
  align-items: flex-end;
  background-image: url('/images/subscribe/background.svg');
  background-repeat: no-repeat;
  background-size: 90% 90%;
  background-position: bottom;
  height: 520px;
  width: 1440px;
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
  display: flex;
  flex-direction: column;
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
  text-align: left;
}

.subscribe_form_title {
  font-size: 36px;
  font-family: 'PT Sans';
  font-weight: bold;
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
  font-size: 18px;
  font-family: 'PT Sans';
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
  display: flex;
  margin: 15px 0;
  @media (max-width: 640px) {
    margin: 2px 5px;
  }
}

.subscribe_form_input {
  font-size: 18px;
  font-family: 'PT Sans';
  padding: 0 20px;
  width: 530px;
  height: 65px;
  @media (max-width: 870px) {
    font-size: 14px;
    width: 289px;
    height: 35px;
  }
  @media (max-width: 640px) {
    width: 160px;
    height: 30px;
    font-size: 12px;
    padding: 0 10px;
  }
  border-radius: 20px 0 0 20px;
}

.sumscribe_form_submit {
  font-size: 18px;
  font-family: 'PT Sans';
  font-weight: bold;
  width: 170px;
  height: 66px;
  @media (max-width: 870px) {
    font-size: 10px;
    width: 100px;
    height: 35px;
  }
  @media (max-width: 640px) {
    width: 70px;
    height: 30px;
    font-size: 10px;
  }
  background: $colorLightGreen;
  border-radius: 0 20px 20px 0;
}

.snackbar {
  position: fixed;
  width: 646px;
  height: 58px;
  z-index: 10;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: url('/images/subscribe/snackbar_background.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  @media (max-width: 640px) {
    width: 500px;
  }
}

.snackbar_text {
  font-family: 'PT Sans Narrow';
  font-size: 18px;
  color: $colorNavy;
  margin: 20px;
}

.snackbar_text_bold {
  font-weight: bold;
}

.snackbar_close {
  font-family: 'PT Sans Narrow';
  font-size: 14px;
  color: #5980d7;
  margin: 20px;
}
</style>
