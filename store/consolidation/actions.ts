import { ActionTree } from 'vuex'

import { RootState, TypedAction, LoadingStatus } from '@/store/types'
import { api } from '@/utils'
import { ConsolidationState } from './state'

export type ConsolidationActions = ActionTree<ConsolidationState, RootState>
export type ConsolidationAction<T, R = any> = TypedAction<ConsolidationState, RootState, T, R>

const actions: ConsolidationActions = {
  async loadConsolidations({ commit }) {
    commit('SET_CONSOLIDATIONS_LOADING', LoadingStatus.Loading)
    const { data } = await api.get('vendors/consolidations')
    commit('SET_CONSOLIDATIONS', data.data)
    commit('SET_CONSOLIDATIONS_LOADING', LoadingStatus.Loaded)
  }
}

export default actions
