<template>
  <div class="faq-question" :class="{ 'faq-question--open': opened }" @click="toggleOpen">
    <div class="faq-question__title">
      <label>{{ data.title }}</label>
      <img :src="openImageUrl" />
    </div>
    <div class="faq-question__answer">
      <div v-html="data.answer" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export type FAQData = {
  title: string
  answer: string
}

@Component({ name: 'faq-question' })
export default class FAQQuestion extends Vue {
  @Prop({ required: true }) data!: FAQData
  @Prop({ required: true }) pkey!: number
  @Prop({ required: true }) opened!: boolean

  get openImageUrl() {
    return this.opened ? '/images/faq/chevron-closed.svg' : '/images/faq/chevron-opened.svg'
  }

  toggleOpen() {
    if (this.opened) {
      this.$emit('onToggleOpen', null)
    } else {
      this.$emit('onToggleOpen', this.pkey)
    }
  }
}
</script>

<style lang="scss" scoped>
.faq-question {
  width: 100%;
  @include col;
  border: 1px solid #bdbdbd;
  border-top: none;
  overflow: hidden;

  &:first-child {
    border-radius: 5px 5px 0 0;
    border-top: 1px solid #bdbdbd;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }
}

.faq-question__title {
  padding: 10px 40px;
  @include row;
  background: white;

  label {
    flex: 1;
    color: $colorNavy;
    @include typography(lg-1, narrow, bold);
    text-align: left;
  }

  img {
    width: 23px;
    margin-left: 20px;
  }
}

.faq-question__answer {
  width: 100%;
  height: 0;
  padding: 0;
  background: $colorBg2;
  transition: height 0.2s;
  overflow: hidden;

  & > div {
    width: 100%;
    color: $colorDarkGrey;
    @include typography(lg);
    text-align: left;
    overflow: hidden;
  }
}

.faq-question--open {
  .faq-question__title {
    background: $colorNavy;
    label {
      color: $colorBg2;
    }
  }

  .faq-question__answer {
    height: auto;
    padding: 20px 40px;
  }
}
</style>
