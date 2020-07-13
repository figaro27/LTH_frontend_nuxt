export type Keyword = {
  id: number
  name: string
  table: string
  index: number
}

export type RouteQuery = {
  keyword?: string
  demographics?: string
  functionalities?: string
  hqs?: string
  installations?: string
  integrations?: string
  jurisdictions?: string
  platformLanguages?: string
  practiceAreas?: string
}

export type Filters = {
  keyword: string
  demographics: any[]
  functionalities: any[]
  hqs: any[]
  installations: any[]
  integrations: any[]
  jurisdictions: any[]
  platformLanguages: any[]
  practiceAreas: any[]
}
