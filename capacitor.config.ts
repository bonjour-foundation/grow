/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'help.bonjour.grow',
  appName: 'Grow',
  bundledWebRuntime: false,
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#fbf8f3',
      androidScaleType: 'CENTER_CROP',
    },
  },
  cordova: {},
};

export default config;
