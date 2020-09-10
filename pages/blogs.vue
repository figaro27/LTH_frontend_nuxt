<template>
  <div class="blogs">
    <div class="blogs__content">
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
              v-for="(blog, itemIndex) of blogsCol"
              :key="blog.name"
              class="blog"
              :class="`blog--${blog.type} blog--${blog.name}`"
            >
              <h3 class="blog__title">{{ blog.title }}</h3>
              <span class="blog__title-border" />
              <div class="blog__image">
                <img class="blog__image__img" :src="blog.image" />
              </div>
              <ClientOnly>
                <div :id="`blog_${sectionIndex}_${rowIndex}_${colIndex}_${itemIndex}`" class="blog__description" />
              </ClientOnly>
              <a class="blog__button" :href="blog.url" target="_blank">Visit Website</a>
            </div>
          </div>
        </div>
        <hr v-if="sectionIndex < blogSections.length - 1" class="blogs__divider" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'blogs' })
export default class Blogs extends Vue {
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
                name: 'prism-legal',
                title: 'Prism Legal',
                description:
                  'A blog aimed at improving law practice efficiency and law firm business operations. Written by Ron Friedmann (Twitter: <a href="https://twitter.com/ronfriedmann" target="_blank">@ronfriedmann</a>), a highly respected thought leader who has spent three decades in the legal market.',
                image: '/images/blogs/prism-legal.png',
                type: 'landscape',
                url: 'https://prismlegal.com'
              },
              {
                name: 'law-site',
                title: 'LawSite',
                description:
                  'A blog by legal journalist Bob Ambrogi, who has been writing and speaking about legal technology, legal practice and legal ethics for more than two decades.',
                image: '/images/blogs/law-site.png',
                type: 'landscape',
                url: 'https://www.lawsitesblog.com'
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
                name: 'the-modern-lawyer',
                title: 'The Modern Lawyer',
                description:
                  'Join Anand Upadhye of Casetext as he chats with giants in the American legal industry about the changes we are seeing in the practice of law, legal technology, and knowledge management.',
                image: '/images/blogs/the-modern-lawyer.png',
                type: 'portrait',
                url: 'https://casetext.com/podcast'
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

  updated() {
    const blogs = this.blogSections
    blogs.forEach((section: any, sectionIndex: number) => {
      section.blogs.forEach((row: any, rowIndex: number) => {
        row.forEach((col: any, colIndex: number) => {
          col.forEach((item: any, itemIndex: number) => {
            const element = document.getElementById(`blog_${sectionIndex}_${rowIndex}_${colIndex}_${itemIndex}`)
            if (typeof element !== 'undefined' && element !== null) {
              element.innerHTML = item.description
            }
          })
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.blogs {
  @include desktop-max-width-layout;
  margin-top: 50px;
  padding-bottom: 60px;
}

.blogs__content {
  padding: 30px 70px;
  @include col--center;
}

.blogs__section {
  width: 100%;
  @include col;
}

.blogs__title {
  @include row;
  align-items: center;
  margin-bottom: 40px;
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
  @include col;

  &:not(:first-child) {
    padding-left: 10px;
  }

  &:not(:last-child) {
    padding-right: 10px;
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

    .blog__image {
      width: 40%;
      height: auto;
      max-height: 80%;
      margin-right: 10px;
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
    }
  }

  &--portrait {
    .blog__image {
      padding: 70px 0 20px;
      margin-right: 0;
      background: $colorLightGrey2;
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
    }

    .blog__description {
      color: white;
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
}
</style>
