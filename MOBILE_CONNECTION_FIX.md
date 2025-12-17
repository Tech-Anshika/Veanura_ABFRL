# Mobile Connection Error Fix

## Error: `java.net.ConnectException: Failed to connect to /192.168.1.37:8081`

This error occurs when your mobile device cannot connect to the Metro bundler (development server).

## Quick Fix Steps:

### 1. **Stop and Restart the Development Server**

```bash
# Stop the current server (Ctrl+C)
# Then restart with cache cleared:
npx expo start --clear
```

### 2. **Check Network Connection**

- Make sure your **phone and computer are on the same Wi-Fi network**
- The IP address `192.168.1.37` should be your computer's local IP
- Check your computer's IP: 
  - Windows: `ipconfig` (look for IPv4 Address)
  - Mac/Linux: `ifconfig` or `ip addr`

### 3. **Use Tunnel Mode (If Same Network Doesn't Work)**

If you're having network issues, use Expo's tunnel mode:

```bash
npx expo start --tunnel
```

This creates a tunnel through Expo's servers and works even if devices are on different networks.

### 4. **Use LAN Mode Explicitly**

```bash
npx expo start --lan
```

### 5. **Check Firewall Settings**

- Windows: Allow Node.js through Windows Firewall
- Mac: System Preferences → Security & Privacy → Firewall

### 6. **Restart Everything**

1. Close the Expo Go app on your phone
2. Stop the Metro bundler (Ctrl+C)
3. Clear cache: `npx expo start --clear`
4. Reopen Expo Go and scan the QR code again

### 7. **Alternative: Use USB Connection (Android)**

For Android devices:
```bash
# Connect phone via USB
# Enable USB debugging
npx expo start --android
```

### 8. **Check if Port 8081 is Available**

If another process is using port 8081:
```bash
# Windows
netstat -ano | findstr :8081

# Mac/Linux
lsof -i :8081
```

## Most Common Solution:

**90% of the time, this fixes it:**

```bash
# 1. Stop the server
# 2. Clear cache and restart
npx expo start --clear

# 3. Make sure phone and computer are on same Wi-Fi
# 4. Scan the new QR code that appears
```

## If Still Not Working:

Try tunnel mode (slower but more reliable):
```bash
npx expo start --tunnel --clear
```


