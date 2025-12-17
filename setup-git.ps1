# Git Setup Script for Venaura ABFRL Project
# Run this script in PowerShell from the project root directory

Write-Host "🚀 Setting up Git repository for Venaura ABFRL..." -ForegroundColor Green

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Initialize git repository (if not already initialized)
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

# Add all files
Write-Host "📝 Adding files to staging area..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Venaura ABFRL Omnichannel Retail App with AI Agents System

- Complete React Native mobile application
- AI-powered conversational shopping assistant
- Omnichannel retail features (web, app, in-store)
- Multi-agent automation system integration
- Product catalog and shopping cart
- Order tracking and management
- In-store mode with geolocation
- Comprehensive documentation"

# Set branch to main
Write-Host "🌿 Setting branch to main..." -ForegroundColor Yellow
git branch -M main

# Add remote repository
Write-Host "🔗 Adding remote repository..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/Tech-Anshika/Veanura_ABFRL.git

# Check remote
Write-Host "✅ Remote repository configured:" -ForegroundColor Green
git remote -v

Write-Host ""
Write-Host "📤 Ready to push! Run the following command:" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "Or if you encounter conflicts, use:" -ForegroundColor Yellow
Write-Host "   git pull origin main --allow-unrelated-histories" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White

