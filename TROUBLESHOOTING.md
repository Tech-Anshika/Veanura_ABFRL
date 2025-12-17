# Troubleshooting Guide

## If you see "Something went wrong" error:

### 1. Check the Error Log
- Tap "View error log" in Expo Go to see the actual error message
- Share the error with me so I can fix it

### 2. Common Issues and Fixes:

#### Missing Assets Error
If you see errors about missing images (icon.png, splash.png, etc.):
- The app should still work, but you can create placeholder images
- Or temporarily comment out asset references in app.json

#### Navigation Errors
- Make sure you've restarted the Expo server after code changes
- Clear cache: `npx expo start --clear`

#### JavaScript Errors
- Check the terminal/console for error messages
- Common issues: import errors, undefined variables, type mismatches

### 3. Quick Fixes:

```bash
# Clear cache and restart
npx expo start --clear

# Reinstall dependencies
rm -rf node_modules
npm install

# Reset Expo cache
npx expo start --clear --reset-cache
```

### 4. If the app still doesn't work:
Please share:
1. The exact error message from "View error log"
2. Any errors shown in the terminal
3. What screen you see (splash, onboarding, error screen, etc.)




