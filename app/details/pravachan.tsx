import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import WhatsAppStatusModal from '../../src/components/common/WhatsAppStatusModal';
import { useLanguage } from '../../src/context/LanguageContext';
import {
  ArrowLeft,
  Play,
  Pause,
  Share2,
  Sparkles,
  Download,
  Clock,
  Eye,
  MapPin,
  Volume2,
  Maximize2,
  Calendar,
  CheckCircle2,
  Bookmark,
  ChevronRight,
} from 'lucide-react-native';

export default function PravachanDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t, isEnglish } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '1.25x' | '1.5x'>('1x');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [audioOnlyMode, setAudioOnlyMode] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const title =
    (params.title as string) ||
    (isEnglish
      ? 'Morning Amrit Discourse — Tattvartha Sutra Exposition (Part 42)'
      : 'प्रातःकालीन अमृत प्रवचन — तत्त्वार्थ सूत्र महाग्रंथ व्याख्यान (भाग 42)');
  const date = (params.date as string) || '12 Feb 2025';
  const tag = (params.tag as string) || (isEnglish ? 'Tattvartha Sutra' : 'तत्त्वार्थ सूत्र');
  const duration = (params.duration as string) || (isEnglish ? '52 mins' : '52 मिनट');
  const views = (params.views as string) || '3,420';

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🌸 पूज्य आचार्य श्री 108 विभव सागर जी महाराज का अमृत प्रवचन:\n"${title}"\n\nछत्र छाया ऐप पर सुनें ও देखें:\nhttps://chhatrachhaya.org/pravachan`,
        title: 'अमृत प्रवचन - छत्र छाया',
      });
    } catch {
      Alert.alert('शेयर', 'शेयर संवाद खोला नहीं जा सका।');
    }
  };

  const handleDownload = () => {
    Alert.alert('ऑफ़लाइन डाउनलोड', `'${title}' को ऑफ़लाइन सुनने हेतु आपकी डिवाइस में डाउनलोड किया जा रहा है...`);
  };

  const relatedPravachans = [
    {
      id: '2',
      title: 'कर्म सिद्धांत एवं पूर्व जन्म के संस्कार (भाग 41)',
      date: '11 Feb 2025',
      duration: '46 min',
      tag: 'कर्म सिद्धान्त',
    },
    {
      id: '3',
      title: 'दशलक्षण महापर्व: उत्तम क्षमा धर्म विवेचन',
      date: '10 Feb 2025',
      duration: '64 min',
      tag: 'पर्व विवेचन',
    },
    {
      id: '4',
      title: 'समयसार गाथा 38-40: शुद्ध ज्ञानानंद आत्मा',
      date: '09 Feb 2025',
      duration: '50 min',
      tag: 'समयसार',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9ff]" edges={['top', 'left', 'right']}>
      {/* Top Navigation Bar */}
      <View className="bg-white/95 px-4 py-3 flex-row items-center justify-between border-b border-[#dee8ff] shadow-xs">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
          activeOpacity={0.8}
        >
          <ArrowLeft size={20} color="#903f00" />
        </TouchableOpacity>

        <Text className="text-[#903f00] font-bold text-lg flex-1 text-center mx-2" numberOfLines={1}>
          {isEnglish ? 'Discourse Details' : 'अमृत प्रवचन विवरण'}
        </Text>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => setIsBookmarked(!isBookmarked)}
            className="w-11 h-11 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
          >
            <Bookmark size={18} color={isBookmarked ? '#903f00' : '#564338'} fill={isBookmarked ? '#903f00' : 'none'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            className="w-11 h-11 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
          >
            <Share2 size={18} color="#903f00" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
        {/* ================= 1. VIDEO / AUDIO PLAYER HERO ================= */}
        <View className="bg-[#263143] rounded-2xl overflow-hidden aspect-video relative items-center justify-center shadow-md mb-4">
          <Image
            source={require('../../assets/images/live_darshan_stream.png')}
            className="w-full h-full absolute inset-0 opacity-80"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/45" />

          {/* Central Play/Pause */}
          <TouchableOpacity
            onPress={() => setIsPlaying(!isPlaying)}
            activeOpacity={0.85}
            className="w-16 h-16 rounded-full bg-[#b45309] items-center justify-center shadow-2xl active:scale-95"
          >
            {isPlaying ? (
              <Pause size={28} color="#FFFFFF" fill="#FFFFFF" />
            ) : (
              <Play size={28} color="#FFFFFF" fill="#FFFFFF" className="ml-1" />
            )}
          </TouchableOpacity>

          {/* Progress Overlay bar */}
          <View className="absolute bottom-0 left-0 right-0 bg-black/75 px-4 py-2 flex-row items-center justify-between">
            <Text className="text-white text-xs font-bold">14:20 / {duration}</Text>
            <View className="flex-1 mx-3 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <View className="w-1/3 h-full bg-[#b45309]" />
            </View>
            <TouchableOpacity
              onPress={() =>
                setPlaybackSpeed(playbackSpeed === '1x' ? '1.25x' : playbackSpeed === '1.25x' ? '1.5x' : '1x')
              }
              className="bg-white/20 px-2 py-0.5 rounded"
            >
              <Text className="text-white text-xs font-bold">{playbackSpeed}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Player Controls Bar */}
        <View className="flex-row items-center justify-between bg-white p-3 rounded-xl border border-[#dee8ff] mb-4 shadow-xs">
          <TouchableOpacity
            onPress={() => setAudioOnlyMode(!audioOnlyMode)}
            className={`flex-row items-center gap-2 px-3 py-2 rounded-lg ${
              audioOnlyMode ? 'bg-[#903f00]' : 'bg-[#f0f3ff]'
            }`}
          >
            <Volume2 size={16} color={audioOnlyMode ? '#FFFFFF' : '#903f00'} />
            <Text className={`text-xs font-bold ${audioOnlyMode ? 'text-white' : 'text-[#903f00]'}`}>
              {audioOnlyMode ? 'केवल ऑडियो मोड सक्रिय' : 'ऑडियो मोड'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDownload}
            className="flex-row items-center gap-1.5 bg-[#f0f3ff] px-3 py-2 rounded-lg border border-[#dee8ff]"
          >
            <Download size={16} color="#564338" />
            <Text className="text-[#564338] text-xs font-bold">डाउनलोड (MP3)</Text>
          </TouchableOpacity>
        </View>

        {/* ================= 2. TITLE & META INFORMATION ================= */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          <View className="flex-row items-center gap-2 mb-2">
            <View className="bg-[#ffdbca] px-2.5 py-1 rounded">
              <Text className="text-[#903f00] font-bold text-xs">{tag}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Calendar size={13} color="#564338" />
              <Text className="text-[#564338] text-xs font-medium">{date}</Text>
            </View>
          </View>

          <Text className="text-[#111c2d] font-bold text-xl leading-7 mb-2">
            {title}
          </Text>

          <View className="flex-row items-center gap-2 mb-3">
            <MapPin size={16} color="#564338" />
            <Text className="text-[#564338] text-sm">
              पूज्य आचार्य श्री 108 विभव सागर जी महाराज • मानसरोवर, जयपुर
            </Text>
          </View>

          <View className="flex-row items-center gap-4 pt-3 border-t border-[#f0f3ff]">
            <View className="flex-row items-center gap-1.5">
              <Clock size={15} color="#564338" />
              <Text className="text-[#564338] text-xs font-semibold">{duration}</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Eye size={15} color="#564338" />
              <Text className="text-[#564338] text-xs font-semibold">{views} श्रोतागण</Text>
            </View>
          </View>
        </View>

        {/* ================= 3. 2-MINUTE AI SUMMARY BREAKDOWN ================= */}
        <View className="bg-[#ffdbca] p-5 rounded-2xl border border-[#b45309]/20 mb-4 shadow-xs">
          <View className="flex-row items-center gap-2.5 mb-3">
            <View className="w-8 h-8 rounded-full bg-[#903f00] items-center justify-center">
              <Sparkles size={16} color="#FFFFFF" />
            </View>
            <View>
              <Text className="font-bold text-[#331200] text-lg">
                2-मिनट एआई प्रवचन सार (AI Summary)
              </Text>
              <Text className="text-[#763300] text-xs font-medium">
                त्वरित स्वाध्याय सूत्र • Google Gemini AI द्वारा संकलित
              </Text>
            </View>
          </View>

          <View className="gap-2.5">
            <View className="bg-white/90 p-3.5 rounded-xl border border-white/60">
              <Text className="text-[#903f00] font-bold text-sm mb-1">
                1. सम्यक दर्शन एवं आंतरिक निर्मलता:
              </Text>
              <Text className="text-[#111c2d] text-sm leading-6">
                सम्यक दर्शन के बिना किया गया बाह्य तप केवल कायाक्लेश है; आत्मा के सहज स्वभाव को पहचानना ही मोक्षमार्ग का पहला कदम है।
              </Text>
            </View>

            <View className="bg-white/90 p-3.5 rounded-xl border border-white/60">
              <Text className="text-[#903f00] font-bold text-sm mb-1">
                2. कषाय उपशमन व मौन साधना:
              </Text>
              <Text className="text-[#111c2d] text-sm leading-6">
                क्रोध और मान कषाय को शांत करने हेतु प्रतिदिन 10 मिनट मौन व आत्मनिरीक्षण अनिवार्य करें। इससे कर्म बंध में भारी कमी आती है।
              </Text>
            </View>

            <View className="bg-white/90 p-3.5 rounded-xl border border-white/60">
              <Text className="text-[#903f00] font-bold text-sm mb-1">
                3. गृहस्थ जीवन में न्यायोपार्जित दान:
              </Text>
              <Text className="text-[#111c2d] text-sm leading-6">
                गृहस्थ जीवन में न्यायोपार्जित धन और दान का संतुलन ही धर्म की नींव है। पात्र दान से धन की शुद्धि होती है।
              </Text>
            </View>

            {/* WhatsApp Status Creation Button */}
            <TouchableOpacity
              onPress={() => setStatusModalVisible(true)}
              activeOpacity={0.85}
              className="bg-white min-h-[48px] rounded-xl flex-row items-center justify-center gap-2 px-4 py-3 mt-1 border border-[#903f00]/30 shadow-xs active:bg-[#fff5ee]"
            >
              <Share2 size={16} color="#903f00" />
              <Text className="text-[#903f00] font-bold text-sm">
                व्हाट्सएप स्टेटस बनाएं (Share Status Image)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= 4. PRAVACHAN TRANSCRIPT & SUTRAS ================= */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          <Text className="text-[#111c2d] font-bold text-lg mb-2">
            प्रवचन मुख्य अंश (Key Verses & Quotes)
          </Text>
          <View className="bg-[#f0f3ff] p-4 rounded-xl border-l-4 border-[#903f00] mb-3">
            <Text className="text-[#903f00] font-bold text-base italic mb-1">
              "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः"
            </Text>
            <Text className="text-[#564338] text-sm leading-6">
              — तत्त्वार्थ सूत्र प्रथम अध्याय, सूत्र 1
            </Text>
          </View>
          <Text className="text-[#564338] text-base leading-7">
            आचार्य श्री ने स्पष्ट किया कि दर्शन, ज्ञान और चारित्र — तीनों की एकता ही मोक्ष का मार्ग है। केवल जानने से कल्याण नहीं होगा, जब तक कि उस ज्ञान को आचरण में न उतारा जाए।
          </Text>
        </View>

        {/* ================= 5. RELATED PRAVACHANS ================= */}
        <View className="mb-6">
          <Text className="text-[#111c2d] font-bold text-lg mb-3">
            शृंखला के अन्य प्रवचन (Related Lectures)
          </Text>
          {relatedPravachans.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/details/pravachan?title=${encodeURIComponent(item.title)}&date=${encodeURIComponent(item.date)}&tag=${encodeURIComponent(item.tag)}&duration=${encodeURIComponent(item.duration)}`)}
              className="bg-white p-4 rounded-xl border border-[#dee8ff] mb-2.5 flex-row items-center justify-between shadow-xs active:bg-[#f0f3ff]"
            >
              <View className="flex-1 mr-2">
                <Text className="text-[#903f00] font-semibold text-xs mb-0.5">{item.tag} • {item.date}</Text>
                <Text className="text-[#111c2d] font-bold text-sm" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text className="text-[#564338] text-xs mt-1">{item.duration}</Text>
              </View>
              <View className="w-9 h-9 rounded-full bg-[#f0f3ff] items-center justify-center">
                <ChevronRight size={18} color="#903f00" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="h-10" />
      </ScrollView>

      {/* WhatsApp Status Image Creation Modal */}
      <WhatsAppStatusModal
        visible={statusModalVisible}
        onClose={() => setStatusModalVisible(false)}
        title={title}
        date={date}
        author="पूज्य आचार्य श्री 108 विभव सागर जी महाराज"
        summaryLines={[
          'सम्यक दर्शन के बिना किया गया बाह्य तप केवल कायाक्लेश है; आत्मा के सहज स्वभाव को पहचानना ही मोक्षमार्ग का पहला कदम है।',
          'क्रोध और मान कषाय को शांत करने हेतु प्रतिदिन 10 मिनट मौन व आत्मनिरीक्षण अनिवार्य करें। इससे कर्म बंध में भारी कमी आती है।',
          'गृहस्थ जीवन में न्यायोपार्जित धन और दान का संतुलन ही धर्म की नींव है। पात्र दान से धन की शुद्धि होती है।',
        ]}
      />
    </SafeAreaView>
  );
}
