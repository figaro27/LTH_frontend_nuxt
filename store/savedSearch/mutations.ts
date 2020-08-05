import { MutationTree } from 'vuex'

import { SavedSearch } from '@/models'
import { LoadingStatus } from '@/store/types'

import { SavedSearchState } from './state'

const mutations: MutationTree<SavedSearchState> = {
  SET_SAVED_SEARCHS(state: SavedSearchState, savedSearchs: SavedSearch[]) {
    state.savedSearchs = savedSearchs
  },
  SET_SAVED_SEARCHS_LOADING(state: SavedSearchState, loading: LoadingStatus) {
    state.savedSearchsLoading = loading
  }
}
export default mutations
