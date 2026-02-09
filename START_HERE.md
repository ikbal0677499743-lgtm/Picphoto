# 🚀 START HERE - Launch & Test Picphoto

**New to Picphoto? This is your complete guide to get started!**

---

## 📋 What You'll Do

1. ✅ Launch the app (2 minutes)
2. ✅ Test basic features (3 minutes)
3. ✅ Create your first photobook (5 minutes)

**Total Time: 10 minutes**

---

## 🎯 Step 1: Launch the App

### First Time? (Never cloned the repository)

```bash
# 1. Clone the repository
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git

# 2. Navigate into the project
cd Picphoto

# 3. Install dependencies
npm install

# 4. Launch the app
npm run dev
```

### Already Have It? (Just need to launch)

```bash
# 1. Navigate to the project
cd Picphoto

# 2. Launch the app
npm run dev
```

### ✅ Success!

You should see:
```
✓ Ready in 420ms
○ Local:        http://localhost:3000
```

**Open your browser:** http://localhost:3000

---

## 🧪 Step 2: Quick Test (3 minutes)

Follow this simple flow to test all major features:

```
┌─────────────────────────────────────────────┐
│  1. Homepage                                │
│     http://localhost:3000                   │
│     ✓ Page loads                            │
│     ✓ Hero section visible                  │
│     → Click "Start Creating"                │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  2. Product Page                            │
│     /products/travel-photobook              │
│     ✓ Theme selector works                  │
│     ✓ Bundle selector works (Single/Duo)    │
│     → Click "Start My Design"               │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  3. Wizard Page                             │
│     /editor/wizard                          │
│     ✓ Two columns visible                   │
│     ✓ "Shortcut" and "Manual Mode"          │
│     → Click "Go to Editor"                  │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  4. Editor Page                             │
│     /editor                                 │
│     ✓ Canvas visible                        │
│     ✓ Sidebar with tabs                     │
│     ✓ Page navigator at bottom              │
│     → Click "Next"                          │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  5. Summary Page                            │
│     /editor/summary                         │
│     ✓ Book preview visible                  │
│     ✓ Order summary card                    │
│     → Click "Add to Cart"                   │
│     ✓ Success toast appears!                │
└─────────────────────────────────────────────┘
```

**All ✓ checked? Perfect! Everything works!**

---

## 📸 Step 3: Create Your First Book (5 minutes)

### Full Workflow Test

1. **Start from Homepage**
   - Open http://localhost:3000
   - Click "Start Creating" or "Our Photobooks"

2. **Choose Your Theme**
   - On product page, click theme dropdown
   - Select any theme (e.g., "Paris 1")
   - Click "Start My Design"

3. **Upload Photos**
   - Wizard opens
   - Click "Add Photos" (Shortcut mode)
   - Select 5-10 images from your computer
   - Wait for auto-creation (~3 seconds)

4. **Customize Your Book**
   - Pages automatically filled with your photos
   - Click page thumbnails to navigate
   - Double-click images to crop/reposition
   - Double-click text to edit

5. **Complete Order**
   - Click "Next" button (top right)
   - Review your book on summary page
   - Click "Add to Cart"
   - Success! 🎉

---

## ✅ Testing Checklist

Use this to verify everything works:

### Basic Features
- [ ] Homepage loads
- [ ] Product page loads
- [ ] Theme selector works (63+ themes)
- [ ] Bundle selector works
- [ ] Wizard page loads both columns

### Editor Features
- [ ] Upload images via "From Computer" button
- [ ] Drag & drop images from sidebar to canvas
- [ ] Click image thumbnail to add to page
- [ ] Double-click text to edit
- [ ] Navigate between pages (bottom thumbnails)
- [ ] Sidebar tabs switch (Images, Templates, Layouts, etc.)

### Advanced Features
- [ ] Double-click image → Crop mode opens
- [ ] Zoom slider works in crop mode
- [ ] Flip horizontal/vertical buttons work
- [ ] Undo (Ctrl+Z) works
- [ ] Redo (Ctrl+Shift+Z) works

### Completion
- [ ] "Next" button goes to summary
- [ ] Summary shows book preview
- [ ] "Add to Cart" shows success toast
- [ ] Redirects to homepage

### Build Test
- [ ] `npm run build` completes without errors
- [ ] `npm run start` launches production server

**All checked? You're ready to develop! 🚀**

---

## 🐛 Quick Troubleshooting

### Problem: "Cannot find package.json"

**You're in the wrong directory!**

```bash
# Check where you are
pwd

# Navigate to the project
cd Picphoto

# Verify you're in the right place
ls package.json
# Should show: package.json

# Now run commands
npm install
npm run dev
```

### Problem: "cd: no such file or directory: Picphoto"

**You haven't cloned the repository yet!**

```bash
# Clone first
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git

# Then navigate
cd Picphoto

# Then install and run
npm install
npm run dev
```

### Problem: Port 3000 already in use

```bash
# Kill the process (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Problem: Build fails

```bash
# Clean and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Problem: Images not uploading

- Check file format (JPG, PNG, GIF)
- Check file size (< 5MB recommended)
- Open browser console (F12) to see errors
- Try a different image

---

## 📚 More Resources

Need more detailed information?

### Quick References
- **[QUICKSTART.md](./QUICKSTART.md)** - Commands and basics (2 min read)
- **[HOWTOTEST.md](./HOWTOTEST.md)** - Detailed testing guide (5 min read)
- **[TESTGUIDE.md](./TESTGUIDE.md)** - Visual testing flow (2 min read)

### Setup Help
- **[FIRST_TIME_SETUP.md](./FIRST_TIME_SETUP.md)** - Complete first-time setup
- **[COMMON_ERROR.md](./COMMON_ERROR.md)** - Fix common errors
- **[FIX_STEPS.md](./FIX_STEPS.md)** - Step-by-step error fixes
- **[INCOMPLETE_CLONE.md](./INCOMPLETE_CLONE.md)** - Fix clone issues

### Feature Documentation
- **[AUTO_CREATE_BOOK.md](./AUTO_CREATE_BOOK.md)** - Auto-layout feature
- **[IMAGE_CROP_MODE.md](./IMAGE_CROP_MODE.md)** - Image cropping
- **[UNDO_REDO.md](./UNDO_REDO.md)** - History system
- **[FABRIC_CANVAS.md](./FABRIC_CANVAS.md)** - Canvas implementation

### Complete Documentation
- **[README.md](./README.md)** - Full project documentation
- **[TESTING.md](./TESTING.md)** - Comprehensive testing (100+ checkpoints)

---

## 🎯 What's Next?

After successfully launching and testing:

1. **Explore Features**
   - Try all sidebar panels
   - Test different themes
   - Experiment with layouts
   - Upload multiple images

2. **Development**
   - Read [README.md](./README.md) for architecture
   - Check [FABRIC_CANVAS.md](./FABRIC_CANVAS.md) for canvas details
   - See [AUTO_CREATE_BOOK.md](./AUTO_CREATE_BOOK.md) for auto-layout

3. **Contributing**
   - Report bugs on GitHub
   - Suggest features
   - Submit pull requests

---

## ⚡ Super Quick Reference

**Launch:**
```bash
cd Picphoto && npm run dev
```

**Test:**
Open http://localhost:3000 → Click "Start Creating" → Follow the flow

**Build:**
```bash
npm run build
```

**Success Criteria:**
✅ All pages load  
✅ Images upload  
✅ Editor works  
✅ Can create a book  
✅ No console errors  

---

## 💬 Need Help?

- 🐛 **Errors?** See [COMMON_ERROR.md](./COMMON_ERROR.md)
- 📖 **Questions?** Read [README.md](./README.md)
- 🆘 **Stuck?** Check [FIX_STEPS.md](./FIX_STEPS.md)
- 💡 **Issues?** Create a GitHub issue

---

**Happy Building! 🎨📖**

Built with ❤️ using Next.js 16 + TypeScript + Tailwind CSS + Fabric.js
