import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: "gluestackdemoapp",
  slug: "gluestackdemoapp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSFaceIDUsageDescription: "testing",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    storybookEnabled: process.env.STORYBOOK,
  },
  plugins: [
    "expo-router",
    [
      "expo-local-authentication",
      {
        faceIDPermission: "Allow $(PRODUCT_NAME) to use Face ID.",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
