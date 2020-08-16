import { MutationTree } from 'vuex'

import { Vendor } from '@/models'
import { LoadingStatus } from '@/store/types'

import { ConsolidationState } from './state'

const mutations: MutationTree<ConsolidationState> = {
  SET_CONSOLIDATIONS(state: ConsolidationState, vendors: Vendor[]) {
    state.consolidations = vendors
  },
  SET_CONSOLIDATIONS_LOADING(state: ConsolidationState, loading: LoadingStatus) {
    state.consolidationsLoading = loading
  }
}
export default mutations
