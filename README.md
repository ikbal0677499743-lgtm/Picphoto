# Picphoto — Custom Travel Photobook Store

A modern, responsive e-commerce storefront for creating custom travel photobooks. Built with Next.js 16, TypeScript, and Tailwind CSS.

![Picphoto Homepage](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)

> **🚀 Want to get started quickly?** Check out the [QUICKSTART.md](./QUICKSTART.md) guide!

## ✨ Features

- **Interactive Product Configurator**: Choose from 63+ travel photobook themes
- **Bundle Pricing**: Select Single, Duo, or Trio bundles with different discount levels
- **Mobile Responsive**: Full mobile support with hamburger menu navigation
- **Live Countdown Timer**: Real-time offers countdown
- **Theme Categories**: Destinations (50), Special Themes (10), Minimal (3)
- **FAQ Accordion**: Expandable product information sections
- **Customer Reviews**: Testimonial section with ratings
- **Trust Badges**: Shipping, guarantee, and customer count indicators

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.17 or higher
- **npm**: Version 9 or higher (comes with Node.js)

Check your versions:
```bash
node --version
npm --version
```

> **✅ Want to verify everything works?** See our testing guides:
> - **Quick:** [TESTGUIDE.md](./TESTGUIDE.md) - Visual flow diagram (2 min)
> - **Simple:** [HOWTOTEST.md](./HOWTOTEST.md) - Step-by-step guide (5 min)
> - **Complete:** [TESTING.md](./TESTING.md) - Full checklist (15 min)

## 🚀 Getting Started

> **🆕 NEVER SET THIS UP BEFORE?** See [FIRST_TIME_SETUP.md](./FIRST_TIME_SETUP.md) for a complete beginner's guide!

> **⚠️ IMPORTANT:** Make sure you navigate into the project directory after cloning! All npm commands must be run from inside the `Picphoto` folder, not from your home directory.

### 1. Clone the Repository

**First time only - if you haven't cloned the project yet:**

```bash
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git
cd Picphoto
```

**If you get "cd: no such file or directory":**  
👉 You need to clone the repository first! See [FIRST_TIME_SETUP.md](./FIRST_TIME_SETUP.md)

**✅ Verify you're in the correct directory:**
```bash
pwd
# Should show: .../Picphoto (not your home directory)

ls package.json
# Should show: package.json
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16.1.6
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- And more...

### 3. Run the Development Server

```bash
npm run dev
```

The application will start on **http://localhost:3000**

You should see output similar to:
```
▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://10.x.x.x:3000

✓ Starting...
✓ Ready in 447ms
```

### 4. Open in Browser

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot-reload at http://localhost:3000

### Production Build

```bash
npm run build
```
Creates an optimized production build of the application.

The build output will show:
- Route information
- Page sizes
- Bundle analysis

### Production Server

```bash
npm run start
```
Starts the production server (must run `npm run build` first).

### Linting

```bash
npm run lint
```
Runs ESLint to check code quality and style.

## 🗂️ Project Structure

```
Picphoto/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   └── products/
│       └── [slug]/
│           └── page.tsx     # Product page
├── components/              # React components
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── CountdownTimer.tsx
│   └── product/
│       ├── ProductCarousel.tsx
│       ├── PricingBundles.tsx
│       ├── ThemeSelector.tsx
│       ├── FAQSection.tsx
│       ├── TrustBadges.tsx
│       ├── ReviewsSection.tsx
│       ├── StepsSection.tsx
│       └── VideoSection.tsx
├── lib/                     # Utility functions and constants
│   ├── utils.ts            # Helper functions (cn utility)
│   └── constants.ts        # Data (themes, bundles, FAQs, reviews)
├── public/                  # Static assets (if any)
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🌐 Pages

### Homepage (`/`)
- Hero section with call-to-action
- "As simple as 1, 2, 3" process explanation
- Trust badges and social proof
- Customer testimonials

### Product Page (`/products/travel-photobook`)
- Interactive product carousel
- Theme selector with 63+ options
- Bundle pricing selector (Single/Duo/Trio)
- Two CTA buttons:
  - "Start My Design" (with template)
  - "Start From Scratch" (blank canvas)
- FAQ accordion
- Video showcase section
- Customer reviews

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: "#000000",      // Black
  accent: {
    DEFAULT: "#E91E63",    // Pink/Rose
    light: "#FCE4EC",
    dark: "#C2185B",
  },
  surface: "#F9FAFB",      // Light gray background
  muted: "#6B7280",        // Gray text
}
```

### Adding New Themes

Edit `lib/constants.ts` to add new photobook themes:

```typescript
export const themes: Theme[] = [
  {
    id: 'new-theme',
    name: 'New Theme Name',
    category: 'destinations', // or 'special' or 'minimal'
    isNew: true
  },
  // ... existing themes
]
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: clsx, tailwind-merge

## 🐛 Troubleshooting

### ❌ ERROR: "cd: no such file or directory: Picphoto"

**This means you haven't cloned the repository yet!**

**Problem:**
```bash
cd: no such file or directory: Picphoto
```

**Solution:**
```bash
# Clone the repository first
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git

# Then navigate into it
cd Picphoto

# Verify it worked
ls package.json
# You should see: package.json

# Now continue with setup
npm install
npm run dev
```

👉 **Need more help?** See [FIRST_TIME_SETUP.md](./FIRST_TIME_SETUP.md) for a complete guide.

---

### ❌ ERROR: "Cannot find package.json" or "ENOENT: no such file or directory"

**This is the #1 most common error!** It means you're running npm commands from the wrong directory.

**Problem:**
```bash
npm error path /Users/yourname/package.json
npm error enoent Could not read package.json
```

**Solution:**
```bash
# Navigate to the project directory first!
cd Picphoto

# Verify you're in the correct location:
ls package.json
# You should see: package.json

# Now run your commands:
npm install
npm run dev
```

**How to check your current directory:**
```bash
pwd  # Shows current directory path
```

You should be in a path that ends with `/Picphoto`, not in your home directory (`~` or `/Users/yourname`).

### Port Already in Use

If port 3000 is already in use:
```bash
# Kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill

# Or run on a different port:
PORT=3001 npm run dev
```

### Node Version Issues

If you encounter errors, ensure you're using Node.js 18.17 or higher:
```bash
node --version
```

Consider using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions:
```bash
nvm install 18
nvm use 18
```

### Module Not Found Errors

If you see module not found errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

If the build fails:
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

## 📝 Development Tips

1. **Hot Reload**: The dev server automatically refreshes when you save files
2. **TypeScript**: Use VS Code with TypeScript extension for best experience
3. **Console Logs**: Check browser console and terminal for errors
4. **Component Development**: All components are in the `components/` folder
5. **Data Changes**: Modify `lib/constants.ts` for themes, FAQs, reviews, etc.

## 🔒 Security

This project uses Next.js 16.1.6 with all known security vulnerabilities patched:
- ✅ Zero vulnerabilities (verified with `npm audit`)
- ✅ DoS vulnerabilities patched
- ✅ Regular dependency updates recommended

## 📄 License

ISC License

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Create an issue on [GitHub Issues](https://github.com/ikbal0677499743-lgtm/Picphoto/issues)
- Email: support@picphotoofficial.com

---

Made with ❤️ for travel photo enthusiasts