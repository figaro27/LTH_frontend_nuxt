import { ActionTree } from 'vuex'

import { SavedSearchState } from './state'
import { RootState, TypedAction, LoadingStatus } from '@/store/types'
import { api } from '@/utils'

export type SavedSearchActions = ActionTree<SavedSearchState, RootState>
export type SavedSearchAction<T, R = any> = TypedAction<SavedSearchState, RootState, T, R>

const actions: SavedSearchActions = {
  async loadSavedSearchs({ commit }) {
    commit('SET_SAVED_SEARCHS_LOADING', LoadingStatus.Loading)
    const { data } = await api.get('saved-searchs')
    commit('SET_SAVED_SEARCHS', data)
    commit('SET_SAVED_SEARCHS_LOADING', LoadingStatus.Loaded)
  },

  async loadSingleSavedSearch({ commit }, slug: string) {
    commit('SET_CURRENT_SAVED_SEARCH', null)
    const { data } = await api.get(`saved-searchs/${slug}`)
    if (data.success) {
      commit('SET_CURRENT_SAVED_SEARCH', data.data)
    }
  }
}

export default actions
