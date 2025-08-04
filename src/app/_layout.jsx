import {
  AnekBangla_400Regular,
  AnekBangla_700Bold,
} from "@expo-google-fonts/anek-bangla";
import {
  NotoSansBengali_400Regular,
  NotoSansBengali_700Bold,
} from "@expo-google-fonts/noto-sans-bengali";
import { NotoSerifBengali_400Regular } from "@expo-google-fonts/noto-serif-bengali/400Regular";

import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import BottomMenu from "../components/atoms/bottom_menu";
import TopHeader from "../components/atoms/top_header";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    AnekBangla_400Regular,
    AnekBangla_700Bold,
    NotoSansBengali_400Regular,
    NotoSansBengali_700Bold,
    NotoSerifBengali_400Regular,
  });

  const pathname = usePathname();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  const showBack = pathname !== "/";

  return (
    <SafeAreaProvider>
      {showBack && <TopHeader />}
      {/* <SafeAreaView className="flex-1"> */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="books_screen" />
        <Stack.Screen name="reading_page" />
      </Stack>
      {showBack && <BottomMenu />}
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}
