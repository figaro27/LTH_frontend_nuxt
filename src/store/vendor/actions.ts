import { ActionTree } from 'vuex'

import { api } from '@/utils'

import { VendorState } from './state'
import { RootState, TypedAction } from '../types'

export type VendorActions = ActionTree<VendorState, RootState>
export type VendorAction<T, R = any> = TypedAction<VendorState, RootState, T, R>

const actions: VendorActions = {
  async loadById ({ commit }, vendorId) {
    const response = await api.get(`vendors/${vendorId}`)
    commit('SET_CURRENT_VENDOR', response.data.data)
    return response.data.data
  }
}

export default actions
