'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Undo2, Redo2, Clock, Settings, Play, Eye, ShoppingCart } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'

export default function EditorHeader() {
  const router = useRouter()
  const history = useEditorStore(state => state.history)
  const historyIndex = useEditorStore(state => state.historyIndex)
  const isSaving = useEditorStore(state => state.isSaving)
  const lastSaved = useEditorStore(state => state.lastSaved)
  const undo = useEditorStore(state => state.undo)
  const redo = useEditorStore(state => state.redo)
  const togglePreview = useEditorStore(state => state.togglePreview)
  
  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1
  
  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Save clicked')
  }
  
  const handleHistory = () => {
    // TODO: Implement history panel
    console.log('History clicked')
  }
  
  const handleProject = () => {
    // TODO: Implement project settings
    console.log('Project clicked')
  }
  
  const handleVideoTutorial = () => {
    // TODO: Open video tutorial
    console.log('Video tutorial clicked')
  }
  
  const handleNext = () => {
    router.push('/editor/summary')
  }

  return (
    <header className="h-[52px] bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left group */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push('/products/travel-photobook')}
          className="flex items-center gap-1.5 hover:bg-gray-100 rounded-lg px-2.5 py-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        
        <h1 className="font-serif font-bold text-lg">pixory</h1>
        
        <div className="h-5 w-px bg-gray-200 mx-1" />
        
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`flex items-center gap-1.5 hover:bg-gray-100 rounded-lg px-2.5 py-1.5 transition-colors ${
            !canUndo ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <Undo2 className="w-4 h-4" />
          <span className="text-xs">Undo</span>
        </button>
        
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`flex items-center gap-1.5 hover:bg-gray-100 rounded-lg px-2.5 py-1.5 transition-colors ${
            !canRedo ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <Redo2 className="w-4 h-4" />
          <span className="text-xs">Redo</span>
        </button>
        
        <button
          onClick={handleHistory}
          className="flex items-center gap-1.5 hover:bg-gray-100 rounded-lg px-2.5 py-1.5 transition-colors"
        >
          <Clock className="w-4 h-4" />
          <span className="text-xs">History</span>
        </button>
        
        <button
          onClick={handleProject}
          className="flex items-center gap-1.5 hover:bg-gray-100 rounded-lg px-2.5 py-1.5 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="text-xs">Project</span>
        </button>
      </div>
      
      {/* Center */}
      <button
        onClick={handleVideoTutorial}
        className="flex items-center gap-2 bg-black text-white rounded-full px-4 py-1.5 text-xs font-bold hover:bg-gray-900 transition-colors"
      >
        <Play className="w-3 h-3" fill="white" />
        <span>Video Tutorial</span>
      </button>
      
      {/* Right group */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="text-xs font-medium hover:bg-gray-100 rounded-lg px-2.5 py-1.5 transition-colors"
        >
          {isSaving ? 'Saving...' : lastSaved ? 'Saved ✓' : 'Save'}
        </button>
        
        <button
          onClick={togglePreview}
          className="flex items-center gap-1.5 hover:bg-gray-100 rounded-lg px-2.5 py-1.5 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span className="text-xs">Preview</span>
        </button>
        
        <button
          onClick={handleNext}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-900 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Next</span>
        </button>
      </div>
    </header>
  )
}
