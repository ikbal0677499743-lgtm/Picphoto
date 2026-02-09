# Fabric.js Canvas Implementation Guide

## Overview

The Picphoto editor now uses **Fabric.js v7.1.0** for professional-quality canvas manipulation. This provides a much better user experience with visual handles, smooth interactions, and industry-standard controls.

## What Changed?

### Before (DOM Canvas)
- Elements rendered as absolute-positioned `<div>` elements
- Manual drag-and-drop implementation
- Limited interaction (click to select, no resize handles)
- Text editing via textarea overlay

### After (Fabric.js Canvas)
- Professional canvas-based rendering
- Built-in resize, rotate, and drag handles
- Better performance and smoother interactions
- Native Fabric.js text editing
- Hardware-accelerated rendering

## File Structure

```
/components/editor/
├── Canvas.tsx         # NEW: Fabric.js implementation
└── CanvasDOM.tsx      # BACKUP: Original DOM-based canvas
```

## How It Works

### 1. Canvas Initialization

```typescript
const canvas = new FabricCanvas(canvasRef.current, {
  width: 800,
  height: 540,
  backgroundColor: '#FFFFFF',
  selection: true,
  preserveObjectStacking: true,
})
```

### 2. Two-Way Binding with Zustand Store

**Store → Canvas (on page change):**
```typescript
useEffect(() => {
  const canvas = fabricCanvasRef.current
  if (!canvas || !currentPage) return
  
  canvas.clear()
  const promises = currentPage.elements.map(element => createFabricObject(element))
  Promise.all(promises).then(objects => {
    objects.forEach(obj => canvas.add(obj))
    canvas.renderAll()
  })
}, [currentPage?.elements, currentPageIndex])
```

**Canvas → Store (on modification):**
```typescript
canvas.on('object:modified', (e) => {
  const obj = e.target
  if (obj && obj.data?.elementId) {
    updateElement(currentPageIndex, obj.data.elementId, {
      x: obj.left,
      y: obj.top,
      width: obj.width * obj.scaleX,
      height: obj.height * obj.scaleY,
      rotation: obj.angle,
    })
  }
})
```

### 3. Element Type Support

#### Images
```typescript
// Placeholder
new Rect({
  fill: '#F9FAFB',
  stroke: '#D1D5DB',
  strokeDashArray: [5, 5],
})

// Actual image
FabricImage.fromURL(imageUrl, {
  crossOrigin: 'anonymous',
})
```

#### Text
```typescript
new Textbox(content, {
  fontSize: 24,
  fontFamily: 'DM Sans',
  fill: '#000000',
})
```

#### Shapes
```typescript
// Rectangle
new Rect({
  fill: '#E5E7EB',
  rx: 4,
  ry: 4,
})

// Circle
new Circle({
  radius: 50,
  fill: '#E5E7EB',
})
```

#### Stickers
```typescript
new Textbox(emoji, {
  fontSize: 60,
  textAlign: 'center',
})
```

## User Interactions

### Selection
- **Click**: Select an element
- **Visual Feedback**: Blue bounding box with handles
- **Store Update**: `selectElement(elementId)` called

### Moving
- **Drag**: Click and drag element
- **On Release**: Position synced to store
- **Smooth**: Hardware-accelerated

### Resizing
- **Corner Handles**: Drag to resize
- **Proportional**: Hold Shift (built-in)
- **Store Sync**: Width/height updated on release

### Rotating
- **Rotation Handle**: Drag circular handle at top
- **Angle**: Updates in real-time
- **Store Sync**: Rotation angle saved

### Deleting
- **Keyboard**: Press `Delete` or `Backspace`
- **Selected Element**: Removed from both canvas and store

### Text Editing
- **Double-Click**: Enter editing mode
- **Inline Editing**: Type directly on canvas
- **Exit**: Click outside or press Escape

## TypeScript Integration

### Custom Fabric Object Type
```typescript
interface CustomFabricObject extends FabricObject {
  data?: {
    elementId: string  // Links to Zustand store element
  }
}
```

### Creating Objects with Custom Data
```typescript
const obj = new Textbox('Text', {
  left: 100,
  top: 100,
})

obj.data = { elementId: element.id }
obj.setCoords()
```

## Event Handling

### Selection Events
```typescript
canvas.on('selection:created', (e) => {
  const selected = e.selected?.[0] as CustomFabricObject
  if (selected?.data?.elementId) {
    selectElement(selected.data.elementId)
  }
})
```

### Modification Events
```typescript
canvas.on('object:modified', (e) => {
  const obj = e.target as CustomFabricObject
  // Update store with new position/size/rotation
})
```

### Keyboard Events
```typescript
window.addEventListener('keydown', (e) => {
  if (e.key === 'Delete' || e.key === 'Backspace') {
    // Delete selected element
  }
})
```

## Drag & Drop from Sidebar

```typescript
const handleDrop = (e: DragEvent) => {
  const data = JSON.parse(e.dataTransfer.getData('application/json'))
  const rect = canvasRef.current.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  addElement(currentPageIndex, {
    id: generateId(),
    type: 'image',
    x: x - 100,
    y: y - 100,
    width: 200,
    height: 200,
    imageUrl: data.url,
  })
}
```

## Page Types

### Cover Page (type: 'cover')
- **Non-editable**: Shows decorative book cover
- **No canvas**: Rendered as HTML
- **Fixed content**: Theme name, year, icon

### Guard Page (type: 'guard')
- **Non-editable**: Title page
- **No canvas**: Rendered as HTML
- **Fixed content**: "Title Page" heading

### Inner Pages (type: 'inner')
- **Fully editable**: Fabric.js canvas
- **All features**: Add, edit, move, resize, rotate
- **Spread view**: Shows left page + right page

## Performance Optimization

### Update Loops Prevention
```typescript
const isUpdatingFromStore = useRef(false)
const isUpdatingStore = useRef(false)

// When updating canvas from store
isUpdatingFromStore.current = true
// ... update canvas ...
isUpdatingFromStore.current = false

// When updating store from canvas
isUpdatingStore.current = true
// ... update store ...
isUpdatingStore.current = false
```

### Canvas Disposal
```typescript
useEffect(() => {
  // ... initialization ...
  
  return () => {
    canvas.dispose()
    fabricCanvasRef.current = null
  }
}, [])
```

## Zoom Support

```typescript
useEffect(() => {
  if (containerRef.current) {
    const scale = zoom / 100
    containerRef.current.style.transform = `scale(${scale})`
  }
}, [zoom])
```

## Common Issues & Solutions

### Issue: Elements not appearing on canvas
**Solution**: Check console for image loading errors. Images need proper CORS headers.

### Issue: Canvas not updating after store change
**Solution**: Ensure `currentPage?.elements` dependency is correct in useEffect.

### Issue: Infinite update loop
**Solution**: Use `isUpdatingFromStore` and `isUpdatingStore` flags properly.

### Issue: Text editing not working
**Solution**: Ensure double-click event is firing and Textbox.enterEditing() is called.

### Issue: TypeScript errors with `data` property
**Solution**: Cast objects to `CustomFabricObject` type.

## Testing

### Manual Testing Checklist

- [ ] Canvas initializes on page load
- [ ] Cover page shows correctly (non-editable)
- [ ] Guard page shows correctly (non-editable)
- [ ] Inner pages show Fabric canvas
- [ ] Add text button creates text element
- [ ] Text element appears on canvas
- [ ] Can select text element (shows handles)
- [ ] Can drag text element
- [ ] Can resize text element
- [ ] Can rotate text element
- [ ] Double-click enters edit mode
- [ ] Delete key removes element
- [ ] Drag & drop from sidebar works
- [ ] Page thumbnails update correctly
- [ ] Zoom in/out works
- [ ] No console errors

## Future Enhancements

### Short Term
- [ ] Add visual guides for alignment
- [ ] Implement snap-to-grid
- [ ] Add group selection (multi-select)
- [ ] Improve text editing UX

### Medium Term
- [ ] Add copy/paste functionality
- [ ] Implement layer controls (front/back)
- [ ] Add image cropping
- [ ] Enable filters and effects

### Long Term
- [ ] Export to PDF
- [ ] Save templates
- [ ] Collaborative editing
- [ ] Version history

## Resources

- **Fabric.js Documentation**: http://fabricjs.com/docs/
- **Fabric.js GitHub**: https://github.com/fabricjs/fabric.js
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

## Support

If you encounter issues with the Fabric.js canvas:

1. Check browser console for errors
2. Verify Fabric.js version: `npm list fabric`
3. Review this guide for common solutions
4. Check the backup DOM canvas in `CanvasDOM.tsx` for comparison

## Migration from DOM Canvas

The DOM canvas is preserved in `CanvasDOM.tsx` for reference. Key differences:

| Feature | DOM Canvas | Fabric.js Canvas |
|---------|-----------|------------------|
| Rendering | HTML divs | Canvas element |
| Selection | Blue ring CSS | Built-in handles |
| Resize | Not supported | Corner handles |
| Rotate | Not supported | Rotation handle |
| Performance | Good for few elements | Great for many elements |
| Text Edit | Textarea overlay | Native Fabric edit |
| Export | Complex | Built-in methods |

To switch back to DOM canvas (emergency only):
1. Rename `Canvas.tsx` to `CanvasFabric.tsx`
2. Rename `CanvasDOM.tsx` to `Canvas.tsx`
3. Rebuild the application
