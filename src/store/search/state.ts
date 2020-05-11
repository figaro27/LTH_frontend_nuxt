
import { Keyword } from './types'

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
  keywordsLoading: false
}

export default state
