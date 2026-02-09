'use client'

import { BookOpen } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'
import { themes } from '@/lib/constants'

export default function TemplatesPanel() {
  const templateTheme = useEditorStore(state => state.templateTheme)
  const setTemplateTheme = useEditorStore(state => state.setTemplateTheme)
  
  // Filter to only destination and special themes (not minimal)
  const filteredThemes = themes.filter(
    theme => theme.category === 'destinations' || theme.category === 'special'
  )

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h3 className="font-bold text-sm">Cover Templates</h3>
      
      {/* Templates grid */}
      <div className="grid grid-cols-2 gap-2">
        {filteredThemes.map((theme) => {
          const isActive = templateTheme === theme.id
          
          return (
            <button
              key={theme.id}
              onClick={() => setTemplateTheme(theme.id)}
              className={`rounded-xl border p-2 hover:border-black transition-colors ${
                isActive ? 'border-black border-2' : 'border-gray-200'
              }`}
            >
              {/* Book mockup */}
              <div className="aspect-[3/4] bg-accent/5 rounded-lg flex flex-col items-center justify-center gap-2 p-2">
                <BookOpen className="w-6 h-6 text-accent" />
                <span className="text-[10px] text-center font-medium">{theme.name}</span>
              </div>
              
              {/* Theme name with badge */}
              <div className="mt-2 flex items-center justify-center gap-1">
                <span className="text-xs font-medium truncate">{theme.name}</span>
                {theme.isNew && (
                  <span className="text-[9px] bg-accent text-white px-1.5 py-0.5 rounded">
                    NEW
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
