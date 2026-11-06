import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Share2,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Users,
  Compass,
} from 'lucide-react-native';
import { useLanguage } from '../../src/context/LanguageContext';

export default function ViharDetailScreen() {
  const router = useRouter();
  const { isEnglish, t } = useLanguage();

  const handleDial = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert(isEnglish ? 'Error' : 'त्रुटि', isEnglish ? 'Unable to open phone dialer' : 'फोन डायलर खोलने में असमर्थ');
    });
  };

  const handleShareVihar = async () => {
    try {
      await Share.share({
        message: isEnglish
          ? '🚩 Sacred Vihar Schedule of Revered Acharya Shri 108 Vibhav Sagar Ji Maharaj:\n\n' +
            '• Current Halt: Shri Digambar Jain Bada Mandir, Mansarovar, Jaipur\n' +
            '• Next Destination: Sanganer Mahatirth (Departure: 23 Feb 05:30 AM)\n' +
            '• Distance: 14 km on foot\n\n' +
            'Check Vihar live tracking on Chhatra Chhaya app:\nhttps://chhatrachhaya.org/vihar'
          : '🚩 पूज्य आचार्य श्री 108 विभव सागर जी महाराज का पावन पदविहार कार्यक्रम:\n\n' +
            '• वर्तमान प्रवास: श्री दिगंबर जैन बड़ा मंदिर, मानसरोवर, जयपुर (राज.)\n' +
            '• अगला पड़ाव: सांगानेर महातीर्ष (प्रस्थान: 23 Feb प्रातः 05:30 AM)\n' +
            '• दूरी: 14 कि.मी. पदविहार\n\n' +
            'विहार लाइव ट्रैकिंग एवं आहारचर्या सेवा हेतु छत्र छाया ऐप देखें:\nhttps://chhatrachhaya.org/vihar',
        title: isEnglish ? 'Acharya Shri Sacred Vihar Update' : 'आचार्य श्री पावन पदविहार सूचना',
      });
    } catch {
      Alert.alert(isEnglish ? 'Share' : 'शेयर', isEnglish ? 'Unable to open share sheet' : 'शेयर संवाद नहीं खुल सका');
    }
  };

  const timelineStops = [
    {
      status: 'completed',
      date: isEnglish ? '01 Feb - 09 Feb 2025' : '01 Feb - 09 Feb 2025',
      title: isEnglish ? 'Shri Digambar Jain Atishay Kshetra, Bada Padampura' : 'श्री दिगंबर जैन अतिशय क्षेत्र, बाड़ा पदमपुरा',
      distance: isEnglish ? 'Departure Completed (18 km)' : 'प्रस्थान सम्पन्न (18 km)',
      desc: isEnglish ? 'Collective Shantidhara and holy discourse gathering held.' : 'सामूहिक शांतिधारा एवं भव्य धर्मसभा का आयोजन सम्पन्न।',
    },
    {
      status: 'current',
      date: isEnglish ? '10 Feb - 22 Feb 2025 (Current Halt)' : '10 Feb - 22 Feb 2025 (वर्तमान प्रवास)',
      title: isEnglish ? 'Shri Digambar Jain Bada Mandir, Mansarovar, Jaipur' : 'श्री दिगंबर जैन बड़ा मंदिर, मानसरोवर, जयपुर',
      distance: isEnglish ? 'Present Halt (12 Days)' : 'विराजमान स्थल (12 दिवस प्रवास)',
      desc: isEnglish ? 'Daily 08:30 AM Tattvartha Sutra discourse & 06:45 PM Bhaktamar Maha Aarti.' : 'नित्य प्रातः 08:30 AM तत्त्वार्थ सूत्र प्रवचन एवं सायं 06:45 PM भक्तामर महाआरती।',
    },
    {
      status: 'upcoming',
      date: isEnglish ? '23 Feb 2025 (Next Halt)' : '23 Feb 2025 (आगामी पड़ाव)',
      title: isEnglish ? 'Shri Digambar Jain Atishay Kshetra, Sanganer (Jaipur)' : 'श्री दिगंबर जैन अतिशय क्षेत्र, सांगानेर (जयपुर)',
      distance: isEnglish ? '14 km Vihar (05:30 AM Departure)' : '14 कि.मी. पदविहार (प्रातः 05:30 AM प्रस्थान)',
      desc: isEnglish ? 'Grand welcome and holy feet wash ceremony by Sanganer Jain community.' : 'सांगानेर दिगंबर जैन समाज द्वारा भव्य मंगल अगवानी व पाद प्रक्षालन।',
    },
    {
      status: 'upcoming',
      date: isEnglish ? '28 Feb 2025 (Proposed Halt)' : '28 Feb 2025 (प्रस्तावित पड़ाव)',
      title: isEnglish ? 'Shri Shantinath Digambar Jain Mandir, Chaksu' : 'श्री शांतिनाथ दिगंबर जैन मंदिर, चाकसू',
      distance: isEnglish ? '26 km Foot Journey' : '26 कि.मी. पदविहार',
      desc: isEnglish ? 'Two-day spiritual camp and Jinvaani Swadhyay sessions.' : 'दो दिवसीय धर्म प्रभावना एवं जिनवाणी स्वाध्याय शिविर।',
    },
    {
      status: 'upcoming',
      date: isEnglish ? 'July 2025 (Proposed Chaturmas)' : 'जुलाई 2025 (प्रस्तावित चातुर्मास)',
      title: isEnglish ? 'Shri Mahavir Ji Atishay Mahatirth' : 'श्री महावीर जी अतिशय महातीर्थ',
      distance: isEnglish ? 'Chaturmas Sacred Site' : 'चातुर्मास पावन स्थल',
      desc: isEnglish ? '4-month rainy season retreat and Dashalakshan Mahaparva rituals.' : 'चार माह का वर्षायोग साधना एवं दस लक्षण महापर्व अनुष्ठान।',
    },
  ];

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
          {isEnglish ? 'Sacred Vihar Route & Halts' : 'पावन पदविहार मार्ग व प्रवास'}
        </Text>

        <TouchableOpacity
          onPress={handleShareVihar}
          className="w-11 h-11 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
        >
          <Share2 size={18} color="#903f00" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
        {/* ================= 1. CURRENT HALT HERO ================= */}
        <View className="bg-white rounded-2xl border border-[#dee8ff] overflow-hidden shadow-xs mb-4">
          <View className="h-44 bg-slate-900 relative">
            <Image
              source={require('../../assets/images/more_parichay_2.png')}
              className="w-full h-full opacity-85"
              resizeMode="cover"
            />
            <View className="absolute top-3 left-3 bg-[#903f00] px-3 py-1.5 rounded-full flex-row items-center gap-1.5 shadow-md">
              <View className="w-2 h-2 rounded-full bg-emerald-400" />
              <Text className="text-white font-bold text-xs">
                {isEnglish ? 'Current Sacred Halt' : 'वर्तमान पावन प्रवास'}
              </Text>
            </View>

            <View className="absolute bottom-3 left-3 bg-black/75 px-3 py-1 rounded-md">
              <Text className="text-white text-xs font-semibold">
                {isEnglish ? 'Jaipur, Rajasthan Region' : 'जयपुर, राजस्थान संभाग'}
              </Text>
            </View>
          </View>

          <View className="p-5">
            <Text className="text-[#111c2d] font-bold text-xl leading-7 mb-2">
              {isEnglish
                ? 'Shri Digambar Jain Bada Mandir, Mansarovar, Jaipur'
                : 'श्री दिगंबर जैन बड़ा मंदिर, मानसरोवर, जयपुर'}
            </Text>

            <View className="flex-row items-center gap-2 mb-2">
              <Calendar size={15} color="#564338" />
              <Text className="text-[#564338] text-sm font-semibold">
                {isEnglish ? '10 February to 22 February 2025' : '10 फरवरी से 22 फरवरी 2025 तक प्रवास'}
              </Text>
            </View>

            <View className="flex-row items-center gap-2 mb-4">
              <Clock size={15} color="#564338" />
              <Text className="text-[#564338] text-sm">
                {isEnglish
                  ? 'Alms Timings: 09:45 AM | Morning Discourse: 08:30 AM'
                  : 'आहारचर्या समय: प्रातः 09:45 AM | मंगल प्रवचन: प्रातः 08:30 AM'}
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row items-center gap-3 pt-2 border-t border-[#f0f3ff]">
              <TouchableOpacity
                onPress={() => handleDial('+919876543210')}
                className="flex-1 bg-[#903f00] h-12 rounded-xl flex-row items-center justify-center gap-2 shadow-xs active:bg-[#763300]"
              >
                <Phone size={18} color="#FFFFFF" />
                <Text className="text-white font-bold text-sm">
                  {isEnglish ? 'Local Coordinator' : 'स्थानीय व्यवस्थापक'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(isEnglish ? 'Directions' : 'मानचित्र', isEnglish ? 'Opening Google Maps route...' : 'गूगल मैप्स पर मंदिर का सटीक मार्ग खोला जा रहा है...')
                }
                className="flex-1 bg-[#f0f3ff] h-12 rounded-xl flex-row items-center justify-center gap-2 border border-[#dee8ff]"
              >
                <Navigation size={18} color="#006165" />
                <Text className="text-[#006165] font-bold text-sm">
                  {isEnglish ? 'Directions (Map)' : 'दिशा मार्ग (Map)'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= 2. UPCOMING VIHAR NOTICE ================= */}
        <View className="bg-[#ffdbca] p-4 rounded-2xl border border-[#b45309]/20 mb-4 shadow-xs">
          <View className="flex-row items-center gap-2 mb-1.5">
            <Compass size={18} color="#903f00" />
            <Text className="text-[#903f00] font-bold text-base">
              {isEnglish ? 'Upcoming Vihar Alert' : 'अगला पदविहार सूचना'}
            </Text>
          </View>
          <Text className="text-[#111c2d] text-sm leading-6 mb-2">
            {isEnglish ? (
              <>
                Revered Acharya Shri along with the Sangh will depart on foot on{' '}
                <Text className="font-bold">23 February 2025 at 05:30 AM</Text> from Mansarovar toward Sanganer Atishay Kshetra. (Total distance: 14 km)
              </>
            ) : (
              <>
                पूज्य आचार्य श्री संघ सहित <Text className="font-bold">23 फरवरी 2025 को प्रातः 05:30 बजे</Text> मानसरोवर से सांगानेर अतिशय क्षेत्र की ओर मंगल पदविहार करेंगे। (कुल दूरी: 14 कि.मी.)
              </>
            )}
          </Text>
          <View className="bg-white/80 p-2.5 rounded-lg">
            <Text className="text-[#763300] text-xs font-semibold">
              {isEnglish
                ? 'Devotees wishing to participate in the barefoot yatra should assemble in the temple courtyard by 05:00 AM.'
                : 'पदविहार सेवा में सम्मिलित होने वाले श्रावक प्रातः 05:00 बजे मंदिर प्रांगण में उपस्थित हों।'}
            </Text>
          </View>
        </View>

        {/* ================= 3. STEP-BY-STEP TIMELINE ================= */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          <Text className="text-[#111c2d] font-bold text-lg mb-4">
            {isEnglish ? 'Vihar Pilgrimage Timeline' : 'पावन पदविहार यात्रा क्रम (Timeline)'}
          </Text>

          <View className="pl-2">
            {timelineStops.map((stop, index) => {
              const isCurrent = stop.status === 'current';
              const isCompleted = stop.status === 'completed';

              return (
                <View key={index} className="flex-row items-start mb-5 relative">
                  {/* Vertical Connector Line */}
                  {index < timelineStops.length - 1 && (
                    <View
                      className={`absolute left-3.5 top-6 w-0.5 bottom-[-20px] ${
                        isCompleted ? 'bg-emerald-500' : isCurrent ? 'bg-[#903f00]' : 'bg-[#dee8ff]'
                      }`}
                    />
                  )}

                  {/* Dot */}
                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center mr-3 z-10 ${
                      isCurrent
                        ? 'bg-[#903f00] ring-4 ring-[#ffdbca]'
                        : isCompleted
                        ? 'bg-emerald-500'
                        : 'bg-[#dee8ff]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={14} color="#FFFFFF" />
                    ) : isCurrent ? (
                      <View className="w-2.5 h-2.5 rounded-full bg-white" />
                    ) : (
                      <View className="w-2 h-2 rounded-full bg-[#564338]" />
                    )}
                  </View>

                  {/* Content */}
                  <View className="flex-1 bg-[#f9f9ff] p-3 rounded-xl border border-[#dee8ff]">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-[#903f00]' : isCompleted ? 'text-emerald-700' : 'text-[#564338]'
                        }`}
                      >
                        {stop.date}
                      </Text>
                      <Text className="text-[#564338] text-[11px] font-semibold">{stop.distance}</Text>
                    </View>

                    <Text className="text-[#111c2d] font-bold text-sm mb-1">{stop.title}</Text>
                    <Text className="text-[#564338] text-xs leading-5">{stop.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ================= 4. AHARA-CHARYA GUIDELINES ================= */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          <View className="flex-row items-center gap-2 mb-2">
            <AlertCircle size={18} color="#903f00" />
            <Text className="text-[#111c2d] font-bold text-lg">
              {isEnglish ? 'Ahara Charya & Navadha Bhakti Principles' : 'आहारचर्या एवं नवधा भक्ति नियम'}
            </Text>
          </View>
          <Text className="text-[#564338] text-xs leading-5 mb-3">
            {isEnglish
              ? 'Scriptural 9-fold devotion (Navadha Bhakti) guidelines for offering pure alms to Digambar Munis:'
              : 'दिगंबर मुनिराज को शुद्ध प्रासुक आहारदान हेतु आगमोक्त नवधा भक्ति का पालन आवश्यक है:'}
          </Text>

          <View className="gap-2">
            <View className="flex-row items-start gap-2 bg-[#f0f3ff] p-3 rounded-lg">
              <Text className="text-[#903f00] font-bold text-xs mt-0.5">1.</Text>
              <Text className="text-[#111c2d] text-xs leading-5 flex-1">
                <Text className="font-bold">
                  {isEnglish ? 'Padgahan & Seating:' : 'पड़गाहन एवं उच्चासन:'}
                </Text>{' '}
                {isEnglish
                  ? 'Recite "He Swami! Namostu, atra tishtha tishtha" with utmost humility.'
                  : '"हे स्वामी! नमोऽस्तु, अत्र तिष्ठ तिष्ठ" कहकर विनयपूर्वक पड़गाहन करें।'}
              </Text>
            </View>
            <View className="flex-row items-start gap-2 bg-[#f0f3ff] p-3 rounded-lg">
              <Text className="text-[#903f00] font-bold text-xs mt-0.5">2.</Text>
              <Text className="text-[#111c2d] text-xs leading-5 flex-1">
                <Text className="font-bold">
                  {isEnglish ? 'Pada Prakshalan & Pujan:' : 'पाद प्रक्षालन व पूजन:'}
                </Text>{' '}
                {isEnglish
                  ? 'Wash the sacred feet with purified boiled water and offer devotion with Ashta-dravya.'
                  : 'प्रासुक जल से चरण धोकर मस्तक से स्पर्श करें एवं अष्टद्रव्य से पूजा करें।'}
              </Text>
            </View>
            <View className="flex-row items-start gap-2 bg-[#f0f3ff] p-3 rounded-lg">
              <Text className="text-[#903f00] font-bold text-xs mt-0.5">3.</Text>
              <Text className="text-[#111c2d] text-xs leading-5 flex-1">
                <Text className="font-bold">
                  {isEnglish ? 'Pure Food Offering:' : 'शुद्ध आहार:'}
                </Text>{' '}
                {isEnglish
                  ? 'Offer only pure filtered water and sattvic scripturally approved items.'
                  : 'छना हुआ मर्यादित जल, शुद्ध वनस्पति एवं सात्विक सामग्री ही समर्पित करें।'}
              </Text>
            </View>
          </View>
        </View>

        {/* ================= 5. COORDINATOR CONTACTS ================= */}
        <View className="bg-[#ffd9e1] p-5 rounded-2xl border border-[#a5345d]/20 mb-6 shadow-xs">
          <View className="flex-row items-center gap-2 mb-2">
            <Users size={18} color="#3f001a" />
            <Text className="text-[#3f001a] font-bold text-base">
              {isEnglish ? 'Vihar Seva Committee Directory' : 'विहार सेवा समिति सम्पर्क सूत्र'}
            </Text>
          </View>
          <Text className="text-[#3f001a] text-xs leading-5 mb-3">
            {isEnglish
              ? 'For route updates, stay accommodations, or Chouka arrangements, contact:'
              : 'विहार मार्ग, आवास अथवा चौका लगाने संबंधी जानकारी हेतु संपर्क करें:'}
          </Text>

          <View className="bg-white/80 p-3.5 rounded-xl border border-white/60 mb-2.5 flex-row items-center justify-between">
            <View>
              <Text className="text-[#111c2d] font-bold text-sm">
                {isEnglish ? 'Shri Vimal Ji Patni' : 'श्री विमल जी पाटनी'}
              </Text>
              <Text className="text-[#564338] text-xs">
                {isEnglish ? 'Chief Coordinator, Jaipur' : 'प्रमुख संयोजक, जयपुर'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDial('+919876543210')}
              className="bg-[#3f001a] px-3.5 py-2 rounded-lg flex-row items-center gap-1.5"
            >
              <Phone size={14} color="#ffd9e1" />
              <Text className="text-[#ffd9e1] font-bold text-xs">
                {isEnglish ? 'Call' : 'कॉल करें'}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white/80 p-3.5 rounded-xl border border-white/60 flex-row items-center justify-between">
            <View>
              <Text className="text-[#111c2d] font-bold text-sm">
                {isEnglish ? 'Shri Shikharchand Ji Jain' : 'श्री शिखरचंद जी जैन'}
              </Text>
              <Text className="text-[#564338] text-xs">
                {isEnglish ? 'Vihar Route In-Charge' : 'विहार मार्ग प्रभारी'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDial('+919876543211')}
              className="bg-[#3f001a] px-3.5 py-2 rounded-lg flex-row items-center gap-1.5"
            >
              <Phone size={14} color="#ffd9e1" />
              <Text className="text-[#ffd9e1] font-bold text-xs">
                {isEnglish ? 'Call' : 'कॉल करें'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
