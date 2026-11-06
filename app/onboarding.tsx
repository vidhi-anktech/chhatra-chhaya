// ==============================================================================
// ONBOARDING & REGISTRATION SCREEN (सरल एवं सुगम पंजीकरण)
// Matching UI Mockup: media_1793603261738.png
// 1. Step 1: Language Selection (Hindi [Default] / English / Gujarati)
// 2. Step 2: Devotee Profile (Name, Age, City) — NO PASSWORD / OTP!
// 3. Live Anumodna info callout
// 4. Primary CTA: 'ऐप में प्रवेश करें (Enter App) ➔' (Terracotta #A24B0C)
// 5. Bottom floating box for Sangh/Trust Admin login
// ==============================================================================

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUserStore } from '../src/store/useUserStore';
import { useLanguage } from '../src/context/LanguageContext';
import { Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react-native';

export default function OnboardingScreen() {
  const router = useRouter();
  const { setLanguage, language, t, isEnglish } = useLanguage();
  const { registerDevotee } = useUserStore();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [notificationsAllowed, setNotificationsAllowed] = useState(true);

  const handleRegister = async () => {
    await registerDevotee({
      name: name || (isEnglish ? 'Devotee' : 'श्रावक'),
      age: Number(age) || 50,
      city: city || (isEnglish ? 'Indore' : 'इंदौर'),
      notificationsAllowed,
    });
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9ff]" edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Top Decorative Serenity Header */}
        <View className="bg-[#f0f3ff] pb-8 pt-6 px-5 rounded-b-2xl shadow-xs border-b border-[#dee8ff] items-center relative overflow-hidden">
          <View className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#ffdbca] opacity-30 blur-2xl pointer-events-none" />
          <View className="absolute bottom-0 -left-12 w-40 h-40 rounded-full bg-[#ffd9e1] opacity-25 blur-2xl pointer-events-none" />

          {/* Spiritual Emblem / Mangal Kalash */}
          <View className="w-20 h-20 rounded-full bg-white p-1 shadow-sm items-center justify-center border border-[#ddc1b3] mb-3">
            <View className="w-full h-full rounded-full overflow-hidden items-center justify-center">
              <Image
                source={require('../assets/images/mangal_kalash.png')}
                className="w-16 h-16"
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Trust Badge */}
          <View className="bg-[#e7eeff] px-3.5 py-1 rounded-full mb-3 shadow-2xs">
            <Text className="text-[#564338] text-xs font-semibold tracking-wide">
              {isEnglish
                ? 'Acharya Shri 108 Vibhav Sagar Ji Maharaj Sasangh'
                : 'आचार्य श्री 108 विभव सागर जी महाराज ससंघ'}
            </Text>
          </View>

          <Text className="text-[#111c2d] text-2xl font-bold text-center">
            {isEnglish ? 'Jai Jinendra 🙏' : 'जय जिनेन्द्र 🙏'}
          </Text>
          <Text className="text-[#903f00] text-xl font-bold text-center mb-1">
            {t('onboarding.title', 'छत्र छाया में आपका स्वागत है')}
          </Text>
          <Text className="text-[#a5345d] text-base font-semibold text-center mb-3">
            {isEnglish ? 'Easy & Simple Registration' : 'सरल एवं सुगम पंजीकरण'}
          </Text>

          <View className="bg-[#dee8ff] flex-row items-center px-3 py-1.5 rounded-lg border border-[#c7d8ff]">
            <Check size={16} color="#903F00" />
            <Text className="text-[#564338] text-sm font-semibold ml-1.5">
              {isEnglish
                ? 'No password or OTP required!'
                : 'कोई पासवर्ड या OTP की आवश्यकता नहीं!'}
            </Text>
          </View>
        </View>

        <View className="px-5 pt-6 pb-10 space-y-6">
          {/* STEP 1: LANGUAGE SELECTION */}
          <View className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-xs mb-5">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-7 h-7 rounded-full bg-[#b45309] items-center justify-center">
                <Text className="text-white font-bold text-sm">1</Text>
              </View>
              <Text className="text-[#111c2d] font-bold text-lg">
                अपनी भाषा चुनें (Choose Language)
              </Text>
            </View>

            <View className="gap-3">
              {/* Hindi Option */}
              <TouchableOpacity
                onPress={() => setLanguage('hi')}
                className={`p-4 rounded-xl flex-row items-center justify-between min-h-[56px] border ${
                  language === 'hi' ? 'bg-[#ffdbca] border-[#fdba74]' : 'bg-[#f0f3ff] border-[#dee8ff]'
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">🕉️</Text>
                  <View>
                    <Text className="text-[#903f00] font-bold text-lg">हिंदी</Text>
                    <Text className="text-[#763300] text-xs font-medium">मुख्य भाषा (Default)</Text>
                  </View>
                </View>
                {language === 'hi' && (
                  <View className="w-8 h-8 rounded-full bg-[#903f00] items-center justify-center shadow-xs">
                    <Check size={18} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>

              {/* English Option */}
              <TouchableOpacity
                onPress={() => setLanguage('en')}
                className={`p-4 rounded-xl flex-row items-center justify-between min-h-[56px] border ${
                  language === 'en' ? 'bg-[#ffdbca] border-[#fdba74]' : 'bg-[#f0f3ff] border-[#dee8ff]'
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">📖</Text>
                  <View>
                    <Text className="text-[#111c2d] font-bold text-lg">English</Text>
                    <Text className="text-[#564338] text-xs font-medium">International Shravak</Text>
                  </View>
                </View>
                {language === 'en' && (
                  <View className="w-8 h-8 rounded-full bg-[#903f00] items-center justify-center shadow-xs">
                    <Check size={18} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Text className="text-[#564338] text-xs mt-3">
              💡 आप इसे बाद में भी सेटिंग्स से सरलता से बदल सकते हैं।
            </Text>
          </View>

          {/* STEP 2: DEVOTEE DETAILS */}
          <View className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-xs mb-5">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-7 h-7 rounded-full bg-[#b45309] items-center justify-center">
                <Text className="text-white font-bold text-sm">2</Text>
              </View>
              <Text className="text-[#111c2d] font-bold text-lg">
                {t('onboarding.devoteeDetails', 'श्रावक / श्राविका विवरण')}
              </Text>
            </View>

            {/* Full Name */}
            <View className="mb-4">
              <Text className="text-[#111c2d] font-semibold text-base mb-1.5">
                {isEnglish ? 'Full Name' : 'पूरा नाम (Full Name)'} <Text className="text-[#a5345d]">*</Text>
              </Text>
              <TextInput
                placeholder={isEnglish ? 'e.g. Smt. Vimla Jain' : 'उदा. श्रीमती विमला जैन'}
                placeholderTextColor="#897267"
                value={name}
                onChangeText={setName}
                className="bg-[#f0f3ff] min-h-[56px] px-4 rounded-xl text-[#111c2d] text-base border border-[#dee8ff]"
              />
            </View>

            {/* Age */}
            <View className="mb-4">
              <View className="flex-row items-center gap-2 mb-1.5">
                <Text className="text-[#111c2d] font-semibold text-base">{isEnglish ? 'Age' : 'आयु (Age)'}</Text>
                <Text className="text-[#564338] text-xs font-medium">
                  {isEnglish ? '(For accessibility scaling)' : '(सुगम अक्षरों के अनुकूलन हेतु)'}
                </Text>
              </View>
              <TextInput
                placeholder={isEnglish ? 'e.g. 56 years' : 'उदा. 56 वर्ष'}
                placeholderTextColor="#897267"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                className="bg-[#f0f3ff] min-h-[56px] px-4 rounded-xl text-[#111c2d] text-base border border-[#dee8ff]"
              />
            </View>

            {/* City */}
            <View className="mb-4">
              <Text className="text-[#111c2d] font-semibold text-base mb-1.5">
                {isEnglish ? 'City / Place' : 'नगर / शहर (City / Place)'} <Text className="text-[#a5345d]">*</Text>
              </Text>
              <TextInput
                placeholder={isEnglish ? 'e.g. Indore, Madhya Pradesh' : 'उदा. इंदौर, मध्य प्रदेश'}
                placeholderTextColor="#897267"
                value={city}
                onChangeText={setCity}
                className="bg-[#f0f3ff] min-h-[56px] px-4 rounded-xl text-[#111c2d] text-base border border-[#dee8ff]"
              />
            </View>

            {/* Anumodna Wall Blessing Explanation Card */}
            <View className="bg-[#f0f3ff] p-4 rounded-xl border border-[#dee8ff] mb-4 flex-row gap-3">
              <View className="w-10 h-10 rounded-full bg-[#e7eeff] items-center justify-center">
                <Heart size={20} color="#903F00" />
              </View>
              <View className="flex-1">
                <Text className="text-[#a5345d] font-bold text-sm mb-1">
                  {isEnglish ? 'Collective Spiritual Anumodna' : 'सामूहिक आध्यात्मिक अनुमोदना'}
                </Text>
                <Text className="text-[#111c2d] text-sm leading-5">
                  {isEnglish
                    ? 'Your name will appear on the Daily Niyam & Anumodna Wall so that blessings of the entire Sangh reach you.'
                    : 'आपका शुभ नाम दैनिक नियम एवं अनुमोदना बोर्ड पर प्रदर्शित होगा, जिससे समस्त संघ की मंगल भावनाएं आपको प्राप्त होंगी।'}
                </Text>
              </View>
            </View>

            {/* Devotional Affirmation Checkbox */}
            <TouchableOpacity
              onPress={() => setNotificationsAllowed(!notificationsAllowed)}
              className="flex-row items-center gap-3 py-2 mb-4"
            >
              <View
                className={`w-6 h-6 rounded items-center justify-center border ${
                  notificationsAllowed ? 'bg-[#903f00] border-[#903f00]' : 'border-[#897267] bg-white'
                }`}
              >
                {notificationsAllowed && <Check size={16} color="#FFFFFF" />}
              </View>
              <Text className="text-[#111c2d] text-sm font-medium flex-1">
                {isEnglish
                  ? 'Yes, notify me about daily discourses and vihar updates'
                  : 'हाँ, मुझे पूज्य गुरुदेव के दैनिक प्रवचन एवं विहार सूचनाएं प्राप्त हों'}
              </Text>
            </TouchableOpacity>

            {/* Primary CTA */}
            <TouchableOpacity
              onPress={handleRegister}
              className="bg-[#b45309] min-h-[56px] px-6 py-4 rounded-xl flex-row items-center justify-center gap-2 shadow-md active:bg-[#903f00]"
            >
              <Text className="text-[#fff1eb] font-bold text-lg">
                {t('onboarding.submit', 'ऐप में प्रवेश करें (Enter App)')}
              </Text>
              <ArrowRight size={20} color="#FFF1EB" />
            </TouchableOpacity>
          </View>

          {/* Acharya Shri Vibhav Sagarji Darshan Preview Card */}
          <View className="bg-[#f0f3ff] p-4 rounded-xl border border-[#dee8ff] flex-row gap-4 items-center shadow-xs mb-5">
            <View className="w-16 h-16 rounded-xl overflow-hidden shadow-xs border border-[#ddc1b3] bg-white">
              <Image
                source={require('../assets/images/guru_darshan_preview.png')}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-[#903f00] font-bold text-xs uppercase tracking-wider mb-0.5">
                आज का पावन विचार
              </Text>
              <Text className="text-[#111c2d] italic text-sm leading-5">
                "अहिंसा और सत्य ही आत्मा का सनातन स्वभाव हैं। सरल मन से किया गया त्याग ही सच्चा धर्म है।"
              </Text>
            </View>
          </View>

          {/* Admin / Sangh Portal Link */}
          <TouchableOpacity
            onPress={() => router.push('/auth/login')}
            className="bg-[#dee8ff] p-4 rounded-xl border border-[#ddc1b3] items-center mb-6 shadow-2xs"
          >
            <View className="flex-row items-center gap-2">
              <ShieldCheck size={18} color="#903F00" />
              <Text className="text-[#111c2d] text-sm font-medium">
                क्या आप संघ / ट्रस्ट प्रबंधक हैं? <Text className="text-[#903f00] font-bold underline">व्यवस्थापक लॉगिन</Text>
              </Text>
            </View>
            <Text className="text-[#897267] text-xs mt-1 text-center">
              आचार्य श्री 108 विभव सागर सेवा ट्रस्ट समिति • नि:शुल्क एवं निष्काम सेवा
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
