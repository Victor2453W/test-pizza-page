export interface Pizza {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export interface CartItem {
  id: string
  pizza: Pizza
  quantity: number
  size: string
  extras: string[]
  price: number
}
