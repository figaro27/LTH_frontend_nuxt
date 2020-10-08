import { ActionTree } from 'vuex'

import { RootState, TypedAction } from '@/store/types'
import { AdsState } from './state'
import { api } from '~/utils'

export type AdActions = ActionTree<AdsState, RootState>
export type AdAction<T, R = any> = TypedAction<AdsState, RootState, T, R>

const actions: AdActions = {
  async loadActiveAd({ commit }) {
    const { data } = await api.get('ad')
    commit('SET_ACTIVE_AD', data.data)
  }
}

export default actions
