import { ActionTree } from 'vuex'

import { SearchState } from './state'
import { RootState, TypedAction, LoadingStatus } from '@/store/types'
import { api } from '@/utils'

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

  async runSearch({ commit }, query: any = {}) {
    commit('SET_VENDORS_LOADING', LoadingStatus.Loading)
    commit('SAVE_LAST_FILTER', query)
    const { data } = await api.get('vendors/search', query)
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
