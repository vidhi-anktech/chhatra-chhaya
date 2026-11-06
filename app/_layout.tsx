// ==============================================================================
// ROOT LAYOUT — CHHATRA CHHAYA (छत्र छाया)
// Responsibilities:
// 1. Mount global providers: QueryClientProvider, AuthProvider, AudioProvider, LanguageProvider
// 2. Continuous ambient background audio controller (active across tab switches)
// 3. Status bar styling & safe area container
// ==============================================================================

import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AudioProvider } from '../src/context/AudioContext';
import { AuthProvider } from '../src/context/AuthContext';
import { LanguageProvider } from '../src/context/LanguageContext';
import '../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  // TODO: MANUAL WORK FOR DEVELOPER / ASSISTANT:
  // 1. Ensure `assets/audio/ambient_flute.mp3` is added to assets folder.
  // 2. Configure font loading for Devanagari custom fonts if desired.
  // 3. Initialize Firebase Cloud Messaging notification listener here.

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <AudioProvider>
              <StatusBar style="dark" backgroundColor="#F4F6FC" />
              <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="auth/login" options={{ presentation: 'modal' }} />
                <Stack.Screen name="admin/post-vihar" options={{ presentation: 'modal' }} />
                <Stack.Screen name="admin/upload-pravachan" options={{ presentation: 'modal' }} />
                <Stack.Screen name="admin/upload-gallery" options={{ presentation: 'modal' }} />
                <Stack.Screen name="details/pravachan" />
                <Stack.Screen name="details/book" />
                <Stack.Screen name="details/vihar" />
                <Stack.Screen name="details/panchang" />
                <Stack.Screen name="details/biography" />
                <Stack.Screen name="details/pratikraman" />
                <Stack.Screen name="details/gallery" />
              </Stack>
            </AudioProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
