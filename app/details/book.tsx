import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Check,
} from 'lucide-react-native';
import { useLanguage } from '../../src/context/LanguageContext';

export default function BookReaderDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isEnglish, t } = useLanguage();

  const title = (params.title as string) || (isEnglish ? 'Tattvartha Sutra' : 'तत्त्वार्थ सूत्र (Tattvartha Sutra)');
  const author = (params.author as string) || (isEnglish ? 'Acharya 108 Umaswami / Commentary: Acharya 108 Vibhav Sagar Ji Maharaj' : 'आचार्य श्री 108 उमास्वामी / टीका: आचार्य श्री 108 विभव सागर जी महाराज');

  const [fontSizeOffset, setFontSizeOffset] = useState(0); // -2 to +6
  const [isNightMode, setIsNightMode] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  // Verses / Gathas for the sacred scripture
  const verses = [
    {
      verseNo: 1,
      sanskrit: 'सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः ॥ 1 ॥',
      translation: 'सम्यक दर्शन, सम्यक ज्ञान और सम्यक चारित्र — इन तीनों की एकता ही मोक्ष का साक्षात मार्ग है।',
      bhavartha:
        'आत्मा का स्वभाव शुद्ध चैतन्य रूप है। जब तक जीव को अपने स्वरूप का यथार्थ श्रद्धान (सम्यग्दर्शन), संशयरहित बोध (सम्यग्ज्ञान) और उसमें स्थिर रहने का आचरण (सम्यक्चारित्र) नहीं होता, तब तक मुक्ति असंभव है। यह तीनों रत्नत्रय मिलकर ही एक मोक्षमार्ग बनाते हैं।',
    },
    {
      verseNo: 2,
      sanskrit: 'तत्त्वार्थश्रद्धानं सम्यग्दर्शनम् ॥ 2 ॥',
      translation: 'जीवादि सात तत्त्वों के यथार्थ स्वरूप का विपरीतता रहित दृढ़ श्रद्धान करना ही सम्यग्दर्शन है।',
      bhavartha:
        'जीव, अजीव, आस्रव, बंध, संवर, निर्जरा और मोक्ष — इन सात तत्त्वों के यथार्थ स्वरूप को बिना किसी संदेह के हृदयंगम करना सम्यक दर्शन कहलाता है।',
    },
    {
      verseNo: 3,
      sanskrit: 'तन्निसर्गादधिगमाद्वा ॥ 3 ॥',
      translation: 'वह सम्यग्दर्शन निसर्ग (स्वाभाविक/पूर्व संस्कार) से अथवा अधिगम (गुरु उपदेश/शास्त्र अध्ययन) से उत्पन्न होता है।',
      bhavartha:
        'किसी भव्य जीव को बिना किसी बाह्य निमित्त के पूर्व जन्म के संस्कारों से स्वतः सम्यकत्व प्रकट हो जाता है, इसे नैसर्गिक कहते हैं। जब यह गुरु देशना या आगम स्वाध्याय से प्राप्त होता है, तो इसे अधिगमज कहते हैं।',
    },
    {
      verseNo: 4,
      sanskrit: 'जीवाजीवास्रवबन्धसंवरनिर्जरामोक्षास्तत्त्वम् ॥ 4 ॥',
      translation: 'जीव, अजीव, आस्रव, बंध, संवर, निर्जरा और मोक्ष — ये सात मूल तत्त्व हैं।',
      bhavartha:
        'जीव चेतनामय है, अजीव चेतनाहीन है। कर्मों का आना आस्रव, आत्मा से बंधना बंध, कर्मों के आने को रोकना संवर, बंधे कर्मों का एकदेश क्षय निर्जरा, और सर्व कर्मों से सर्वथा मुक्ति मोक्ष है।',
    },
  ];

  const currentVerse = verses[currentVerseIndex];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `📖 *${title}* — अध्याय ${currentChapter}, सूत्र ${currentVerse.verseNo}\n\n"${currentVerse.sanskrit}"\n\n*अर्थ:* ${currentVerse.translation}\n\nछत्र छाया डिजिटल पुस्तकालय से स्वाध्याय करें:\nhttps://chhatrachhaya.org/library`,
        title: title,
      });
    } catch {
      Alert.alert('शेयर', 'शेयर नहीं हो सका');
    }
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      Alert.alert('ऑडियो पाठ', `सूत्र ${currentVerse.verseNo} का शुद्ध संस्कृत उच्चारण एवं हिन्दी भावार्थ वाचन प्रारंभ...`);
    }
  };

  const currentFontSize = 18 + fontSizeOffset;

  return (
    <SafeAreaView
      className={`flex-1 ${isNightMode ? 'bg-[#121212]' : 'bg-[#f9f9ff]'}`}
      edges={['top', 'left', 'right']}
    >
      {/* Top Header Bar */}
      <View
        className={`px-4 py-3 flex-row items-center justify-between border-b ${
          isNightMode ? 'bg-[#1e1e1e] border-neutral-800' : 'bg-white border-[#dee8ff]'
        }`}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className={`w-11 h-11 rounded-full items-center justify-center border ${
            isNightMode ? 'bg-[#2a2a2a] border-neutral-700' : 'bg-[#f0f3ff] border-[#dee8ff]'
          }`}
        >
          <ArrowLeft size={20} color={isNightMode ? '#ffdbca' : '#903f00'} />
        </TouchableOpacity>

        <View className="flex-1 items-center mx-2">
          <Text
            className={`font-bold text-base ${isNightMode ? 'text-white' : 'text-[#903f00]'}`}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            className={`text-xs ${isNightMode ? 'text-neutral-400' : 'text-[#564338]'}`}
            numberOfLines={1}
          >
            {isEnglish ? 'Chapter' : 'अध्याय'} {currentChapter} • {isEnglish ? 'Verse' : 'सूत्र'} {currentVerse.verseNo} / {verses.length}
          </Text>
        </View>

        {/* Action Controls */}
        <View className="flex-row items-center gap-1.5">
          <TouchableOpacity
            onPress={() => setIsNightMode(!isNightMode)}
            className={`w-10 h-10 rounded-full items-center justify-center border ${
              isNightMode ? 'bg-[#2a2a2a] border-neutral-700' : 'bg-[#f0f3ff] border-[#dee8ff]'
            }`}
          >
            {isNightMode ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#564338" />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsBookmarked(!isBookmarked)}
            className={`w-10 h-10 rounded-full items-center justify-center border ${
              isNightMode ? 'bg-[#2a2a2a] border-neutral-700' : 'bg-[#f0f3ff] border-[#dee8ff]'
            }`}
          >
            <Bookmark
              size={18}
              color={isBookmarked ? '#903f00' : isNightMode ? '#fff' : '#564338'}
              fill={isBookmarked ? '#903f00' : 'none'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            className={`w-10 h-10 rounded-full items-center justify-center border ${
              isNightMode ? 'bg-[#2a2a2a] border-neutral-700' : 'bg-[#f0f3ff] border-[#dee8ff]'
            }`}
          >
            <Share2 size={18} color={isNightMode ? '#fff' : '#903f00'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Reader Floating Controls Bar (Zoom, Audio, Progress) */}
      <View
        className={`px-4 py-2.5 flex-row items-center justify-between border-b ${
          isNightMode ? 'bg-[#181818] border-neutral-800' : 'bg-[#f0f3ff] border-[#dee8ff]'
        }`}
      >
        {/* Zoom In / Zoom Out */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => setFontSizeOffset(Math.max(-4, fontSizeOffset - 2))}
            className={`px-3 py-1 rounded-md border ${
              isNightMode ? 'bg-[#252525] border-neutral-700' : 'bg-white border-[#dee8ff]'
            }`}
          >
            <Text className={`font-bold text-sm ${isNightMode ? 'text-white' : 'text-[#903f00]'}`}>
              {isEnglish ? 'A-' : 'अ-'}
            </Text>
          </TouchableOpacity>

          <Text className={`text-xs font-semibold ${isNightMode ? 'text-neutral-400' : 'text-[#564338]'}`}>
            {isEnglish ? 'Font Size' : 'फ़ॉन्ट आकार'}
          </Text>

          <TouchableOpacity
            onPress={() => setFontSizeOffset(Math.min(8, fontSizeOffset + 2))}
            className={`px-3 py-1 rounded-md border ${
              isNightMode ? 'bg-[#252525] border-neutral-700' : 'bg-white border-[#dee8ff]'
            }`}
          >
            <Text className={`font-bold text-sm ${isNightMode ? 'text-white' : 'text-[#903f00]'}`}>
              {isEnglish ? 'A+' : 'अ+'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Audio Narration Button */}
        <TouchableOpacity
          onPress={handleToggleAudio}
          className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border ${
            isPlayingAudio
              ? 'bg-[#903f00] border-[#903f00]'
              : isNightMode
              ? 'bg-[#252525] border-neutral-700'
              : 'bg-white border-[#dee8ff]'
          }`}
        >
          {isPlayingAudio ? (
            <Volume2 size={16} color="#FFFFFF" />
          ) : (
            <VolumeX size={16} color={isNightMode ? '#fff' : '#903f00'} />
          )}
          <Text
            className={`text-xs font-bold ${
              isPlayingAudio ? 'text-white' : isNightMode ? 'text-white' : 'text-[#903f00]'
            }`}
          >
            {isPlayingAudio
              ? (isEnglish ? 'Playing Narration' : 'वाचन चल रहा है')
              : (isEnglish ? 'Listen Audio' : 'ऑडियो सुनें')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Scripture Text Content */}
      <ScrollView className="flex-1 px-5 py-4" showsVerticalScrollIndicator={false}>
        {/* Book Info Header Card */}
        <View
          className={`p-4 rounded-2xl border mb-5 ${
            isNightMode ? 'bg-[#1e1e1e] border-neutral-800' : 'bg-white border-[#dee8ff]'
          }`}
        >
          <View className="flex-row items-center gap-2 mb-1">
            <BookOpen size={16} color="#903f00" />
            <Text className="text-[#903f00] font-bold text-xs uppercase tracking-wider">
              {isEnglish ? 'Sacred Agam Scripture Swadhyay' : 'मूल आगम ग्रंथ स्वाध्याय'}
            </Text>
          </View>
          <Text
            className={`font-bold text-xl mb-1 ${isNightMode ? 'text-white' : 'text-[#111c2d]'}`}
          >
            {title}
          </Text>
          <Text className={`text-xs ${isNightMode ? 'text-neutral-400' : 'text-[#564338]'}`}>
            {author}
          </Text>
        </View>

        {/* Sacred Sanskrit / Prakrit Shloka Card */}
        <View
          className={`p-6 rounded-2xl border mb-5 shadow-sm ${
            isNightMode
              ? 'bg-[#221c16] border-[#b45309]/30'
              : 'bg-[#fff8f3] border-[#ffdbca]'
          }`}
        >
          <View className="self-start bg-[#903f00] px-3 py-1 rounded-full mb-4">
            <Text className="text-white text-xs font-bold">
              {isEnglish ? `Verse No. ${currentVerse.verseNo}` : `सूत्र क्रमांक ${currentVerse.verseNo}`}
            </Text>
          </View>

          <Text
            style={{ fontSize: currentFontSize + 4, lineHeight: (currentFontSize + 4) * 1.5 }}
            className={`font-bold text-center tracking-wide mb-2 ${
              isNightMode ? 'text-[#fbd2b3]' : 'text-[#903f00]'
            }`}
          >
            {currentVerse.sanskrit}
          </Text>
        </View>

        {/* Hindi Literal Translation */}
        <View
          className={`p-5 rounded-2xl border mb-4 ${
            isNightMode ? 'bg-[#1e1e1e] border-neutral-800' : 'bg-white border-[#dee8ff]'
          }`}
        >
          <Text className="text-[#903f00] font-bold text-base mb-2">
            {isEnglish ? 'Literal Translation:' : 'सरल हिन्दी अनुवाद (Translation):'}
          </Text>
          <Text
            style={{ fontSize: currentFontSize, lineHeight: currentFontSize * 1.6 }}
            className={`font-medium ${isNightMode ? 'text-neutral-200' : 'text-[#111c2d]'}`}
          >
            {currentVerse.translation}
          </Text>
        </View>

        {/* Detailed Bhavartha by Acharya Shri */}
        <View
          className={`p-5 rounded-2xl border mb-6 ${
            isNightMode ? 'bg-[#1e1e1e] border-neutral-800' : 'bg-white border-[#dee8ff]'
          }`}
        >
          <Text className="text-[#903f00] font-bold text-base mb-2">
            {isEnglish ? 'Spiritual Essence & Commentary (Bhavartha):' : 'आध्यात्मिक भावार्थ एवं रहस्य (Bhavartha):'}
          </Text>
          <Text
            style={{ fontSize: currentFontSize - 1, lineHeight: (currentFontSize - 1) * 1.6 }}
            className={`${isNightMode ? 'text-neutral-300' : 'text-[#564338]'}`}
          >
            {currentVerse.bhavartha}
          </Text>
        </View>

        {/* Verse Navigator Controls (Prev / Next) */}
        <View className="flex-row items-center justify-between pb-8">
          <TouchableOpacity
            disabled={currentVerseIndex === 0}
            onPress={() => setCurrentVerseIndex(Math.max(0, currentVerseIndex - 1))}
            className={`min-h-[48px] px-5 rounded-xl flex-row items-center gap-2 border ${
              currentVerseIndex === 0
                ? 'opacity-40 bg-neutral-200 border-neutral-300'
                : isNightMode
                ? 'bg-[#252525] border-neutral-700'
                : 'bg-white border-[#dee8ff]'
            }`}
          >
            <ChevronLeft size={18} color={isNightMode ? '#fff' : '#903f00'} />
            <Text className={`font-bold text-sm ${isNightMode ? 'text-white' : 'text-[#903f00]'}`}>
              {isEnglish ? 'Previous' : 'पिछला सूत्र'}
            </Text>
          </TouchableOpacity>

          <Text className={`text-xs font-semibold ${isNightMode ? 'text-neutral-400' : 'text-[#564338]'}`}>
            {currentVerseIndex + 1} of {verses.length}
          </Text>

          <TouchableOpacity
            disabled={currentVerseIndex === verses.length - 1}
            onPress={() => setCurrentVerseIndex(Math.min(verses.length - 1, currentVerseIndex + 1))}
            className={`min-h-[48px] px-5 rounded-xl flex-row items-center gap-2 border ${
              currentVerseIndex === verses.length - 1
                ? 'opacity-40 bg-neutral-200 border-neutral-300'
                : 'bg-[#903f00] border-[#903f00]'
            }`}
          >
            <Text className="text-white font-bold text-sm">
              {isEnglish ? 'Next' : 'अगला सूत्र'}
            </Text>
            <ChevronRight size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
