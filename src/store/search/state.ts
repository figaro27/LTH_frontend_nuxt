
import { Keyword } from './types'
import { Vendor } from '@/models'

export type SearchState = {
  demographics: any[];
  functionalities: any[];
  hqs: any[];
  installations: any[];
  integrations: any[];
  jurisdictions: any[];
  platformLanguages: any[];
  practiceAreas: any[];
  keywords: Keyword[];
  keywordsLoading: boolean;

  vendors: Vendor[];
}

const state: SearchState = {
  demographics: [],
  functionalities: [],
  hqs: [],
  installations: [],
  integrations: [],
  jurisdictions: [],
  platformLanguages: [],
  practiceAreas: [],
  keywords: [],
  keywordsLoading: false,

  vendors: []
}

export default state