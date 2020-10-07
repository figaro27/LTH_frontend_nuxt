import { ActionTree } from 'vuex'

import { RootState, TypedAction } from '@/store/types'
import { AdsState } from './state'

export type AdActions = ActionTree<AdsState, RootState>
export type AdAction<T, R = any> = TypedAction<AdsState, RootState, T, R>

const actions: AdActions = {
  loadActiveAd({ commit }) {
    // const { data } = await api.get('ad')
    commit('SET_ACTIVE_AD', {
      createdAt: '2020-10-01T08:41:38.033Z',
      desktopCommonHorizontalAd:
        'https://legal-uploads.s3.us-east-2.amazonaws.com/ads/02e1e982-da6c-4088-a503-8a97789d2d1e.png',
      desktopCommonVerticalAd:
        'https://legal-uploads.s3.us-east-2.amazonaws.com/ads/b5c6a4fd-8c60-417d-bb13-ca8916015102.png',
      desktopHomeHorizontalAd:
        'https://legal-uploads.s3.us-east-2.amazonaws.com/ads/32373a01-491a-41a2-a96f-e4efcd2818d1.png',
      desktopHomeVerticalAd:
        'https://legal-uploads.s3.us-east-2.amazonaws.com/ads/101382fc-ab71-4630-8abf-0df543b86554.png',
      id: 2,
      isActive: true,
      mobileCommonHorizontalAd:
        'https://legal-uploads.s3.us-east-2.amazonaws.com/ads/709f83ec-0d7b-4aae-9598-78a74edb6618.png',
      mobileCommonVerticalAd:
        'https://legal-uploads.s3.us-east-2.amazonaws.com/ads/3f721472-97b9-4e31-83e2-ef740e985106.png',
      name: 'testad',
      redirectUrl: 'https://google.com',
      updatedAt: '2020-10-01T08:42:23.493Z'
    })
  }
}

export default actions
