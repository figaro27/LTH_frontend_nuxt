import { GetterTree } from 'vuex'

import { RootState } from '@/store/types'
import { EventsState } from './state'

const getters: GetterTree<EventsState, RootState> = {
  highlightQueries: (state) => {
    const {
      keyword,
      date,
      organizers,
      names,
      countries,
      audiences,
      months,
      durations,
      features,
      formats
    } = state.routeQuery
    const queries = []
    if (keyword) queries.push(keyword)
    if (date) queries.push(date)
    if (organizers) queries.push(...organizers.split(','))
    if (names) queries.push(...names.split(','))
    if (countries) queries.push(...countries.split(','))
    if (audiences) queries.push(...audiences.split(','))
    if (months) queries.push(...months.split(','))
    if (durations) queries.push(...durations.split(','))
    if (features) queries.push(...features.split(','))
    if (formats) queries.push(...formats.split(','))
    return queries
  }
}

export default getters
