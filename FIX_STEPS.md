# 🎯 STEP-BY-STEP: Getting Started with Picphoto

## Which Error Are You Seeing?

### Error 1: "cd: no such file or directory: Picphoto"
👉 **You need to clone the repository first!** Jump to [Step 0: Clone the Repository](#step-0-clone-the-repository)

### Error 2: "npm error: Cannot find package.json" BUT you're IN Picphoto folder
👉 **Your folder is empty/incomplete!** Jump to [Fix: Empty or Incomplete Folder](#fix-empty-or-incomplete-picphoto-folder)

### Error 3: "npm error: Cannot find package.json" AND you're in home directory
👉 **You're in the wrong directory!** Jump to [Step 1: Navigate to Project](#step-1-navigate-to-project-directory)

---

## Fix: Empty or Incomplete Picphoto Folder

**Use this section if:**
- Your terminal shows `Picphoto %` (you're in the folder)
- BUT npm says "Cannot find package.json"
- OR running `ls` shows very few files

This means you created an empty folder or the git clone failed.

### Quick Fix:

```bash
# Step 1: Go up one directory
cd ..

# Step 2: Remove the empty/incomplete folder
rm -rf Picphoto

# Step 3: Clone properly from GitHub
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git

# Step 4: Wait for "done" message, then navigate
cd Picphoto

# Step 5: Verify files exist
ls package.json
# Should show: package.json

# Step 6: Install and run
npm install
npm run dev
```

✅ **Done!** Open http://localhost:3000

**Full detailed guide:** See [INCOMPLETE_CLONE.md](./INCOMPLETE_CLONE.md)

Now continue to normal setup steps below if needed! ⬇️

---

## Step 0: Clone the Repository

**⚠️ START HERE if you see "no such file or directory" error!**

If you're getting `cd: no such file or directory: Picphoto`, it means you don't have the project yet.

### Check if you have the project:

```bash
ls Picphoto
```

**If you see:** `ls: Picphoto: No such file or directory`  
👉 **You need to clone the repository first!**

### Clone the Repository:

```bash
# Clone the project from GitHub
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git
```

You should see:
```
Cloning into 'Picphoto'...
remote: Enumerating objects: 100, done.
remote: Counting objects: 100% (100/100), done.
...
```

✅ **Success!** The Picphoto folder now exists.

Verify it was created:

```bash
ls Picphoto
```

You should see files like: `package.json`, `README.md`, `app/`, etc.

Now continue to Step 1! ⬇️

---

## Step 1: Navigate to Project Directory

Open your terminal and type:

```bash
pwd
```

You'll probably see:
```
/Users/ikbal
```

This is your **home directory**. ❌ Wrong place!

---

### Step 2: Navigate to the Project Directory

**Already covered above!** If you followed Step 1, you should already be in the Picphoto directory.

If you skipped it, type:

```bash
cd Picphoto
```

**Getting "no such file or directory"?** Go to [Step 0](#step-0-clone-the-repository) to clone the repository first!

---

### Step 3: Verify You're in the Right Place

Type this command:

```bash
pwd
```

You should now see:
```
/Users/ikbal/Picphoto
```

✅ **Perfect!** You're now in the project directory.

Double-check by listing the files:

```bash
ls package.json
```

You should see:
```
package.json
```

✅ **Great!** The file exists here.

---

### Step 4: Install Dependencies

Now type:

```bash
npm install
```

You should see:
```
added 458 packages in 15s
```

✅ **Success!** Dependencies installed.

---

### Step 5: Start the Development Server

Now type:

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

✅ **It's working!** Open your browser to http://localhost:3000

---

## Complete Command Sequence (Copy All at Once)

### If you DON'T have the project yet:

```bash
# Clone the repository
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git

# Navigate to project
cd Picphoto

# Verify location
pwd
ls package.json

# Install dependencies
npm install

# Start server
npm run dev
```

### If you ALREADY have the project:

```bash
# Navigate to project
cd Picphoto

# Verify location
pwd

# Check for package.json
ls package.json

# Install dependencies
npm install

# Start server
npm run dev
```

---

## Visual Guide

### Before (Wrong) ❌

```
┌──────────────────────────────┐
│ Terminal                     │
├──────────────────────────────┤
│ ~ $ npm run dev              │
│                              │
│ npm error: Cannot find       │
│ package.json                 │
└──────────────────────────────┘

You are here: /Users/ikbal
Project is here: /Users/ikbal/Picphoto
❌ Not in the right place!
```

### After (Correct) ✅

```
┌──────────────────────────────┐
│ Terminal                     │
├──────────────────────────────┤
│ ~/Picphoto $ npm run dev     │
│                              │
│ ✓ Ready in 447ms             │
│ - Local: http://localhost:3000│
└──────────────────────────────┘

You are here: /Users/ikbal/Picphoto
Project is here: /Users/ikbal/Picphoto
✅ Perfect match!
```

---

## Understanding Terminal Prompts

Learn to read your terminal prompt:

| Prompt | Location | Status |
|--------|----------|--------|
| `~ $` | Home directory | ❌ Wrong |
| `~/Picphoto $` | Project directory | ✅ Correct |
| `ikbal@MacBook-Pro ~ %` | Home directory | ❌ Wrong |
| `ikbal@MacBook-Pro Picphoto %` | Project directory | ✅ Correct |

The key is seeing `Picphoto` in your prompt!

---

## Common Questions

### Q: I'm getting "cd: no such file or directory: Picphoto"

**A:** You haven't cloned the repository yet! Do this first:

```bash
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git
cd Picphoto
```

### Q: Do I need to clone the repository first?

**A:** Yes! If you haven't cloned it yet:

```bash
cd ~  # Go to home directory
git clone https://github.com/ikbal0677499743-lgtm/Picphoto.git
cd Picphoto
npm install
npm run dev
```

### Q: What if I don't have a Picphoto folder?

**A:** You need to clone the repository first (see above).

To check if it exists:

```bash
cd ~
ls -d Picphoto
```

If you see "No such file or directory", you need to clone it first.

### Q: I'm still getting errors!

**A:** Make sure you:
1. Have Node.js installed: `node --version` (should be 18.17+)
2. Have npm installed: `npm --version` (should be 9+)
3. Are definitely in the Picphoto directory: `pwd` should show `Picphoto` at the end
4. Can see package.json: `ls package.json` should show the file

---

## Quick Checklist

Before running ANY npm command:

- [ ] ✓ I've run `cd Picphoto`
- [ ] ✓ I've verified with `pwd` that I'm in the Picphoto directory
- [ ] ✓ I can see package.json with `ls package.json`
- [ ] ✓ NOW I can run npm commands

---

## Still Need Help?

Check these files in the project:
- **COMMON_ERROR.md** - Detailed troubleshooting for this exact error
- **QUICKSTART.md** - Quick start guide
- **README.md** - Complete documentation
- **HOWTOTEST.md** - Testing guide

---

Remember: **The golden rule is simple - always `cd` into the project directory first!** 🎯
