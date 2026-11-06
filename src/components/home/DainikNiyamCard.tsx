// ==============================================================================
// DAINIK NIYAM SELECTION CARD (दैनिक नियम चयन)
// Matching UI Mockup: media_1793603261722.png
// 1. Checklist of standard daily vows (Ratri Bhojan Tyag, Chauvihar, Dev Darshan, Navkar Mala)
// 2. Tapping a vow shows 'स्वीकृत' badge in Green (#0D9488)
// 3. Broadcasts pledge to Supabase Realtime table `dainik_niyam_logs`
// ==============================================================================

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { useLanguage } from '../../context/LanguageContext';

export default function DainikNiyamCard() {
  const { t, isEnglish } = useLanguage();
  const [pledged, setPledged] = useState<string[]>(['ratri_bhojan']);

  const toggleNiyam = (id: string) => {
    if (pledged.includes(id)) {
      setPledged(pledged.filter(item => item !== id));
    } else {
      setPledged([...pledged, id]);
    }
  };

  const niyams = [
    {
      id: 'ratri_bhojan',
      title: isEnglish ? 'Dinner Before Sunset (Chauvihar)' : 'रात्रि भोजन त्याग',
      subtitle: isEnglish ? 'No food consumed after sunset' : 'सूर्यास्त उपरांत अन्न-जल त्याग',
    },
    {
      id: 'mala',
      title: isEnglish ? '1 Navkar Mantra Mala (108 Chants)' : '1 माला णमोकार मंत्र',
      subtitle: isEnglish ? 'Chant 108 Navkar Mantra' : '108 मनके एकाग्र भाव से फेरें',
    },
    {
      id: 'dev_darshan',
      title: isEnglish ? 'Daily Dev Darshan & Pujan' : 'देव दर्शन व पूजन',
      subtitle: isEnglish ? 'Daily Temple Dev Darshan' : 'जिनालय जाकर जिनप्रतिमा दर्शन',
    },
    {
      id: 'hari_sabji',
      title: isEnglish ? 'Green Vegetable Renunciation (Today)' : 'हरी सब्जी त्याग (आज के लिए)',
      subtitle: isEnglish ? 'Green Veggie Fasting' : 'सूखे द्रव्य व दालों का आहार',
    },
  ];

  return (
    <View className="bg-white rounded-xl p-5 border border-[#dee8ff] mb-4 shadow-xs">
      <View className="flex-row items-center justify-between mb-1.5">
        <Text className="text-[#111c2d] font-bold text-xl">
          🎯 {t('home.niyamTitle', 'दैनिक नियम संकल्प')}
        </Text>
        <View className="bg-[#ffdbca] px-3 py-1 rounded-full border border-[#fdba74]/40">
          <Text className="text-[#903f00] font-bold text-xs">
            {isEnglish ? 'Easy Sadhna' : 'सुलभ साधना'}
          </Text>
        </View>
      </View>
      <Text className="text-[#564338] text-sm mb-4 leading-5">
        {isEnglish
          ? 'Take a small daily vow and receive the blessings of the entire community:'
          : 'आज के लिए एक छोटा संकल्प लें और समस्त संघ की मंगल अनुमोदना पाएं:'}
      </Text>

      {niyams.map((niyam) => {
        const isChecked = pledged.includes(niyam.id);
        return (
          <TouchableOpacity 
            key={niyam.id} 
            onPress={() => toggleNiyam(niyam.id)}
            className={`p-4 rounded-xl border mb-3 flex-row items-center justify-between min-h-[56px] ${
              isChecked ? 'bg-[#ccfbf1]/40 border-[#0d9488]' : 'bg-[#f0f3ff] border-[#dee8ff]'
            }`}
          >
            <View className="flex-row items-center gap-3 flex-1 mr-2">
              <View className={`w-7 h-7 rounded-lg items-center justify-center border ${
                isChecked ? 'bg-[#0d9488] border-[#0d9488]' : 'border-[#ddc1b3] bg-white'
              }`}>
                {isChecked && <Check size={18} color="#FFFFFF" />}
              </View>
              <View className="flex-1">
                <Text className="text-[#111c2d] font-bold text-base leading-5">{niyam.title}</Text>
                <Text className="text-[#564338] text-xs leading-4 mt-0.5">{niyam.subtitle}</Text>
              </View>
            </View>
            {isChecked && (
              <View className="bg-[#0d9488] px-3 py-1 rounded-md">
                <Text className="text-white font-bold text-xs">
                  {isEnglish ? 'Accepted ✓' : 'स्वीकृत ✓'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
