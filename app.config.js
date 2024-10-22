export default {
  expo: {
    name: "capstone-mobile-customer",
    slug: "capstone-mobile-customer",
    version: "1.0.0",
    entryPoint: "./src/App.tsx",
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
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      adaptiveIcon: {
        foregroundImage: "./assets/images/Logo.jpg",
        backgroundColor: "#ffffff",
      },
      package: "com.trivo18.customermobile",
      buildType: "apk",
      keystorePath: process.env.DEBUG_KEYSTORE,
      keystorePassword: "android",
      keyAlias: "androiddebugkey",
      keyPassword: "android",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "@react-native-firebase/app",
      "@react-native-firebase/messaging",
      "expo-secure-store",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "a469ecf6-fedc-4bae-a1cf-a1381e380636",
      },
    },
    runtimeVersion: "1.1.0",
    updates: {
      url: "https://u.expo.dev/a469ecf6-fedc-4bae-a1cf-a1381e380636",
    },
  },
};
