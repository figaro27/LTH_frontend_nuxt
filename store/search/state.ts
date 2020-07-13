import { Keyword } from './types'
import { Vendor } from '@/models'

export type SearchState = {
  demographics: any[]
  functionalities: any[]
  hqs: any[]
  installations: any[]
  integrations: any[]
  jurisdictions: any[]
  platformLanguages: any[]
  practiceAreas: any[]
  keywords: Keyword[]
  keywordsLoading: boolean

  vendors: Vendor[]
  totalVendors: number
}

const state = () =>
  ({
    demographics: [],
    functionalities: [],
    hqs: [],
    installations: [],
    integrations: [],
    jurisdictions: [],
    platformLanguages: [],
    practiceAreas: [],
    keywords: [],
    keywordsLoading: false,

    vendors: [],
    totalVendors: 0
  } as SearchState)

export default state
