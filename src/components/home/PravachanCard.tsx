// ==============================================================================
// FEATURED PRAVACHAN CARD (आज का अमृत प्रवचन)
// Matching UI Mockup: media_1793603261722.png
// 1. YouTube video thumbnail with prominent Terracotta Play button (#A24B0C)
// 2. Title & Subject badge
// 3. Action buttons: '2-मिनट AI सार' & 'व्हाट्सएप शेयर'
// ==============================================================================

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Play, Sparkles, Share2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';

export default function PravachanCard() {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();

  const openPravachanDetail = () => {
    router.push(
      '/details/pravachan?title=' +
        encodeURIComponent(
          isEnglish
            ? 'Tattvartha Sutra Exposition — Part 7: Samvara & Nirjara'
            : 'तत्वार्थ सूत्र चिंतन — भाग 7: संवर एवं निर्जरा'
        ) +
        '&tag=' +
        encodeURIComponent(isEnglish ? 'Tattvartha Sutra' : 'तत्वार्थ सूत्र') +
        '&duration=' +
        encodeURIComponent(isEnglish ? '42 mins' : '42 मिनट')
    );
  };

  return (
    <View className="bg-[#f0f3ff] rounded-xl p-5 border border-[#dee8ff] mb-4 shadow-xs">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-[#903f00] font-bold text-xl">
          ▶️ {t('home.pravachanBadge', 'आज का प्रवचन')}
        </Text>
        <View className="bg-[#ffdbca] px-3.5 py-1 rounded-full border border-[#fdba74]/40">
          <Text className="text-[#331200] font-semibold text-xs">
            {isEnglish ? 'New Discourse' : 'नवीन प्रवचन'}
          </Text>
        </View>
      </View>

      {/* Video Thumbnail with Local Figma Asset */}
      <TouchableOpacity
        onPress={openPravachanDetail}
        activeOpacity={0.9}
        className="h-48 rounded-xl items-center justify-center mb-3 relative overflow-hidden bg-black shadow-sm"
      >
        <Image
          source={require('../../../assets/images/pravachan_darshan.png')}
          className="w-full h-full absolute inset-0 opacity-80"
          resizeMode="cover"
        />
        <View className="w-16 h-16 rounded-full bg-[#903f00] items-center justify-center shadow-lg">
          <Play size={28} color="#FFFFFF" fill="#FFFFFF" />
        </View>
        <View className="absolute bottom-2.5 left-3 right-3 bg-black/60 px-3 py-1.5 rounded-lg">
          <Text className="text-white text-sm font-bold" numberOfLines={1}>
            {isEnglish
              ? 'Tattvartha Sutra Exposition — Part 7: Samvara & Nirjara'
              : 'तत्वार्थ सूत्र चिंतन — भाग 7: संवर एवं निर्जरा'}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={openPravachanDetail} activeOpacity={0.8} className="mb-3">
        <Text className="text-[#111c2d] font-bold text-base leading-6">
          {t('header.title', 'आचार्य श्री 108 विभव सागर जी महाराज')}
        </Text>
        <Text className="text-[#564338] text-xs font-medium mt-0.5">
          {isEnglish
            ? 'Duration: 42 mins • Location: Kamaldeep Temple, Indore • View Details ➔'
            : 'अवधि: 42 मिनट • विराजमान: कमलदीप मंदिर, इंदौर • विवरण देखें ➔'}
        </Text>
      </TouchableOpacity>

      {/* Actions */}
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={openPravachanDetail}
          className="flex-1 bg-[#ffd9e1]/60 py-3.5 rounded-xl flex-row items-center justify-center gap-2 border border-[#ffc2ce]"
        >
          <Sparkles size={18} color="#A5345D" />
          <Text className="text-[#a5345d] font-bold text-sm">
            {t('home.aiSummary', '2-मिनट AI सार')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openPravachanDetail}
          className="flex-1 bg-white py-3.5 rounded-xl flex-row items-center justify-center gap-2 border border-[#dee8ff]"
        >
          <Share2 size={18} color="#564338" />
          <Text className="text-[#564338] font-bold text-sm">
            {isEnglish ? 'Details & Share' : 'विवरण व शेयर'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
