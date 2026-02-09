'use client'

import { useState } from 'react'
import { BookOpen, ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { themes } from '@/lib/constants'

interface ThemeSelectorProps {
  selectedTheme: string
  onSelectTheme: (themeId: string) => void
}

export default function ThemeSelector({ selectedTheme, onSelectTheme }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedThemeData = themes.find(t => t.id === selectedTheme)

  const destinationThemes = themes.filter(t => t.category === 'destinations')
  const specialThemes = themes.filter(t => t.category === 'special')
  const minimalThemes = themes.filter(t => t.category === 'minimal')

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">Choose your cover template:</label>
      
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 border-2 border-gray-300 rounded-xl hover:border-black transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="bg-accent-light p-2 rounded">
            <BookOpen className="w-5 h-5 text-accent" />
          </div>
          <span className="font-medium">{selectedThemeData?.name}</span>
          {selectedThemeData?.isNew && (
            <span className="bg-accent text-white text-xs px-2 py-1 rounded font-medium">
              NEW
            </span>
          )}
        </div>
        <ChevronDown className={cn(
          "w-5 h-5 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-xl max-h-80 overflow-y-auto">
          {/* Destinations */}
          <div className="sticky top-0 bg-surface px-4 py-2 font-semibold text-sm border-b">
            Destinations
          </div>
          {destinationThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                onSelectTheme(theme.id)
                setIsOpen(false)
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 hover:bg-surface transition-colors border-b border-gray-100",
                selectedTheme === theme.id && "bg-surface"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="bg-accent-light p-1.5 rounded">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm">{theme.name}</span>
                {theme.isNew && (
                  <span className="bg-accent text-white text-xs px-2 py-0.5 rounded font-medium">
                    NEW
                  </span>
                )}
              </div>
              {selectedTheme === theme.id && (
                <Check className="w-5 h-5 text-accent" />
              )}
            </button>
          ))}

          {/* Special Themes */}
          <div className="sticky top-0 bg-surface px-4 py-2 font-semibold text-sm border-b">
            Special Themes
          </div>
          {specialThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                onSelectTheme(theme.id)
                setIsOpen(false)
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 hover:bg-surface transition-colors border-b border-gray-100",
                selectedTheme === theme.id && "bg-surface"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="bg-accent-light p-1.5 rounded">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm">{theme.name}</span>
                {theme.isNew && (
                  <span className="bg-accent text-white text-xs px-2 py-0.5 rounded font-medium">
                    NEW
                  </span>
                )}
              </div>
              {selectedTheme === theme.id && (
                <Check className="w-5 h-5 text-accent" />
              )}
            </button>
          ))}

          {/* Minimal */}
          <div className="sticky top-0 bg-surface px-4 py-2 font-semibold text-sm border-b">
            Minimal
          </div>
          {minimalThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                onSelectTheme(theme.id)
                setIsOpen(false)
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 hover:bg-surface transition-colors",
                selectedTheme === theme.id && "bg-surface"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="bg-accent-light p-1.5 rounded">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm">{theme.name}</span>
                {theme.isNew && (
                  <span className="bg-accent text-white text-xs px-2 py-0.5 rounded font-medium">
                    NEW
                  </span>
                )}
              </div>
              {selectedTheme === theme.id && (
                <Check className="w-5 h-5 text-accent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
