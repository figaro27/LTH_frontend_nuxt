<template>
  <div class="twitter-feed">
    <img class="twitter-feed__icon" src="/images/svgs/twitter.svg" />
    <a
      class="twitter-timeline"
      href="https://twitter.com/LegalTechHub1?ref_src=twsrc%5Etfw"
      data-height="390"
      data-chrome="nofooter noscrollbar"
    >
    </a>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'twitter-feed' })
export default class TwitterFeed extends Vue {}
</script>

<style lang="scss" scoped>
.twitter-feed {
  margin-top: 40px;
  padding: 25px 10px 10px 10px;
  background-color: #f9f9fb;
  position: relative;
  border-radius: 10px;
}

.twitter-feed__icon {
  position: absolute;
  left: 50%;
  top: 0%;
  transform: translate(-50%, -50%);
}
</style>
