import { Vendor } from '@/models'
import { LoadingStatus } from '@/store/types'

export type GraveyardState = {
  graveyards: Vendor[]
  graveyardsLoading: LoadingStatus
}

const state = () =>
  ({
    graveyards: [],
    graveyardsLoading: LoadingStatus.Unloaded
  } as GraveyardState)

export default state
