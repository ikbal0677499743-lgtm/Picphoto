# Undo/Redo History System

Complete guide to the undo/redo functionality in the Picphoto photobook editor.

## Overview

The editor includes a robust undo/redo system that tracks all changes to the photobook pages. Users can undo up to 50 actions and redo any undone actions.

## Features

### ✅ Automatic History Tracking

The following actions automatically push to history:
- **Add Element**: Text, images, stickers, shapes
- **Delete Element**: Any element removal
- **Modify Element**: Move, resize, rotate (debounced)
- **Change Background**: Page background color changes
- **Add Page**: New page creation
- **Delete Page**: Page removal
- **Duplicate Page**: Page duplication

### ⌨️ Keyboard Shortcuts

| Action | Windows/Linux | Mac | Alternative |
|--------|--------------|-----|-------------|
| Undo | Ctrl + Z | Cmd + Z | — |
| Redo | Ctrl + Shift + Z | Cmd + Shift + Z | Ctrl/Cmd + Y |

### 🎯 Smart Debouncing

**Problem**: During drag/resize operations, updates fire continuously (potentially hundreds of times).

**Solution**: History is pushed only once at the START of a modification:
- `object:moving` - First pixel of drag
- `object:scaling` - First resize handle grab
- `object:rotating` - First rotation movement

A flag (`historyPushed`) prevents duplicate entries during the same interaction.

### 📊 History Limits

- **Maximum Entries**: 50 snapshots
- **Auto-cleanup**: Oldest entries removed when limit exceeded
- **Branching**: Redo history cleared when new action after undo

## Technical Implementation

### Data Structure

```typescript
// Type definition
export type PagesSnapshot = Page[]

// Store state
interface EditorState {
  history: PagesSnapshot[]    // Array of page snapshots
  historyIndex: number         // Current position (-1 = no history)
  maxHistory: number           // Maximum snapshots (50)
}
```

### Core Actions

#### pushHistory()

```typescript
pushHistory: () => {
  const { pages, history, historyIndex, maxHistory } = get()
  
  // 1. Deep clone current state
  const snapshot: PagesSnapshot = JSON.parse(JSON.stringify(pages))
  
  // 2. Trim future history if branching
  let newHistory = historyIndex < history.length - 1 
    ? history.slice(0, historyIndex + 1)
    : [...history]
  
  // 3. Add snapshot
  newHistory.push(snapshot)
  
  // 4. Enforce limit
  if (newHistory.length > maxHistory) {
    newHistory = newHistory.slice(newHistory.length - maxHistory)
  }
  
  // 5. Update state
  set({ 
    history: newHistory, 
    historyIndex: newHistory.length - 1 
  })
}
```

#### undo()

```typescript
undo: () => {
  const { history, historyIndex, pages } = get()
  
  // Can't undo if at beginning
  if (historyIndex <= 0) return
  
  // Save current state if at end (for redo)
  if (historyIndex === history.length - 1) {
    const currentSnapshot = JSON.parse(JSON.stringify(pages))
    set({ history: [...history, currentSnapshot] })
  }
  
  // Restore previous state
  const newIndex = historyIndex - 1
  const previousPages = JSON.parse(JSON.stringify(history[newIndex]))
  set({ 
    pages: previousPages, 
    historyIndex: newIndex,
    selectedElementId: null,
    cropModeElementId: null
  })
}
```

#### redo()

```typescript
redo: () => {
  const { history, historyIndex } = get()
  
  // Can't redo if at end
  if (historyIndex >= history.length - 1) return
  
  // Restore next state
  const newIndex = historyIndex + 1
  const nextPages = JSON.parse(JSON.stringify(history[newIndex]))
  set({ 
    pages: nextPages, 
    historyIndex: newIndex,
    selectedElementId: null,
    cropModeElementId: null
  })
}
```

### Debounced Tracking in Canvas

```typescript
// Push history once at start of modification
canvas.on('object:moving', (e) => {
  const obj = e.target as CustomFabricObject
  if (obj && obj.data?.elementId && !obj.data.historyPushed) {
    obj.data.historyPushed = true
    pushHistory()
  }
})

// Clear flag when modification completes
canvas.on('object:modified', (e) => {
  const obj = e.target as CustomFabricObject
  if (obj && obj.data) {
    obj.data.historyPushed = false
  }
  // ... update store
})
```

### Initialization

```typescript
// In app/editor/page.tsx
useEffect(() => {
  pushHistory()  // Capture initial state
}, [])
```

## UI Components

### Editor Header

**Undo Button:**
```tsx
<button
  onClick={undo}
  disabled={!canUndo}
  title="Undo (Ctrl+Z)"
  className={!canUndo ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
>
  <Undo2 className="w-4 h-4" />
  <span>Undo</span>
</button>
```

**Redo Button:**
```tsx
<button
  onClick={redo}
  disabled={!canRedo}
  title="Redo (Ctrl+Shift+Z)"
  className={!canRedo ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
>
  <Redo2 className="w-4 h-4" />
  <span>Redo</span>
</button>
```

**History Count Badge:**
```tsx
<button className="relative">
  <Clock className="w-4 h-4" />
  <span>History</span>
  {history.length > 0 && (
    <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[9px]">
      {history.length}
    </span>
  )}
</button>
```

## User Workflow

### Basic Undo/Redo

1. **Make changes** to the photobook (add text, move images, etc.)
2. **Press Ctrl+Z** or click Undo button
3. **Previous state restored** - change is reversed
4. **Press Ctrl+Shift+Z** or click Redo button
5. **Change reapplied** - redo the undone action

### Branching Example

1. Start with state A
2. Add text → state B (history: [A, B], index: 1)
3. Add image → state C (history: [A, B, C], index: 2)
4. **Undo twice** → back to state A (history: [A, B, C], index: 0)
5. **Add shape** → state D (history: [A, D], index: 1)
   - States B and C are discarded (branching)
   - Can't redo to B or C anymore

### History Limit

1. Make 50+ changes
2. History keeps only last 50 states
3. Oldest states automatically removed
4. Can still undo up to 50 actions back

## Testing Checklist

### ✅ Basic Functionality
- [ ] Add text element → Ctrl+Z → text disappears
- [ ] Ctrl+Shift+Z → text reappears
- [ ] Move element → Ctrl+Z → element returns to original position
- [ ] Delete element → Ctrl+Z → element is restored
- [ ] Change background color → Ctrl+Z → reverts to previous color

### ✅ Debouncing
- [ ] Drag element rapidly → release mouse
- [ ] Ctrl+Z → should undo entire drag (not individual pixels)
- [ ] Only 1 history entry created per drag interaction

### ✅ UI State
- [ ] Undo button grays out when nothing to undo (historyIndex <= 0)
- [ ] Redo button grays out when nothing to redo (historyIndex at end)
- [ ] History count badge shows correct number
- [ ] Tooltips show correct keyboard shortcuts

### ✅ Branching
- [ ] Undo several actions
- [ ] Make new change
- [ ] Redo button becomes disabled (future history cleared)
- [ ] Can't redo to previous undone states

### ✅ Limits
- [ ] Make 60+ changes
- [ ] History length stays at 50 max
- [ ] Oldest entries removed
- [ ] Can still undo up to 50 actions

### ✅ Edge Cases
- [ ] Undo on fresh page (nothing happens)
- [ ] Redo when at latest state (nothing happens)
- [ ] Rapid undo/redo alternation works
- [ ] Selected element cleared on undo/redo
- [ ] Crop mode cleared on undo/redo

## Performance Considerations

### Deep Cloning

**Method**: `JSON.parse(JSON.stringify(pages))`

**Pros**:
- Simple and reliable
- No external dependencies
- Handles nested structures

**Cons**:
- Slower for very large page arrays
- Loses non-serializable data (functions, symbols)

**Acceptable because**:
- Pages array is typically small (13 pages)
- Each page has limited elements (~10-20)
- Operations are user-triggered (not continuous)
- Modern JS engines optimize JSON operations

### Memory Usage

**Estimate per snapshot**:
- Average page size: ~2KB (serialized JSON)
- 13 pages × 2KB = ~26KB per snapshot
- 50 snapshots × 26KB = ~1.3MB total

**Acceptable because**:
- Modern browsers handle MB easily
- Auto-cleanup at 50 entries
- Much smaller than image data

### Optimization Opportunities

If performance becomes an issue:

1. **Incremental Snapshots**: Only store changed pages
2. **Compression**: LZ-string or similar for JSON
3. **Differential Patching**: Store diffs instead of full states
4. **Selective Cloning**: Clone only page data, not entire store

## Troubleshooting

### Issue: Undo button not working

**Check**:
- Is `historyIndex > 0`?
- Is history array populated?
- Are keyboard shortcuts registered?

**Solution**:
```typescript
// Check store state
const history = useEditorStore(state => state.history)
const historyIndex = useEditorStore(state => state.historyIndex)
console.log('History:', history.length, 'Index:', historyIndex)
```

### Issue: Too many history entries during drag

**Check**:
- Is `object:moving` handler pushing history?
- Is `historyPushed` flag being set/cleared?

**Solution**:
```typescript
// Verify flag is working
canvas.on('object:moving', (e) => {
  const obj = e.target as CustomFabricObject
  console.log('Moving, pushed:', obj.data?.historyPushed)
})
```

### Issue: Redo not working after undo

**Check**:
- Did you make a new change after undo?
- Branching clears redo history by design

**Solution**:
- This is expected behavior
- New actions after undo create new branch
- Old redo history is intentionally discarded

### Issue: History limit not enforced

**Check**:
- Is `maxHistory` set correctly?
- Is trim logic working?

**Solution**:
```typescript
// Verify in pushHistory
console.log('History length:', newHistory.length, 'Max:', maxHistory)
if (newHistory.length > maxHistory) {
  newHistory = newHistory.slice(newHistory.length - maxHistory)
}
```

## Future Enhancements

### Short Term

1. **History Panel UI**:
   - Dropdown list of all history entries
   - Timestamps for each entry
   - Action labels ("Text added", "Element moved")
   - Click to jump to any state
   - Clear history button

2. **Action Labeling**:
   - Add optional `label` field to snapshots
   - Auto-generate labels based on action type
   - Show in history panel

3. **Visual Timeline**:
   - Horizontal timeline scrubber
   - Preview thumbnails at each state
   - Drag to scrub through history

### Medium Term

1. **Persistent History**:
   - Save to localStorage
   - Restore on page reload
   - Clear on project export

2. **Collaborative Undo**:
   - Track who made each change
   - Selective undo (undo only your changes)
   - Conflict resolution

3. **Named Snapshots**:
   - Manual bookmarks
   - "Checkpoint before layout change"
   - Star important states

### Long Term

1. **Version Control Integration**:
   - Git-like branching visualization
   - Merge different edit sessions
   - Compare versions side-by-side

2. **Compressed Storage**:
   - LZ compression for JSON
   - Delta encoding for efficiency
   - Lazy loading of old history

3. **Undo Analytics**:
   - Track common undo patterns
   - Identify confusing features
   - Improve UX based on data

## Code Examples

### Manually Trigger History

```typescript
import { useEditorStore } from '@/lib/store/editorStore'

function MyComponent() {
  const pushHistory = useEditorStore(state => state.pushHistory)
  
  const handleCustomAction = () => {
    // Push history before your action
    pushHistory()
    
    // Perform your custom modification
    // ...
  }
}
```

### Check History State

```typescript
function HistoryDebug() {
  const history = useEditorStore(state => state.history)
  const historyIndex = useEditorStore(state => state.historyIndex)
  
  return (
    <div>
      <p>History entries: {history.length}</p>
      <p>Current index: {historyIndex}</p>
      <p>Can undo: {historyIndex > 0 ? 'Yes' : 'No'}</p>
      <p>Can redo: {historyIndex < history.length - 1 ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

### Custom Keyboard Shortcut

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Custom: Ctrl+U for undo
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault()
      undo()
    }
  }
  
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [undo])
```

## Best Practices

### For Developers

1. **Always push before modifying**: Call `pushHistory()` BEFORE changing state
2. **Use debouncing**: Don't push on every frame of continuous operations
3. **Deep clone**: Always clone pages to prevent reference issues
4. **Clear selections**: Reset selectedElementId on undo/redo
5. **Test branching**: Verify redo history clears correctly

### For Users

1. **Save frequently**: History is in-memory only (not persisted)
2. **Understand branching**: New actions after undo clear redo
3. **Use shortcuts**: Ctrl+Z / Ctrl+Shift+Z are faster than buttons
4. **Check history count**: Badge shows available undo states
5. **Don't rely on 100+ undos**: Limit is 50 for performance

## Summary

The undo/redo system provides:
- ✅ Full history tracking (up to 50 states)
- ✅ Keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z, Ctrl+Y)
- ✅ Smart debouncing (1 entry per interaction)
- ✅ Branching support (new actions clear redo)
- ✅ Visual feedback (disabled states, count badge)
- ✅ Auto-tracking (all modifications captured)
- ✅ Performance optimized (deep clone, memory limits)

Users can confidently experiment knowing they can undo up to 50 actions!
