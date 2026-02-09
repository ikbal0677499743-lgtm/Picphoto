'use client'

import { Suspense, useEffect, useState } from 'react'
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
  const uploadedImages = useEditorStore(state => state.uploadedImages)
  const autoCreateBook = useEditorStore(state => state.autoCreateBook)
  const isAutoCreating = useEditorStore(state => state.isAutoCreating)
  const autoCreateProgress = useEditorStore(state => state.autoCreateProgress)
  const setSidebarTab = useEditorStore(state => state.setSidebarTab)
  
  const [showToast, setShowToast] = useState(false)
  const [hasAutoCreated, setHasAutoCreated] = useState(false)
  
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
  
  // Handle auto mode
  useEffect(() => {
    if (mode === 'auto') {
      if (uploadedImages.length > 0 && !hasAutoCreated && !isAutoCreating) {
        // Trigger auto-create
        setHasAutoCreated(true)
        autoCreateBook(uploadedImages)
      } else if (uploadedImages.length === 0) {
        // Open images sidebar
        setSidebarTab('images')
      }
    }
  }, [mode, uploadedImages, hasAutoCreated, isAutoCreating, autoCreateBook, setSidebarTab])
  
  // Show toast when auto-create completes
  useEffect(() => {
    if (hasAutoCreated && !isAutoCreating && uploadedImages.length > 0) {
      setShowToast(true)
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [hasAutoCreated, isAutoCreating, uploadedImages])
  
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
          
          {/* Loading overlay for auto-create */}
          {isAutoCreating && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
              <div className="text-center max-w-md px-8">
                {/* Spinning loader */}
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                
                {/* Title */}
                <h3 className="font-display text-xl font-black mb-2">
                  Creating your book...
                </h3>
                
                {/* Subtitle */}
                <p className="text-sm text-gray-500 mb-6">
                  Organizing {uploadedImages.length} photos across your pages
                </p>
                
                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent transition-all duration-300 ease-out"
                    style={{ width: `${autoCreateProgress}%` }}
                  />
                </div>
                
                {/* Progress percentage */}
                <p className="text-xs text-gray-400 mt-2">
                  {autoCreateProgress}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Page Navigator - 120px */}
      <PageNavigator />
      
      {/* Success toast */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-black text-white px-6 py-3 rounded-xl shadow-lg">
            Your book is ready! Feel free to customize.
          </div>
        </div>
      )}
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
