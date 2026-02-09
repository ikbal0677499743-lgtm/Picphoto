# 🎯 Testing Guide - Visual Flow

A visual guide showing exactly how to test the Picphoto application.

> **⚠️ CRITICAL FIRST STEP:** Navigate to the project directory!
> ```bash
> cd Picphoto  # You MUST be in this directory
> ls package.json  # Verify this file exists before running npm commands
> ```

## 📊 Testing Flow Diagram

```
START
  ↓
[1] Homepage (localhost:3000)
  ↓ Click "Start Creating"
[2] Product Page (localhost:3000/products/travel-photobook)
  ↓ Click "Start My Design"
[3] Wizard Page (localhost:3000/editor/wizard)
  ↓ Click "Go to Editor"
[4] Editor Page (localhost:3000/editor)
  ↓ Click "Next"
[5] Summary Page (localhost:3000/editor/summary)
  ↓ Click "Add to Cart"
SUCCESS! ✅
```

## 🚀 Quick Start (Copy & Paste)

```bash
# Step 0: Navigate to project directory (REQUIRED!)
cd Picphoto

# Step 1: Verify you're in the right place
ls package.json  # Should show: package.json

# Step 2: Setup
npm install
npm run dev

# Step 3: Open browser
# Navigate to: http://localhost:3000

# Step 4: Test the flow (click through each page)
```

## 📝 What to Test on Each Page

### 1️⃣ Homepage
```
URL: http://localhost:3000

✓ Check:
[x] Page loads
[x] Header shows "picphoto" logo
[x] Hero section with book preview
[x] "Start Creating" button visible
[x] Footer displays

Action: Click "Start Creating"
```

### 2️⃣ Product Page
```
URL: http://localhost:3000/products/travel-photobook

✓ Check:
[x] Product carousel displays
[x] Price shows: $32.99 (50% off)
[x] Theme selector shows paris-1
[x] Bundle options (Single/Duo/Trio)
[x] "Start My Design" button visible

Action: Click "Start My Design"
```

### 3️⃣ Wizard Page
```
URL: http://localhost:3000/editor/wizard?theme=paris-1&mode=template

✓ Check:
[x] Two columns display
[x] Left: "Shortcut" with clock icon
[x] Right: "Manual Mode" with hand icon
[x] "Go to Editor →" button visible

Action: Click "Go to Editor →"
```

### 4️⃣ Editor Page
```
URL: http://localhost:3000/editor?theme=paris-1&mode=auto

✓ Check:
[x] Sidebar on left (Images, Templates, etc.)
[x] Canvas in center showing book cover
[x] Page thumbnails at bottom (13 pages)
[x] Header with tools (Undo, Redo, Save, Next)
[x] Can upload images via sidebar

Action: Click "Next" button (top right)
```

### 5️⃣ Summary Page
```
URL: http://localhost:3000/editor/summary

✓ Check:
[x] Book preview displays
[x] Order summary shows on right
[x] Price: $32.99
[x] "Add to Cart" button visible
[x] Trust badges at bottom

Action: Click "Add to Cart"
Expected: Green success toast → redirect to homepage
```

## 🎨 Feature Testing

### Upload Image
```
1. Go to Editor page
2. Sidebar → Images panel (camera icon)
3. Click "From Computer" button
4. Select an image file
5. ✓ Image thumbnail appears in sidebar
6. Click thumbnail
7. ✓ Image added to canvas
```

### Drag & Drop
```
1. Upload image (see above)
2. Drag thumbnail from sidebar
3. Drop onto canvas
4. ✓ Image appears at drop location
```

### Edit Text (if text elements available)
```
1. In editor, find text element
2. Single click → ✓ Blue selection ring
3. Double click → ✓ Edit mode (textarea appears)
4. Type new text
5. Press Enter → ✓ Text saved
```

### Change Theme
```
1. Go to Product page
2. Click theme selector dropdown
3. Choose different theme (e.g., "Tokyo 1")
4. ✓ Theme name updates
5. Click "Start My Design"
6. ✓ Theme carries to editor
```

## ⚡ Super Quick Test

Just need to verify it works? Run this 30-second test:

```bash
# 1. Start server
npm run dev

# 2. Open: http://localhost:3000

# 3. Click through:
Homepage → "Start Creating" → "Start My Design" → "Go to Editor" → "Next" → "Add to Cart"

# 4. See success toast?
✅ YES = Everything works!
❌ NO = Check console for errors (F12)
```

## 📱 Mobile Testing

```
1. Open browser dev tools (F12)
2. Click device toolbar icon (or Ctrl+Shift+M)
3. Select mobile device (e.g., iPhone 12)
4. Test the flow again
5. ✓ Check hamburger menu works
6. ✓ Check all pages are responsive
```

## 🔧 Troubleshooting

### ❌ Error: "Cannot find package.json"
**This is the #1 error!** You're running npm from the wrong directory.

```bash
# Check where you are
pwd

# You should see something like: /Users/yourname/Picphoto
# NOT just: /Users/yourname

# Navigate to project directory
cd Picphoto

# Verify you're in the right place
ls package.json  # Should show: package.json

# Now run your commands
npm install
npm run dev
```

### Server won't start?
```bash
cd Picphoto  # First, go to project directory
npm install
npm run dev
```

### Page shows error?
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run dev
```

### Image upload not working?
- Check file is valid image (jpg, png, gif)
- Try smaller file (< 5MB)
- Check browser console (F12) for errors

### Nothing happens when clicking buttons?
- Check browser console (F12) for errors
- Refresh page (Ctrl+R)
- Try different browser

## 📊 Test Results Checklist

Mark each as you test:

```
Basic Tests:
[ ] npm install works
[ ] npm run dev starts server
[ ] Homepage loads at localhost:3000
[ ] Can navigate to each page
[ ] No console errors (F12)

Page Tests:
[ ] Homepage displays correctly
[ ] Product page displays correctly
[ ] Wizard page displays correctly
[ ] Editor page displays correctly
[ ] Summary page displays correctly

Feature Tests:
[ ] Can upload images
[ ] Can add images to canvas
[ ] Can navigate between pages
[ ] "Add to Cart" shows success toast
[ ] Mobile responsive works

Build Tests:
[ ] npm run build succeeds
[ ] npm run lint passes
[ ] No security vulnerabilities (npm audit)
```

## 🎯 Success Criteria

✅ You're ready if:
1. All pages load without errors
2. You can click through the complete flow
3. Image upload works
4. Add to cart shows success toast
5. No red errors in console (F12)

## 📚 More Help?

- **Detailed guide:** See [TESTING.md](./TESTING.md)
- **Quick start:** See [HOWTOTEST.md](./HOWTOTEST.md)
- **Setup help:** See [README.md](./README.md)

---

**Need help?** Open browser console (F12) and check for error messages.

Happy testing! 🚀
