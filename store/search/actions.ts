import { ActionTree } from 'vuex'

import { DEFAULT_VENDORS_LIMIT, MOBILE_VENDORS_LIMIT } from '@/assets/consts'
import { RootState, TypedAction, LoadingStatus } from '@/store/types'
import { api } from '@/utils'
import { SearchState } from './state'
import { isMobile } from 'mobile-device-detect'

export type SearchActions = ActionTree<SearchState, RootState>
export type SearchAction<T, R = any> = TypedAction<SearchState, RootState, T, R>

const actions: SearchActions = {
  async loadDemographics({ commit }) {
    const data = await api.get('demographics')
    commit('SET_DEMOGRAPHICS', data)
  },

  async loadFunctionalities({ commit }) {
    const data = await api.get('functionalities')
    commit('SET_FUNCTIONALITIES', data)
  },

  async loadInstallations({ commit }) {
    const data = await api.get('installations')
    commit('SET_INSTALLATIONS', data)
  },

  async loadIntegrations({ commit }) {
    const data = await api.get('integrations')
    commit('SET_INTEGRATIONS', data)
  },

  async loadOffices({ commit }) {
    const data = await api.get('offices')
    commit('SET_OFFICES', data)
  },

  async loadPlatformLanguages({ commit }) {
    const data = await api.get('platform-languages')
    commit('SET_PLATFORM_LANGUAGES', data)
  },

  async loadPracticeAreas({ commit }) {
    const data = await api.get('practice-areas')
    commit('SET_PRACTICE_AREAS', data)
  },

  async runSearch({ commit, state }, query: any = {}) {
    commit('SET_VENDORS_LOADING', LoadingStatus.Loading)
    commit('SAVE_LAST_FILTER', query)
    const limit = isMobile ? MOBILE_VENDORS_LIMIT : DEFAULT_VENDORS_LIMIT
    const { data } = await api.get('vendors/search', {
      ...query,
      offset: (state.vendorsPage - 1) * limit,
      limit
    })
    commit('SET_VENDORS', data.data.vendors)
    commit('SET_VENDORS_TOTAL', data.data.total)
    commit('SET_VENDORS_LOADING', LoadingStatus.Loaded)
  },

  async loadAutosuggest({ commit }, keyword: string) {
    commit('SET_AUTOSUGGEST_ITEMS_LOADING', LoadingStatus.Loading)
    const { data } = await api.get('vendors/autosuggest', { keyword })
    if (data.success) {
      commit('SET_AUTOSUGGEST_ITEMS', data.data)
    } else {
      commit('SET_AUTOSUGGEST_ITEMS', [])
    }

    commit('SET_AUTOSUGGEST_ITEMS_LOADING', LoadingStatus.Loaded)
  }
}

export default actions
