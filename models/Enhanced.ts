export type EnhancedRequest = {
  name: string
  contactName: string
  contactEmail: string
  link: string
  customers: string
  useCases: string
  description: string
  image: any
  articles: any
}

export const getEmptyEnhancedRequest = (): EnhancedRequest => ({
  name: '',
  contactName: '',
  contactEmail: '',
  link: '',
  customers: '',
  useCases: '',
  description: '',
  image: '',
  articles: ''
})
