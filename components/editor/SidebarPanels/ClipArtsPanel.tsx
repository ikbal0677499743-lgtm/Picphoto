'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'

const stickerCategories = [
  {
    emoji: '🐾',
    name: 'Animals',
    stickers: [
      { name: 'Cat', emoji: '🐱' },
      { name: 'Dog', emoji: '🐶' },
      { name: 'Bird', emoji: '🐦' },
      { name: 'Butterfly', emoji: '🦋' },
      { name: 'Fish', emoji: '🐠' },
      { name: 'Turtle', emoji: '🐢' },
    ],
  },
  {
    emoji: '🏖️',
    name: 'Beach',
    stickers: [
      { name: 'Palm Tree', emoji: '🌴' },
      { name: 'Surfboard', emoji: '🏄' },
      { name: 'Shell', emoji: '🐚' },
      { name: 'Sun', emoji: '☀️' },
      { name: 'Umbrella', emoji: '⛱️' },
      { name: 'Waves', emoji: '🌊' },
    ],
  },
  {
    emoji: '🏜️',
    name: 'Desert',
    stickers: [
      { name: 'Cactus', emoji: '🌵' },
      { name: 'Camel', emoji: '🐪' },
      { name: 'Sand Dune', emoji: '🏜️' },
      { name: 'Oasis', emoji: '💧' },
    ],
  },
  {
    emoji: '🌸',
    name: 'Flowers',
    stickers: [
      { name: 'Rose', emoji: '🌹' },
      { name: 'Sunflower', emoji: '🌻' },
      { name: 'Tulip', emoji: '🌷' },
      { name: 'Daisy', emoji: '🌼' },
      { name: 'Lavender', emoji: '🪻' },
      { name: 'Cherry Blossom', emoji: '🌸' },
    ],
  },
  {
    emoji: '🍕',
    name: 'Food & Drink',
    stickers: [
      { name: 'Coffee', emoji: '☕' },
      { name: 'Pizza', emoji: '🍕' },
      { name: 'Cocktail', emoji: '🍹' },
      { name: 'Croissant', emoji: '🥐' },
      { name: 'Sushi', emoji: '🍣' },
      { name: 'Ice Cream', emoji: '🍦' },
    ],
  },
  {
    emoji: '🌿',
    name: 'Plants',
    stickers: [
      { name: 'Monstera', emoji: '🌿' },
      { name: 'Fern', emoji: '🪴' },
      { name: 'Bamboo', emoji: '🎋' },
      { name: 'Leaf', emoji: '🍃' },
    ],
  },
  {
    emoji: '⭐',
    name: 'Shapes',
    stickers: [
      { name: 'Heart', emoji: '❤️' },
      { name: 'Star', emoji: '⭐' },
      { name: 'Arrow', emoji: '➡️' },
      { name: 'Frame', emoji: '🖼️' },
      { name: 'Circle', emoji: '⭕' },
      { name: 'Banner', emoji: '🎗️' },
    ],
  },
  {
    emoji: '❄️',
    name: 'Snow & Winter',
    stickers: [
      { name: 'Snowflake', emoji: '❄️' },
      { name: 'Snowman', emoji: '⛄' },
      { name: 'Mountain', emoji: '⛰️' },
      { name: 'Ski', emoji: '⛷️' },
    ],
  },
  {
    emoji: '📍',
    name: 'Location Icons',
    stickers: [
      { name: 'Pin', emoji: '📍' },
      { name: 'Compass', emoji: '🧭' },
      { name: 'Map', emoji: '🗺️' },
      { name: 'Airplane', emoji: '✈️' },
      { name: 'Passport', emoji: '🛂' },
      { name: 'Suitcase', emoji: '🧳' },
    ],
  },
  {
    emoji: '🗺️',
    name: 'Landmarks',
    stickers: [
      { name: 'Eiffel Tower', emoji: '🗼' },
      { name: 'Statue of Liberty', emoji: '🗽' },
      { name: 'Big Ben', emoji: '🕰️' },
      { name: 'Colosseum', emoji: '🏛️' },
      { name: 'Taj Mahal', emoji: '🕌' },
    ],
  },
]

export default function ClipArtsPanel() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(stickerCategories[0].name)
  const currentPageIndex = useEditorStore(state => state.currentPageIndex)
  const addElement = useEditorStore(state => state.addElement)
  
  const handleAddSticker = (sticker: { name: string; emoji: string }) => {
    const element = {
      id: Math.random().toString(36).substring(2),
      type: 'sticker' as const,
      x: 200,
      y: 200,
      width: 80,
      height: 80,
      rotation: 0,
      opacity: 1,
      zIndex: 100,
      stickerUrl: sticker.emoji,
    }
    addElement(currentPageIndex, element)
  }

  return (
    <div className="p-4 space-y-2">
      {/* Header */}
      <h3 className="font-bold text-sm mb-4">Stickers & Cliparts</h3>
      
      {/* Categories */}
      {stickerCategories.map((category) => {
        const isExpanded = expandedCategory === category.name
        
        return (
          <div key={category.name} className="border-b border-gray-100">
            {/* Category header */}
            <button
              onClick={() => setExpandedCategory(isExpanded ? null : category.name)}
              className="w-full flex items-center justify-between py-2 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{category.emoji}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {/* Stickers grid */}
            {isExpanded && (
              <div className="grid grid-cols-4 gap-2 pb-2">
                {category.stickers.map((sticker) => (
                  <button
                    key={sticker.name}
                    onClick={() => handleAddSticker(sticker)}
                    className="aspect-square bg-gray-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-accent/10 transition-colors"
                  >
                    <span className="text-2xl mb-1">{sticker.emoji}</span>
                    <span className="text-[9px] text-gray-500 truncate px-1">
                      {sticker.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
