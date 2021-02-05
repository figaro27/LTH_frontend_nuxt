export type EnhancedRequest = {
  name: string
  contactName: string
  contactEmail: string
  customers: string
  useCases: string
  description: string
  image: any
  video: string
  articles: []
}

export const getEmptyEnhancedRequest = (): EnhancedRequest => ({
  name: '',
  contactName: '',
  contactEmail: '',
  customers: '',
  useCases: '',
  description: '',
  image: [],
  video: '',
  articles: []
})
