import { ActionTree } from 'vuex'

import { RootState, TypedAction, LoadingStatus } from '@/store/types'
import { api } from '@/utils'
import { GraveyardState } from './state'

export type GraveyardActions = ActionTree<GraveyardState, RootState>
export type GraveyardAction<T, R = any> = TypedAction<GraveyardState, RootState, T, R>

const actions: GraveyardActions = {
  async loadGraveyards({ commit }) {
    commit('SET_GRAVEYARDS_LOADING', LoadingStatus.Loading)
    const { data } = await api.get('vendors/graveyards')
    commit('SET_GRAVEYARDS', data.data)
    commit('SET_GRAVEYARDS_LOADING', LoadingStatus.Loaded)
  }
}

export default actions
