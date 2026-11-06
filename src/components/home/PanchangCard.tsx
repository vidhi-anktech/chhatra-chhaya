// ==============================================================================
// PANCHANG & TITHI CARD (आज का पंचांग)
// Matching UI Mockup: media_1793603261722.png
// 1. Vikram Samvat 2081, Lunar Month, Tithi (Sud/Vad)
// 2. Sunrise, Sunset & Pachkhan Countdown
// 3. Highlight Strip: 'आज का विशेष: ...' in Soft Pink #FCE7F3
// ==============================================================================

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sun, Sunset, Clock, Moon, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';

export default function PanchangCard() {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();

  return (
    <TouchableOpacity
      onPress={() => router.push('/details/panchang')}
      activeOpacity={0.9}
      className="bg-[#f0f3ff] rounded-xl p-5 border border-[#dee8ff] mb-4 shadow-xs"
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-[#903f00] font-bold text-xl">
          📅 {t('home.panchangTitle', 'आज का पंचांग')}
        </Text>
        <View className="bg-[#ffdbca] px-3.5 py-1 rounded-full border border-[#fdba74]/40 flex-row items-center gap-1">
          <Text className="text-[#331200] font-semibold text-xs">
            {isEnglish ? 'Magh Shukla Ekadashi' : 'माघ शुक्ल एकादशी'}
          </Text>
          <ChevronRight size={12} color="#331200" />
        </View>
      </View>

      <View className="flex-row items-baseline justify-between mb-3.5">
        <Text className="text-[#111c2d] font-bold text-lg">
          {isEnglish ? 'Vikram Samvat 2081' : 'विक्रम संवत् 2081'}
        </Text>
        <Text className="text-[#564338] text-xs font-medium">
          {isEnglish ? 'Veer Nirvana Samvat 2551' : 'वीर निर्वाण संवत् 2551'}
        </Text>
      </View>

      {/* Solar & Chauvihar Timing Grid */}
      <View className="flex-row justify-between bg-white py-3 px-2 rounded-xl mb-3 shadow-2xs border border-[#e7eeff]">
        <View className="items-center flex-1">
          <Sun size={20} color="#F59E0B" />
          <Text className="text-[#564338] text-xs font-medium mt-1">
            {t('home.sunrise', 'सूर्योदय')}
          </Text>
          <Text className="text-[#111c2d] font-bold text-sm mt-0.5">06:48 AM</Text>
        </View>

        <View className="items-center flex-1 border-x border-[#dee8ff]">
          <Sunset size={20} color="#903F00" />
          <Text className="text-[#564338] text-xs font-medium mt-1">
            {t('home.sunset', 'सूर्यास्त')}
          </Text>
          <Text className="text-[#111c2d] font-bold text-sm mt-0.5">06:12 PM</Text>
        </View>

        <View className="items-center flex-1 border-r border-[#dee8ff]">
          <Clock size={20} color="#0D9488" />
          <Text className="text-[#564338] text-xs font-medium mt-1">
            {t('home.navkarsi', 'नवकारसी')}
          </Text>
          <Text className="text-[#111c2d] font-bold text-sm mt-0.5">07:36 AM</Text>
        </View>

        <View className="items-center flex-1">
          <Moon size={20} color="#A5345D" />
          <Text className="text-[#564338] text-xs font-medium mt-1">
            {t('home.chauvihar', 'चौविहार')}
          </Text>
          <Text className="text-[#111c2d] font-bold text-sm mt-0.5">05:42 PM</Text>
        </View>
      </View>

      {/* Special Highlight Strip & Link */}
      <View className="bg-[#ffd9e1]/50 p-3 rounded-xl border border-[#ffc2ce] flex-row items-center justify-between">
        <Text className="text-[#a5345d] text-sm leading-5 flex-1 mr-2">
          ✨ <Text className="font-bold">{isEnglish ? 'Special Today:' : 'आज का विशेष:'}</Text>{' '}
          {isEnglish
            ? 'Holy Ekadashi Fast • Take Pachkhan'
            : 'पवित्र एकादशी व्रत • पचक्खाण ग्रहण करें'}
        </Text>
        <Text className="text-[#a5345d] text-xs font-bold underline">
          {isEnglish ? 'Details ➔' : 'विस्तार ➔'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
