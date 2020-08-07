import { Filters, SearchResultVendor } from '@/models'
import { LoadingStatus } from '@/store/types'
import { RouteQuery } from './types'

export type SearchState = {
  demographics: any[]
  functionalities: any[]
  installations: any[]
  integrations: any[]
  offices: any[]
  platformLanguages: any[]
  practiceAreas: any[]

  autosuggestItems: string[]
  autosuggestItemsLoading: LoadingStatus

  vendors: SearchResultVendor[]
  totalVendors: number
  vendorsLoading: LoadingStatus
  vendorsPage: number
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

    autosuggestItems: [],
    autosuggestItemsLoading: LoadingStatus.Unloaded,

    vendors: [],
    totalVendors: 0,
    vendorsPage: 1,
    vendorsLoading: LoadingStatus.Unloaded,
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
