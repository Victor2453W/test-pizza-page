"use client"
import type { Pizza } from "@/lib/types"
import PizzaCard from "@/components/pizza-card"

// Pizza menu with real image URLs
const PIZZAS: Pizza[] = [
  {
    id: 1,
    name: "Margherita",
    description: "Classic tomato sauce, fresh mozzarella, basil",
    price: 12.99,
    image: "https://media.dodostatic.net/image/r:366x366/11ee7d6105ef6690b86fbde6150b5b0c.avif",
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "Tomato sauce, mozzarella, pepperoni",
    price: 14.99,
    image: "https://media.dodostatic.net/image/r:366x366/11ee7d610a62d78598406363a9a8ad65.avif",
  },
  {
    id: 3,
    name: "Vegetarian",
    description: "Tomato sauce, mozzarella, bell peppers, mushrooms, onions, olives",
    price: 15.99,
    image: "https://media.dodostatic.com/image/r:366x366/0195cdbd59c9772582d17b3c3da64194.avif",
  },
  {
    id: 4,
    name: "Hawaiian",
    description: "Tomato sauce, mozzarella, ham, pineapple",
    price: 15.99,
    image: "https://media.dodostatic.net/image/r:366x366/11ee7d617e9339cfb185921a343ad8fd.avif",
  },
  {
    id: 5,
    name: "Meat Lovers",
    description: "Tomato sauce, mozzarella, pepperoni, sausage, bacon, ham",
    price: 17.99,
    image: "https://media.dodostatic.com/image/r:366x366/11ee7d5decddcabf98ff79e86618f3d6.avif",
  },
  {
    id: 6,
    name: "BBQ Chicken",
    description: "BBQ sauce, mozzarella, grilled chicken, red onions, cilantro",
    price: 16.99,
    image:
      "https://png.pngtree.com/png-vector/20240729/ourmid/pngtree-closeup-of-a-chicken-pizza-with-mouthwatering-toppings-png-image_13274350.png",
  },
]

export default function PizzaMenu({
  addToCart,
}: { addToCart: (pizza: Pizza, quantity: number, size: string, extras: string[]) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PIZZAS.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} addToCart={addToCart} />
      ))}
    </div>
  )
}
