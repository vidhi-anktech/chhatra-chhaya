// ==============================================================================
// COMMON APP HEADER MATCHING FIGMA DESIGN (1:1612 / 1:1621)
// 1. Guru Image / Official Emblem (32-40px circular)
// 2. Title & Subtitle (Noto Serif / Noto Sans in #903F00 & #564338)
// 3. Settings Action Button (48x48px circular in #F0F3FF with Settings icon)
// ==============================================================================

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Switch } from 'react-native';
import { Settings, X, Volume2, VolumeX, Globe, Bell, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAudio } from '../../context/AudioContext';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onSettingsPress?: () => void;
}

export default function Header({ title, subtitle, onSettingsPress }: HeaderProps) {
  const router = useRouter();
  const { isMuted, toggleMute } = useAudio();
  const { language, setLanguage, t, isEnglish } = useLanguage();
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [notificationsActive, setNotificationsActive] = useState(true);

  // Auto-translate default Guru title & subtitle if provided in Hindi
  const displayTitle =
    title === 'आचार्य श्री 108 विभव सागर जी महाराज'
      ? t('header.title', title)
      : title;
  const displaySubtitle =
    subtitle === 'जैन आध्यात्मिक साथी'
      ? t('header.subtitle', subtitle)
      : subtitle;

  const handleSettingsClick = () => {
    if (onSettingsPress) {
      onSettingsPress();
    } else {
      setSettingsModalVisible(true);
    }
  };

  const handleNavigateToMore = () => {
    setSettingsModalVisible(false);
    router.push('/(tabs)/more');
  };

  return (
    <>
      <View className="bg-[#f9f9ff]/95 px-4 py-3 flex-row items-center justify-between border-b border-[#e7eeff] shadow-[0px_1px_8px_rgba(0,0,0,0.04)]">
        {/* Left Side: Emblem and Title */}
        <View className="flex-row items-center gap-3 flex-1 mr-2">
          <View className="w-10 h-10 rounded-full overflow-hidden border border-[#ddc1b3] shadow-sm bg-white items-center justify-center">
            <Image
              source={require('../../../assets/images/guru_emblem.png')}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1">
            <Text className="text-[#903f00] font-bold text-lg leading-6" numberOfLines={1}>
              {displayTitle}
            </Text>
            {displaySubtitle && (
              <Text className="text-[#564338] text-xs font-medium leading-4 mt-0.5" numberOfLines={1}>
                {displaySubtitle}
              </Text>
            )}
          </View>
        </View>

        {/* Right Side: Senior-Accessible 48px Settings Button (Figma 1:1621) */}
        <TouchableOpacity
          onPress={handleSettingsClick}
          className="w-12 h-12 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff] shadow-xs active:bg-[#e7eeff]"
          accessibilityLabel="App Settings"
          activeOpacity={0.8}
        >
          <Settings size={20} color="#564338" />
        </TouchableOpacity>
      </View>

      {/* Quick Settings Bottom Sheet Modal */}
      <Modal
        visible={settingsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 border-t border-[#dee8ff]">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between pb-4 border-b border-[#f0f3ff]">
              <View className="flex-row items-center gap-2.5">
                <View className="w-8 h-8 rounded-full bg-[#f0f3ff] items-center justify-center">
                  <Settings size={18} color="#903f00" />
                </View>
                <Text className="font-bold text-[#111c2d] text-lg">
                  {t('header.settingsTitle', 'ऐप सेटिंग्स (App Settings)')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setSettingsModalVisible(false)}
                className="w-8 h-8 rounded-full bg-[#f0f3ff] items-center justify-center"
              >
                <X size={18} color="#564338" />
              </TouchableOpacity>
            </View>

            {/* Modal Body Controls */}
            <View className="py-4 gap-4">
              {/* Background Music Toggle */}
              <View className="flex-row items-center justify-between bg-[#f9f9ff] p-3.5 rounded-xl border border-[#dee8ff]">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-[#ffdbca] items-center justify-center">
                    {isMuted ? (
                      <VolumeX size={18} color="#763300" />
                    ) : (
                      <Volume2 size={18} color="#903f00" />
                    )}
                  </View>
                  <View>
                    <Text className="text-[#111c2d] font-bold text-base">
                      {t('header.fluteMusic', 'पृष्ठभूमि बांसुरी संगीत')}
                    </Text>
                    <Text className="text-[#564338] text-xs">
                      {isMuted
                        ? t('header.fluteMuted', 'संगीत बंद है (Muted)')
                        : t('header.fluteActive', 'शांतिदायक संगीत चालू है')}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={!isMuted}
                  onValueChange={toggleMute}
                  trackColor={{ false: '#dee8ff', true: '#903f00' }}
                  thumbColor="#ffffff"
                />
              </View>

              {/* Language Selection */}
              <View className="flex-row items-center justify-between bg-[#f9f9ff] p-3.5 rounded-xl border border-[#dee8ff]">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-[#e7eeff] items-center justify-center">
                    <Globe size={18} color="#006165" />
                  </View>
                  <View>
                    <Text className="text-[#111c2d] font-bold text-base">
                      {t('header.language', 'भाषा (Language)')}
                    </Text>
                    <Text className="text-[#564338] text-xs">
                      {language === 'hi' ? 'हिंदी (सक्रिय)' : 'English (Active)'}
                    </Text>
                  </View>
                </View>
                <View className="bg-[#dee8ff] flex-row rounded-lg p-1">
                  <TouchableOpacity
                    onPress={() => setLanguage('hi')}
                    className={`px-3 py-1.5 rounded-md ${
                      language === 'hi' ? 'bg-[#903f00]' : ''
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        language === 'hi' ? 'text-white' : 'text-[#564338]'
                      }`}
                    >
                      हिंदी
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setLanguage('en')}
                    className={`px-3 py-1.5 rounded-md ${
                      language === 'en' ? 'bg-[#903f00]' : ''
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        language === 'en' ? 'text-white' : 'text-[#564338]'
                      }`}
                    >
                      English
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Notifications Toggle */}
              <View className="flex-row items-center justify-between bg-[#f9f9ff] p-3.5 rounded-xl border border-[#dee8ff]">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-[#ffd9e1] items-center justify-center">
                    <Bell size={18} color="#a5345d" />
                  </View>
                  <View>
                    <Text className="text-[#111c2d] font-bold text-base">
                      {t('header.notifications', 'विहार एवं आरती सूचना')}
                    </Text>
                    <Text className="text-[#564338] text-xs">
                      {t('header.notificationsSub', 'दैनिक समय पर सूचना')}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificationsActive}
                  onValueChange={setNotificationsActive}
                  trackColor={{ false: '#dee8ff', true: '#903f00' }}
                  thumbColor="#ffffff"
                />
              </View>

              {/* Navigate to Sangh & Full Settings */}
              <TouchableOpacity
                onPress={handleNavigateToMore}
                activeOpacity={0.8}
                className="flex-row items-center justify-between bg-[#f0f3ff] p-3.5 rounded-xl border border-[#dee8ff] mt-1"
              >
                <Text className="text-[#903f00] font-bold text-base">
                  {t('more.title', 'विस्तृत संघ दर्शन एवं सेटिंग्स खोलें')}
                </Text>
                <ChevronRight size={18} color="#903f00" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
