# Image Crop Mode Documentation

## Overview

The Picphoto editor now includes a comprehensive image crop mode that allows users to reposition and zoom images within their frames using Fabric.js clipPath technology.

## Features

### 🎯 Crop Mode Activation

There are two ways to enter crop mode:

1. **Double-click** on any image element
2. Click the **Crop button** (✂️ icon) in the Context Toolbar when an image is selected

### 🛠️ Crop Mode Interface

When crop mode is active:

- **Dark Overlay**: Semi-transparent black overlay (60% opacity) covers the entire canvas
- **Crop Frame**: Pink stroke (#E91E63) highlights the image frame boundary
- **Only Image Movable**: All other elements are disabled during crop mode
- **Crop Toolbar**: Appears at the top with controls

### 🎮 Controls

#### Crop Mode Toolbar

| Control | Icon | Function | Keyboard |
|---------|------|----------|----------|
| Zoom Slider | — | Scale image 50%-200% | — |
| Reset | ↻ | Center image at 100% zoom | — |
| Cancel | ✕ | Revert to original position | Escape |
| Done | ✓ | Save crop data | Enter |

#### Context Toolbar (Image Selected)

| Button | Icon | Function |
|--------|------|----------|
| Crop | ✂️ | Enter crop mode |
| Flip Horizontal | ⇄ | Mirror image left-to-right |
| Flip Vertical | ⇅ | Mirror image top-to-bottom |

### 📐 How It Works

#### Technical Implementation

```typescript
// Crop data structure stored in element
interface CropData {
  offsetX: number  // Image X position
  offsetY: number  // Image Y position
  zoom: number     // Scale percentage (50-200)
}

// Element with crop data
interface CanvasElement {
  // ... other properties
  cropData?: CropData
  flipX?: boolean
  flipY?: boolean
}
```

#### Fabric.js ClipPath

Images use Fabric.js clipPath to create frame-based clipping:

```typescript
const clipRect = new Rect({
  left: element.x,
  top: element.y,
  width: element.width,
  height: element.height,
  absolutePositioned: true,
})
image.clipPath = clipRect
```

This ensures the image is always cropped to its frame boundary, even when scaled or moved.

## User Workflow

### Initial Image Placement

1. Upload or drag image to canvas
2. Image automatically fills frame with object-cover behavior
3. Image is clipped to frame boundaries

### Entering Crop Mode

1. Double-click image OR click Crop button
2. Crop mode activates with visual feedback
3. Crop toolbar appears at top

### Adjusting Crop

1. **Drag** image to reposition within frame
2. **Adjust zoom** slider to scale image (50%-200%)
3. Image stays within crop boundaries
4. Real-time preview of crop

### Saving or Canceling

**To Save:**
- Click **Done** button (green)
- Press **Enter** key
- Crop data saves to store
- Exit crop mode

**To Cancel:**
- Click **Cancel** button
- Press **Escape** key
- Original position restored
- Exit crop mode

**To Reset:**
- Click **Reset** button
- Image centers at 100% zoom
- Can continue adjusting

## Data Persistence

### Crop Data Storage

Crop data is stored in the element's `cropData` property:

```typescript
element.cropData = {
  offsetX: 150,  // Image position
  offsetY: 200,
  zoom: 120      // 120% zoom
}
```

### Persistence Across Sessions

- ✅ Crop data persists when switching pages
- ✅ Crop data persists when project is saved
- ✅ Crop data persists across browser sessions
- ✅ Crop can be re-adjusted anytime

### Original Data Protection

When entering crop mode:
1. Original crop data is saved to state
2. If user cancels, original data is restored
3. Prevents accidental loss of crop settings

## Image Transformations

### Flip Horizontal

Mirrors image left-to-right:
- Click **Flip Horizontal** button in Context Toolbar
- Element's `flipX` property set to `true`
- Fabric.js applies transformation
- Works independently of crop

### Flip Vertical

Mirrors image top-to-bottom:
- Click **Flip Vertical** button in Context Toolbar
- Element's `flipY` property set to `true`
- Fabric.js applies transformation
- Works independently of crop

### Combining Transformations

You can combine:
- ✅ Crop + Flip Horizontal
- ✅ Crop + Flip Vertical
- ✅ Crop + Both Flips
- ✅ Multiple crops and flips

## Best Practices

### For Users

1. **Upload High-Res Images**: Higher resolution gives more flexibility when zooming
2. **Zoom First, Then Position**: Set desired zoom level, then fine-tune position
3. **Use Reset**: If confused, reset to start fresh
4. **Save Often**: Click Done to save your crop before doing other actions

### For Developers

1. **Default Behavior**: Images default to object-cover (fill frame)
2. **Constrain Movement**: Ensure image always covers crop area
3. **Zoom Limits**: 50% minimum, 200% maximum prevents extreme scales
4. **Keyboard Support**: Always provide keyboard alternatives
5. **Visual Feedback**: Clear indicators for active crop mode

## Troubleshooting

### Image Not Cropping

**Problem**: Image extends beyond frame
**Solution**: 
- Check clipPath is applied
- Verify absolutePositioned: true
- Ensure clipRect dimensions match frame

### Crop Data Not Persisting

**Problem**: Crop resets when switching pages
**Solution**:
- Verify cropData saves to store
- Check updateElement is called
- Ensure page elements array updates

### Can't Exit Crop Mode

**Problem**: Stuck in crop mode
**Solution**:
- Press Escape key
- Click outside canvas
- Refresh page if necessary

### Zoom Slider Not Working

**Problem**: Slider doesn't scale image
**Solution**:
- Check cropZoom state updates
- Verify scaleX/scaleY applied to object
- Ensure canvas.renderAll() is called

## Code Examples

### Entering Crop Mode Programmatically

```typescript
// From anywhere in the app
const setCropMode = useEditorStore(state => state.setCropMode)
setCropMode(imageElementId)
```

### Reading Crop Data

```typescript
const element = currentPage.elements.find(el => el.id === elementId)
if (element.cropData) {
  console.log('Crop position:', element.cropData.offsetX, element.cropData.offsetY)
  console.log('Crop zoom:', element.cropData.zoom + '%')
}
```

### Applying Flip Transformation

```typescript
// Flip horizontal
updateElement(pageIndex, elementId, { flipX: true })

// Flip vertical
updateElement(pageIndex, elementId, { flipY: true })

// Reset flips
updateElement(pageIndex, elementId, { flipX: false, flipY: false })
```

## Future Enhancements

Potential additions to crop mode:

- [ ] Aspect ratio locking
- [ ] Preset crop ratios (1:1, 4:3, 16:9)
- [ ] Rotate in crop mode
- [ ] Brightness/contrast adjustments
- [ ] Filters in crop mode
- [ ] Keyboard shortcuts for zoom (+ / -)
- [ ] Touch gestures for mobile (pinch to zoom)
- [ ] Undo/redo for crop adjustments
- [ ] Copy crop settings to other images

## Related Documentation

- [Fabric.js Canvas Documentation](./FABRIC_CANVAS.md)
- [Editor Store Documentation](./lib/store/editorStore.ts)
- [Component Documentation](./components/editor/README.md)

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review code examples
3. Test with simple use case
4. Check browser console for errors
5. Verify Fabric.js version compatibility (v7.1.0)
