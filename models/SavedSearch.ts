import { Filters } from './Filters'

export type SavedSearch = {
  id: number
  name: string
  filter: Filters
  slug: string
}
