import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  Sun,
  Sunset,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react-native';
import { useLanguage } from '../../src/context/LanguageContext';

export default function PanchangDetailScreen() {
  const router = useRouter();
  const { isEnglish, t } = useLanguage();

  const [activePachkhan, setActivePachkhan] = useState<number | null>(null);
  const [playingPachkhanAudio, setPlayingPachkhanAudio] = useState<number | null>(null);
  const [pledgedPachkhan, setPledgedPachkhan] = useState<Record<number, boolean>>({});

  const handleSharePanchang = async () => {
    try {
      await Share.share({
        message: isEnglish
          ? '☀️ *Daily Jain Panchang & Pachkhan Timings — Today*\n\n' +
            '• Veer Nirvana Samvat: 2551 | Vikram Samvat: 2081\n' +
            '• Tithi: Magh Shukla Dashami (Wednesday)\n' +
            '• Sunrise: 06:48 AM | Sunset: 06:12 PM\n' +
            '• Navkarsi: 07:36 AM (48 mins after sunrise)\n' +
            '• Chauvihar: 06:02 PM (10 mins before sunset)\n\n' +
            'Take daily spiritual vows on Chhatra Chhaya app:\nhttps://chhatrachhaya.org/panchang'
          : '☀️ *दैनिक जैन पंचांग एवं पचक्खाण समय — आज*\n\n' +
            '• वीर निर्वाण संवत्: 2551 | विक्रम संवत्: 2081\n' +
            '• तिथि: माघ शुक्ल दशमी (बुधवार)\n' +
            '• सूर्योदय: 06:48 AM | सूर्यास्त: 06:12 PM\n' +
            '• नवकारसी: 07:36 AM (सूर्योदय के 48 मिनट बाद)\n' +
            '• चौविहार समाप्ति: सायं 06:02 PM (सूर्यास्त से 10 मिनट पूर्व)\n\n' +
            'दैनिक पचक्खाण ग्रहण करने हेतु छत्र छाया ऐप देखें:\nhttps://chhatrachhaya.org/panchang',
        title: isEnglish ? 'Daily Jain Panchang' : 'दैनिक जैन पंचांग',
      });
    } catch {
      Alert.alert(isEnglish ? 'Share' : 'शेयर', isEnglish ? 'Unable to open share sheet' : 'शेयर संवाद खोला नहीं जा सका');
    }
  };

  const pachkhans = [
    {
      id: 1,
      title: isEnglish ? 'Navkarsi Vow (नवकारसी पचक्खाण)' : 'नवकारसी पचक्खाण (Navkarsi Vow)',
      timing: isEnglish ? '48 mins after sunrise (until 07:36 AM)' : 'सूर्योदय से 48 मिनट पश्चात् (07:36 AM तक)',
      prakrit: 'उग्गए सूरे णमुक्कारसहिअं पच्चक्खाइ (अन्नत्थणाभोगेणं, सहसागारेणं, महत्तरागारेणं, सव्वसमाहि-वत्तियागारेणं वोसिरइ)।',
      hindi: isEnglish
        ? 'Refrain from food and water for 48 minutes after sunrise, then break fast after chanting the Navkar Mantra.'
        : 'सूर्योदय होने के 48 मिनट (एक घड़ी) तक अन्न-जल का त्याग करना और नवकार मंत्र गिनकर ही मुखवास लेना।',
    },
    {
      id: 2,
      title: isEnglish ? 'Porshi Vow (पोरसी पचक्खाण)' : 'पोरसी पचक्खाण (Porshi Vow)',
      timing: isEnglish ? '3 hours after sunrise (until 09:48 AM)' : 'सूर्योदय से 3 घंटे पश्चात् (09:48 AM तक)',
      prakrit: 'उग्गए सूरे पोरिसिं पच्चक्खाइ (अन्नत्थणाभोगेणं, सहसागारेणं, पच्छन्नकालेणं, महत्तरागारेणं सव्वसमाहिवत्तियागारेणं वोसिरइ)।',
      hindi: isEnglish
        ? 'Refrain from all four types of food and drink through the first quarter of daylight.'
        : 'दिन के प्रथम प्रहर (दिनमान के चौथे भाग) तक चारों प्रकार के आहार-पानी का त्याग रखना।',
    },
    {
      id: 3,
      title: isEnglish ? 'Ekashan Vow (एकाशन पचक्खाण)' : 'एकाशन पचक्खाण (Ekashan Vow)',
      timing: isEnglish ? 'Taking meal only once in a single posture' : 'दिन में केवल एक बार बैठकर भोजन',
      prakrit: 'एगासणं पच्चक्खाइ, तिविहंपि आहारं असणं पाणं खाइमं, अन्नत्थणाभोगेणं सहसागारेणं सागारिअ-वत्तियागारेणं वोसिरइ।',
      hindi: isEnglish
        ? 'Having pure sattvic food only once in a single seating posture throughout the day.'
        : 'दिन में एक ही आसन पर बैठकर सात्विक भोजन ग्रहण करना। उठने के पश्चात् उस दिन पुनः अन्न न लेना।',
    },
    {
      id: 4,
      title: isEnglish ? 'Chauvihar Vow (चौविहार पचक्खाण)' : 'चौविहार पचक्खाण (Chauvihar Vow)',
      timing: isEnglish ? 'From before sunset until next day sunrise' : 'सूर्यास्त पूर्व से अगले दिन सूर्योदय तक',
      prakrit: 'दिवसपच्चक्खाणं सम्मत्तं, चउव्विहंपि आहारं असणं पाणं खाइमं साइमं अन्नत्थणाभोगेणं वोसिरइ।',
      hindi: isEnglish
        ? 'Total abstention from all four types of food and drink from before sunset until sunrise.'
        : 'सूर्यास्त से पूर्व चारों प्रकार के आहार (अन्न, जल, मुखवास, औषधि) का सर्वथा त्याग करना। यह जैन धर्म का परम आवश्यक नियम है।',
    },
  ];

  const handlePledge = (id: number, title: string) => {
    setPledgedPachkhan((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (!pledgedPachkhan[id]) {
      Alert.alert(
        isEnglish ? 'Vow Accepted ✓' : 'पचक्खाण स्वीकृत ✓',
        isEnglish ? `You have pledged the vow '${title}'. May your spiritual discipline bear fruit!` : `आपने '${title}' का पावन नियम ग्रहण किया। आपकी आत्मसाधना मंगलकारी हो!`
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9ff]" edges={['top', 'left', 'right']}>
      {/* Top Header Bar */}
      <View className="bg-white/95 px-4 py-3 flex-row items-center justify-between border-b border-[#dee8ff] shadow-xs">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
        >
          <ArrowLeft size={20} color="#903f00" />
        </TouchableOpacity>

        <Text className="text-[#903f00] font-bold text-lg flex-1 text-center mx-2" numberOfLines={1}>
          {isEnglish ? 'Jain Panchang & Pachkhan' : 'जैन पंचांग एवं पचक्खाण'}
        </Text>

        <TouchableOpacity
          onPress={handleSharePanchang}
          className="w-11 h-11 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
        >
          <Share2 size={18} color="#903f00" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
        {/* ================= 1. TODAY'S TITHI HERO CARD ================= */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] shadow-sm mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="bg-[#ffdbca] px-3 py-1 rounded-full">
              <Text className="text-[#903f00] font-bold text-xs">
                {isEnglish ? 'Veer Nirvana Samvat 2551' : 'वीर निर्वाण संवत् 2551'}
              </Text>
            </View>
            <Text className="text-[#564338] text-xs font-semibold">
              {isEnglish ? 'Vikram Samvat 2081' : 'विक्रम संवत् 2081'}
            </Text>
          </View>

          <Text className="text-[#111c2d] font-bold text-2xl leading-8 mb-1">
            {isEnglish ? 'Magh Shukla Dashami (Wednesday)' : 'माघ शुक्ल दशमी (बुधवार)'}
          </Text>
          <Text className="text-[#564338] text-sm mb-4">
            {isEnglish
              ? 'Nakshatra: Rohini | Yoga: Brahma | Karana: Taitila'
              : 'नक्षत्र: रोहिणी | योग: ब्रह्म | करण: तैतिल'}
          </Text>

          {/* Sun Times 2x2 Grid */}
          <View className="bg-[#f0f3ff] p-4 rounded-xl border border-[#dee8ff]">
            <View className="flex-row items-center justify-between pb-3 border-b border-[#dee8ff]">
              <View className="flex-row items-center gap-2">
                <Sun size={20} color="#d97706" />
                <View>
                  <Text className="text-[#564338] text-xs">
                    {isEnglish ? 'Sunrise' : 'सूर्योदय (Sunrise)'}
                  </Text>
                  <Text className="text-[#111c2d] font-bold text-base">06:48 AM</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-2">
                <Sunset size={20} color="#ea580c" />
                <View>
                  <Text className="text-[#564338] text-xs">
                    {isEnglish ? 'Sunset' : 'सूर्यास्त (Sunset)'}
                  </Text>
                  <Text className="text-[#111c2d] font-bold text-base">06:12 PM</Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center justify-between pt-3">
              <View>
                <Text className="text-[#564338] text-xs">
                  {isEnglish ? 'Navkarsi Time' : 'नवकारसी समय'}
                </Text>
                <Text className="text-[#903f00] font-bold text-sm">07:36 AM</Text>
              </View>
              <View>
                <Text className="text-[#564338] text-xs">
                  {isEnglish ? 'Chauvihar Time' : 'चौविहार समय'}
                </Text>
                <Text className="text-[#ba1a1a] font-bold text-sm">
                  {isEnglish ? 'Evening 06:02 PM' : 'सायं 06:02 PM'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ================= 2. TITHI SIGNIFICANCE & PARVA ================= */}
        <View className="bg-[#ffd9e1]/40 p-4 rounded-2xl border border-[#a5345d]/20 mb-4">
          <View className="flex-row items-center gap-2 mb-2">
            <Sparkles size={18} color="#a5345d" />
            <Text className="text-[#a5345d] font-bold text-base">
              {isEnglish ? "Today's Sacred Rule & Holy Parva" : 'आज का धार्मिक नियम व पर्व विचार'}
            </Text>
          </View>
          <Text className="text-[#111c2d] text-sm leading-6 mb-2">
            {isEnglish ? (
              <>
                Today is Shukla Dashami. Upcoming day after tomorrow is{' '}
                <Text className="font-bold text-[#a5345d]">Magh Shukla Dvadashi and Chaturdashi Parva</Text>. Practicing green vegetable restraint and evening Ekashan brings profound merit.
              </>
            ) : (
              <>
                आज शुक्ल दशमी है। आगामी परसों <Text className="font-bold text-[#a5345d]">माघ शुक्ल द्वादशी एवं चतुर्दशी पर्व</Text> आ रहा है। आज हरी सब्जी की मर्यादा एवं संध्या काल में एकासन का नियम पालन अति पुण्यकारी है।
              </>
            )}
          </Text>
          <View className="bg-white/80 p-2.5 rounded-lg">
            <Text className="text-[#564338] text-xs font-semibold">
              {isEnglish
                ? 'Follow night-eating restraint (Ratri-Bhojan Tyag). Filter and boil drinking water before sunset.'
                : 'रात्रि भोजन त्याग का पालन अवश्य करें। पानी सूर्यास्त से पूर्व छानकर प्रासुक कर लें।'}
            </Text>
          </View>
        </View>

        {/* ================= 3. PACHKHAN RECITATION CARDS ================= */}
        <View className="mb-6">
          <Text className="text-[#111c2d] font-bold text-xl mb-3">
            {isEnglish ? 'Daily Pachkhan Recitation & Vows' : 'नित्य पचक्खाण पाठ व संकल्प (Daily Vows)'}
          </Text>

          <View className="gap-3">
            {pachkhans.map((pach) => {
              const isPledged = pledgedPachkhan[pach.id];
              const isAudioPlaying = playingPachkhanAudio === pach.id;

              return (
                <View
                  key={pach.id}
                  className="bg-white p-5 rounded-2xl border border-[#dee8ff] shadow-xs"
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <View className="flex-1 mr-2">
                      <Text className="text-[#111c2d] font-bold text-base leading-6 mb-1">
                        {pach.title}
                      </Text>
                      <View className="flex-row items-center gap-1.5">
                        <Clock size={13} color="#903f00" />
                        <Text className="text-[#903f00] text-xs font-semibold">{pach.timing}</Text>
                      </View>
                    </View>

                    {/* Audio Recitation button */}
                    <TouchableOpacity
                      onPress={() => {
                        if (isAudioPlaying) {
                          setPlayingPachkhanAudio(null);
                        } else {
                          setPlayingPachkhanAudio(pach.id);
                          Alert.alert(
                            isEnglish ? 'Pachkhan Audio' : 'पचक्खाण वाचन',
                            isEnglish ? `Playing sacred Prakrit audio recitation for '${pach.title}' 🎧` : `'${pach.title}' का शुद्ध प्राकृत उच्चारण वाचन चालू है 🎧`
                          );
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
                    >
                      {isAudioPlaying ? (
                        <Volume2 size={18} color="#903f00" />
                      ) : (
                        <VolumeX size={18} color="#564338" />
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Sacred Prakrit Text */}
                  <View className="bg-[#fff8f3] p-3 rounded-xl border border-[#ffdbca] mb-2.5">
                    <Text className="text-[#903f00] font-bold text-sm leading-6 italic">
                      "{pach.prakrit}"
                    </Text>
                  </View>

                  {/* Hindi Meaning */}
                  <Text className="text-[#564338] text-xs leading-5 mb-4">{pach.hindi}</Text>

                  {/* Pledge CTA */}
                  <TouchableOpacity
                    onPress={() => handlePledge(pach.id, pach.title)}
                    activeOpacity={0.8}
                    className={`min-h-[48px] rounded-xl items-center justify-center flex-row gap-2 ${
                      isPledged
                        ? 'bg-emerald-600'
                        : 'bg-[#903f00] active:bg-[#763300]'
                    }`}
                  >
                    <CheckCircle2 size={18} color="#FFFFFF" />
                    <Text className="text-white font-bold text-sm">
                      {isPledged
                        ? (isEnglish ? 'Vow Pledged ✓' : 'नियम ग्रहण किया गया ✓ (Pledged)')
                        : (isEnglish ? 'Take this Vow (Pledge)' : 'यह पचक्खाण ग्रहण करें (Take Vow)')}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
