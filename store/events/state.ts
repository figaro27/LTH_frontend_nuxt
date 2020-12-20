import { EventFilters, SearchResultEvent } from '@/models'
import { LoadingStatus } from '@/store/types'
import { EventsRouteQuery } from './types'

export type EventsState = {
  organizations: any[]
  names: any[]
  locations: any[]
  audiences: any[]
  dates: any[]
  durations: any[]
  recurrences: any[]

  autosuggestItems: string[]
  autosuggestItemsLoading: LoadingStatus

  events: SearchResultEvent[]
  totalEvents: number
  eventsLoading: LoadingStatus
  eventsPage: number
  eventsLastFilter: EventFilters
  routeQuery: EventsRouteQuery
}

const state = (): EventsState => ({
  organizations: [],
  names: [],
  locations: [],
  audiences: [],
  dates: [],
  durations: [],
  recurrences: [],

  autosuggestItems: [],
  autosuggestItemsLoading: LoadingStatus.Unloaded,

  events: [],
  totalEvents: 0,
  eventsPage: 1,
  eventsLoading: LoadingStatus.Unloaded,
  eventsLastFilter: {
    keyword: '',
    organizations: [],
    names: [],
    locations: [],
    audiences: [],
    dates: [],
    durations: [],
    recurrences: []
  },
  routeQuery: {}
})

export default state
