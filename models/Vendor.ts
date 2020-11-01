export type Office = { id: string; name: string }
export type Functionality = { id: string; name: string }
export type PracticeArea = { id: string; name: string }
export type PlatformLanguage = { id: string; name: string }
export type Demographic = { id: string; name: string }
export type Installation = { id: string; name: string }
export type Integration = { id: string; name: string }
export type ExistingCustomer = { id: string; name: string }
export type Feature = { id: string; name: string }
export type Testimonial = { avatar: string; displayName: string; content: string; link: string }

export type VendorType = 'default' | 'consolidation' | 'graveyard'

export type ConsolidationData = {
  date: string
  consolidatedWith: string
}

export type GraveyardData = {
  date: string
}

export type EnhancedListingPictureData = {
  imageUrl: string
  description: string
}

export type EnhancedListingTestimonialData = {
  avatar: string
  displayName: string
  content: string
  link: string
}

export type EnhancedListingPOCData = {
  title: string
  description: string
  url: string
}

export type EnhancedListingData = {
  demoUrl: string
  videoUrl: string
  videoDescription: string
  enhancedDescription: string
  picture1: EnhancedListingPictureData
  picture2: EnhancedListingPictureData
  testimonials: Array<EnhancedListingTestimonialData>
  poc: EnhancedListingPOCData
  linkedin?: string
  facebook?: string
  twitter?: string
  instagram?: string
}

export type Vendor = {
  id: string | number
  name: string
  logo: string | null
  tool: string | null
  description: string | null
  website: string | null
  type: VendorType
  consolidationData?: ConsolidationData
  graveyardData?: GraveyardData
  enhancedListingEnabled: boolean
  enhancedListingData?: EnhancedListingData
  hqs: Office[]
  offices: Office[]
  functionalities: Functionality[]
  subFunctionalities: Functionality[]
  practiceAreas: PracticeArea[]
  platformLanguages: PlatformLanguage[]
  linguisticFunctionalities: PlatformLanguage[]
  demographics: Demographic[]
  installations: Installation[]
  integrations: Integration[]
  existingCustomers: ExistingCustomer[]
  features: Feature[]
  createdAt: string
  updatedAt: string
}

export type SearchResultVendor = Pick<
  Vendor,
  'id' | 'name' | 'tool' | 'hqs' | 'functionalities' | 'subFunctionalities' | 'platformLanguages' | 'demographics'
>

export type SimilarVendor = Pick<Vendor, 'id' | 'name' | 'tool' | 'logo'>
