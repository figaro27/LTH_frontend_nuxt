import { ActionTree } from 'vuex'

import { api } from '@/utils'

import { SearchState } from './state'
import { RootState, TypedAction } from '../types'
import { Keyword } from './types'

export type SearchActions = ActionTree<SearchState, RootState>
export type SearchAction<T, R = any> = TypedAction<SearchState, RootState, T, R>

const actions: SearchActions = {
  async loadPossibleKeywords ({ commit }) {
    commit('SET_KEYWORDS_LOADING', true)
    const responses = await Promise.all([
      api.get('demographics'),
      api.get('functionalities'),
      api.get('hqs'),
      api.get('installations'),
      api.get('integrations'),
      api.get('jurisdictions'),
      api.get('platform-languages'),
      api.get('practice-areas')
    ])
    commit('SET_KEYWORDS_LOADING', false)
    let index = 0
    const keywords: Array<Keyword> = []
    responses.forEach(res => {
      keywords.push(...res.data.map((item: { id: number; name: string }, itemIndex: number) => ({
        ...item,
        index: index + itemIndex,
        table: res.config.url
      })))
      index = keywords.length
    })
    commit('SET_KEYWORDS', keywords)
  }
}

export default actions
