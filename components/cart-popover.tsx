"use client"

import { useState } from "react"
import { ShoppingCart, Trash2, PizzaIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { CartItem } from "@/lib/types"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CartPopover({
  cart,
  removeFromCart,
  totalItems,
  totalPrice,
}: {
  cart: CartItem[]
  removeFromCart: (id: string) => void
  totalItems: number
  totalPrice: number
}) {
  const [open, setOpen] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleCheckout = () => {
    alert("Proceeding to checkout! (This would normally redirect to a checkout page)")
    setOpen(false)
  }

  const handleImageError = (pizzaId: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [pizzaId]: true,
    }))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white">
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-orange-300 shadow-md shadow-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
          <h3 className="text-lg font-bold">Your Cart</h3>
          <p className="text-sm opacity-90">{totalItems} item(s)</p>
        </div>

        {cart.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Your cart is empty</div>
        ) : (
          <>
            <ScrollArea className="max-h-[300px]">
              <div className="p-4 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-start space-x-3">
                      <div className="relative w-10 h-10 mt-1 flex-shrink-0 bg-orange-50 rounded-full overflow-hidden">
                        {imageErrors[item.pizza.id] ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <PizzaIcon className="h-6 w-6 text-orange-500" />
                          </div>
                        ) : (
                          <Image
                            src={item.pizza.image || "/placeholder.svg"}
                            alt={item.pizza.name}
                            width={40}
                            height={40}
                            className="object-cover"
                            onError={() => handleImageError(item.pizza.id)}
                            unoptimized
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-600">{item.pizza.name}</h4>
                        <p className="text-sm text-gray-600">
                          {item.size.charAt(0).toUpperCase() + item.size.slice(1)}
                          {item.extras.length > 0 && `, ${item.extras.join(", ")}`}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-medium">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">${(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Total:</span>
                <span className="text-xl font-bold text-orange-600">${totalPrice.toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
