# ✅ Testing Checklist

Use this checklist to verify your Picphoto installation is working correctly.

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

---

## ✨ Success Criteria

Your installation is successful if:
- ✅ Dev server starts without errors
- ✅ Both pages (homepage and product page) load
- ✅ All interactive features work
- ✅ Build completes successfully
- ✅ No security vulnerabilities

## 🎉 Next Steps

Once all checks pass:
1. Start developing your features
2. Customize themes in `lib/constants.ts`
3. Modify colors in `tailwind.config.ts`
4. Add your own content and styling

Happy coding! 🚀
