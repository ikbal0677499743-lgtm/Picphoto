import { create } from 'zustand'

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
  cropData?: { offsetX: number, offsetY: number, zoom: number }
  flipX?: boolean
  flipY?: boolean
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

// History snapshot type
export type PagesSnapshot = Page[]

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
  cropModeElementId: string | null
  
  // Images
  uploadedImages: UploadedImage[]
  
  // History
  history: PagesSnapshot[]
  historyIndex: number
  maxHistory: number
  
  // Save state
  isSaving: boolean
  lastSaved: string | null
  
  // Auto-create state
  isAutoCreating: boolean
  autoCreateProgress: number
  
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
  setCropMode: (elementId: string | null) => void
  
  addUploadedImage: (image: UploadedImage) => void
  
  undo: () => void
  redo: () => void
  pushHistory: () => void
  
  setSaving: (isSaving: boolean) => void
  setLastSaved: (date: string) => void
  
  setTemplateTheme: (theme: string) => void
  
  // Auto-create actions
  setAutoCreating: (isAutoCreating: boolean) => void
  setAutoCreateProgress: (progress: number) => void
  autoCreateBook: (images: UploadedImage[]) => void
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
  cropModeElementId: null,
  
  uploadedImages: [],
  
  history: [],
  historyIndex: -1,
  maxHistory: 50,
  
  isSaving: false,
  lastSaved: null,
  
  isAutoCreating: false,
  autoCreateProgress: 0,
  
  // Actions
  setCurrentPage: (index) => {
    set({ currentPageIndex: index, selectedElementId: null })
  },
  
  addPage: (afterIndex) => {
    get().pushHistory() // Save state before modification
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
    get().pushHistory() // Save state before modification
    const newPages = pages.filter((_, i) => i !== index)
    set({ pages: newPages, currentPageIndex: Math.min(get().currentPageIndex, newPages.length - 1) })
  },
  
  duplicatePage: (index) => {
    get().pushHistory() // Save state before modification
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
    get().pushHistory() // Save state before modification
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
    get().pushHistory() // Save state before modification
    const { pages } = get()
    const newPages = [...pages]
    newPages[pageIndex].elements = newPages[pageIndex].elements.filter(el => el.id !== elementId)
    set({ pages: newPages, selectedElementId: null })
  },
  
  selectElement: (elementId) => {
    set({ selectedElementId: elementId })
  },
  
  setPageBackground: (pageIndex, color) => {
    get().pushHistory() // Save state before modification
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
  
  setCropMode: (elementId) => {
    set({ cropModeElementId: elementId })
  },
  
  addUploadedImage: (image) => {
    set({ uploadedImages: [...get().uploadedImages, image] })
  },
  
  undo: () => {
    const { history, historyIndex, pages } = get()
    // Can't undo if at beginning
    if (historyIndex <= 0) {
      return
    }
    
    // If we're at the end of history, save current state first so redo can restore it
    if (historyIndex === history.length - 1) {
      const currentSnapshot = JSON.parse(JSON.stringify(pages))
      const newHistory = [...history]
      newHistory.push(currentSnapshot)
      set({ history: newHistory })
    }
    
    // Move back in history
    const newIndex = historyIndex - 1
    const previousPages = JSON.parse(JSON.stringify(history[newIndex]))
    set({ 
      pages: previousPages, 
      historyIndex: newIndex,
      selectedElementId: null,
      cropModeElementId: null
    })
  },
  
  redo: () => {
    const { history, historyIndex } = get()
    // Can't redo if at end
    if (historyIndex >= history.length - 1) {
      return
    }
    
    // Move forward in history
    const newIndex = historyIndex + 1
    const nextPages = JSON.parse(JSON.stringify(history[newIndex]))
    set({ 
      pages: nextPages, 
      historyIndex: newIndex,
      selectedElementId: null,
      cropModeElementId: null
    })
  },
  
  pushHistory: () => {
    const { pages, history, historyIndex, maxHistory } = get()
    
    // Deep clone current pages state
    const snapshot: PagesSnapshot = JSON.parse(JSON.stringify(pages))
    
    // If we're not at the end of history, trim future history
    let newHistory = historyIndex < history.length - 1 
      ? history.slice(0, historyIndex + 1)
      : [...history]
    
    // Add new snapshot
    newHistory.push(snapshot)
    
    // Enforce max history limit
    if (newHistory.length > maxHistory) {
      newHistory = newHistory.slice(newHistory.length - maxHistory)
    }
    
    set({ 
      history: newHistory, 
      historyIndex: newHistory.length - 1 
    })
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
  
  setAutoCreating: (isAutoCreating) => {
    set({ isAutoCreating })
  },
  
  setAutoCreateProgress: (progress) => {
    set({ autoCreateProgress: progress })
  },
  
  autoCreateBook: async (images) => {
    if (images.length === 0) return
    
    // Push history before auto-creating
    get().pushHistory()
    
    // Set creating state
    set({ isAutoCreating: true, autoCreateProgress: 0 })
    
    // Define layout slots
    const FULL_PAGE = [{ x: 10, y: 10, w: 380, h: 520 }]
    const TWO_VERTICAL = [
      { x: 10, y: 10, w: 185, h: 520 },
      { x: 205, y: 10, w: 185, h: 520 },
    ]
    const TWO_HORIZONTAL = [
      { x: 10, y: 10, w: 380, h: 255 },
      { x: 10, y: 275, w: 380, h: 255 },
    ]
    const GRID_2X2 = [
      { x: 10, y: 10, w: 185, h: 255 },
      { x: 205, y: 10, w: 185, h: 255 },
      { x: 10, y: 275, w: 185, h: 255 },
      { x: 205, y: 275, w: 185, h: 255 },
    ]
    const ONE_BIG_TWO_SMALL = [
      { x: 10, y: 10, w: 380, h: 340 },
      { x: 10, y: 360, w: 185, h: 170 },
      { x: 205, y: 360, w: 185, h: 170 },
    ]
    const THREE_COLUMNS = [
      { x: 10, y: 10, w: 120, h: 520 },
      { x: 136, y: 10, w: 120, h: 520 },
      { x: 272, y: 10, w: 120, h: 520 },
    ]
    const MOSAIC_5 = [
      { x: 10, y: 10, w: 240, h: 255 },
      { x: 260, y: 10, w: 130, h: 165 },
      { x: 260, y: 185, w: 130, h: 70 },
      { x: 10, y: 275, w: 185, h: 255 },
      { x: 205, y: 275, w: 185, h: 255 },
    ]
    
    const { pages } = get()
    const newPages = [...pages]
    
    // Calculate inner pages (exclude cover and guard)
    let innerPageCount = pages.length - 2
    const imageCount = images.length
    let imagesPerPage = 2
    
    // Determine images per page
    if (imageCount <= 22) {
      imagesPerPage = 1
    } else if (imageCount <= 44) {
      imagesPerPage = 2
    } else if (imageCount <= 88) {
      imagesPerPage = 4
    } else {
      imagesPerPage = 4
    }
    
    // Calculate needed pages
    const neededPages = Math.ceil(imageCount / imagesPerPage)
    
    // Add pages if needed
    while (innerPageCount < neededPages) {
      newPages.push({
        id: generateId(),
        type: 'inner',
        elements: [],
        backgroundColor: '#FFFFFF',
        backgroundPattern: null,
      })
      innerPageCount++
    }
    
    // Distribute images across pages
    let imageIndex = 0
    
    for (let pageIdx = 2; pageIdx < newPages.length && imageIndex < imageCount; pageIdx++) {
      const remainingImages = imageCount - imageIndex
      let layout
      const imagesForThisPage = Math.min(remainingImages, imagesPerPage)
      
      // Select layout based on images for this page
      if (imagesForThisPage === 1) {
        layout = FULL_PAGE
      } else if (imagesForThisPage === 2) {
        layout = pageIdx % 2 === 0 ? TWO_VERTICAL : TWO_HORIZONTAL
      } else if (imagesForThisPage === 3) {
        layout = ONE_BIG_TWO_SMALL
      } else if (imagesForThisPage === 4) {
        layout = GRID_2X2
      } else if (imagesForThisPage >= 5) {
        layout = MOSAIC_5
      } else {
        layout = FULL_PAGE
      }
      
      // Create image elements for this page
      const pageElements: CanvasElement[] = []
      
      for (let i = 0; i < Math.min(layout.length, remainingImages); i++) {
        if (imageIndex < imageCount) {
          const slot = layout[i]
          const image = images[imageIndex]
          
          pageElements.push({
            id: generateId(),
            type: 'image',
            x: slot.x,
            y: slot.y,
            width: slot.w,
            height: slot.h,
            rotation: 0,
            opacity: 1,
            zIndex: i,
            imageUrl: image.url,
            placeholder: false,
          })
          
          imageIndex++
        }
      }
      
      newPages[pageIdx].elements = pageElements
      
      // Update progress
      const progress = Math.min(95, Math.floor((imageIndex / imageCount) * 100))
      set({ autoCreateProgress: progress })
      
      // Small delay to show progress
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    
    // Add title text to first inner page
    if (newPages.length > 2 && newPages[2].elements.length === 0) {
      newPages[2].elements.push({
        id: generateId(),
        type: 'text',
        x: 50,
        y: 200,
        width: 300,
        height: 60,
        rotation: 0,
        opacity: 1,
        zIndex: 100,
        content: 'Our Adventure',
        fontFamily: 'Playfair Display',
        fontSize: 48,
        fontColor: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
      })
    }
    
    // Finish
    set({ 
      pages: newPages, 
      autoCreateProgress: 100,
      currentPageIndex: 0 
    })
    
    // Wait a bit then hide overlay
    await new Promise(resolve => setTimeout(resolve, 500))
    set({ isAutoCreating: false, autoCreateProgress: 0 })
  },
}))
