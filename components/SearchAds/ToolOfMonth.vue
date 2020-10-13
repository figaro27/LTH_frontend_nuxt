<template>
  <div class="tool-of-month">
    <img class="tool-of-month-image" src="https://legal-uploads.s3.us-east-2.amazonaws.com/ads/ilves.svg" />
    <img
      class="tool-of-month-image--mobile"
      src="https://legal-uploads.s3.us-east-2.amazonaws.com/ads/ilves-mobile.svg"
    />
    <div class="tool-of-month-content">
      <h2 class="tool-of-month__title">
        Tool Of the Month
      </h2>
      <div class="tool-of-month__description">
        Check our the Enterprise Search tool by Ilves
      </div>
      <div class="tool-of-month__learn-more">
        <nuxt-link class="tool-of-month__learn-more__link" to="/vendor/914" @click.native="onLearnMore">
          Learn more <img src="@/assets/icons/chevron-right.svg" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'tool-of-month' })
export default class ToolOfWeek extends Vue {
  // TODO: Add backend support

  onLearnMore() {
    this.$ga.event('tool_of_month', 'click_learn_more')
  }
}
</script>

<style lang="scss" scoped>
.tool-of-month {
  @include col;
  margin-top: 20px;
  border-radius: 10px;
  min-height: 180px;
  background: linear-gradient(
    90deg,
    rgba(210, 238, 175, 0.203929) 0%,
    rgba(203, 239, 149, 0.084) 0%,
    rgba(222, 236, 221, 0.42) 100%
  );
  text-align: left;
  position: relative;
  box-shadow: 0px 0 4px 2px rgba(0, 0, 0, 0.13);

  @include respondTo(mobile) {
    margin-top: 60px;
    min-height: 120px;
  }
}

.tool-of-month-image {
  width: 100%;

  @include respondTo(mobile) {
    display: none;
  }
}

.tool-of-month-image--mobile {
  width: 100%;
  display: none;

  @include respondTo(mobile) {
    display: block;
  }
}

.tool-of-month-content {
  position: absolute;
  right: 10px;
  bottom: 10px;
  left: 10px;

  @include respondTo(mobile) {
    max-width: 35%;
    left: auto;
    top: 10px;
    @include col;
    align-items: flex-end;
  }
}

.tool-of-month__title {
  @include typography(xl, narrow, bold);
  color: $colorLightNavy;
  margin-bottom: 5px;

  @include respondTo(mobile) {
    text-align: right;
    @include typography(lg-1, narrow, bold);
  }
}

.tool-of-month__description {
  @include typography(lg);
  margin-left: 10px;
  margin-bottom: 10px;
  color: $colorLightBlue;
  flex: 1;

  @include respondTo(mobile) {
    @include typography(md);
    max-width: 80%;
    margin: 0;
    text-align: right;
  }
}

.tool-of-month__learn-more {
  @include row;
  justify-content: flex-end;
}

.tool-of-month__learn-more__link {
  @include row--center;
  @include typography(lg, default, bold);
  color: $colorLightBlue;
  text-decoration: none;

  img {
    margin-left: 5px;
  }

  &:hover {
    text-decoration: underline;
  }

  @include respondTo(mobile) {
    @include typography(md-1, default, bold);
  }
}
</style>
