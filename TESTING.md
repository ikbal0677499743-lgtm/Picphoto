# ✅ Testing Checklist

Use this checklist to verify your Picphoto installation is working correctly.

## Quick Start Testing (5 minutes)

For a fast check that everything works:

1. **Start the dev server:**
   ```bash
   npm install
   npm run dev
   ```

2. **Open your browser:** http://localhost:3000

3. **Test the complete flow:**
   - Homepage loads ✓
   - Click "Start Creating" → Product page ✓
   - Click "Start My Design" → Wizard page ✓
   - Click "Shortcut" or "Go to Editor" → Editor page ✓
   - Upload an image in sidebar ✓
   - Click "Next" → Summary page ✓
   - Click "Add to Cart" → Success toast + redirect ✓

If all steps work, your installation is ready! 🎉

---

## Detailed Testing Guide

## Initial Setup ✓

- [ ] Node.js 18.17+ installed (`node --version`)
- [ ] npm 9+ installed (`npm --version`)
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)

## Development Server ✓

- [ ] Dev server starts (`npm run dev`)
- [ ] No errors in terminal
- [ ] Server runs on http://localhost:3000
- [ ] Homepage loads successfully
- [ ] No console errors in browser

## Homepage Tests ✓

Navigate to: http://localhost:3000

- [ ] Announcement bar displays (shipping, reviews, guarantee)
- [ ] Header navigation works
- [ ] Countdown timer is ticking
- [ ] Hero section displays with "Paris 2025" book
- [ ] "As simple as 1,2,3" section shows all 3 cards
- [ ] Trust badges strip appears
- [ ] CTA section with "50% Off" button works
- [ ] Footer displays with all links
- [ ] Mobile menu works (resize browser to < 768px)

## Product Page Tests ✓

Navigate to: http://localhost:3000/products/travel-photobook

- [ ] Product carousel displays
- [ ] Theme selector opens and shows 63+ themes
- [ ] Can select different themes (Paris, My Valentine, etc.)
- [ ] Bundle selector works (Single/Duo/Trio)
- [ ] Selected bundle shows checkmark
- [ ] "Start My Design" button present
- [ ] "Start From Scratch" button present
- [ ] FAQ accordion expands/collapses
- [ ] Reviews section displays 3 testimonials
- [ ] Video section placeholder shows
- [ ] Steps section displays
- [ ] Bottom trust strip appears

## Wizard Page Tests ✓

Click "Start My Design" on product page, or navigate to: http://localhost:3000/editor/wizard?theme=paris-1&mode=template

- [ ] Page loads with minimal header showing "pixory" logo
- [ ] "Back" button links to product page
- [ ] Two columns display (Shortcut left, Manual Mode right)
- [ ] **Shortcut Column:**
  - [ ] Clock icon displays (pink accent)
  - [ ] "Add Photos" button present
  - [ ] Drag & drop zone visible
  - [ ] Clicking "Add Photos" opens file picker
  - [ ] Drag & drop zone highlights on file hover
- [ ] **Manual Mode Column:**
  - [ ] Hand icon displays (gray)
  - [ ] "Go to Editor →" button present
  - [ ] Button hover effect works
- [ ] Mobile view stacks columns vertically
- [ ] Clicking either option navigates to editor

## Editor Page Tests ✓

Navigate via wizard, or go to: http://localhost:3000/editor?theme=paris-1&mode=auto

### Layout & UI
- [ ] Editor loads with full-screen layout
- [ ] Header displays with tools (Undo, Redo, History, etc.)
- [ ] Sidebar shows on left (icon tabs)
- [ ] Canvas area displays in center
- [ ] Page navigator shows at bottom
- [ ] No scrolling on main page (fixed layout)

### Sidebar Panels
- [ ] **Images Panel** (Camera icon):
  - [ ] "From Computer" button opens file picker
  - [ ] Can upload multiple images
  - [ ] Uploaded images show as thumbnails
  - [ ] Click thumbnail adds image to canvas
  - [ ] Drag image to canvas works
  - [ ] Drop zone highlights on drag
- [ ] **Templates Panel** (Layout icon):
  - [ ] Shows 63+ theme options
  - [ ] Themes organized by category
  - [ ] Can select different themes
  - [ ] NEW badges display on new themes
- [ ] **Layouts Panel** (Grid icon):
  - [ ] Shows 12 preset layouts
  - [ ] Can click to apply layout
  - [ ] Layout applied to current page
- [ ] **Backgrounds Panel** (Paintbrush icon):
  - [ ] Color swatches display
  - [ ] Can select background color
  - [ ] Selected color shows ring
  - [ ] Pattern options available
- [ ] **Cliparts Panel** (Sticker icon):
  - [ ] Categories expand/collapse
  - [ ] Multiple sticker categories
  - [ ] Click sticker adds to canvas

### Canvas Functionality
- [ ] Current page displays (Cover, Guard, or Inner)
- [ ] Cover page shows theme name and year
- [ ] Inner pages show page numbers
- [ ] Elements render on canvas
- [ ] Placeholder image zones display
- [ ] Dropped images appear on canvas
- [ ] Text elements display correctly

### Interactive Features
- [ ] **Click to add images:**
  - [ ] Upload image via sidebar
  - [ ] Click thumbnail adds to canvas at default position
  - [ ] Image appears immediately
- [ ] **Drag & drop images:**
  - [ ] Drag from sidebar to canvas
  - [ ] Drop calculates correct position
  - [ ] Image centers on cursor
- [ ] **Text editing:**
  - [ ] Single click selects text element (blue ring)
  - [ ] Double-click enters edit mode
  - [ ] Textarea appears with current text
  - [ ] Can type to edit text
  - [ ] Enter key saves changes
  - [ ] Escape key cancels editing
  - [ ] Click outside saves changes
- [ ] **Element selection:**
  - [ ] Click element shows selection ring
  - [ ] Selected element highlighted
  - [ ] Can select different elements

### Page Navigation
- [ ] Page thumbnails show at bottom
- [ ] 13 pages total (Cover, Guard, 11 inner spreads)
- [ ] Can click thumbnails to switch pages
- [ ] Current page highlighted
- [ ] Page labels display correctly

### Header Controls
- [ ] "Back" button works (returns to product page)
- [ ] Undo button (disabled when no history)
- [ ] Redo button (disabled when no future)
- [ ] "Save" button visible
- [ ] "Preview" button visible
- [ ] "Next" button navigates to summary
- [ ] Zoom controls work

## Summary Page Tests ✓

Click "Next" in editor, or navigate to: http://localhost:3000/editor/summary

- [ ] Page loads with standard layout (header + footer)
- [ ] **Preview Section (Left):**
  - [ ] "preview your design" title in cursive pink font
  - [ ] Book cover mockup displays
  - [ ] Theme name shows on cover
  - [ ] Year "2025" displays
  - [ ] Page thumbnail strip shows all pages
  - [ ] Thumbnails labeled (Cover, P1, P2-3, etc.)
  - [ ] "Back to Editor" link works
- [ ] **Order Summary (Right):**
  - [ ] White card with shadow displays
  - [ ] "Order Summary" heading
  - [ ] Product details show:
    - [ ] Book type & size
    - [ ] Pages (24 pages)
    - [ ] Cover theme (from store)
    - [ ] Paper type
  - [ ] Pricing displays:
    - [ ] Original price strikethrough
    - [ ] Discount percentage
    - [ ] Subtotal with savings badge
  - [ ] "Add to Cart" button present
  - [ ] Trust badges show below button
- [ ] **Bottom Trust Section:**
  - [ ] Three trust cards display
  - [ ] Fast Shipping card
  - [ ] Satisfaction guarantee card
  - [ ] Customer count card
- [ ] Footer displays

### Add to Cart Flow
- [ ] Click "Add to Cart" button
- [ ] Success toast appears ("✓ Added to cart!")
- [ ] Toast is green with checkmark
- [ ] Page redirects to homepage after 2 seconds
- [ ] Redirect works smoothly

## Complete User Flow Testing ✓

Test the entire journey from start to finish:

1. [ ] **Start:** Homepage (http://localhost:3000)
2. [ ] Click "Start Creating" → Product page
3. [ ] Select a theme (e.g., "Paris 1")
4. [ ] Select a bundle (e.g., "Duo")
5. [ ] Click "Start My Design" → Wizard page
6. [ ] Choose "Shortcut" or "Go to Editor" → Editor page
7. [ ] Upload an image using "From Computer"
8. [ ] Click image thumbnail to add to canvas
9. [ ] Drag another image to canvas
10. [ ] Add text element (if available)
11. [ ] Double-click text to edit
12. [ ] Navigate between pages using thumbnails
13. [ ] Click "Next" → Summary page
14. [ ] Review order details
15. [ ] Click "Add to Cart"
16. [ ] See success toast
17. [ ] Redirected to homepage

## Interactive Features ✓

- [ ] Currency dropdown in header works (USD/EUR/GBP/AUD/CAD)
- [ ] Mobile hamburger menu opens/closes
- [ ] Theme dropdown scrolls and shows categories:
  - [ ] Destinations (50 themes)
  - [ ] Special Themes (10 themes)
  - [ ] Minimal (3 themes)
- [ ] NEW badges appear on new themes
- [ ] Countdown timer updates every second
- [ ] Product carousel thumbnails are clickable
- [ ] Navigation arrows on carousel work

## Build & Production ✓

- [ ] Production build completes (`npm run build`)
- [ ] No build errors
- [ ] Build output shows route information
- [ ] Production server starts (`npm run start`)
- [ ] App works in production mode

## Code Quality ✓

- [ ] Linter runs (`npm run lint`)
- [ ] TypeScript compilation succeeds
- [ ] No critical warnings

## Performance Checks ✓

- [ ] Dev server starts in < 1 second
- [ ] Pages load quickly
- [ ] No layout shifts
- [ ] Images load properly
- [ ] Smooth scrolling
- [ ] Interactive elements respond quickly
- [ ] Canvas rendering is smooth
- [ ] No lag when switching pages

## Security ✓

- [ ] `npm audit` shows 0 vulnerabilities
- [ ] Next.js version 16.1.6 or higher
- [ ] All dependencies up to date

## Browser Compatibility ✓

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (if possible)

## Troubleshooting Verification ✓

If you encounter issues, verify:
- [ ] Cleared `.next` folder and rebuilt
- [ ] Deleted `node_modules` and reinstalled
- [ ] Port 3000 is not in use by another app
- [ ] Using correct Node.js version
- [ ] Check console for errors (F12 in browser)

## Common Issues & Solutions

### Issue: "next: not found"
**Solution:** Run `npm install` first to install dependencies.

### Issue: Port 3000 already in use
**Solution:** Kill the process using port 3000 or use a different port:
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or run on different port
PORT=3001 npm run dev
```

### Issue: Images not uploading
**Solution:** 
- Check browser console for errors
- Ensure file is a valid image format (jpg, png, gif)
- Try a smaller file size (< 5MB)

### Issue: Canvas not displaying correctly
**Solution:**
- Refresh the page
- Clear browser cache
- Check if JavaScript is enabled
- Verify Zustand store is working (check dev tools)

### Issue: Build fails
**Solution:**
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run build
```

---

## ✨ Success Criteria

Your installation is successful if:
- ✅ Dev server starts without errors
- ✅ All pages load (homepage, product, wizard, editor, summary)
- ✅ Image upload works
- ✅ Text editing works
- ✅ Complete flow works end-to-end
- ✅ Build completes successfully
- ✅ No security vulnerabilities

## 🎉 Next Steps

Once all checks pass:
1. Start developing your features
2. Customize themes in `lib/constants.ts`
3. Modify colors in `tailwind.config.ts`
4. Add your own content and styling
5. Integrate with backend APIs
6. Add more interactive features

## 📸 Visual Testing

Take screenshots of:
- [ ] Homepage hero section
- [ ] Product page with theme selector open
- [ ] Wizard page with both columns
- [ ] Editor with uploaded images
- [ ] Editor with text being edited
- [ ] Summary page with order details
- [ ] Success toast after add to cart

## 🔗 Important URLs

- **Homepage:** http://localhost:3000
- **Product Page:** http://localhost:3000/products/travel-photobook
- **Wizard:** http://localhost:3000/editor/wizard?theme=paris-1&mode=template
- **Editor:** http://localhost:3000/editor?theme=paris-1&mode=auto
- **Summary:** http://localhost:3000/editor/summary

Happy testing! 🚀
