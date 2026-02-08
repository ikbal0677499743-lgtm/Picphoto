# 🚀 FIRST TIME SETUP - Complete Beginner's Guide

Welcome to Picphoto! This guide assumes you're starting from scratch.

## Prerequisites

Before you begin, make sure you have:

1. **Node.js** installed (version 18.17 or higher)
   - Download from: https://nodejs.org/
   - Check: `node --version`

2. **Git** installed
   - Download from: https://git-scm.com/
   - Check: `git --version`

3. **A terminal/command prompt** open
   - Mac: Terminal app or iTerm
   - Windows: Git Bash, PowerShell, or Command Prompt
   - Linux: Any terminal

## Step-by-Step Setup

### Step 1: Open Your Terminal

- **Mac:** Press `Cmd + Space`, type "Terminal", press Enter
- **Windows:** Search for "Command Prompt" or "PowerShell"

### Step 2: Choose Where to Put the Project

I recommend putting it in your home directory for simplicity:

```bash
cd ~
```

💡 **What this does:** Takes you to your home directory (where your user files are)

### Step 3: Clone the Repository

Copy and paste this command:

```bash
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git
```

You'll see something like:
```
Cloning into 'Picphoto'...
remote: Enumerating objects: 500, done.
remote: Counting objects: 100% (500/500), done.
remote: Compressing objects: 100% (350/350), done.
remote: Total 500 (delta 150), reused 500 (delta 150)
Receiving objects: 100% (500/500), 2.5 MiB | 3.2 MiB/s, done.
Resolving deltas: 100% (150/150), done.
```

✅ **Success!** The project has been downloaded.

### Step 4: Navigate Into the Project

```bash
cd Picphoto
```

💡 **What this does:** Moves you into the Picphoto folder

Verify you're in the right place:

```bash
pwd
```

Should show something like: `/Users/yourname/Picphoto`

List the files:

```bash
ls
```

You should see files like: `package.json`, `README.md`, `app/`, `components/`, etc.

### Step 5: Install Dependencies

```bash
npm install
```

This will take 30-60 seconds. You'll see:
```
added 458 packages, and audited 459 packages in 15s
found 0 vulnerabilities
```

✅ **Dependencies installed!**

### Step 6: Start the Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://10.x.x.x:3000

✓ Starting...
✓ Ready in 447ms
```

✅ **Server is running!**

### Step 7: Open in Your Browser

Open your web browser and go to:

```
http://localhost:3000
```

🎉 **You should see the Picphoto homepage!**

## What You Just Did

1. ✅ Cloned the project from GitHub
2. ✅ Navigated into the project folder
3. ✅ Installed all required packages
4. ✅ Started the development server
5. ✅ Opened the app in your browser

## Next Time You Want to Run It

You don't need to clone again! Just:

```bash
# Navigate to the project
cd ~/Picphoto

# Start the server
npm run dev
```

## Common Issues

### "cd: no such file or directory: Picphoto"

**Problem:** You haven't cloned the repository yet, or you're in the wrong location.

**Fix:**
```bash
# Go to home directory
cd ~

# Check if Picphoto exists
ls Picphoto

# If it doesn't exist, clone it
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git

# Then navigate into it
cd Picphoto
```

### "npm: command not found"

**Problem:** Node.js/npm is not installed.

**Fix:** 
- Download and install Node.js from https://nodejs.org/
- Restart your terminal after installation
- Verify: `npm --version`

### "git: command not found"

**Problem:** Git is not installed.

**Fix:**
- Download and install Git from https://git-scm.com/
- Restart your terminal after installation
- Verify: `git --version`

### Port 3000 is already in use

**Problem:** Another app is using port 3000.

**Fix:**
```bash
# Kill the process (Mac/Linux)
lsof -ti:3000 | xargs kill

# Or use a different port
PORT=3001 npm run dev
```

### "Cannot find package.json"

**Problem:** You're not in the Picphoto directory.

**Fix:**
```bash
# Navigate to the project
cd ~/Picphoto

# Verify you're in the right place
ls package.json
# Should show: package.json

# Now run your command
npm run dev
```

## Visual Directory Structure

After cloning, your directory structure looks like this:

```
~/ (Your home directory)
└── Picphoto/              ← The project folder
    ├── package.json       ← Important! This file must exist
    ├── README.md
    ├── app/
    ├── components/
    ├── lib/
    └── ... (other files)
```

## Terminal Commands Reference

| Command | What it does |
|---------|-------------|
| `pwd` | Show current directory |
| `ls` | List files in current directory |
| `cd ~` | Go to home directory |
| `cd Picphoto` | Go into Picphoto folder |
| `cd ..` | Go up one folder |
| `git clone <url>` | Download a project from GitHub |
| `npm install` | Install project dependencies |
| `npm run dev` | Start development server |

## Where to Get Help

- **FIX_STEPS.md** - Step-by-step troubleshooting
- **COMMON_ERROR.md** - Common error solutions
- **README.md** - Full project documentation
- **QUICKSTART.md** - Quick reference guide
- **HOWTOTEST.md** - Testing guide

## Your Terminal Prompt Guide

Learn to read your terminal prompt:

```bash
~ $                          ← You're in home directory
~/Picphoto $                 ← You're in Picphoto folder (correct!)
ikbal@MacBook-Pro ~ %        ← You're in home directory
ikbal@MacBook-Pro Picphoto % ← You're in Picphoto folder (correct!)
```

The key is seeing `Picphoto` in your prompt after running `cd Picphoto`!

## Summary

✅ **You successfully set up Picphoto!**

**Remember for next time:**
1. Open terminal
2. Navigate to project: `cd ~/Picphoto`
3. Start server: `npm run dev`
4. Open browser: http://localhost:3000

Happy coding! 🎨
