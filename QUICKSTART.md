# 🚀 Quick Start Guide

Get Picphoto running in under 2 minutes!

> **⚠️ CRITICAL:** You must be in the Picphoto project directory to run these commands! Not your home directory.

## For First-Time Setup

```bash
# 1. Navigate to the project directory (REQUIRED!)
cd Picphoto

# 2. Verify you're in the right place
ls package.json
# You should see: package.json

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Then open **http://localhost:3000** in your browser! 🎉

## ❌ Common Mistake

**DON'T DO THIS:**
```bash
~ $ npm run dev  # ❌ Wrong! Running from home directory
npm error: Cannot find package.json
```

**DO THIS:**
```bash
~ $ cd Picphoto  # ✅ First, navigate to project
~/Picphoto $ npm run dev  # ✅ Then run commands
```

## Daily Development

```bash
# Start the dev server
npm run dev

# In another terminal, run linter
npm run lint
```

## Before Deployment

```bash
# Create production build
npm run build

# Test production build locally
npm run start
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (with hot reload) |
| `npm run build` | Create optimized production build |
| `npm run start` | Run production server |
| `npm run lint` | Check code quality |

## Need Help?

- 📖 Full documentation: See [README.md](./README.md)
- 🐛 Issues: Check the troubleshooting section in README
- 💬 Questions: Create an issue on GitHub

## Quick Links

- **Homepage**: http://localhost:3000
- **Product Page**: http://localhost:3000/products/travel-photobook
- **Tech Stack**: Next.js 16 + TypeScript + Tailwind CSS

---

Happy coding! 🎨
