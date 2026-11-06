// ==============================================================================
// QUICK SADHNA SHORTCUTS (त्वरित साधना शॉर्टकट्स)
// Matching UI Mockup: media_1793603261722.png
// 4 Shortcut items with distinct pastel circular icon backgrounds:
// 1. Namokar Mala: Soft Orange circle (#FFEDD5) with Orange icon
// 2. 48-Min Samayik: Soft Cyan circle (#CFFAFE) with Cyan icon
// 3. Vihar Status: Soft Pink circle (#FCE7F3) with Pink icon
// 4. E-Gallery: Soft Amber circle (#FEF3C7) with Amber icon
// ==============================================================================

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useLanguage } from '../../context/LanguageContext';

export default function QuickShortcuts() {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();

  const shortcuts = [
    {
      title: isEnglish ? 'Navkar Mahamantra Japamala' : 'णमोकार महामंत्र जप माला',
      subtitle: isEnglish ? '108 Digital Bead Japamala Counter' : '108 मनके डिजिटल काउंटर',
      bg: 'bg-[#ffedcd]',
      icon: '📿',
      route: '/(tabs)/sadhna',
    },
    {
      title: isEnglish ? '48-Minute Samayik Meditation' : '48 मिनट सामायिक साधना',
      subtitle: isEnglish ? 'Peaceful Meditation Timer' : 'दो घड़ी आत्मनिरीक्षण टाइमर',
      bg: 'bg-[#cffafe]',
      icon: '⏱️',
      route: '/(tabs)/sadhna',
    },
    {
      title: isEnglish ? 'Current Vihar Location' : 'वर्तमान विहार स्थिति',
      subtitle: isEnglish ? 'Kamaldeep Temple, Indore — Next Halt' : 'कमलदीप मंदिर, इंदौर — अगला मुकाम तय',
      bg: 'bg-[#ffd9e1]',
      icon: '📍',
      route: '/details/vihar',
    },
    {
      title: isEnglish ? 'E-Gallery & Darshan Album' : 'ई-गैलरी व दर्शन चित्र',
      subtitle: isEnglish ? 'Diksha Mahotsav & Discourse Album' : 'दीक्षा महोत्सव, पंचकल्याणक एवं प्रवचन चित्र',
      bg: 'bg-[#fef3c7]',
      icon: '🖼️',
      route: '/details/gallery',
    },
  ];

  return (
    <View className="mb-10">
      <Text className="text-[#111c2d] font-bold text-xl mb-3">
        ⚡ {isEnglish ? 'Quick Spiritual Shortcuts' : 'त्वरित साधना शॉर्टकट्स'}
      </Text>
      {shortcuts.map((item, idx) => (
        <TouchableOpacity 
          key={idx} 
          onPress={() => router.push(item.route as any)}
          className="bg-white p-4 rounded-xl border border-[#dee8ff] mb-2.5 flex-row items-center justify-between min-h-[58px] shadow-2xs active:bg-[#f0f3ff]"
        >
          <View className="flex-row items-center gap-3.5 flex-1 mr-2">
            <View className={`w-11 h-11 rounded-full ${item.bg} items-center justify-center shadow-xs`}>
              <Text className="text-xl">{item.icon}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-[#111c2d] font-bold text-base leading-5">{item.title}</Text>
              <Text className="text-[#564338] text-xs leading-4 mt-0.5">{item.subtitle}</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#903F00" />
        </TouchableOpacity>
      ))}
    </View>
  );
}
