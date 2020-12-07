import { MutationTree } from 'vuex'

import { Ad } from '@/models'

import { AdsState } from './state'

const mutations: MutationTree<AdsState> = {
  SET_ACTIVE_AD(state: AdsState, ad: Ad) {
    state.activeAd = ad
  }
}
export default mutations
