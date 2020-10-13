<template>
  <div class="faq">
    <div class="faq__content">
      <h1 class="faq__title">Frequently <span>Asked Questions</span></h1>

      <div class="faq__questions">
        <faq-question
          v-for="(faq, index) of faqs"
          :key="index"
          :pkey="index"
          :data="faq"
          :opened="index === openedItem"
          class="faq__question"
          @onToggleOpen="onToggleOpen"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { FAQData } from '@/components/FAQ/FaqQuestion.vue'
import { buildMeta } from '~/utils'

@Component({
  name: 'faq',
  head() {
    return buildMeta({
      title: 'FAQ - Legaltech Hub',
      description: 'FAQ - Legaltech Hub'
    })
  }
})
export default class FAQ extends Vue {
  openedItem: number | null = null
  get faqs(): FAQData[] {
    return [
      {
        title: 'What problems does Legaltech Hub solve?',
        answer: `
          We recognized that there was a lacuna in the legaltech market: there was no single destination that united information about legal technology across the globe in one intuitive platform – so we decided to build it. We wanted to make it easy for legal professionals anywhere in the world to find the legaltech tools, events, and resources they need to support their lawyers and clients.<br/><br/>
          As global citizens who have each lived in multiple countries, we were also keenly aware that information about the legaltech industry has been highly skewed towards certain regions of the world. Legaltech Hub helps to correct and address that imbalance. The platform provides insight into how the legal technology ecosystem has been evolving all over the world, not just in the UK and the US. Innovation is amplified by diversity. By providing a complete picture of the ecosystem, we hope to encourage and accelerate legal innovation globally.<br/><br/>
          Finally, Legaltech Hub is a solution that is intended to be equally useful to legal professionals regardless of what language they speak or where they are located. We want to be a vital resource to you, whether you are located in Latvia, Spain, India, UAE, Argentina or Nigeria.
        `
      },
      {
        title: 'Why don’t you include Access to Justice tools in your directory?',
        answer: `
          We set out to build a platform for people working in commercial legal environments, to help them find what they need to drive their organizational digital transformation efforts. We found that most legal directories across the world by default include all categories of legaltech tools in a single list. While this provides an interesting oversight of the ecosystem, these directories often become unwieldy. We wanted to create a directory that was practical and immediately useful for those of us who work in commercial legal, who need to regularly search for tools that meet the practice demands of our lawyers and clients. For that reason, the directory excludes A2J tools as well as legal marketplaces and other tools that serve the general public.<br/><br/>
          Is there a possibility that you may one day expand to include Access to Justice tools?<br/><br/>
          Absolutely. Legaltech Hub is ever-growing and expanding in line with the requirements of our users. If we find that there is significant demand for a similarly useful directory of tools that serve non-profits, government departments, or courts, or that generally sit in the A2J space, we may well build that out.
        `
      },
      {
        title: 'How are the search results sorted?',
        answer:
          'We put a great deal of thought into our relevancy rankings. Search results are ordered based on the prominence of the keyword searched, and the filters applied, within the metadata that adheres to any given result. In other words, if you have searched for “automation”, and then added a filter for “document automation”, your top results will be those that specifically include metadata tags for automation / document automation. Results where these words also appear in the description of the tool will push the tool higher up in your results. Results that do not have a tag applied for the keywords or filter value, but where these terms appear in the description, will still appear in your results but lower down. We deliberately applied the metadata tags to all content that would ensure the results returned would be meaningful to the searches you perform. Where you search for all tools headquartered in a particular location, the default relevancy is alphabetical. Important note: we do not, nor will we ever, commercialize search results. You won’t ever have to worry that a vendor has paid to appear higher in a search for “practice management”, for example. That means you can always count on Legaltech Hub for credible, accurate results.'
      },
      {
        title: 'Is there an easy way to see all of the results in one of your directories?',
        answer:
          'Indeed, there is. Click on the tab corresponding to the tab you wish to search. Keep the search box empty, and click on the magnifying glass to search. The search results will then display the full list of results in that directory, alphabetically ordered. From here, you can easily search within results by adding filters or keywords.'
      },
      {
        title: 'Am I able to search within my results once I’ve performed a search?',
        answer:
          'Yes. Performing a keyword search takes you to a search results page with filters that you can then apply to narrow the results according to your preferred criteria. You may also enter an additional keyword into the search box. The results then returned will be those to which both the first and the second keyword apply (in other words, it will be a smaller sub-set of results). In order to clear your search, click on the “x” on top of the search results list, or completely clear the search box to start again. If you would like to continue the same search but remove a filter previously applied, click the “x” next to that filter value and it will drop out, with the search results automatically adjusting to the new criteria. At any time, you can click “Home” to take you back to the start page, or click on another tab to start searching in a different directory.'
      },
      {
        title: 'Are legal research resources included in your Tools directory? I see some of them here but not all.',
        answer:
          'We only include legal research tools when these also incorporate analytics, machine learning or some other special functionality. As there are so many legal research platforms that exist purely for the purpose of providing information about the law, we did not want to dilute our legal technology database with these. When you see a legal research tool included in the directory, it will therefore incorporate a feature or functionality that sets it apart from most research resources and places it more squarely in the technology tool camp.'
      },
      {
        title:
          'I don’t understand what “Practice Management” means in your Taxonomy. Is there more information about the terminology you use?',
        answer:
          'There will always be some disagreement in the market about what a particular functionality refers to, or how a tool should be categorized. If you would like to understand our categorization methodology and taxonomies better, we suggest that you take a look at our Taxonomy Scope Notes [LINK].'
      },
      {
        title: 'I’ve tried searching for a tool that I know exists, but I can’t find it. What should I do about this?',
        answer:
          'Let us know! We are launching Legaltech Hub with a directory of over 1550 tools for commercial legal, which makes it the richest, most thorough directory of its type in the world. We have employed resources to ensure that we are able to keep our database updated, by weeding out tools that have ceased operating, editing to accommodate acquisitions and consolidations, and adding new start-ups as they launch to market. However – there will be times when we have missed something and we welcome your help. Please email us at <a href="mailto:info@legaltechnologyhub.com">info@legaltechnologyhub.com</a> if you have information for us about the contents of any of our directories.'
      },
      {
        title: 'What is The Graveyard?',
        answer:
          'When we started collecting the data for Legaltech Hub, it quickly became clear to us that one of the challenges of this space is its ever-changing nature. Sadly, some start-ups do not make it, and indeed we have seen one or two shut their doors even since we conceived of Legaltech Hub. We realized that if we tracked this activity, we could provide good data over time on how the industry is evolving. So we created our “Graveyard” and “Consolidations” sites, both accessible from the home-page of Legaltech Hub. The Graveyard provides a list of legaltech tools that have “died” since January 2020, along with a date of death and the same key data we provide in relation to all of our tools. Our Consolidations page lists acquisitions, and provides information about the tools that have been acquired in the market, along with the date of acquisition and the name of the acquiring entity.'
      },
      {
        title: 'Will access to Legaltech Hub always be free?',
        answer:
          'Yes. Our mission is to make Legaltech Hub free to commercial legal professionals in law firms and in-house departments on an ongoing basis. Vendors are also able to have their tools listed on Legaltech Hub free-of-charge. We are monetizing the platform through ads and premium listings. This may evolve over time, but access to the core information on Legaltech Hub will continue to be free.'
      }
    ]
  }

  onToggleOpen(pkey: number) {
    this.openedItem = pkey
  }
}
</script>

<style lang="scss" scoped>
.faq {
  @include desktop-max-width-layout;
  margin-top: 70px;
  padding-bottom: 60px;
  @include col--center;
}

.faq__content {
  padding: 30px 70px;
}

.faq__title {
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
