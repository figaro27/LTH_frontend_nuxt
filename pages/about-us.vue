<template>
  <div class="about-us">
    <div class="about-us__content">
      <h1 class="about-us__title">Our <span class="about-us__story">Story</span></h1>
      <h3 class="about-us__summary">
        We are a large law innovation & knowledge management leader and a legal industry marketer, bravely embarking on
        a joint business as spouses.
      </h3>

      <div class="about-us__member">
        <div class="about-us__member__avatar">
          <img class="about-us__member__avatar-img" src="/images/about-us/nikki_shaver.png" />
        </div>
        <div class="about-us__member__introduction">
          <h3 class="about-us__member__name">Nicola (Nikki) Shaver</h3>
          <p class="about-us__member__summary">
            Nikki is passionate about the way that legal technology and innovation is unfolding across the world. In
            early 2019, running yet another fruitless Google search for use case functionality, it occurred to her that
            these searches must be even more difficult for firms whose target market is multi-lingual, and whose clients
            want tech-driven legal services delivered in multiple languages.
          </p>
        </div>
      </div>

      <div class="about-us__member">
        <div class="about-us__member__avatar">
          <img class="about-us__member__avatar-img" src="/images/about-us/chris_ford.png" />
        </div>
        <div class="about-us__member__introduction">
          <h3 class="about-us__member__name">Chris Ford</h3>
          <p class="about-us__member__summary">
            Chris has found himself working repeatedly in legal marketing. In discussion with Nikki about the state of
            the industry, the absence of a unified resource for finding legaltech tools and information that was useful,
            comprehensive and reliable seemed like an obvious gap in the market.
          </p>
        </div>
      </div>

      <p class="about-us__goal">
        <strong>Together</strong>, we set about building a resource that combined the most complete global legaltech
        directory with a powerful search, providing a unified resource for finding the right legaltech tools,
        consultants, events, awards and more, no matter where in the world you are.
        <br />
        <br />
        We will continue to build and maintain LTH to serve the needs and wants of the legaltech community. Get in touch
        with any feedback or suggestions to help us get there.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'about-us' })
export default class AboutUs extends Vue {}
</script>

<style lang="scss" scoped>
$avatar-width: 130px;

.about-us {
  width: 100%;
  background: $colorBg2;
  margin-top: 70px;
  padding-bottom: 60px;
  @include col--center;
}

.about-us__content {
  width: 100%;
  max-width: $desktopMaxWidth;
  padding: 30px 70px;
}

.about-us__title {
  @include typography(xxl-1, narrow, bold);
  text-align: center;
  color: $colorNavy;
}

.about-us__story {
  color: $colorGreen;
}

.about-us__summary {
  @include typography(xl, default, bold);
  text-align: center;
  color: $colorDarkGrey;
  margin: 40px 40px 60px;
}

.about-us__member {
  width: 100%;
  @include row;
  margin-bottom: 60px;
}

.about-us__member__avatar {
  width: $avatar-width;
  height: $avatar-width;
  min-width: $avatar-width;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.about-us__member__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.about-us__member__introduction {
  @include col;
}

.about-us__member__name {
  @include typography(xl, default, bold);
  color: $colorNavy;
  text-align: left;
  margin-bottom: 10px;
}

.about-us__member__summary {
  @include typography(lg-1, default);
  color: $colorDarkGrey;
  text-align: left;
}

.about-us__goal {
  @include typography(xl, default);
  color: $colorDarkGrey;
  text-align: center;
}
</style>
