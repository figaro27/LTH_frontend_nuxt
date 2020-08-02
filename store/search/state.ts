import { RouteQuery } from './types'
import { Filters, Vendor } from '@/models'
import { LoadingStatus } from '@/store/types'

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

  vendors: Vendor[]
  totalVendors: number
  vendorsLoading: LoadingStatus
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
