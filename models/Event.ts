export type Audience = {
  id: number
  name: string
}

export type Duration = {
  id: number
  name: string
}

export type Recurrence = {
  id: number
  name: string
}

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
  audiences: Audience[]
  duration: Duration
  recurrence: Recurrence
}

export type SearchResultEvent = Pick<
  Event,
  'id' | 'organizer' | 'title' | 'logo' | 'country' | 'city' | 'date' | 'audiences' | 'duration' | 'recurrence'
>
