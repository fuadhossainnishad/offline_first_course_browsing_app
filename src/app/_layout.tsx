import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { useEffect } from 'react';
import { initDB } from '@/database/init';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    initDB();
    console.log("DATABASE INITIALIZED");
  }, []);
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <AnimatedSplashOverlay /> */}
      {/* <AppTabs /> */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* MAIN LIST SCREEN */}
        <Stack.Screen name="index" />

        {/* DETAIL SCREEN */}
        <Stack.Screen name="course/[id]" />
      </Stack>
    </ThemeProvider>
  );
}
