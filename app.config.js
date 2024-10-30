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
      googleServicesFile:
        // process.env.GOOGLE_SERVICES_JSON ||
        "./android/app/google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/Logo.jpg",
        backgroundColor: "#ffffff",
        monochromeImage: "./assets/images/Logo.jpg",
      },
      package: "com.trivo18.customermobile",
      buildType: "apk",
      keystorePath:
        // process.env.DEBUG_KEYSTORE ||
        "./android/app/debug.keystore",
      keystorePassword: "android",
      keyAlias: "androiddebugkey",
      keyPassword: "android",
      config: {
        googleMaps: { apiKey: "Rbn6B9ATYJdi23CqzCa5aGWpLp1nxE9wdpeESNgp" },
      },
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
