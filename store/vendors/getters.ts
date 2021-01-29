import { GetterTree } from 'vuex'

import { RootState } from '@/store/types'
import { VendorsState } from './state'

const getters: GetterTree<VendorsState, RootState> = {
  highlightQueries: (state) => {
    const {
      keyword,
      demographics,
      functionalities,
      hqs,
      installations,
      integrations,
      offices,
      platformLanguages,
      practiceAreas
    } = state.routeQuery
    const queries = []
    if (keyword) queries.push(keyword)
    if (demographics) queries.push(...demographics.split(','))
    if (functionalities) queries.push(...functionalities.split(','))
    if (hqs) queries.push(...hqs.split(','))
    if (installations) queries.push(...installations.split(','))
    if (integrations) queries.push(...integrations.split(','))
    if (offices) queries.push(...offices.split(','))
    if (platformLanguages) queries.push(...platformLanguages.split(','))
    if (practiceAreas) queries.push(...practiceAreas.split(','))
    return queries
  }
}

export default getters
