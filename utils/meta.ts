export type MetaInfo = {
  title: string
  description: string
  imageUrl?: string | null
}

export const buildMeta = (params: MetaInfo) => {
  const { title, description, imageUrl } = params
  const image = imageUrl || 'https://legaltechnologyhub.com/images/logo-small.png'
  return {
    title,
    meta: [
      { hid: 'title', name: 'title', content: title },
      { hid: 'description', name: 'description', content: description },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'LegalTech, LegalTechnology, legal, legaltechhub, legaltechnologyhub'
      },

      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', content: 'legaltechnologyhub.com' },
      { hid: 'og:title', name: 'og:title', content: title },
      { hid: 'og:description', name: 'og:description', content: description },
      { hid: 'og:image', name: 'og:image', content: image },

      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:url', name: 'twitter:url', content: 'legaltechnologyhub.com' },
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      { hid: 'twitter:description', name: 'twitter:description', content: description },
      { hid: 'twitter:image', name: 'twitter:image', content: image },
      { hid: 'twitter:site', name: 'twitter:site', content: '@LegalTechHub1' },

      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: title }
    ]
  }
}
