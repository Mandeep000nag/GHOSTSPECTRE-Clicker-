
# Ghost Spectre Clicker - Android Build Guide

This project is optimized for deployment as a high-performance Android application using **Capacitor**.

## Prerequisites
- **Node.js** (LTS version)
- **Android Studio**
- **Java JDK 17+**

## Step 1: Initialize Mobile Environment
Run the following commands in the project root:
```bash
# Install mobile dependencies
npm install @capacitor/core @capacitor/cli @capacitor/android

# Initialize Capacitor (Only once)
npx cap init "Ghost Spectre Clicker" "com.ghostspectre.clicker" --web-dir dist
```

## Step 2: Build the Production Web App
Ensure your project is compiled into the `dist` folder:
```bash
npm run build
```

## Step 3: Add Android Platform
```bash
# Add the android folder
npx cap add android

# Sync web assets to the android project
npx cap sync
```

## Step 4: Finalize in Android Studio
1. Open the project in Android Studio:
   ```bash
   npx cap open android
   ```
2. Wait for Gradle to sync.
3. Connect your Android device or start an emulator.
4. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
5. Locate the generated APK in `android/app/build/outputs/apk/debug/app-debug.apk`.

## Mobile-Specific Features
- **Haptic Feedback**: Uses the browser's `navigator.vibrate` API, which Capacitor bridges to the native Android vibrator.
- **Immersive Mode**: The app is configured via `capacitor.config.json` to support a native dark background during splash screens.
- **Hardware Acceleration**: The CSS particle system and SVG animations are GPU-accelerated for fluid 60FPS mobile performance.
- **Offline Storage**: Game state is persisted via `localStorage`, which remains persistent in the Android WebView data directory.

## Testing on Device
Enable **Developer Options** and **USB Debugging** on your phone, then click the "Run" button in Android Studio.
