# Git Setup Instructions

Follow these steps to upload the project to GitHub:

## Step 1: Initialize Git Repository (if not already done)

```bash
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: Venaura ABFRL Omnichannel Retail App with AI Agents System"
```

## Step 4: Add Remote Repository

```bash
git remote add origin https://github.com/Tech-Anshika/Veanura_ABFRL.git
```

## Step 5: Rename Branch to Main (if needed)

```bash
git branch -M main
```

## Step 6: Push to GitHub

```bash
git push -u origin main
```

## Alternative: If Repository Already Has Content

If the repository already has commits, use:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Troubleshooting

### If you get authentication errors:
1. Use GitHub Personal Access Token instead of password
2. Or use SSH: `git remote set-url origin git@github.com:Tech-Anshika/Veanura_ABFRL.git`

### If files are too large:
- Check `.gitignore` includes `node_modules/`
- Large assets should be in Git LFS or excluded

## Quick Setup Script

Run this in PowerShell (Windows):

```powershell
git init
git add .
git commit -m "Initial commit: Venaura ABFRL Omnichannel Retail App"
git branch -M main
git remote add origin https://github.com/Tech-Anshika/Veanura_ABFRL.git
git push -u origin main
```

