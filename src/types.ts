export type Agent = {
  id: number
  name: string
  model_type: string
  status: string
  created_at: string
}

export type Ailment = {
  id: number
  name: string
  description: string | null
}
