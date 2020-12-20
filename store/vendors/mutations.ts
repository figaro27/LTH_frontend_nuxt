import { MutationTree } from 'vuex'

import { Filters, SearchResultVendor } from '@/models'
import { LoadingStatus } from '@/store/types'
import { VendorsState } from './state'
import { VendorsRouteQuery } from './types'

const mutations: MutationTree<VendorsState> = {
  SET_DEMOGRAPHICS(state: VendorsState, demographics: any) {
    state.demographics = demographics.data
  },
  SET_FUNCTIONALITIES(state: VendorsState, functionalities: any) {
    state.functionalities = functionalities.data
  },
  SET_INSTALLATIONS(state: VendorsState, installations: any) {
    state.installations = installations.data
  },
  SET_INTEGRATIONS(state: VendorsState, integrations: any) {
    state.integrations = integrations.data
  },
  SET_OFFICES(state: VendorsState, offices: any) {
    state.offices = offices.data
  },
  SET_PLATFORM_LANGUAGES(state: VendorsState, platformLanguages: any) {
    state.platformLanguages = platformLanguages.data
  },
  SET_PRACTICE_AREAS(state: VendorsState, practiceAreas: any) {
    state.practiceAreas = practiceAreas.data
  },

  SET_AUTOSUGGEST_ITEMS(state: VendorsState, items: string[]) {
    state.autosuggestItems = items
  },
  SET_AUTOSUGGEST_ITEMS_LOADING(state: VendorsState, loading: LoadingStatus) {
    state.autosuggestItemsLoading = loading
  },

  SET_VENDORS(state: VendorsState, vendors: SearchResultVendor[]) {
    state.vendors = vendors
  },
  SET_VENDORS_TOTAL(state: VendorsState, total: number) {
    state.totalVendors = total
  },
  SET_VENDORS_LOADING(state: VendorsState, loading: LoadingStatus) {
    state.vendorsLoading = loading
  },
  SET_VENDORS_PAGE_NUMBER(state: VendorsState, pageNumber: number) {
    state.vendorsPage = pageNumber
  },
  SET_LAST_ROUTE_QUERY(state: VendorsState, query: VendorsRouteQuery) {
    state.routeQuery = query
  },
  SAVE_LAST_FILTER(state: VendorsState, filter: Filters) {
    state.vendorsLastFilter = filter
  }
}

export default mutations
