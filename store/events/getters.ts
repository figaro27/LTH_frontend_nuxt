import { GetterTree } from 'vuex'

import { RootState } from '@/store/types'
import { EventsState } from './state'

const getters: GetterTree<EventsState, RootState> = {
  highlightQueries: (state) => {
    const { keyword, organizers, names, locations, audiences, dates, durations, recurrences } = state.routeQuery
    const queries = []
    if (keyword) queries.push(keyword)
    if (organizers) queries.push(...organizers.split(','))
    if (names) queries.push(...names.split(','))
    if (locations) queries.push(...locations.split(','))
    if (audiences) queries.push(...audiences.split(','))
    if (dates) queries.push(...dates.split(','))
    if (durations) queries.push(...durations.split(','))
    if (recurrences) queries.push(...recurrences.split(','))
    return queries
  }
}

export default getters
