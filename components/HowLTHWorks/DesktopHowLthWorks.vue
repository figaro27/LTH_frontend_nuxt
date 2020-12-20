<template>
  <div class="lth">
    <div class="lth__content">
      <h1 class="lth__title">How <span>LTH works</span></h1>

      <h3 class="lth__summary">
        Legaltech Hub is the global information portal for commercial legal professionals. Here, you will find tools
        help make your team, department or firm more effective, resources to keep you informed and educated, and
        opportunities to liaise with your peers in the industry. We deliberately set out to create a useful resource
        professionals working in the commercial legal space, both in-house and in practice. That focus informs the
        content you will find on this site.
      </h3>

      <div class="lth__section-green">
        <h2 class="lth__section-green__title">What you WILL find on Legaltech Hub:</h2>

        <ul class="lth__section-green__ul">
          <li>
            the world's most comprehensive directory of global legal technology tools for commercial legal, maintained
            and updated regularly
          </li>
          <li>
            regional snapshots, providing insight into the way the commercial legaltech market is developing in
            different parts of the world
          </li>
          <li>
            a directory and calendar of legaltech events and conferences across the world, helping you to plan your
            team's professional engagement
          </li>
          <li>
            a listing of the major legaltech and legal innovation awards across the world, along with submission dates
          </li>
          <li>a directory of legaltech courses, diplomas and degrees available at universities across the world</li>
          <li>
            the ability to search across our directories using nuanced filters that enable you to drill down easily to
            find exactly what you're looking for
          </li>
          <li>
            legal resources that help new professionals in the industry get up-to-speed on prominent voices and trends,
            trends, and provide seasoned industry professionals with a one-stop-shop for key blogs, publications and
            providing an easier way to absorb these and stay at the vanguard of our exciting industry
          </li>
          <li>
            COMING SOON: an exclusive directory of legal consultants, legal engineers, and legal designers across the
            world, highlighting expertise and jurisdictional focus.
          </li>
        </ul>
      </div>

      <div class="lth__section-green">
        <h2 class="lth__section-green__title">What you WON'T find on Legaltech Hub:</h2>

        <ul class="lth__section-green__ul">
          <li>access to justice tools;</li>
          <li>legal marketplace tools;</li>
          <li>tools that serve the public, rather than legal professionals</li>
        </ul>
      </div>

      <div class="lth__section">
        <h2>How our Directories work</h2>
        <p>
          For each directory, we have gathered the key data you will want to know with respect to the content type. We
          have also carefully considered the filters that will enable you optimally to search across this data to help
          you find exactly what you're looking for. Not all of the metadata for a particular content type corresponds a
          filter, but when you click on a search result, you will see all of the data applicable to that result in a
          more detailed search page.
        </p>

        <div class="lth__tools">
          <div class="lth__tools__main">
            <h3>Our Tools Directory</h3>

            <div class="lth__section__ul-container">
              <strong>The metadata that adheres to tools on Legaltech Hub includes:</strong>
              <ul class="lth__section__ul">
                <li>Vendor Name - the organization that produces the tool</li>
                <li>Tool - the name of the tool</li>
                <li>HQ - the country where the vendor is based</li>
                <li>Offices - countries where the vendor has a physical presence</li>
                <li>Functionality - the primary function of the tool (see taxonomy below)</li>
                <li>Sub-Functionality - secondary functions (if any) of the tool</li>
                <li>Practice Area - the area(s) of law to which the tool is targeted</li>
                <li>Platform Language - language(s) of the tool interface</li>
                <li>Linguistic Efficacy - language(s) in which the tool can be utilized</li>
                <li>
                  Target Entity - either Small Law (solo up to 50 lawyers), Law Firms, Corporates (in-house departments)
                  or Barristers
                </li>
                <li>Deployment - Cloud, Web or On Premise</li>
                <li>Integrations - other tools with which the tool is designed to integrate</li>
                <li>Website</li>
                <li>Description</li>
              </ul>
            </div>
          </div>
          <img class="lth__tools__image" src="/images/lth-tools.png" />
        </div>

        <div class="lth__note">
          *The collection of this data is an ongoing process. Over time, more data and more detailed results will be
          available for each entry.
        </div>

        <div class="lth__section__ul-container">
          <h4>You can narrow your search by using these filters that are available on the tools directory:</h4>
          <ul class="lth__section__ul">
            <li>Functionality (incorporating both functionality and sub-functionality metadata)</li>
            <li>HQ</li>
            <li>Office</li>
            <li>Practice Area</li>
            <li>Platform Language (incorporating both platform language and linguistic efficacy)</li>
            <li>Deployment</li>
            <li>Integrations</li>
          </ul>
        </div>

        <h3>Functionality taxonomy:</h3>
        <div class="lth__functionalities">
          <div v-for="(item, index) of functionalities" :key="index" class="lth__functionality">
            {{ item.name }}
          </div>
        </div>

        <div class="lth__note">
          *Our taxonomies are organic. If you would like to see a functionality added, email us at
          <a href="mailto:admin@legaltechnologyhub.com">admin@legaltechnologyhub.com</a>, and we will consider it.
        </div>

        <h3>Our Events directory</h3>

        <div class="lth__section__ul-container">
          <h4>The metadata that adheres to events on Legaltech Hub includes:</h4>
          <ul class="lth__section__ul">
            <li>Organization</li>
            <li>Event Name</li>
            <li>Location: Parent - the country in which the event is held, or if the event is virtual</li>
            <li>Location: Child – the city in which the event is held (if known)</li>
            <li>Recurrence - how frequently the event is held</li>
            <li>Date - the month during which the event takes place (see event website for exact dates)</li>
            <li>Duration – how many days the event lasts</li>
            <li>Audience – the target demographic for the event</li>
            <li>Description</li>
            <li>Website</li>
          </ul>
        </div>

        <div class="lth__section__ul-container">
          <h4>The metadata that adheres to awards on Legaltech Hub includes:</h4>
          <ul class="lth__section__ul">
            <li>Organization</li>
            <li>Awards Name</li>
            <li>HQ - city or country of in which the awards ceremony is held (if known)</li>
            <li>Jurisdiction - countries or regions the awards cover</li>
            <li>
              Eligibility - firm, team, individual, client, vendor, etc. eligible for the awards or award category
            </li>
            <li>Type - award, recognition, list or index</li>
            <li>Categories</li>
            <li>
              Submission Deadline (if known – approximate dates are entered based on past years, with additional detail
              added as the information is released)
            </li>
            <li>Ceremony date (if and when known)</li>
            <li>Description</li>
            <li>Website</li>
          </ul>
        </div>

        <div class="lth__note">
          If you want to see more detail, functionality or categories, please
          <nuxt-link to="/contact-us">let us know</nuxt-link>.
        </div>

        <div class="lth__section__ul-container">
          We are intent on continually developing LTH for you. Not only will we keep our tools, events and awards
          listings updated, but we are also working on adding listings for: <br />
          <ul class="lth__section__ul">
            <li>
              Consultants who specialize in legaltech, legal innovation, knowledge management, legal business strategy,
              legal design, legaltech design and legal engineering;
            </li>
            <li>
              Associations and groups for you to mix with, learn from and inspire fellow legaltech advocates; and •
              University/higher-ed programs that offer legaltech education.
            </li>
          </ul>
        </div>

        <div class="lth__note">
          <strong>
            Do you have questions for us? We would love to hear from you at
            <a href="mailto:info@legaltechnologyhub.com">info@legaltechnologyhub.com</a>, but we also encourage you to
            check out our <nuxt-link to="/faq">FAQs</nuxt-link>
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { Functionality } from '~/models'

@Component({ name: 'desktop-how-lth-works' })
export default class DesktopHowLthWorks extends Vue {
  @Prop({ required: true }) functionalities!: Functionality[]
}
</script>

<style lang="scss" scoped>
$avatar-width: 130px;

.lth {
  @include desktop-max-width-layout;
  margin-top: 70px;
  padding-bottom: 60px;
  @include col--center;
  text-align: left;
}

.lth__content {
  padding: 30px 0;
}

.lth__title {
  @include typography(xxl-1, narrow, bold);
  text-align: center;
  color: $colorNavy;

  span {
    @include typography(xxl-1, narrow, bold);
    color: $colorGreen;
  }
}

.lth__summary {
  @include typography(xl);
  text-align: center;
  color: $colorDarkGrey;
  margin: 40px 40px 40px;
}

.lth__section-green {
  width: 100%;
  @include col;
  margin-top: 40px;
}

.lth__section-green__title {
  @include typography(xl-2, narrow, bold);
  color: $colorGreen;
  margin-bottom: 10px;
}

.lth__section-green__ul {
  padding: 0 20px;
  color: $colorDarkGrey;
}

.lth__section-green__ul li {
  @include typography(lg-1);
  margin: 10px 0;
}

.lth__section-green__ul li:first-letter {
  text-transform: capitalize;
}

.lth__section {
  width: 100%;
  @include col;
  margin-top: 40px;
  color: $colorNavy;
}

.lth__section h2 {
  @include typography(xl-1, narrow, bold);
  margin-bottom: 20px;
}

.lth__section h3 {
  @include typography(xl, default, bold);
  margin: 10px 0;
}

.lth__section p {
  @include typography(lg-1);
  margin: 10px 0;
}

.lth__section__ul-container {
  margin: 10px 0;
}

.lth__section__ul-container ul {
  padding: 0 20px;
}

.lth__section__ul-container li {
  @include typography(lg);
}

.lth__note {
  @include typography(lg);
  color: $colorNavy;
  margin: 10px 0;

  a {
    font-weight: bold;
    color: $colorNavy;
    text-decoration-color: $colorNavy;
  }
}

.lth__tools {
  @include row;
}

.lth__tools__main {
  flex: 1;
  @include col;
}

.lth__tools__image {
  display: block;
  object-fit: contain;
  width: 500px;
}

.lth__functionalities {
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
}

.lth__functionality {
  width: calc(20% - 20px);
  height: 50px;
  margin: 5px 10px;
  @include row--center;
  border: 1px solid $colorDarkGrey;
  border-radius: 4px;
  color: $colorDarkGrey;
  @include typography(md-1);
  @include ellipsis(1, lg);
}
</style>
