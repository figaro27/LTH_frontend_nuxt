import { Keyword, Filters, RouteQuery } from './types'
import { Vendor } from '@/models'

export type SearchState = {
  demographics: any[]
  functionalities: any[]
  installations: any[]
  integrations: any[]
  offices: any[]
  platformLanguages: any[]
  practiceAreas: any[]
  keywords: Keyword[]
  keywordsLoading: boolean

  vendors: Vendor[]
  totalVendors: number
  vendorsLastFilter: Filters
  routeQuery: RouteQuery
}

const state = () =>
  ({
    demographics: [],
    functionalities: [],
    installations: [],
    integrations: [],
    offices: [],
    platformLanguages: [],
    practiceAreas: [],
    keywords: [],
    keywordsLoading: false,

    vendors: [],
    totalVendors: 0,
    vendorsLastFilter: {
      keyword: '',
      demographics: [],
      functionalities: [],
      hqs: [],
      installations: [],
      integrations: [],
      offices: [],
      platformLanguages: [],
      practiceAreas: []
    },
    routeQuery: {}
  } as SearchState)

export default state
