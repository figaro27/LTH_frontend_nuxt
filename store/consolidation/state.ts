import { Vendor } from '@/models'
import { LoadingStatus } from '@/store/types'

export type ConsolidationState = {
  consolidations: Vendor[]
  consolidationsLoading: LoadingStatus
}

const state = () =>
  ({
    consolidations: [],
    consolidationsLoading: LoadingStatus.Unloaded
  } as ConsolidationState)

export default state
