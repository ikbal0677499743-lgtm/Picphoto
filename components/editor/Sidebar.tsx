'use client'

import { Camera, LayoutTemplate, LayoutGrid, Paintbrush, Sticker } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'
import ImagesPanel from './SidebarPanels/ImagesPanel'
import TemplatesPanel from './SidebarPanels/TemplatesPanel'
import LayoutsPanel from './SidebarPanels/LayoutsPanel'
import BackgroundsPanel from './SidebarPanels/BackgroundsPanel'
import ClipArtsPanel from './SidebarPanels/ClipArtsPanel'

export default function Sidebar() {
  const sidebarTab = useEditorStore(state => state.sidebarTab)
  const sidebarOpen = useEditorStore(state => state.sidebarOpen)
  const setSidebarTab = useEditorStore(state => state.setSidebarTab)
  
  const tabs = [
    { id: 'images' as const, icon: Camera, label: 'Images' },
    { id: 'templates' as const, icon: LayoutTemplate, label: 'Templates' },
    { id: 'layouts' as const, icon: LayoutGrid, label: 'Layouts' },
    { id: 'backgrounds' as const, icon: Paintbrush, label: 'Backgrounds' },
    { id: 'cliparts' as const, icon: Sticker, label: 'Cliparts' },
  ]

  return (
    <div className="flex h-full">
      {/* Part 1: Icon tabs strip */}
      <div className="w-[72px] bg-white border-r border-gray-200 flex flex-col items-center pt-2 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = sidebarTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => setSidebarTab(tab.id)}
              className={`w-[58px] py-2.5 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          )
        })}
      </div>
      
      {/* Part 2: Panel content */}
      <div
        className={`w-[280px] bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-[280px]'
        }`}
      >
        {sidebarTab === 'images' && <ImagesPanel />}
        {sidebarTab === 'templates' && <TemplatesPanel />}
        {sidebarTab === 'layouts' && <LayoutsPanel />}
        {sidebarTab === 'backgrounds' && <BackgroundsPanel />}
        {sidebarTab === 'cliparts' && <ClipArtsPanel />}
      </div>
    </div>
  )
}
