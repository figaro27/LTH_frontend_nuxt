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
  offices?: string
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
  offices: any[]
  platformLanguages: any[]
  practiceAreas: any[]
}
