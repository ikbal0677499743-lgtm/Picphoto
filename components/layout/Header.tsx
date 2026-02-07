'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User, ShoppingCart, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currency, setCurrency] = useState('USD')

  const currencies = ['USD', 'EUR', 'GBP', 'AUD', 'CAD']

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/products/travel-photobook" className="text-sm font-medium hover:text-accent transition-colors">
              Our Photobooks
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-accent transition-colors">
              About Us
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-accent transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 font-serif font-black text-2xl">
            picphoto
          </Link>

          {/* Right: Currency, User, Cart */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors">
                <span>$ {currency}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={cn(
                      "w-full px-4 py-2 text-sm text-left hover:bg-surface transition-colors",
                      currency === curr && "bg-surface font-medium"
                    )}
                  >
                    {curr === 'USD' && '$ '}
                    {curr === 'EUR' && '€ '}
                    {curr === 'GBP' && '£ '}
                    {curr === 'AUD' && 'A$ '}
                    {curr === 'CAD' && 'C$ '}
                    {curr}
                  </button>
                ))}
              </div>
            </div>
            <button className="p-2 hover:text-accent transition-colors" aria-label="User account">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 hover:text-accent transition-colors relative" aria-label="Shopping cart">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/products/travel-photobook" className="text-sm font-medium hover:text-accent transition-colors">
                Our Photobooks
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-accent transition-colors">
                About Us
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-accent transition-colors">
                FAQ
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
