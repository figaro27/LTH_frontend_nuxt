import { ActionContext, StoreOptions } from 'vuex'
import { AdsState } from './ads/state'
import { ConsolidationState } from './consolidation/state'
import { EventsState } from './events/state'
import { GraveyardState } from './graveyard/state'
import { SavedSearchState } from './savedSearch/state'
import { VendorsState } from './vendors/state'

export type ApiResponse<T> = { data: T }

export type ActionResponse<T = any> = Promise<ApiResponse<T> | ApiResponse<T>>

export type TypedAction<S, R, P, T = any> = (
  this: StoreOptions<R>,
  injectee: ActionContext<S, R>,
  payload: P
) => ActionResponse<T>

export interface RootState {
  ads: AdsState
  consolidation: ConsolidationState
  events: EventsState
  graveyard: GraveyardState
  savedSearch: SavedSearchState
  vendors: VendorsState
}

export type Usecase = {
  name: string
  filter: Object
}

export enum LoadingStatus {
  Unloaded,
  Loading,
  Loaded
}
