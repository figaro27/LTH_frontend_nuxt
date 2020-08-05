import { SavedSearch } from '@/models'
import { LoadingStatus } from '@/store/types'

export type SavedSearchState = {
  savedSearchs: SavedSearch[]
  savedSearchsLoading: LoadingStatus
}

const state = () =>
  ({
    savedSearchs: [],
    savedSearchsLoading: LoadingStatus.Unloaded
  } as SavedSearchState)

export default state
