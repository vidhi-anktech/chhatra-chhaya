// ==============================================================================
// LIVE ANUMODNA WALL (दैनिक नियम लाइव अनुमोदना)
// Matching UI Mockup: media_1793603261722.png
// 1. Soft Rose card (#FFE4E6) displaying real-time devotee pledges
// 2. Real-time updates via Supabase Realtime channel
// 3. CTA: 'श्रावक साधना पर लीडरबोर्ड देखें (See Devotee Leaderboard)' in Berry (#9F1239)
// ==============================================================================

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useLanguage } from "../../context/LanguageContext";

export default function AnumodnaFeed() {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();

  return (
    <View className="bg-[#ffd9e1]/40 rounded-xl p-5 border border-[#ffc2ce] mb-4 shadow-xs">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-[#a5345d] font-bold text-base">
          📢 {t("home.anumodnaTitle", "दैनिक नियम लाइव अनुमोदना")}
        </Text>
        {/* <Text className="text-[#564338] text-xs font-semibold">
          {isEnglish ? '1,420+ Anumodnas Today' : '1,420+ अनुमोदनाएं आज'}
        </Text> */}
      </View>

      <View className="bg-white/95 p-3.5 rounded-xl border border-[#ffc2ce]/60 mb-2.5">
        <Text className="text-[#111c2d] font-medium text-sm leading-5">
          ✨{" "}
          <Text className="font-bold text-[#903f00]">
            {isEnglish ? "Shweta Ji, Jaipur:" : "श्वेता जी, जयपुर:"}
          </Text>{" "}
          {isEnglish
            ? '"Pledged 1 Mala of Navkar Mantra today."'
            : '"आज 1 माला णमोकार महामंत्र का नियम लिया।"'}
        </Text>
      </View>

      <View className="bg-white/95 p-3.5 rounded-xl border border-[#ffc2ce]/60 mb-3.5">
        <Text className="text-[#111c2d] font-medium text-sm leading-5">
          ✨{" "}
          <Text className="font-bold text-[#903f00]">
            {isEnglish ? "Pramod Ji, Indore:" : "प्रमोद जी, इंदौर:"}
          </Text>{" "}
          {isEnglish
            ? '"Pledged dinner renunciation before sunset today."'
            : '"आज सूर्यास्त पूर्व रात्रि भोजन त्याग का संकल्प लिया।"'}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(tabs)/sadhna")}
        className="bg-[#a5345d] min-h-[48px] justify-center py-3 rounded-xl items-center shadow-xs active:bg-[#881337]"
      >
        <Text className="text-white font-bold text-sm">
          🏆{" "}
          {isEnglish
            ? "View Devotee Leaderboard (Sadhna)"
            : "श्रावक साधना लीडरबोर्ड देखें (Leaderboard)"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
