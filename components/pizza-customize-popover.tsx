"use client"

import { useState } from "react"
import type { Pizza } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Minus } from "lucide-react"

export default function PizzaCustomizePopover({
  pizza,
  addToCart,
}: {
  pizza: Pizza
  addToCart: (pizza: Pizza, quantity: number, size: string, extras: string[]) => void
}) {
  const [size, setSize] = useState("medium")
  const [quantity, setQuantity] = useState(1)
  const [extras, setExtras] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const availableExtras = ["Extra Cheese", "Mushrooms", "Onions", "Bell Peppers", "Olives", "Bacon"]

  const handleExtraToggle = (extra: string) => {
    if (extras.includes(extra)) {
      setExtras(extras.filter((e) => e !== extra))
    } else {
      setExtras([...extras, extra])
    }
  }

  const handleAddToCart = () => {
    addToCart(pizza, quantity, size, extras)
    setOpen(false)
    // Reset form
    setSize("medium")
    setQuantity(1)
    setExtras([])
  }

  const calculateTotalPrice = () => {
    let price = pizza.price

    // Size adjustments
    if (size === "medium") price += 2
    if (size === "large") price += 4

    // Extras cost $1.50 each
    price += extras.length * 1.5

    return (price * quantity).toFixed(2)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">Customize</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-orange-300 shadow-md shadow-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
          <h3 className="text-lg font-bold">{pizza.name}</h3>
          <p className="text-sm opacity-90">{pizza.description}</p>
        </div>

        <div className="p-4 space-y-4">
          {/* Size Selection */}
          <div>
            <Label className="text-orange-600 font-bold mb-2 block">Size</Label>
            <RadioGroup value={size} onValueChange={setSize} className="flex space-x-2">
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="small" id="small" className="text-orange-500" />
                <Label htmlFor="small">Small</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="medium" id="medium" className="text-orange-500" />
                <Label htmlFor="medium">Medium (+$2)</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="large" id="large" className="text-orange-500" />
                <Label htmlFor="large">Large (+$4)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Extras */}
          <div>
            <Label className="text-orange-600 font-bold mb-2 block">Extras (+$1.50 each)</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableExtras.map((extra) => (
                <div key={extra} className="flex items-center space-x-2">
                  <Checkbox
                    id={`extra-${extra}`}
                    checked={extras.includes(extra)}
                    onCheckedChange={() => handleExtraToggle(extra)}
                    className="text-orange-500 border-orange-300"
                  />
                  <Label htmlFor={`extra-${extra}`} className="text-sm">
                    {extra}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <Label className="text-orange-600 font-bold mb-2 block">Quantity</Label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-orange-300 text-orange-500"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-orange-300 text-orange-500"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Total and Add to Cart */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Total:</span>
              <span className="text-xl font-bold text-orange-600">${calculateTotalPrice()}</span>
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
