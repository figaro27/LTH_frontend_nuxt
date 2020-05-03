import { MutationTree } from 'vuex'

import { SearchState } from './state'
import { Keyword } from './types'

const getters: MutationTree<SearchState> = {
  SET_KEYWORDS (state: SearchState, keywords: Keyword[]) {
    state.keywords = keywords
  },
  SET_KEYWORDS_LOADING (state: SearchState, loading: boolean) {
    state.keywordsLoading = loading
  }
}

export default getters
