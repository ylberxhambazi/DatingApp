import { Photo } from './photo'

export interface User {
  id: number
  username: string
  name?: string
  email: string
  age: number
  gender: string
  seekGender?: string
  sexualOrientation?: string
  created: Date
  lastActive: Date
  ageFrom?: number
  ageTo?: number
  headline?: string
  description?: string
  country: string
  state?: string
  city: string
  zip?: string
  materialStatus?: string
  lookingFor?: string
  occupation?: string
  language?: string
  race?: string
  religion?: string
  height?: string
  bodyType?: string
  eyeColor?: string
  hairColor?: string
  wantChildren?: string
  haveChildren?: string
  education?: string
  smoke?: string
  drink?: string
  interests?: string
  photoUrl: string
  photos?: Photo[]
}
