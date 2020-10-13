<template>
  <div class="blogs">
    <ad class="blogs__left-ad" direction="vertical" position="left" />

    <div class="blogs__content">
      <client-only>
        <div v-for="(section, sectionIndex) of blogSections" :key="`section${sectionIndex}`" class="blogs__section">
          <div class="blogs__title">
            <img class="blogs__title-image" :src="section.icon" />
            <h2 class="blogs__title-text">{{ section.title }}</h2>
          </div>
          <div
            v-for="(blogsRow, rowIndex) of section.blogs"
            :key="`${sectionIndex}-row${rowIndex}`"
            class="blogs__section__row"
          >
            <div
              v-for="(blogsCol, colIndex) of blogsRow"
              :key="`${sectionIndex}-col${rowIndex}-${colIndex}`"
              class="blogs__section__col"
            >
              <div
                v-for="blog of blogsCol"
                :key="blog.name"
                class="blog"
                :class="`blog--${blog.type} blog--${blog.name}`"
              >
                <h3 class="blog__title">{{ blog.title }}</h3>
                <span class="blog__title-border" />
                <div class="blog__image">
                  <img class="blog__image__img" :src="blog.image" />
                </div>
                <div class="blog__description" v-html="blog.description" />
                <a class="blog__button" :href="blog.url" target="_blank">Visit Website</a>
              </div>
            </div>
          </div>
          <ad v-if="isMobile" class="blogs__horizontal-ad" direction="horizontal" />
          <hr v-if="sectionIndex < blogSections.length - 1" class="blogs__divider" />
        </div>
      </client-only>
    </div>

    <ad class="blogs__right-ad" direction="vertical" position="right" />
  </div>
</template>

<script lang="ts">
import { isMobile } from 'mobile-device-detect'
import { Component, Vue } from 'nuxt-property-decorator'
import { buildMeta } from '~/utils'

@Component({
  name: 'blogs',
  head() {
    return buildMeta({
      title: 'Legaltech Resources - Legaltech Hub',
      description: 'Legaltech Resources - Legaltech Hub'
    })
  }
})
export default class Blogs extends Vue {
  readonly isMobile = isMobile
  get blogSections() {
    return [
      {
        title: 'Read',
        icon: '/images/blogs/read.png',
        blogs: [
          [
            [
              {
                name: 'legal-it-insider',
                title: 'Legal IT Insider',
                description:
                  'Legal IT Insider, aka "the orange rag", is often the first publication to scoop the latest news about legaltech launches, acquisitions and high-profile industry shifts. Written and edited by UK legal journalist Caroline Hill (Twitter: <a href="https://twitter.com/chillmedia" target="_blank">@chillmedia</a>), this global publication is a must-follow. Sign up for the newsletter to get the news as it’s breaking.',
                image: '/images/blogs/legal-it-insider.png',
                type: 'big-gradient',
                url: 'https://legaltechnology.com'
              }
            ],
            [
              {
                name: 'law-sites',
                title: 'LawSites',
                description:
                  'A blog by legal journalist Bob Ambrogi, who has been writing and speaking about legal technology, legal practice and legal ethics for more than two decades.',
                image: '/images/blogs/law-site.png',
                type: 'landscape',
                url: 'https://www.lawsitesblog.com'
              },
              {
                name: 'prism-legal',
                title: 'Prism Legal',
                description:
                  'A blog aimed at improving law practice efficiency and law firm business operations. Written by Ron Friedmann (Twitter: <a href="https://twitter.com/ronfriedmann" target="_blank">@ronfriedmann</a>), a highly respected thought leader who has spent three decades in the legal market.',
                image: '/images/blogs/prism-legal.png',
                type: 'landscape',
                url: 'https://prismlegal.com'
              }
            ]
          ],
          [
            [
              {
                name: 'artificial-lawyer',
                title: 'Artificial Lawyer',
                description:
                  'Artificial Lawyer is a blog about changing the business of law, often through the use of technology, but also through the better deployment of people inside organisations and within new business structures, as well as innovation around process improvement. Written by Richard Tromans, the blog reports on the newest legaltech news and start-ups, as well as developments around the world.',
                image: '/images/blogs/artificial-lawyer.png',
                type: 'portrait',
                url: 'https://www.artificiallawyer.com'
              }
            ],
            [
              {
                name: '3-geeks-and-a-law',
                title: '3 Geeks and a Law',
                description:
                  'A legaltech blog focused on the administrative side of today’s large law environment, written by authors including Toby Brown, Greg Lambert, Sophia Lisa Salazare, Casey Flaherty, Ryan McLead, and Marlene Gebauer.',
                image: '/images/blogs/geeks-and-a-law.png',
                type: 'portrait',
                url: 'https://www.geeklawblog.com'
              }
            ],
            [
              {
                name: 'legal-tech-blog',
                title: 'Legal Tech Blog',
                description:
                  'A German legaltech blog founded by Micha-Manuel Bues (of Bryter) in 2015, the publication has grown to be a major platform for legaltech and innovation. The blog strives to help readers navigate through the fundamental changes in the legal industry.',
                image: '/images/blogs/legal-tech-blog.png',
                type: 'portrait',
                url: 'https://legal-tech-blog.de'
              }
            ]
          ],
          [
            [
              {
                name: 'colin-levy',
                title: 'Colin Levy',
                description:
                  'Colin Levy (Twitter: <a href="https://twitter.com/clevy-law" target="_blank">@clevy-law</a>) is a lawyer and a lifelong learner who has a passion for addressing the flaws in how lawyers are educated, the culture that lawyers are embedded within and the industry that lawyers and countless other professionals work in. Colin interviews interesting people in the world of legaltech and legal innovation and publishes these conversations on his website.',
                image: '/images/blogs/colin-levy.png',
                type: 'portrait',
                url: 'https://www.colinslevy.com'
              }
            ],
            [
              {
                name: 'legal-evolution',
                title: 'Legal Evolution',
                description:
                  'Legal Evolution is an online publication focused on the changing legal industry, founded by Professor William Henderson of Indiana University Maurer School of Law. The mission of Legal Evolution is to provide lawyers, legal educators, and allied professionals with high-quality information to solve very difficult industry-specific problems. The content reflects a mix of theory, data, and carefully drawn examples of what is working in the field. Other contributors include Jae Um, Director of Pricing at Baker McKenzie, and Jason Barnwell, Assistant General Counsel at Microsoft.',
                image: '/images/blogs/legal-evolution.png',
                type: 'portrait',
                url: 'https://www.legalevolution.org'
              }
            ],
            [
              {
                name: 'dewey-b-strategic',
                title: 'Dewey B Strategic',
                description:
                  'Dewey B Strategic is a blog that was created by editor and author Jean P. O’Grady in 2011, and covers topics from legal research to legaltech and innovation.',
                image: '/images/blogs/dewey-b-strategic.png',
                type: 'portrait',
                url: 'https://www.deweybstrategic.com'
              }
            ]
          ],
          [
            [
              {
                name: 'above-the-law',
                title: 'Above the Law',
                description:
                  'Above the Law takes a behind-the-scenes look at the world of law. The site provides news and insights about the profession’s most colorful personalities and powerful institutions, as well as original commentary on breaking legal developments. Legaltech news is covered in a regular column by Nicole Black (Twitter: <a href="https://twitter.com/nikiblack" target="_blank">@nikiblack</a>), New York attorney and Director of Business and Community Relations at MyCase.',
                image: '/images/blogs/above-the-law.png',
                type: 'portrait',
                url: 'https://abovethelaw.com'
              }
            ],
            [
              {
                name: 'tower-of-babel',
                title: 'Tower of Babel',
                description:
                  'Tower of Babel is a blog written by Nicola Shaver, co-founder of Legaltech Hub, about global legaltech and innovation, for vendors as well as firms and in-house legal across the world.',
                image: '/images/blogs/tower-of-babel.png',
                type: 'portrait',
                url: 'https://www.babel-law.com'
              }
            ],
            [
              {
                name: 'the-time-blawg',
                title: 'The Time Blawg',
                description:
                  'Brian Inkster, founder and CEO of Inksters Solicitors and ‘Maverick’ of the Scottish legal profession, writes to express his views on the past, present and future practice of law. Brian’s intelligent yet often irreverent view of developments in the industry provide a refreshing counter-balance to other legaltech blogs.',
                image: '/images/blogs/the-time-blawg.png',
                type: 'portrait',
                url: 'http://thetimeblawg.com'
              }
            ]
          ],
          [
            [
              {
                name: 'legal-ai-blog',
                title: 'Legal AI Blog',
                description:
                  'A Nordic blog that stays on top of the latest trends and developments in the sphere of legal AI. The team behind Legal AI Blog comprises lawyers, software developers, and entrepreneurs. Expect coverage of the most recent legal AI advancements, interview leading experts in the field, and publish our own views on the subject.',
                image: '/images/blogs/legal-ai-blog.png',
                type: 'portrait',
                url: 'https://legalaiblog.com'
              }
            ],
            [
              {
                name: 'indian-legal-tech',
                title: 'Indian Legal Tech (ILT)',
                description:
                  'Indian Legal Tech (ILT) is an independent blog focused on covering India’s legal technology sector. The blog was started in November 2019 by Namit Oberoy.',
                image: '/images/blogs/indian-legal-tech.png',
                type: 'portrait',
                url: 'https://www.indianlegaltech.com'
              }
            ],
            [
              {
                name: 'lawtomated',
                title: 'Lawtomated',
                description:
                  'Lawtomated is a collaborative legaltech learning resource. It’s aimed at lawyer and non-lawyer alike interested in, using or wanting to understand legaltech.',
                image: '/images/blogs/lawtomated.png',
                type: 'portrait',
                url: 'https://lawtomated.com'
              }
            ]
          ],
          [
            [
              {
                name: 'dennis-kennedy',
                title: 'Dennis Kennedy',
                description:
                  'Dennis Kennedy is a well-known legal tech and innovation advisor, adjunct law professor, infotech lawyer, professional speaker, author, and podcaster. This is his blog',
                image: '/images/blogs/dennis-kennedy.png',
                type: 'portrait',
                url: 'https://www.denniskennedy.com'
              }
            ]
          ]
        ]
      },
      {
        title: 'Listen',
        icon: '/images/blogs/listen.png',
        blogs: [
          [
            [
              {
                name: 'law-next',
                title: 'LawNext',
                description:
                  'LawNext is a weekly podcast hosted by Bob Ambrogi, publisher of LawSites. Each week, Bob interviews the innovators and entrepreneurs who are driving what’s next in the legal industry. From legal technology startups to new law firm business models to enhancing access to justice, Bob and his guests explore the future of law and legal practice.',
                image: '/images/blogs/law-next.png',
                type: 'portrait',
                url: 'https://lawnext.libsyn.com'
              }
            ],
            [
              {
                name: 'the-modern-lawyer',
                title: 'The Modern Lawyer',
                description:
                  'Join Anand Upadhye of Casetext as he chats with giants in the American legal industry about the changes we are seeing in the practice of law, legal technology, and knowledge management.',
                image: '/images/blogs/the-modern-lawyer.png',
                type: 'portrait',
                url: 'https://casetext.com/podcast'
              }
            ]
          ],
          [
            [
              {
                name: 'fringe-legal',
                title: 'Fringe Legal',
                description:
                  'A podcast by Abhijat Saraswat (Twitter: <a href="https://twitter.com/WholsAbs" target="_blank">@WholsAbs</a>, <a href="https://twitter.com/FringeLegal" target="_blank">@FringeLegal</a>) discussing the future of the legal profession, aimed at law firm leaders and influencers. Each episode involves guest speakers discussing ideas impacting the evolution of the legal profession.',
                image: '/images/blogs/fringe-legal.png',
                type: 'portrait',
                url: 'https://www.fringelegal.com'
              }
            ],
            [
              {
                name: 'ilta-podcast',
                title: 'ILTA podcast',
                description:
                  'This ILTA podcast hosted by Nicola Shaver features speakers located across the globe... who are doing things differently. These guests offer unique perspectives on what the state of legal innovation looks like in different countries, towns, and cities, and speak about the most innovative projects they are seeing in their regions.',
                image: '/images/blogs/ilta-podcast.png',
                type: 'portrait',
                url: 'https://ilta.podbean.com'
              }
            ]
          ],
          [
            [
              {
                name: 'law-technology-now',
                title: 'Law Technology Now',
                description:
                  'Law Technology Now explores the latest in legal technology and innovation. Key players in the legal technology community join the hosts to highlight the top trends and developments in the legal world. Tune in to hear conversations about innovative ways to improve the practice of law, providing greater access to justice, and making legal services more affordable.',
                image: '/images/blogs/law-technology-now.png',
                type: 'portrait',
                url: 'https://legaltalknetwork.com/podcasts/law-technology-now'
              }
            ],
            [
              {
                name: 'legaltech-tapas',
                title: 'Legaltech Tapas',
                description:
                  'Legaltech Tapas is a regular podcast that serves up bite sized summaries of the latest legal tools, what they do, and why you might use them. Each episode discusses a different legal tool, and includes an interview with a guest from that company so you can hear directly from the horses mouth why you should be using their product.',
                image: '/images/blogs/legaltech-tapas.png',
                type: 'portrait',
                url: 'https://legaltechtapas.substack.com'
              }
            ]
          ],
          [
            [
              {
                name: 'evolve-the-law',
                title: 'Evolve the Law',
                description:
                  'The Evolve the Law podcast covers the latest topics, trends and tech in the legal industry. Host Ian Connett and the Evolve the Law team interview members of Evolve the Law, noted technologists, thought leaders, and legal practitioners - sharing their insights about the future of the legal industry. Subscribe and listen to stay on top of developments in this competitive marketplace.',
                image: '/images/blogs/evolve-the-law.png',
                type: 'portrait',
                url: 'https://abovethelaw.com/legal-innovation-center/category/podcast'
              }
            ]
          ]
        ]
      },
      {
        title: 'Watch',
        icon: '/images/blogs/watch.png',
        blogs: [
          [
            [
              {
                name: 'litera-tv',
                title: 'Litera TV',
                description:
                  'Tune in to Litera TV each weekday to see a series of interviews on topics around legaltech and legal innovation.',
                image: '/images/blogs/litera-tv.png',
                type: 'portrait',
                url: 'https://www.litera.com/litera-tv'
              }
            ]
          ]
        ]
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.blogs {
  @include desktop-max-width-layout;
  margin-top: 50px;
  padding-bottom: 60px;
  position: relative;

  @include respondTo(mobile) {
    background-color: white;
  }
}

$adMaxWidth: calc(50% - #{$desktopMaxWidth / 2} - 40px);

.blogs__left-ad {
  position: absolute;
  top: 30px;
  left: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}

.blogs__right-ad {
  position: absolute;
  top: 30px;
  right: 20px;
  width: 200px;
  max-width: $adMaxWidth;
}

.blogs__content {
  padding: 30px 30px;
  @include col--center;

  @include respondTo(mobile) {
    padding: 10px 10px;
  }
}

.blogs__section {
  width: 100%;
  @include col;
}

.blogs__title {
  @include row;
  align-items: center;
  margin-bottom: 40px;

  @include respondTo(mobile) {
    margin-left: 20px;
  }
}

.blogs__title-image {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

.blogs__title-text {
  @include typography(xl-1, narrow, bold);
  color: $colorNavy;
}

.blogs__section__row {
  width: 100%;
  @include row;
  margin-bottom: 40px;
}

.blogs__section__col {
  flex: 1;
  max-width: 50%;
  padding: 15px;
  @include col;

  &:not(:first-child) {
    padding-left: 10px;
  }

  &:not(:last-child) {
    padding-right: 10px;
  }

  @include respondTo(mobile) {
    flex: none;
    max-width: 50%;
  }
}

.blog {
  flex: 1;
  position: relative;
  @include col;
  background: $colorBg2;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  &:not(:first-child) {
    margin-top: 20px;
  }

  &--landscape {
    @include row;
    flex-direction: row-reverse;
    padding: 60px 0 50px 0;
    @include respondTo(mobile) {
      flex-direction: column;
    }
    &:last-child {
      .blog__image__img {
        @include respondTo(mobile) {
          height: 50%;
        }
      }
    }

    .blog__image {
      width: 40%;
      height: auto;
      max-height: 80%;
      margin-right: 10px;
      @include respondTo(mobile) {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .blog__description {
      text-align: left;
    }

    .blog__button {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 140px;
      height: 40px;
      margin: 10px;
      @include respondTo(mobile) {
        height: 24px;
      }
    }
  }

  &--portrait {
    .blog__image {
      padding: 70px 0 20px;
      margin-right: 0;
      background: $colorLightGrey2;

      @include respondTo(mobile) {
        height: 150px;
      }
    }
  }

  &--legal-it-insider {
    background: linear-gradient(180deg, #c4c4c4 38.7%, #000000 113.65%);

    .blog__title {
      color: white;
    }

    .blog__title-border {
      background: white;
    }

    .blog__image {
      margin: 110px 30px 20px 30px;
      width: calc(100% - 60px);
      @include respondTo(mobile) {
        margin-bottom: 40px;
      }
    }

    .blog__description {
      color: white;
    }
  }

  &--prism-legal {
    .blog__image {
      @include respondTo(mobile) {
        width: 100%;
      }
    }
  }

  &--3-geeks-and-a-law {
    .blog__image {
      background: #ffcb75;
    }
  }

  &--legal-tech-blog,
  &--colin-levy,
  &--legal-evolution {
    .blog__image {
      background: white;
    }
  }

  &--colin-levy,
  &--legal-evolution {
    .blog__image {
      flex: 1;
      @include row--center;
      padding-bottom: 0;
    }

    .blog__image__img {
      width: calc(100% - 40px);
    }
  }

  &--dewey-b-strategic {
    .blog__image {
      height: auto;
      padding-bottom: 0;
    }
  }

  &--colin-levy,
  &--legal-evolution,
  &--dewey-b-strategic {
    .blog__image {
      height: 260px;
      max-height: 260px;
    }
  }

  &--above-the-law {
    .blog__image {
      background: white;
      height: auto;
    }

    .blog__image__img {
      width: calc(100% - 80px);
    }
  }

  &--tower-of-babel,
  &--the-time-blawg {
    .blog__title {
      color: white;
    }

    .blog__title-border {
      background: white;
    }

    .blog__image {
      height: auto;
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  &--legal-ai-blog,
  &--indian-legal-tech,
  &--lawtomated,
  &--dennis-kennedy {
    .blog__title {
      color: white;
    }

    .blog__title-border {
      background: white;
    }
  }

  &--legal-ai-blog {
    .blog__image {
      background: #296266;
    }
  }

  &--indian-legal-tech {
    .blog__image {
      background: #000000;
    }

    .blog__image__img {
      height: auto;

      @include respondTo(mobile) {
        height: 100%;
      }
    }
  }

  &--lawtomated {
    .blog__image {
      background: #d8d8d8;
    }
  }

  &--dennis-kennedy {
    width: 67%;

    .blog__image {
      background: #000000;
    }

    .blog__image__img {
      width: 85%;
      margin-right: 15%;
    }

    @include respondTo(mobile) {
      width: 100%;
    }
  }

  &--fringe-legal {
    .blog__title {
      color: white;
    }

    .blog__title-border {
      background: white;
    }

    .blog__image {
      background: #000000;
    }
  }

  &--the-modern-lawyer {
    .blog__image {
      background: white;
    }
  }

  &--legaltech-tapas {
    .blog__image {
      background: #ecf5fa;
    }
  }

  &--law-technology-now {
    .blog__title {
      color: white;
    }

    .blog__title-border {
      background: white;
    }

    .blog__image {
      padding: 0;
    }

    .blog__image__img {
      height: auto;

      @include respondTo(mobile) {
        width: auto;
        height: 100%;
      }
    }
  }

  &--litera-tv {
    margin-right: 10px;

    .blog__title,
    .blog__title-border {
      z-index: 1;
    }

    .blog__image {
      background: #e5f6f2;
      position: relative;
      padding-top: 50px;
      padding-bottom: 60px;
      height: auto;

      &::after {
        position: absolute;
        left: 44px;
        right: 44px;
        bottom: 25px;
        content: 'A two-hour live stream of content Monday – Friday; covering all areas of legal tech….and then some!';
        @include typography(lg-1, narrow, bold);
        color: $colorDarkGrey;
      }
    }

    .blog__image__img {
      height: 150px;
    }
  }
}

.blog__title {
  position: absolute;
  top: 20px;
  left: 30px;
  @include typography(lg-1);
  color: $colorNavy;
}

.blog__title-border {
  position: absolute;
  top: 50px;
  left: 30px;
  width: 60px;
  height: 3px;
  background: $colorNavy;
}

.blog__image {
  width: 100%;
  height: 200px;
  @include row--center;
  @include respondTo(mobile) {
    height: auto;
  }
}

.blog__image__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.blog__description {
  flex: 1;
  @include typography(md-1);
  text-align: left;
  color: $colorDarkGrey;
  margin: 20px 30px;

  ::v-deep a {
    color: $colorNavy;
  }

  @include respondTo(mobile) {
    margin: 1rem 0.875rem;
  }
}

.blog__button {
  width: calc(100% - 40px);
  margin: 20px;
  @include row--center;
  @include typography(lg, default, bold);
  padding: 15px 0;
  text-decoration: none;
  border-radius: 10px;
  background: $colorGreen;
  color: white;
}

.blogs__divider {
  width: 100%;
  height: 1px;
  margin: 70px 0;
  background: $colorDarkGrey;

  @include respondTo(mobile) {
    margin: 20px 0;
  }
}

.blogs__horizontal-ad {
  width: 70%;

  @include respondTo(mobile) {
    width: 90%;
  }
}
</style>
