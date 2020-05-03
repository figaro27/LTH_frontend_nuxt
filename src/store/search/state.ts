
import { Keyword } from './types'

export type SearchState = {
  keywords: Keyword[];
  keywordsLoading: boolean;
}

const state: SearchState = {
  keywords: [],
  keywordsLoading: false
}

export default state
