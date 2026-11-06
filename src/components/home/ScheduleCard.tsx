// ==============================================================================
// TODAY'S LIVE DARSHAN & SCHEDULE CARD (लाइव दर्शन व दिनचर्या)
// Matching UI Mockup: media_1793603261722.png
// 1. Live Darshan thumbnail with 'लाइव दर्शन (Watch Live)' Terracotta button (#A24B0C)
// 2. Today's program schedule table (Abhishek, Pravachan, Samayik)
// ==============================================================================

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Video, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';

export default function ScheduleCard() {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();

  return (
    <View className="bg-[#f0f3ff] rounded-xl p-5 border border-[#dee8ff] mb-4 shadow-xs">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-[#903f00] font-bold text-xl">
          📹 {isEnglish ? 'Live Darshan & Events' : 'लाइव दर्शन व कार्यक्रम'}
        </Text>
        <View className="bg-[#fee2e2] px-3 py-1 rounded-full flex-row items-center gap-1.5 border border-[#ef4444]/30">
          <View className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <Text className="text-[#ef4444] font-bold text-xs">
            {isEnglish ? 'Live Streaming' : 'सीधा प्रसारण चालू'}
          </Text>
        </View>
      </View>

      {/* Live Video Banner with Local Asset */}
      <View className="h-44 rounded-xl items-center justify-center mb-4 relative overflow-hidden bg-black shadow-sm">
        <Image
          source={require('../../../assets/images/live_darshan_stream.png')}
          className="w-full h-full absolute inset-0 opacity-75"
          resizeMode="cover"
        />
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/live')}
          className="bg-[#903f00] px-6 py-3 rounded-xl flex-row items-center gap-2 shadow-md active:bg-[#763300]"
        >
          <Video size={20} color="#FFFFFF" />
          <Text className="text-white font-bold text-base">
            {isEnglish ? 'Watch Live Stream' : 'लाइव दर्शन (Watch Live)'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-[#111c2d] font-bold text-base mb-3">
        {t('home.scheduleTitle', 'दैनिक चर्या समय-सारणी (Today\'s Timetable)')}
      </Text>

      {/* Schedule Table */}
      <View className="border border-[#dee8ff] rounded-xl overflow-hidden bg-white shadow-2xs">
        <View className="flex-row p-3.5 border-b border-[#dee8ff] justify-between items-center">
          <Text className="text-[#903f00] font-bold text-sm">06:30 AM</Text>
          <Text className="text-[#111c2d] text-sm font-semibold">
            {isEnglish ? 'Abhishek, Shantidhara & Pujan' : 'अभिषेक, शांतिधारा व नित्य पूजन'}
          </Text>
          <Clock size={16} color="#564338" />
        </View>

        <View className="flex-row p-3.5 border-b border-[#dee8ff] bg-[#f9f9ff] justify-between items-center">
          <Text className="text-[#903f00] font-bold text-sm">08:30 AM</Text>
          <Text className="text-[#111c2d] text-sm font-semibold">
            {isEnglish ? 'Amrit Pravachan by Acharya Shri' : 'पूज्य आचार्य श्री का अमृत प्रवचन'}
          </Text>
          <View className="bg-[#ffdbca] px-2.5 py-0.5 rounded border border-[#fdba74]/50">
            <Text className="text-[#903f00] font-bold text-xs">
              {isEnglish ? 'Main' : 'प्रमुख'}
            </Text>
          </View>
        </View>

        <View className="flex-row p-3.5 border-b border-[#dee8ff] justify-between items-center">
          <Text className="text-[#903f00] font-bold text-sm">02:30 PM</Text>
          <Text className="text-[#111c2d] text-sm font-semibold">
            {isEnglish ? 'Tattva Charcha & Query Resolution' : 'तत्वचर्चा एवं श्रावक जिज्ञासा समाधान'}
          </Text>
          <Clock size={16} color="#564338" />
        </View>

        <View className="flex-row p-3.5 bg-[#f9f9ff] justify-between items-center">
          <Text className="text-[#903f00] font-bold text-sm">06:30 PM</Text>
          <Text className="text-[#111c2d] text-sm font-semibold">
            {isEnglish ? 'Mangal Maha-Aarti & Samayik' : 'मंगल महाआरती, सामायिक व भक्ति'}
          </Text>
          <Clock size={16} color="#564338" />
        </View>
      </View>
    </View>
  );
}
