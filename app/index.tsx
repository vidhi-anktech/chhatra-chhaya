// ==============================================================================
// SPLASH & INITIAL ROUTING SCREEN
// Matching UI Mockup: media_1793603261884.png
// 1. Displays Sacred Ahimsa Emblem (Deep Maroon circle #6A141A with Gold Hand)
// 2. Displays Guru Title: 'पूज्य आचार्य श्री 108 विभव सागर जी महाराज'
// 3. Checks AsyncStorage: If first time -> navigate to /onboarding; else -> navigate to /(tabs)/home
// ==============================================================================

import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "../src/store/useUserStore";
import { useLanguage } from "../src/context/LanguageContext";

export default function SplashScreen() {
  const router = useRouter();
  const { isRegistered, loadUser } = useUserStore();
  const { t, isEnglish } = useLanguage();

  useEffect(() => {
    async function init() {
      await loadUser();
      setTimeout(() => {
        if (isRegistered) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/onboarding");
        }
      }, 1500);
    }
    init();
  }, [isRegistered]);

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9ff] items-center justify-center px-6 relative">
      {/* Subtle Golden Spiritual Aura Halo Backgrounds */}
      <View className="absolute top-10 right-[-30px] w-48 h-48 rounded-full bg-[#ffdbca] opacity-40 blur-3xl pointer-events-none" />
      <View className="absolute bottom-16 left-[-30px] w-44 h-44 rounded-full bg-[#ffd9e1] opacity-30 blur-3xl pointer-events-none" />

      {/* Sacred Jain Prateek Chinha (Option 3 Emblem) */}
      <View className="w-48 h-48 rounded-3xl bg-[#f0f3ff] items-center justify-center mb-8 shadow-sm border border-[#e7eeff] p-3">
        <View className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-sacred-gold shadow-md bg-sacred-maroon items-center justify-center">
          <Image
            source={require('../assets/images/jain_symbol.png')}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>

      <Text className="text-[#111c2d] text-2xl font-bold text-center">
        पूज्य आचार्य श्री 108
      </Text>
      <Text className="text-[#903f00] text-3xl font-extrabold text-center mb-2">
        विभव सागर जी <Text className="text-[#111c2d]">महाराज</Text>
      </Text>
      <Text className="text-[#564338] text-base font-medium text-center mb-5">
        Acharya Shri 108 Vibhav Sagarji Maharaj
      </Text>

      <View className="bg-[#dee8ff]/60 px-4 py-2 rounded-full mb-6 border border-[#c7d8ff]">
        <Text className="text-[#a5345d] text-sm font-semibold tracking-wide text-center">
          दिगम्बर मुनि परम्परा • ज्ञान, ध्यान, तपोमय जीवन
        </Text>
      </View>

      <ActivityIndicator size="small" color="#903F00" className="mt-2 mb-6" />

      <TouchableOpacity
        onPress={() =>
          router.replace(isRegistered ? "/(tabs)/home" : "/onboarding")
        }
        className="bg-[#903f00] px-10 py-4 rounded-xl min-h-[56px] justify-center shadow-md active:bg-[#763300]"
        accessibilityRole="button"
        accessibilityLabel="ऐप में प्रवेश करें"
      >
        <Text className="text-[#fff1eb] font-bold text-lg text-center">
          {t('splash.enter', 'ऐप में प्रवेश करें ➔')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
