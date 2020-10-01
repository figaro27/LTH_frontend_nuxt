import { ActionContext, StoreOptions } from 'vuex'
import { AdsState } from './ads/state'
import { ConsolidationState } from './consolidation/state'
import { GraveyardState } from './graveyard/state'
import { SavedSearchState } from './savedSearch/state'
import { SearchState } from './search/state'

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
  graveyard: GraveyardState
  savedSearch: SavedSearchState
  search: SearchState
}

export enum LoadingStatus {
  Unloaded,
  Loading,
  Loaded
}
