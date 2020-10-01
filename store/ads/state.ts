import { Ad } from '@/models'

export type AdsState = {
  activeAd: Ad | null
}

const state = () =>
  ({
    activeAd: null
  } as AdsState)

export default state
