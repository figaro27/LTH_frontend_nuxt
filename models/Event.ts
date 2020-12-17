export type Event = {
  id: string | number
  organizer: string
  title: string
  website: string
  description: string
  logo: string
  sideImage: string
  city: string
  country: string
  date: Date
  audience: string
  duration: string
  recurrence: string
}

export type SearchResultEvent = Pick<Event, 'id' | 'title' | 'city' | 'country'>
