import { Filters } from './Filters'

export type SavedSearch = {
  id: number
  name: string
  description: string
  titleColor: string
  map: string
  filter: Filters
  slug: string
}
