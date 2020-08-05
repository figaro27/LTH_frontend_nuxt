import { ActionTree } from 'vuex'

import { RootState, TypedAction, LoadingStatus } from '@/store/types'
import { api } from '@/utils'
import { SavedSearchState } from './state'

export type SavedSearchActions = ActionTree<SavedSearchState, RootState>
export type SavedSearchAction<T, R = any> = TypedAction<SavedSearchState, RootState, T, R>

const actions: SavedSearchActions = {
  async loadSavedSearchs({ commit }) {
    commit('SET_SAVED_SEARCHS_LOADING', LoadingStatus.Loading)
    const { data } = await api.get('saved-searchs')
    commit('SET_SAVED_SEARCHS', data.data)
    commit('SET_SAVED_SEARCHS_LOADING', LoadingStatus.Loaded)
  }
}

export default actions
