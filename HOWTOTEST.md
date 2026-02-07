# 🧪 How to Test Picphoto

A simple guide to test the Picphoto photobook application.

## Quick Test (2 minutes)

```bash
# 1. Install and start
npm install
npm run dev

# 2. Open browser
# http://localhost:3000
```

Then follow this flow:
1. ✅ Homepage loads
2. ✅ Click "Start Creating" → Product page
3. ✅ Click "Start My Design" → Wizard page
4. ✅ Click "Go to Editor" → Editor page
5. ✅ Upload image (sidebar) → Image appears
6. ✅ Click "Next" → Summary page
7. ✅ Click "Add to Cart" → Success!

**All working? You're ready to go! 🎉**

---

## Detailed Testing

### 1️⃣ Homepage Test
**URL:** http://localhost:3000

✓ Check:
- Header and navigation
- Hero section with book preview
- "1,2,3" steps section
- Trust badges
- Footer

### 2️⃣ Product Page Test
**URL:** http://localhost:3000/products/travel-photobook

✓ Check:
- Product carousel
- Theme selector (63+ themes)
- Bundle selector (Single/Duo/Trio)
- "Start My Design" button
- FAQ accordion
- Reviews section

### 3️⃣ Wizard Page Test
**URL:** http://localhost:3000/editor/wizard?theme=paris-1&mode=template

✓ Check:
- Two columns (Shortcut + Manual Mode)
- File upload button
- Drag & drop zone
- Navigation to editor

### 4️⃣ Editor Page Test
**URL:** http://localhost:3000/editor?theme=paris-1&mode=auto

✓ Check:
- **Upload images:** Sidebar → "From Computer" → Upload
- **Add to canvas:** Click thumbnail OR drag to canvas
- **Edit text:** Double-click text element → Edit → Save
- **Navigate pages:** Bottom thumbnails
- **Go to summary:** Click "Next" button

### 5️⃣ Summary Page Test
**URL:** http://localhost:3000/editor/summary

✓ Check:
- Book preview
- Order summary card
- Pricing details
- "Add to Cart" button
- Success toast appears
- Redirects to homepage

---

## Test Each Feature

### 📸 Image Upload
```
1. Go to editor
2. Sidebar → Images panel (camera icon)
3. Click "From Computer"
4. Select image file
5. ✅ Thumbnail appears in sidebar
6. Click thumbnail → ✅ Image added to canvas
```

### 🖱️ Drag & Drop
```
1. Upload image (see above)
2. Drag thumbnail from sidebar
3. Drop on canvas
4. ✅ Image appears at drop position
```

### ✏️ Text Editing
```
1. In editor, add text element (if available)
2. Single click → ✅ Blue selection ring
3. Double click → ✅ Edit mode (textarea)
4. Type new text
5. Press Enter → ✅ Saved
6. Press Escape → ✅ Canceled
```

### 🎨 Theme Selection
```
1. Go to product page
2. Click theme dropdown
3. Scroll through categories
4. Select a theme (e.g., "Paris 1")
5. ✅ Theme name updates
6. Click "Start My Design"
7. ✅ Theme carries to editor
```

### 🛒 Add to Cart
```
1. Complete design in editor
2. Click "Next" → Summary page
3. Review order details
4. Click "Add to Cart"
5. ✅ Green toast appears
6. ✅ Redirects to homepage after 2 seconds
```

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Run production server

# Code Quality
npm run lint         # Check code quality

# Troubleshooting
npm install          # Install/reinstall dependencies
rm -rf .next         # Clear Next.js cache
rm -rf node_modules  # Remove dependencies (then npm install)
```

---

## Testing Checklist

Use this for systematic testing:

- [ ] ✅ Homepage loads
- [ ] ✅ Product page loads
- [ ] ✅ Wizard page loads
- [ ] ✅ Editor page loads
- [ ] ✅ Summary page loads
- [ ] ✅ Image upload works
- [ ] ✅ Drag & drop works
- [ ] ✅ Text editing works (if available)
- [ ] ✅ Theme selection works
- [ ] ✅ Page navigation works
- [ ] ✅ Add to cart works
- [ ] ✅ No console errors
- [ ] ✅ Mobile responsive works
- [ ] ✅ Build completes successfully

---

## Need More Details?

📖 See [TESTING.md](./TESTING.md) for comprehensive testing guide with 100+ checkpoints.

📖 See [README.md](./README.md) for full documentation and setup instructions.

---

## Quick Troubleshooting

**Problem:** Server won't start
```bash
# Solution
npm install
npm run dev
```

**Problem:** Port 3000 in use
```bash
# Solution (Mac/Linux)
lsof -ti:3000 | xargs kill -9
npm run dev

# Or use different port
PORT=3001 npm run dev
```

**Problem:** Build fails
```bash
# Solution
rm -rf node_modules .next
npm install
npm run build
```

**Problem:** Images not uploading
- Check file is valid image (jpg, png, gif)
- Check file size (< 5MB recommended)
- Check browser console (F12) for errors

---

## Support

- 🐛 **Issues:** Check console (F12) for errors
- 📁 **Logs:** Check terminal output
- 🔄 **Refresh:** Try clearing cache (Ctrl+Shift+R)
- 🆘 **Help:** Review [TESTING.md](./TESTING.md) for solutions

---

Happy testing! 🚀
