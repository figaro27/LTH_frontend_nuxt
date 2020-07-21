import { SavedSearch } from '@/models'
import { LoadingStatus } from '@/store/types'

export type SavedSearchState = {
  currentSavedSearch: SavedSearch | null

  savedSearchs: SavedSearch[]
  savedSearchsLoading: LoadingStatus
}

const state = () =>
  ({
    currentSavedSearch: null,

    savedSearchs: [],
    savedSearchsLoading: LoadingStatus.Unloaded
  } as SavedSearchState)

export default state
