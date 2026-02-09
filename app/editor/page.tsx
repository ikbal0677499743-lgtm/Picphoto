'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useEditorStore } from '@/lib/store/editorStore'
import EditorHeader from '@/components/editor/EditorHeader'
import Sidebar from '@/components/editor/Sidebar'
import Canvas from '@/components/editor/Canvas'
import PageNavigator from '@/components/editor/PageNavigator'
import FloatingToolbar from '@/components/editor/FloatingToolbar'
import ContextToolbar from '@/components/editor/ContextToolbar'

function EditorContent() {
  const searchParams = useSearchParams()
  const setTemplateTheme = useEditorStore(state => state.setTemplateTheme)
  const pushHistory = useEditorStore(state => state.pushHistory)
  const undo = useEditorStore(state => state.undo)
  const redo = useEditorStore(state => state.redo)
  const sidebarOpen = useEditorStore(state => state.sidebarOpen)
  
  const theme = searchParams.get('theme') || 'paris-1'
  const mode = searchParams.get('mode') || 'template'
  
  // Initialize theme
  useEffect(() => {
    setTemplateTheme(theme)
  }, [theme, setTemplateTheme])
  
  // Initialize history on mount
  useEffect(() => {
    pushHistory()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd (Mac) or Ctrl (Windows/Linux)
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const cmdKey = isMac ? e.metaKey : e.ctrlKey
      
      if (cmdKey) {
        // Ctrl/Cmd + Z = Undo
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault()
          undo()
        }
        // Ctrl/Cmd + Shift + Z = Redo
        else if (e.key === 'z' && e.shiftKey) {
          e.preventDefault()
          redo()
        }
        // Ctrl/Cmd + Y = Redo (alternative)
        else if (e.key === 'y') {
          e.preventDefault()
          redo()
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Header - 52px */}
      <EditorHeader />
      
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 52px - 120px)' }}>
        {/* Sidebar - 72px always visible, +280px when panel open */}
        <Sidebar />
        
        {/* Canvas area - fills remaining space */}
        <div className="flex-1 relative bg-gray-200 overflow-hidden">
          <Canvas />
          
          {/* Context toolbar (appears when element selected) */}
          <ContextToolbar />
          
          {/* Floating toolbar on right side */}
          <FloatingToolbar />
        </div>
      </div>
      
      {/* Page Navigator - 120px */}
      <PageNavigator />
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  )
}
