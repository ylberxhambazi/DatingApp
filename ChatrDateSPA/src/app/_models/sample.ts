import { Photo } from './photo'

export interface Sample {
  memberId: number
  username: string
  first_name: string
  email: string
  gender: string
  seek_gender: string
  sexual_orientation: string
  birthdate: Date
  age_from: number
  age_to: number
  headline: string
  description: string
  country: string
  state: string
  city: string
  zip: string
  material_status: string
  looking_for: string
  occupation: string
  language: string
  race: string
  religion: string
  height: string
  body_type: string
  eye_color: string
  hair_color: string
  want_children: string
  have_children: string
  education: string
  smoke: string
  drink: string
  interests: string
  photos?: Photo[]
}
