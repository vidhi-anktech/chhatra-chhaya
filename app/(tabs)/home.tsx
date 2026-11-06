// ==============================================================================
// HOME SCREEN — CHHATRA CHHAYA (छत्र छाया)
// Matching UI Mockup: media_1793603261722.png
// Sections:
// 1. Top Header: Guru Photo, Title & Floating Ambient Audio Mute Toggle
// 2. आज का पंचांग Card (Vikram Samvat 2081, Sunrise, Sunset, Pachkhan)
// 3. आज का अमृत प्रवचन Card (YouTube thumbnail, play button, 2-min AI summary button)
// 4. दैनिक नियम चयन Card + Live Anumodna Wall
// 5. लाइव दर्शन व दिनचर्या Card (Watch Live button, today's schedule table)
// 6. त्वरित साधना शॉर्टकट्स: Namokar Mala, 48-min Samayik, Vihar status, E-Gallery
// ==============================================================================

import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../src/components/common/Header';
import { useLanguage } from '../../src/context/LanguageContext';
import PanchangCard from '../../src/components/home/PanchangCard';
import PravachanCard from '../../src/components/home/PravachanCard';
import DainikNiyamCard from '../../src/components/home/DainikNiyamCard';
import AnumodnaFeed from '../../src/components/home/AnumodnaFeed';
import ScheduleCard from '../../src/components/home/ScheduleCard';
import QuickShortcuts from '../../src/components/home/QuickShortcuts';

export default function HomeScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9ff]" edges={['top', 'left', 'right']}>
      <Header
        title={t('header.title', 'आचार्य श्री 108 विभव सागर जी महाराज')}
        subtitle={t('header.subtitle', 'जैन आध्यात्मिक साथी')}
      />
      <View className="flex-1 bg-[#f9f9ff]">
        <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
          <PanchangCard />
          <PravachanCard />
          <DainikNiyamCard />
          <AnumodnaFeed />
          <ScheduleCard />
          <QuickShortcuts />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
