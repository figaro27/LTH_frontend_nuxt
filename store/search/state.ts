import { Keyword, RouteQuery } from './types'
import { Filters, SavedSearch, Vendor } from '@/models'
import { LoadingStatus } from '@/store/types'

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
  savedSearchs: SavedSearch[]
  savedSearchsLoading: LoadingStatus

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
    savedSearchs: [],
    savedSearchsLoading: LoadingStatus.Unloaded,

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
