export interface ProfileTeaser {
  name: string
  image: string[]
  online: boolean
  age?: number
  address?: string
}

export interface StreamTeaser {
  name: string
  image: string
  timeAt: string
  online: boolean
  type: string
  status: string
  msg: string
}
