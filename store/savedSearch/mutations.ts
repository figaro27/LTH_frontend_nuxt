import { MutationTree } from 'vuex'

import { SavedSearchState } from './state'
import { SavedSearch } from '@/models'
import { LoadingStatus } from '@/store/types'

const mutations: MutationTree<SavedSearchState> = {
  SET_CURRENT_SAVED_SEARCH(state: SavedSearchState, savedSearch: SavedSearch | null) {
    state.currentSavedSearch = savedSearch
  },
  SET_SAVED_SEARCHS(state: SavedSearchState, savedSearchs: SavedSearch[]) {
    state.savedSearchs = savedSearchs
  },
  SET_SAVED_SEARCHS_LOADING(state: SavedSearchState, loading: LoadingStatus) {
    state.savedSearchsLoading = loading
  }
}
export default mutations
