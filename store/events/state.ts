import { EventFilters, SearchResultEvent } from '@/models'
import { LoadingStatus } from '@/store/types'
import { EventsRouteQuery } from './types'

export type EventsState = {
  organizers: any[]
  locations: any[]
  audiences: any[]
  durations: any[]
  features: any[]
  formats: any[]

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
  organizers: [],
  locations: [],
  audiences: [],
  durations: [],
  features: [],
  formats: [],

  autosuggestItems: [],
  autosuggestItemsLoading: LoadingStatus.Unloaded,

  events: [],
  totalEvents: 0,
  eventsPage: 1,
  eventsLoading: LoadingStatus.Unloaded,
  eventsLastFilter: {
    keyword: '',
    date: '',
    organizers: [],
    locations: [],
    audiences: [],
    months: [],
    durations: [],
    features: [],
    formats: []
  },
  routeQuery: {}
})

export default state
