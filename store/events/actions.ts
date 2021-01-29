import { ActionTree } from 'vuex'

import { DEFAULT_EVENTS_LIMIT, MOBILE_EVENTS_LIMIT } from '@/assets/consts'
import { RootState, TypedAction, LoadingStatus } from '@/store/types'
import { api } from '@/utils'
import { isMobile } from 'mobile-device-detect'
import { EventsState } from './state'

export type EventsActions = ActionTree<EventsState, RootState>
export type EventsAction<T, R = any> = TypedAction<EventsState, RootState, T, R>

const actions: EventsActions = {
  async loadOrganizers({ commit }) {
    const response = await api.get('events/organizers')
    commit('SET_ORGANIZERS', response.data)
  },

  async loadCountries({ commit }) {
    const response = await api.get('events/countries')
    commit('SET_COUNTRIES', response.data)
  },

  async loadAudiences({ commit }) {
    const response = await api.get('audiences')
    commit('SET_AUDIENCES', response.data)
  },

  async loadFeatures({ commit }) {
    const response = await api.get('event-features')
    commit('SET_FEATURES', response.data)
  },

  async loadFormats({ commit }) {
    const response = await api.get('event-formats')
    commit('SET_FORMATS', response.data)
  },

  async loadDurations({ commit }) {
    const response = await api.get('durations')
    commit('SET_DURATIONS', response.data)
  },

  async runSearch({ commit, state }, query: any = {}) {
    commit('SET_EVENTS_LOADING', LoadingStatus.Loading)
    commit('SAVE_LAST_FILTER', query)
    const limit = isMobile ? MOBILE_EVENTS_LIMIT : DEFAULT_EVENTS_LIMIT
    const { data } = await api.post('events/search', {
      ...query,
      offset: (state.eventsPage - 1) * limit,
      limit
    })
    commit('SET_EVENTS', data.data.events)
    commit('SET_EVENTS_TOTAL', data.data.total)
    commit('SET_EVENTS_LOADING', LoadingStatus.Loaded)
  },

  async loadAutosuggest({ commit }, keyword: string) {
    commit('SET_AUTOSUGGEST_ITEMS_LOADING', LoadingStatus.Loading)
    const { data } = await api.get('events/autosuggest', { keyword })
    if (data.success) {
      commit('SET_AUTOSUGGEST_ITEMS', data.data)
    } else {
      commit('SET_AUTOSUGGEST_ITEMS', [])
    }

    commit('SET_AUTOSUGGEST_ITEMS_LOADING', LoadingStatus.Loaded)
  }
}

export default actions
