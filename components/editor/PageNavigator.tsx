'use client'

import { Plus, Trash2 } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'

export default function PageNavigator() {
  const pages = useEditorStore(state => state.pages)
  const currentPageIndex = useEditorStore(state => state.currentPageIndex)
  const setCurrentPage = useEditorStore(state => state.setCurrentPage)
  const addPage = useEditorStore(state => state.addPage)
  const deletePage = useEditorStore(state => state.deletePage)
  const duplicatePage = useEditorStore(state => state.duplicatePage)

  return (
    <div className="h-[120px] bg-white border-t border-gray-200 flex items-center px-4 overflow-x-auto">
      <div className="flex items-center gap-2">
        {/* Add page button */}
        <button
          onClick={() => addPage()}
          className="w-16 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-accent hover:bg-accent/5 transition-colors flex-shrink-0"
          title="Add page"
        >
          <Plus className="w-5 h-5 text-gray-400" />
        </button>
        
        {/* Page thumbnails */}
        {pages.map((page, index) => {
          const isActive = currentPageIndex === index
          const pageLabel = 
            page.type === 'cover' ? 'Cover' :
            page.type === 'guard' ? 'Title' :
            `${(index - 1) * 2}-${(index - 1) * 2 + 1}`
          
          return (
            <div
              key={page.id}
              className="flex flex-col items-center gap-1 flex-shrink-0"
            >
              <button
                onClick={() => setCurrentPage(index)}
                className={`w-16 h-20 rounded-lg border-2 transition-all ${
                  isActive
                    ? 'border-accent bg-accent/10'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                style={{ backgroundColor: page.backgroundColor }}
              >
                {/* Thumbnail preview */}
                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
                  {page.elements.length > 0 ? `${page.elements.length} items` : 'Empty'}
                </div>
              </button>
              
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-500">{pageLabel}</span>
                
                {/* Delete button for non-essential pages */}
                {page.type === 'inner' && pages.length > 3 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deletePage(index)
                    }}
                    className="p-0.5 hover:bg-red-50 rounded"
                    title="Delete page"
                  >
                    <Trash2 className="w-3 h-3 text-gray-400 hover:text-red-500" />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
