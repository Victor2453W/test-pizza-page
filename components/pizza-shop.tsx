"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import PizzaMenu from "@/components/pizza-menu"
import CartPopover from "@/components/cart-popover"
import type { Pizza, CartItem } from "@/lib/types"

export default function PizzaShop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const addToCart = (pizza: Pizza, quantity = 1, size: string, extras: string[] = []) => {
    const newItem: CartItem = {
      id: `${pizza.id}-${Date.now()}`,
      pizza,
      quantity,
      size,
      extras,
      price: calculatePrice(pizza, size, extras),
    }

    setCart([...cart, newItem])
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const calculatePrice = (pizza: Pizza, size: string, extras: string[]) => {
    let price = pizza.price

    // Size adjustments
    if (size === "medium") price += 2
    if (size === "large") price += 4

    // Extras cost $1.50 each
    price += extras.length * 1.5

    return price
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl font-bold">🍕</span>
            </div>
            <h1 className="text-2xl font-bold">Pizza Test</h1>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
              onClick={() => scrollToSection("menu")}
            >
              Menu
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
              onClick={() => scrollToSection("about")}
            >
              About
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </Button>
            <CartPopover cart={cart} removeFromCart={removeFromCart} totalItems={totalItems} totalPrice={totalPrice} />
          </div>

          <div className="md:hidden flex items-center">
            <CartPopover cart={cart} removeFromCart={removeFromCart} totalItems={totalItems} totalPrice={totalPrice} />
            <Button
              variant="ghost"
              size="icon"
              className="text-white ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-orange-500 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white w-full justify-start rounded-full"
                onClick={() => scrollToSection("menu")}
              >
                Menu
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white w-full justify-start rounded-full"
                onClick={() => scrollToSection("about")}
              >
                About
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white w-full justify-start rounded-full"
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center py-20 relative"
        style={{
          backgroundImage:
            "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/05/59/4c/demetra.jpg?w=900&h=500&s=1')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="bg-black/50 p-8 rounded-lg inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Delicious Pizza, Delivered Fast</h2>
            <p className="text-xl text-white mb-6">Handcrafted with love, using only the freshest ingredients</p>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full"
              onClick={() => scrollToSection("menu")}
            >
              Order Now
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">Our Menu</h2>
          <PizzaMenu addToCart={addToCart} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-orange-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">About Us</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6">
              At Pizza Test, we've been crafting delicious pizzas since 1985. Our secret family recipes and commitment
              to quality ingredients make our pizzas truly special.
            </p>
            <p className="text-lg">
              Every pizza is handmade with love and baked to perfection in our traditional stone ovens.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">Contact Us</h2>
          <div className="max-w-xl mx-auto">
            <div className="bg-orange-50 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <h3 className="font-bold text-orange-600">Address</h3>
                <p>123 Pizza Lane, Foodville, CA 90210</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-orange-600">Phone</h3>
                <p>(555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-bold text-orange-600">Hours</h3>
                <p>Monday - Sunday: 11am - 10pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Pizza Test</h2>
              <p className="text-orange-200">Delicious pizza, delivered to your door</p>
            </div>
            <div>
              <p>© {new Date().getFullYear()} Pizza Test. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
