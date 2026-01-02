/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'help.bonjour.grow',
  appName: 'Grow',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#fbf8f3',
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      overlaysWebView: false,
      style: 'LIGHT',
      // Waiting on bug fix for issue to be merged:
      // https://github.com/ionic-team/capacitor-plugins/issues/2341
      // backgroundColor: '#fbf8f3',
    },
  },
  cordova: {},
};

export default config;
