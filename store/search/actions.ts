import { ActionTree } from 'vuex'

import { RootState, TypedAction } from '../types'
import { SearchState } from './state'
import { Keyword } from './types'
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

  async loadHqs({ commit }) {
    const data = await api.get('hqs')
    commit('SET_HQS', data)
  },

  async loadInstallations({ commit }) {
    const data = await api.get('installations')
    commit('SET_INSTALLATIONS', data)
  },

  async loadIntegrations({ commit }) {
    const data = await api.get('integrations')
    commit('SET_INTEGRATIONS', data)
  },

  async loadJurisdictions({ commit }) {
    const data = await api.get('jurisdictions')
    commit('SET_JURISDICTIONS', data)
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
    commit('SAVE_LAST_FILTER', query)
    const { data } = await api.get('vendors/search', query)
    commit('SET_VENDORS', data.data.vendors)
    commit('SET_VENDORS_TOTAL', data.data.total)
  },

  async loadPossibleKeywords({ commit }) {
    commit('SET_KEYWORDS_LOADING', true)
    const responses = await Promise.all([
      api.get('demographics'),
      api.get('functionalities'),
      api.get('hqs'),
      api.get('installations'),
      api.get('integrations'),
      api.get('jurisdictions'),
      api.get('platform-languages'),
      api.get('practice-areas')
    ])
    commit('SET_KEYWORDS_LOADING', false)
    let index = 0
    const keywords: Array<Keyword> = []
    responses.forEach((res) => {
      keywords.push(
        ...res.data.map((item: { id: number; name: string }, itemIndex: number) => ({
          ...item,
          index: index + itemIndex,
          table: res.config.url
        }))
      )
      index = keywords.length
    })
    commit('SET_KEYWORDS', keywords)
  }
}

export default actions
