import { MutationTree } from 'vuex'

import { SearchState } from './state'
import { Keyword, Filters, RouteQuery } from './types'
import { Vendor } from '@/models'

const mutations: MutationTree<SearchState> = {
  SET_DEMOGRAPHICS(state: SearchState, demographics: any) {
    state.demographics = demographics.data
  },
  SET_FUNCTIONALITIES(state: SearchState, functionalities: any) {
    state.functionalities = functionalities.data
  },
  SET_HQS(state: SearchState, hqs: any) {
    state.hqs = hqs.data
  },
  SET_INSTALLATIONS(state: SearchState, installations: any) {
    state.installations = installations.data
  },
  SET_INTEGRATIONS(state: SearchState, integrations: any) {
    state.integrations = integrations.data
  },
  SET_JURISDICTIONS(state: SearchState, jurisdictions: any) {
    state.jurisdictions = jurisdictions.data
  },
  SET_PLATFORM_LANGUAGES(state: SearchState, platformLanguages: any) {
    state.platformLanguages = platformLanguages.data
  },
  SET_PRACTICE_AREAS(state: SearchState, practiceAreas: any) {
    state.practiceAreas = practiceAreas.data
  },
  SET_KEYWORDS(state: SearchState, keywords: Keyword[]) {
    state.keywords = keywords
  },
  SET_KEYWORDS_LOADING(state: SearchState, loading: boolean) {
    state.keywordsLoading = loading
  },

  SET_VENDORS(state: SearchState, vendors: Vendor[]) {
    state.vendors = vendors
  },
  SET_VENDORS_TOTAL(state: SearchState, total: number) {
    state.totalVendors = total
  },
  SET_LAST_ROUTE_QUERY(state: SearchState, query: RouteQuery) {
    state.routeQuery = query
  },
  SAVE_LAST_FILTER(state: SearchState, filter: Filters) {
    state.vendorsLastFilter = filter
  }
}

export default mutations
