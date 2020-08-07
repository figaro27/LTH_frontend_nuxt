import { MutationTree } from 'vuex'

import { Filters, SearchResultVendor } from '@/models'
import { LoadingStatus } from '@/store/types'
import { SearchState } from './state'
import { RouteQuery } from './types'

const mutations: MutationTree<SearchState> = {
  SET_DEMOGRAPHICS(state: SearchState, demographics: any) {
    state.demographics = demographics.data
  },
  SET_FUNCTIONALITIES(state: SearchState, functionalities: any) {
    state.functionalities = functionalities.data
  },
  SET_INSTALLATIONS(state: SearchState, installations: any) {
    state.installations = installations.data
  },
  SET_INTEGRATIONS(state: SearchState, integrations: any) {
    state.integrations = integrations.data
  },
  SET_OFFICES(state: SearchState, offices: any) {
    state.offices = offices.data
  },
  SET_PLATFORM_LANGUAGES(state: SearchState, platformLanguages: any) {
    state.platformLanguages = platformLanguages.data
  },
  SET_PRACTICE_AREAS(state: SearchState, practiceAreas: any) {
    state.practiceAreas = practiceAreas.data
  },

  SET_AUTOSUGGEST_ITEMS(state: SearchState, items: string[]) {
    state.autosuggestItems = items
  },
  SET_AUTOSUGGEST_ITEMS_LOADING(state: SearchState, loading: LoadingStatus) {
    state.autosuggestItemsLoading = loading
  },

  SET_VENDORS(state: SearchState, vendors: SearchResultVendor[]) {
    state.vendors = vendors
  },
  SET_VENDORS_TOTAL(state: SearchState, total: number) {
    state.totalVendors = total
  },
  SET_VENDORS_LOADING(state: SearchState, loading: LoadingStatus) {
    state.vendorsLoading = loading
  },
  SET_VENDORS_PAGE_NUMBER(state: SearchState, pageNumber: number) {
    state.vendorsPage = pageNumber
  },
  SET_LAST_ROUTE_QUERY(state: SearchState, query: RouteQuery) {
    state.routeQuery = query
  },
  SAVE_LAST_FILTER(state: SearchState, filter: Filters) {
    state.vendorsLastFilter = filter
  }
}

export default mutations
