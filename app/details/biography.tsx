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
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Share2,
  BookOpen,
  Award,
  Sparkles,
  Heart,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { useLanguage } from '../../src/context/LanguageContext';

export default function BiographyDetailScreen() {
  const router = useRouter();
  const { isEnglish, t } = useLanguage();

  const handleShareBio = async () => {
    try {
      await Share.share({
        message: isEnglish
          ? '🌸 *Revered Acharya Shri 108 Vibhav Sagar Ji Maharaj Sacred Biography*\n\n' +
            'Supreme ascetic of Digambar Jain monk tradition, master of Agamas and embodiment of compassion. Read full life story, Diksha saga and literature:\nhttps://chhatrachhaya.org/biography'
          : '🌸 *परम पूज्य आचार्य श्री 108 विभव सागर जी महाराज का पावन जीवन चरित्र*\n\n' +
            'दिगंबर जैन मुनि परंपरा के शीर्ष तपस्वी, आगम मर्मज्ञ एवं वात्सल्य मूर्ति पूज्य आचार्य श्री का संपूर्ण जीवन वृत्त, दीक्षा गाथा एवं साहित्य परिचय पढ़ें:\nhttps://chhatrachhaya.org/biography',
        title: isEnglish ? 'Acharya Shri 108 Vibhav Sagar Ji Maharaj Biography' : 'आचार्य श्री 108 विभव सागर जी महाराज जीवन चरित्र',
      });
    } catch {
      Alert.alert(isEnglish ? 'Share' : 'शेयर', isEnglish ? 'Unable to open share sheet' : 'शेयर संवाद नहीं खुला');
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
          {isEnglish ? 'Sacred Biography' : 'पावन जीवन चरित्र (Biography)'}
        </Text>

        <TouchableOpacity
          onPress={handleShareBio}
          className="w-11 h-11 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
        >
          <Share2 size={18} color="#903f00" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
        {/* ================= 1. GURU PORTRAIT HERO CARD ================= */}
        <View className="bg-white rounded-2xl border border-[#dee8ff] overflow-hidden shadow-xs mb-4">
          <View className="h-64 bg-slate-900 relative">
            <Image
              source={require('../../assets/images/more_parichay_1.png')}
              className="w-full h-full opacity-90"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <View className="absolute bottom-4 left-4 right-4">
              <View className="self-start bg-[#903f00] px-3 py-1 rounded-full mb-1">
                <Text className="text-white text-xs font-bold">
                  {isEnglish ? 'Agam Scholar • Ocean of Compassion' : 'आगम मर्मज्ञ • वात्सल्य वारिधि'}
                </Text>
              </View>
              <Text className="text-white font-bold text-2xl leading-8">
                {isEnglish ? 'Acharya Shri 108 Vibhav Sagar Ji Maharaj' : 'आचार्य श्री 108 विभव सागर जी महाराज'}
              </Text>
              <Text className="text-[#ffdbca] text-xs font-semibold mt-0.5">
                {isEnglish
                  ? 'Sun-like illuminating ascetic of Digambar Jain monk tradition'
                  : 'दिगंबर जैन मुनि परंपरा के सूर्य सदृश प्रकाशमान संत'}
              </Text>
            </View>
          </View>
        </View>

        {/* ================= 2. QUICK BIOGRAPHICAL HIGHLIGHTS ================= */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          <Text className="text-[#903f00] font-bold text-lg mb-3">
            {isEnglish ? 'Quick Highlights (At a Glance)' : 'संक्षिप्त पावन परिचय (At a Glance)'}
          </Text>

          <View className="bg-[#f0f3ff] p-4 rounded-xl border border-[#dee8ff] gap-2.5">
            <View className="flex-row items-center justify-between pb-2 border-b border-[#dee8ff]">
              <Text className="text-[#564338] text-sm">
                {isEnglish ? 'Household Name:' : 'गृहस्थ नाम:'}
              </Text>
              <Text className="text-[#111c2d] font-bold text-sm">
                {isEnglish ? 'Brahmachari Vimal Ji' : 'ब्रह्मचारी विमल जी'}
              </Text>
            </View>

            <View className="flex-row items-center justify-between pb-2 border-b border-[#dee8ff]">
              <Text className="text-[#564338] text-sm">
                {isEnglish ? 'Birthplace:' : 'जन्म स्थान:'}
              </Text>
              <Text className="text-[#111c2d] font-bold text-sm">
                {isEnglish ? 'Tikamgarh, Madhya Pradesh' : 'टीकमगढ़, मध्य प्रदेश'}
              </Text>
            </View>

            <View className="flex-row items-center justify-between pb-2 border-b border-[#dee8ff]">
              <Text className="text-[#564338] text-sm">
                {isEnglish ? 'Diksha Guru:' : 'दीक्षा गुरु:'}
              </Text>
              <Text className="text-[#903f00] font-bold text-sm">
                {isEnglish ? 'Acharya Shri 108 Vishuddha Sagar Ji' : 'आचार्य श्री 108 विशुद्ध सागर जी'}
              </Text>
            </View>

            <View className="flex-row items-center justify-between pb-2 border-b border-[#dee8ff]">
              <Text className="text-[#564338] text-sm">
                {isEnglish ? 'Muni Diksha Site:' : 'मुनि दीक्षा स्थल:'}
              </Text>
              <Text className="text-[#111c2d] font-bold text-sm">
                {isEnglish ? 'Kundalpur Mahatirth' : 'कुंडलपुर महातीर्थ'}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-[#564338] text-sm">
                {isEnglish ? 'Foot Journey Distance:' : 'पदविहार दूरी:'}
              </Text>
              <Text className="text-[#006165] font-bold text-sm">
                {isEnglish ? '25,000+ km on Foot' : '25,000+ कि.मी. पदयात्रा'}
              </Text>
            </View>
          </View>
        </View>

        {/* ================= 3. CHAPTER 1: CHILDHOOD & VAIRAGYA ================= */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          <View className="flex-row items-center gap-2 mb-2">
            <Sparkles size={18} color="#903f00" />
            <Text className="text-[#111c2d] font-bold text-lg">
              {isEnglish ? '1. Early Years & Spiritual Awakening' : '1. बाल्यकाल एवं वैराग्य की पावन प्रेरणा'}
            </Text>
          </View>
          <Text className="text-[#564338] text-base leading-7 mb-3">
            {isEnglish
              ? 'From early childhood, Revered Acharya Shri harbored deep devotion for religious scriptures, Swadhyay, and service to Jain monks. Witnessing the transient nature of worldly pursuits, intense detachment (Vairagya) blossomed in his youth.'
              : 'पूज्य आचार्य श्री का बाल्यकाल से ही धर्म, स्वाध्याय और साधु सेवा के प्रति गहरा अनुराग रहा। सांसारिक सुख-साधनों की क्षणभंगुरता को देखकर आपके हृदय में युवावस्था में ही तीव्र वैराग्य का अंकुर फूटा।'}
          </Text>
          <Text className="text-[#564338] text-base leading-7">
            {isEnglish
              ? 'With the blessings of his parents, he took the vow of celibacy (Brahmacharya) and dedicated himself at the lotus feet of Revered Acharya Shri Vishuddha Sagar Ji Maharaj.'
              : 'माता-पिता की आज्ञा लेकर आपने ब्रह्मचर्य व्रत अंगीकार किया और परम पूज्य आचार्य श्री विशुद्ध सागर जी महाराज के चरणों में आत्म-कल्याण हेतु समर्पित हो गए।'}
          </Text>
        </View>

        {/* ================= 4. CHAPTER 2: MUNI DIKSHA & TAP-SADHNA ================= */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          <View className="flex-row items-center gap-2 mb-2">
            <Award size={18} color="#903f00" />
            <Text className="text-[#111c2d] font-bold text-lg">
              {isEnglish ? '2. Muni Diksha & Supreme Austerities' : '2. कठोर मुनि दीक्षा एवं चर्या निष्ठा'}
            </Text>
          </View>
          <Text className="text-[#564338] text-base leading-7 mb-3">
            {isEnglish
              ? 'At the sacred land of Kundalpur amid thousands of devoted pilgrims, he received the austere Digambar Muni Diksha encompassing all 28 Mulagunas. He equanimously withstood 22 Parishahas including severe cold, heat, bare-foot pilgrimages, and earth sleeping.'
              : 'कुंडलपुर के पवित्र क्षेत्र में हजारों श्रद्धालुओं के जयकारों के मध्य आपने 28 मूलगुणों की कठिन मुनि दीक्षा धारण की। केशलोंच, शीत-उष्ण में नग्न पदविहार, पाणिपात्र में एक बार भोजन और भूमि शयन जैसे 22 परीषहों को आपने सहजता से सहन किया।'}
          </Text>
          <View className="bg-[#ffdbca] p-4 rounded-xl border border-[#b45309]/20">
            <Text className="text-[#903f00] font-bold text-sm mb-1">
              {isEnglish ? '"Penance is the True Ornament of the Soul"' : '"तप ही आत्मा का आभूषण है"'}
            </Text>
            <Text className="text-[#111c2d] text-xs leading-5">
              {isEnglish
                ? 'Over the past 20 years, Acharya Shri has accomplished arduous austerities including prolonged silence, Simha-nishkridita vows, and Ashtopavasa fasts.'
                : 'आचार्य श्री ने पिछले 20 वर्षों में निरंतर मौन, सिंहनिष्क्रीडित व्रत एवं अष्टोपवास की कठोर तपश्चर्याएं सम्पन्न की हैं।'}
            </Text>
          </View>
        </View>

        {/* ================= 5. CHAPTER 3: ACHARYA PAD & WRITINGS ================= */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          <View className="flex-row items-center gap-2 mb-2">
            <BookOpen size={18} color="#903f00" />
            <Text className="text-[#111c2d] font-bold text-lg">
              {isEnglish ? '3. Acharya Enthronement & Literature Creation' : '3. आचार्य पदारोहण एवं साहित्य सृजन'}
            </Text>
          </View>
          <Text className="text-[#564338] text-base leading-7 mb-3">
            {isEnglish
              ? 'Recognizing his profound mastery of Agamas and leadership of the Sangh, the monastic order conferred upon him the revered title of Acharya. To enlighten the spiritual community, he authored lucid commentaries on key scriptures:'
              : 'आपकी अलौकिक आगम निष्ठा और संघ संचालन की क्षमता को देखते हुए पूज्य संघ द्वारा आपको \'आचार्य\' पद से अलंकृत किया गया। आपने समाज को ज्ञानवान बनाने हेतु अनेक ग्रंथों की सरल टीकाएं लिखीं:'}
          </Text>

          <View className="gap-2">
            <View className="bg-[#f0f3ff] p-3 rounded-lg flex-row items-center gap-2.5">
              <View className="w-2 h-2 rounded-full bg-[#903f00]" />
              <Text className="text-[#111c2d] text-sm font-bold">
                {isEnglish ? 'Pravachan Piyush (Part 1 & 2)' : 'प्रवचन पीयूष (भाग 1 एवं 2)'}
              </Text>
            </View>
            <View className="bg-[#f0f3ff] p-3 rounded-lg flex-row items-center gap-2.5">
              <View className="w-2 h-2 rounded-full bg-[#903f00]" />
              <Text className="text-[#111c2d] text-sm font-bold">
                {isEnglish ? 'Tattvartha Sutra: Swadhyay Deepika' : 'तत्त्वार्थ सूत्र: सरल स्वाध्याय दीपिका'}
              </Text>
            </View>
            <View className="bg-[#f0f3ff] p-3 rounded-lg flex-row items-center gap-2.5">
              <View className="w-2 h-2 rounded-full bg-[#903f00]" />
              <Text className="text-[#111c2d] text-sm font-bold">
                {isEnglish ? 'Dasa Lakshana Dharma: Contemplation & Essence' : 'दश लक्षण धर्म: चिंतन एवं सार'}
              </Text>
            </View>
          </View>
        </View>

        {/* ================= 6. BLESSINGS ================= */}
        <View className="items-center pb-8 pt-2">
          <Text className="text-[#903f00] font-bold text-base mb-1">
            ॥ नमः श्री वर्धमानाय निर्धूतकलिलात्मने ॥
          </Text>
          <Text className="text-[#564338] text-xs text-center">
            {isEnglish
              ? 'Millions of prostrations (Namostu) at the lotus feet of Revered Gurudev'
              : 'आचार्य श्री के चरण कमलों में कोटि-कोटि नमोऽस्तु'}
          </Text>
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
