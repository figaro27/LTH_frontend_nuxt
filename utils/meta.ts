export const buildMeta = (params: { title: string; description: string }) => {
  const { title, description } = params
  return {
    title,
    meta: [
      { hid: 'description', name: 'description', content: description },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: title },
      { hid: 'og:title', name: 'og:title', content: title },
      { hid: 'og:site_name', name: 'og:site_name', content: title },
      { hid: 'og:description', name: 'og:description', content: description }
    ]
  }
}
