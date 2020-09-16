<template>
  <div class="tool-of-week">
    <h2 class="tool-of-week__title">
      Tool Of the Month
    </h2>
    <label class="tool-of-week__description">
      Check out the new AI tool from Syntheia...
    </label>
    <div class="tool-of-week__learn-more">
      <nuxt-link to="/vendor/1020">Learn more →</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'tool-of-week' })
export default class ToolOfWeek extends Vue {
  // TODO: Add backend support
}
</script>

<style lang="scss" scoped>
.tool-of-week {
  @include col;
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  min-height: 180px;
  background: linear-gradient(
    90deg,
    rgba(210, 238, 175, 0.203929) 0%,
    rgba(203, 239, 149, 0.084) 0%,
    rgba(222, 236, 221, 0.42) 100%
  );
  text-align: left;
}

.tool-of-week__title {
  @include typography(xl, narrow, bold);
  color: $colorGreen;
  margin-bottom: 15px;
}

.tool-of-week__description {
  margin-left: 5px;
  color: $colorNavy;
  @include typography(lg);
  flex: 1;
}

.tool-of-week__learn-more {
  @include row;
  justify-content: flex-end;

  a {
    color: $colorNavy;
    @include typography(lg);
    text-decoration: underline;
  }
}
</style>
