<template>
  <div class="mobile-lth__container">
    <h1 class="lth__title">How <span>LTH works</span></h1>
    <h3 class="lth__summary">
      Legaltech Hub is the global information portal for commercial legal professionals. Here, you will find tools to
      help make your team, department or firm more effective, resources to keep you informed and educated, and
      opportunities to liaise with your peers in the industry. We deliberately set out to create a useful resource for
      professionals working in the commercial legal space, both in-house and in practice. That focus informs the content
      you will find on this site.
    </h3>
    <div class="lth__title">
      <div class="lth__content">
        <client-only>
          <mobile-how-lth-works-item
            v-for="(explain, index) of explains"
            :key="index"
            :pkey="index"
            :data="explain"
            :opened="index === openedItem"
            :functionalities="functionalities"
            class="faq__question"
            @onToggleOpen="onToggleOpen"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { Functionality } from '~/models'

@Component({ name: 'mobile-how-lth-works' })
export default class MobileHowLTHWorks extends Vue {
  @Prop({ required: true }) functionalities!: Functionality[]

  openedItem: number | null = null
  get explains() {
    return [
      {
        title: 'What you WILL find on Legaltech Hub',
        answers: [
          {
            answer:
              "The world's most comprehensive directory of global legal technology tools for commercial legal, maintained and updated regularly"
          },
          {
            answer:
              'Regional snapshots, providing insight into the way the commercial legaltech market is developing in different parts of the world'
          },
          {
            answer:
              "A directory and calendar of legaltech events and conferences across the world, helping you to plan your team's professional engagement"
          },
          {
            answer:
              'A listing of the major legaltech and legal innovation awards across the world, along with submission dates'
          },
          {
            answer: 'A directory of legaltech courses, diplomas and degrees available at universities across the world'
          },
          {
            answer:
              "The ability to search across our directories using nuanced filters that enable you to drill down easily to find exactly what you're looking for"
          },
          {
            answer:
              'Legal resources that help new professionals in the industry get up-to-speed on prominent voices and trends, and provide seasoned industry professionals with a one-stop-shop for key blogs, publications and podcasts, providing an easier way to absorb these and stay at the vanguard of our exciting industry'
          },
          {
            answer:
              'COMING SOON: an exclusive directory of legal consultants, legal engineers, and legal designers across the world, highlighting expertise and jurisdictional focus.'
          }
        ]
      },
      {
        title: 'How our Directories work',
        answer:
          "For each directory, we have gathered the key data you will want to know with respect to the content type. We have also carefully considered the filters that will enable you optimally to search across this data to help you find exactly what you're looking for. Not all of the metadata for a particular content type corresponds to a filter, but when you click on a search result, you will see all of the data applicable to that result in a more detailed search page."
      },
      {
        title: 'Our Tools Directory',
        subtitle: 'The metadata that adheres to tools on Legaltech Hub includes:',
        answers: [
          {
            answer: 'Vendor Name - the organization that produces the tool'
          },
          {
            answer: 'Tool - the name of the tool'
          },
          {
            answer: 'HQ - the country where the vendor is based'
          },
          {
            answer: 'Offices - countries where the vendor has a physical presence'
          },
          {
            answer: 'Functionality - the primary function of the tool (see taxonomy below)'
          },
          {
            answer: 'Sub-Functionality - secondary functions (if any) of the tool'
          },
          {
            answer: 'Practice Area - the area(s) of law to which the tool is targeted'
          },
          {
            answer: 'Platform Language - language(s) of the tool interface'
          },
          {
            answer: 'Linguistic Efficacy - language(s) in which the tool can be utilized'
          },
          {
            answer:
              'Target Entity - either Small Law (solo up to 50 lawyers), Law Firms, Corporates (in-house departments) or Barristers'
          },
          {
            answer: 'Deployment - Cloud, Web or On Premise'
          },
          {
            answer: 'Integrations - other tools with which the tool is designed to integrate'
          },
          {
            answer: 'Website'
          },
          {
            answer: 'Description'
          }
        ],
        image: '/images/lth-tools.png'
      },
      {
        title: 'Functionality taxonomy:',
        answer:
          '*Our taxonomies are organic. If you would like to see a functionality added, email us at admin@legaltechnologyhub.com, and we will consider it.'
      },
      {
        title: 'Our Events directory',
        subtitles: [
          {
            title: `The metadata that adheres to events on Legaltech Hub includes:`,
            answers: [
              {
                answer: 'Organization'
              },
              {
                answer: 'Event Name'
              },
              {
                answer: 'Location: Parent - the country in which the event is held, or if the event is virtual'
              },
              {
                answer: 'Location: Child – the city in which the event is held (if known)'
              },
              {
                answer: 'Recurrence - how frequently the event is held'
              },
              {
                answer: 'Date - the month during which the event takes place (see event website for exact dates)'
              },
              {
                answer: 'Duration – how many days the event lasts'
              },
              {
                answer: 'Audience – the target demographic for the event'
              },
              {
                answer: 'Description'
              },
              {
                answer: 'Website'
              }
            ]
          },
          {
            title: 'The metadata that adheres to awards on Legaltech Hub includes:',
            answers: [
              {
                answer: 'Organization'
              },
              {
                answer: 'Awards Name'
              },
              {
                answer: 'HQ - city or country of in which the awards ceremony is held (if known)'
              },
              {
                answer: 'Jurisdiction - countries or regions the awards cover'
              },
              {
                answer:
                  'Eligibility - firm, team, individual, client, vendor, etc. eligible for the awards or award category'
              },
              {
                answer: 'Type - award, recognition, list or index'
              },
              {
                answer: 'Categories'
              },
              {
                answer:
                  'Submission Deadline (if known – approximate dates are entered based on past years, with additional detail added as the information is released)'
              },
              {
                answer: 'Ceremony date (if and when known)'
              },
              {
                answer: 'Description'
              },
              {
                answer: 'Website'
              }
            ]
          }
        ]
      }
    ]
  }

  onToggleOpen(pkey: number) {
    this.openedItem = pkey
  }
}
</script>

<style lang="scss" scoped>
.mobile-lth__container {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  @include respondTo(mobile) {
    width: 100%;
  }
}
.lth__title {
  @include typography(xxl-1, narrow, bold);
  margin-top: 16px;
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

.lth__content {
  padding: 20px 10px;
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

.faq__questions {
  margin-top: 50px;
  @include col;
}
</style>
