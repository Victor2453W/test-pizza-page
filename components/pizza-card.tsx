"use client"
import { useState } from "react"
import Image from "next/image"
import { PizzaIcon } from "lucide-react"
import type { Pizza } from "@/lib/types"
import PizzaCustomizePopover from "@/components/pizza-customize-popover"

export default function PizzaCard({
  pizza,
  addToCart,
}: {
  pizza: Pizza
  addToCart: (pizza: Pizza, quantity: number, size: string, extras: string[]) => void
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-orange-100">
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-orange-100 text-orange-500">
            <PizzaIcon className="h-12 w-12 mb-2" />
            <p className="text-lg font-medium">{pizza.name}</p>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={pizza.image || "/placeholder.svg"}
              alt={pizza.name}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
              priority={pizza.id <= 3} // Load first 3 images with priority
              unoptimized
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-orange-600">{pizza.name}</h3>
        <p className="text-gray-600 mb-4">{pizza.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${pizza.price.toFixed(2)}</span>
          <PizzaCustomizePopover pizza={pizza} addToCart={addToCart} />
        </div>
      </div>
    </div>
  )
}
