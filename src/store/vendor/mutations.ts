import { MutationTree } from 'vuex'

import { VendorState } from './state'
import { Vendor } from '@/models'

const mutations: MutationTree<VendorState> = {
  SET_CURRENT_VENDOR (state: VendorState, vendor: Vendor) {
    state.currentVendor = vendor
  }
}

export default mutations
