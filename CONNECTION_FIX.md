# Connection Error Fix Guide

## Error: "Failed to connect to /192.168.1.37:8082"

### Quick Fixes (Try in order):

### 1. **Restart Expo Server**
Stop the current server (Ctrl+C in terminal) and restart:
```bash
npx expo start --clear
```

### 2. **Use Tunnel Mode** (Most Reliable)
This works even if devices are on different networks:
```bash
npx expo start --tunnel
```
Then scan the new QR code that appears.

### 3. **Check Network Connection**
- Make sure your phone and computer are on the **same Wi-Fi network**
- Try disconnecting and reconnecting to Wi-Fi on both devices

### 4. **Check Windows Firewall**
The firewall might be blocking the connection:
1. Open Windows Defender Firewall
2. Click "Allow an app or feature through Windows Firewall"
3. Make sure Node.js is allowed for Private networks
4. Or temporarily disable firewall to test

### 5. **Try LAN Mode Explicitly**
```bash
npx expo start --lan
```

### 6. **Use Localhost Tunnel (Alternative)**
If tunnel mode doesn't work, try:
```bash
npx expo start --localhost
```
Then use the Expo Go app's "Enter URL manually" option and enter: `exp://localhost:8082`

### 7. **Check Phone Settings**
- Make sure mobile data is turned OFF (use Wi-Fi only)
- Ensure phone and computer are on same network
- Try forgetting and reconnecting to Wi-Fi

### 8. **Alternative: Use USB Connection (Android)**
For Android devices:
1. Connect phone via USB
2. Enable USB debugging
3. Run: `npx expo start --android`
This will install and run directly on your device

### Most Common Solution:
**Use Tunnel Mode** - It's the most reliable:
```bash
npx expo start --tunnel
```




