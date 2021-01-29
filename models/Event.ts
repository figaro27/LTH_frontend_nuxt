export type Audience = {
  id: number
  name: string
}

export type Duration = {
  id: number
  name: string
  days: number
}

export type Format = {
  id: number
  name: string
}

export type EventFeature = {
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
  features: EventFeature[]
  duration: Duration
  format: Format
  recurrence: Recurrence
  notes: string
}

export type SearchResultEvent = Pick<
  Event,
  'id' | 'organizer' | 'title' | 'logo' | 'country' | 'city' | 'date' | 'audiences' | 'duration' | 'recurrence'
>
