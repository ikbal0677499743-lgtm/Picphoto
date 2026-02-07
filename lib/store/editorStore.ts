import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

// Type definitions
export interface CanvasElement {
  id: string
  type: 'image' | 'text' | 'sticker' | 'shape'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  zIndex: number
  // Image specific
  imageUrl?: string
  placeholder?: boolean
  // Text specific
  content?: string
  fontFamily?: string
  fontSize?: number
  fontColor?: string
  fontWeight?: 'normal' | 'bold'
  textAlign?: 'left' | 'center' | 'right'
  // Shape specific
  shapeType?: 'rectangle' | 'ellipse'
  fillColor?: string
  strokeColor?: string
  // Sticker specific
  stickerUrl?: string
}

export interface Page {
  id: string
  type: 'cover' | 'guard' | 'inner'
  elements: CanvasElement[]
  backgroundColor: string
  backgroundPattern: string | null
}

export interface UploadedImage {
  id: string
  url: string
  name: string
  width: number
  height: number
}

interface EditorState {
  // Project
  projectId: string
  projectName: string
  templateTheme: string
  
  // Pages
  pages: Page[]
  currentPageIndex: number
  selectedElementId: string | null
  
  // UI state
  sidebarTab: 'images' | 'templates' | 'layouts' | 'backgrounds' | 'cliparts' | null
  sidebarOpen: boolean
  zoom: number
  viewMode: 'single' | 'all'
  isPreviewMode: boolean
  
  // Images
  uploadedImages: UploadedImage[]
  
  // History
  history: any[]
  historyIndex: number
  
  // Save state
  isSaving: boolean
  lastSaved: string | null
  
  // Actions
  setCurrentPage: (index: number) => void
  addPage: (afterIndex?: number) => void
  deletePage: (index: number) => void
  duplicatePage: (index: number) => void
  
  addElement: (pageIndex: number, element: CanvasElement) => void
  updateElement: (pageIndex: number, elementId: string, updates: Partial<CanvasElement>) => void
  deleteElement: (pageIndex: number, elementId: string) => void
  selectElement: (elementId: string | null) => void
  
  setPageBackground: (pageIndex: number, color: string) => void
  
  setSidebarTab: (tab: 'images' | 'templates' | 'layouts' | 'backgrounds' | 'cliparts' | null) => void
  setZoom: (zoom: number) => void
  setViewMode: (mode: 'single' | 'all') => void
  togglePreview: () => void
  
  addUploadedImage: (image: UploadedImage) => void
  
  undo: () => void
  redo: () => void
  pushHistory: (snapshot: any) => void
  
  setSaving: (isSaving: boolean) => void
  setLastSaved: (date: string) => void
  
  setTemplateTheme: (theme: string) => void
}

// Helper function to generate UUID (simplified version if uuid not available)
const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Initialize pages
const initializePages = (): Page[] => {
  const pages: Page[] = []
  
  // Page 0: Cover (front + back)
  pages.push({
    id: generateId(),
    type: 'cover',
    elements: [],
    backgroundColor: '#FFFFFF',
    backgroundPattern: null,
  })
  
  // Page 1: Guard page (title page)
  pages.push({
    id: generateId(),
    type: 'guard',
    elements: [],
    backgroundColor: '#FFFFFF',
    backgroundPattern: null,
  })
  
  // Pages 2-12: 11 inner spreads (22 interior pages)
  for (let i = 0; i < 11; i++) {
    pages.push({
      id: generateId(),
      type: 'inner',
      elements: [],
      backgroundColor: '#FFFFFF',
      backgroundPattern: null,
    })
  }
  
  return pages
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // Initial state
  projectId: generateId(),
  projectName: 'My Travel Book',
  templateTheme: 'paris-1',
  
  pages: initializePages(),
  currentPageIndex: 0,
  selectedElementId: null,
  
  sidebarTab: 'images',
  sidebarOpen: true,
  zoom: 100,
  viewMode: 'single',
  isPreviewMode: false,
  
  uploadedImages: [],
  
  history: [],
  historyIndex: -1,
  
  isSaving: false,
  lastSaved: null,
  
  // Actions
  setCurrentPage: (index) => {
    set({ currentPageIndex: index, selectedElementId: null })
  },
  
  addPage: (afterIndex) => {
    const { pages } = get()
    const insertIndex = afterIndex !== undefined ? afterIndex + 1 : pages.length
    const newPage: Page = {
      id: generateId(),
      type: 'inner',
      elements: [],
      backgroundColor: '#FFFFFF',
      backgroundPattern: null,
    }
    const newPages = [...pages]
    newPages.splice(insertIndex, 0, newPage)
    set({ pages: newPages })
  },
  
  deletePage: (index) => {
    const { pages } = get()
    // Can't delete cover or guard, and need minimum 3 pages
    if (index === 0 || index === 1 || pages.length <= 3) {
      return
    }
    const newPages = pages.filter((_, i) => i !== index)
    set({ pages: newPages, currentPageIndex: Math.min(get().currentPageIndex, newPages.length - 1) })
  },
  
  duplicatePage: (index) => {
    const { pages } = get()
    const pageToDuplicate = pages[index]
    const newPage: Page = {
      ...pageToDuplicate,
      id: generateId(),
      elements: pageToDuplicate.elements.map(el => ({
        ...el,
        id: generateId(),
      })),
    }
    const newPages = [...pages]
    newPages.splice(index + 1, 0, newPage)
    set({ pages: newPages })
  },
  
  addElement: (pageIndex, element) => {
    const { pages } = get()
    const newPages = [...pages]
    newPages[pageIndex].elements.push(element)
    set({ pages: newPages })
  },
  
  updateElement: (pageIndex, elementId, updates) => {
    const { pages } = get()
    const newPages = [...pages]
    const elementIndex = newPages[pageIndex].elements.findIndex(el => el.id === elementId)
    if (elementIndex !== -1) {
      newPages[pageIndex].elements[elementIndex] = {
        ...newPages[pageIndex].elements[elementIndex],
        ...updates,
      }
      set({ pages: newPages })
    }
  },
  
  deleteElement: (pageIndex, elementId) => {
    const { pages } = get()
    const newPages = [...pages]
    newPages[pageIndex].elements = newPages[pageIndex].elements.filter(el => el.id !== elementId)
    set({ pages: newPages, selectedElementId: null })
  },
  
  selectElement: (elementId) => {
    set({ selectedElementId: elementId })
  },
  
  setPageBackground: (pageIndex, color) => {
    const { pages } = get()
    const newPages = [...pages]
    newPages[pageIndex].backgroundColor = color
    set({ pages: newPages })
  },
  
  setSidebarTab: (tab) => {
    const { sidebarTab } = get()
    // If clicking the same tab, close sidebar
    if (sidebarTab === tab) {
      set({ sidebarTab: null, sidebarOpen: false })
    } else {
      set({ sidebarTab: tab, sidebarOpen: true })
    }
  },
  
  setZoom: (zoom) => {
    // Clamp between 25 and 300
    const clampedZoom = Math.max(25, Math.min(300, zoom))
    set({ zoom: clampedZoom })
  },
  
  setViewMode: (mode) => {
    set({ viewMode: mode })
  },
  
  togglePreview: () => {
    set({ isPreviewMode: !get().isPreviewMode })
  },
  
  addUploadedImage: (image) => {
    set({ uploadedImages: [...get().uploadedImages, image] })
  },
  
  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1]
      set({ ...previousState, historyIndex: historyIndex - 1 })
    }
  },
  
  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1]
      set({ ...nextState, historyIndex: historyIndex + 1 })
    }
  },
  
  pushHistory: (snapshot) => {
    const { history, historyIndex } = get()
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(snapshot)
    set({ history: newHistory, historyIndex: newHistory.length - 1 })
  },
  
  setSaving: (isSaving) => {
    set({ isSaving })
  },
  
  setLastSaved: (date) => {
    set({ lastSaved: date })
  },
  
  setTemplateTheme: (theme) => {
    set({ templateTheme: theme })
  },
}))
