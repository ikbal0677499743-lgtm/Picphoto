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
  const sidebarOpen = useEditorStore(state => state.sidebarOpen)
  
  const theme = searchParams.get('theme') || 'paris-1'
  const mode = searchParams.get('mode') || 'template'
  
  useEffect(() => {
    setTemplateTheme(theme)
  }, [theme, setTemplateTheme])

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
