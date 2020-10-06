<template>
  <div class="faq-question" :class="{ 'faq-question--open': opened }" @click="toggleOpen">
    <client-only>
      <div class="faq-question__title">
        <label>{{ data.title }}</label>
        <img :src="openImageUrl" />
      </div>
      <div class="faq-question__answer">
        <div v-if="pkey === 0">
          <ul>
            <li v-for="(answer, index) of data.answers" :key="index">{{ answer.answer }}</li>
          </ul>
        </div>

        <div v-if="pkey === 1">
          <div>{{ data.answer }}</div>
        </div>

        <div v-if="pkey === 2">
          <div>{{ data.subtitle }}</div>
          <ul>
            <li v-for="(answer, index) of data.answers" :key="index">{{ answer.answer }}</li>
          </ul>
          <img src="/images/lth-tools.png" height="152px" width="173px" />
        </div>

        <div v-if="pkey === 3">
          <div class="lth__functionalities">
            <div v-for="(item, index) of functionalities" :key="index" class="lth__functionality">
              {{ item.name }}
            </div>
          </div>
          <div>{{ data.answer }}</div>
        </div>
        <div v-if="pkey === 4">
          <div v-for="(subtitle, idx) of data.subtitles" :key="idx">
            <div>{{ subtitle.title }}</div>
            <ul>
              <li v-for="(item, i) of subtitle.answers" :key="i">{{ item.answer }}</li>
            </ul>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Functionality } from '~/models'

@Component({ name: 'mobile-how-lth-works-item' })
export default class MobileHowLTHWorksItem extends Vue {
  @Prop({ required: true }) data!: any
  @Prop({ required: true }) pkey!: number
  @Prop({ required: true }) opened!: boolean
  @Prop({ required: true }) functionalities!: Functionality[]

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
.lth__functionalities {
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  background: #e0e0e0;
}

.lth__functionality {
  width: calc(50% - 20px);
  height: 50px;
  margin: 5px 10px;
  @include row--center;
  color: #000000;
  border: 1px solid #bdbdbd;
  border-top: none;
  border-left: none;
  border-right: none;
  @include typography(md-1);
  @include ellipsis(1, lg);
}

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
    padding: 20px 10px;
  }
}
</style>
