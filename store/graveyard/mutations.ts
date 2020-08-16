import { MutationTree } from 'vuex'

import { Vendor } from '@/models'
import { LoadingStatus } from '@/store/types'

import { GraveyardState } from './state'

const mutations: MutationTree<GraveyardState> = {
  SET_GRAVEYARDS(state: GraveyardState, vendors: Vendor[]) {
    state.graveyards = vendors
  },
  SET_GRAVEYARDS_LOADING(state: GraveyardState, loading: LoadingStatus) {
    state.graveyardsLoading = loading
  }
}
export default mutations
