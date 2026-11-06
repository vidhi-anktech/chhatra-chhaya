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
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Share2,
  Volume2,
  VolumeX,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from 'lucide-react-native';
import { useLanguage } from '../../src/context/LanguageContext';

export default function PratikramanDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isEnglish, t } = useLanguage();

  const [selectedType, setSelectedType] = useState<'iryapath' | 'daivasik' | 'shraman' | 'pakshik'>(
    (params.type as any) || 'iryapath'
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [breathCount, setBreathCount] = useState(0);

  const pratikramanData = {
    iryapath: {
      title: isEnglish ? 'Iryapath Pratikraman' : 'ईर्यापथ प्रतिक्रमण (Iryapath Pratikraman)',
      subtitle: isEnglish ? 'Repentance for inadvertent harm to subtle life forms during walking' : 'मार्ग में गमन करते समय सूक्ष्म जीवों की हिंसा हेतु पश्चाताप',
      duration: isEnglish ? 'Approx 5 to 8 mins' : 'लगभग 5 से 8 मिनट',
      steps: [
        {
          heading: isEnglish ? '1. Alochana & Iravahi Vow' : '1. आलोयणा एवं इच्छाकार संकल्प',
          prakrit: 'इच्छाकारेण संदिसह भगवन्! इरियावहियं पडिक्कमामि? इच्छं, इच्छामि पडिक्कमिउं।',
          hindi: isEnglish
            ? 'O Bhagwan! With your permission, I perform repentance for any faults incurred during walking.'
            : 'हे भगवन्! आपकी आज्ञा से मैं मार्ग में चलने से लगे दोषों का प्रतिक्रमण (प्रायश्चित) करता हूँ।',
        },
        {
          heading: isEnglish ? '2. Iryapatha Sutra (Repentance for Living Beings)' : '2. ईर्यापथ सूत्र (गमन में जीव हिंसा आलोचना)',
          prakrit: 'इरियावहियाए, विराहणाए, गमणागमणे, पाण-अक्कमणे, बीय-अक्कमणे, हरिय-अक्कमणे, ओसा-उत्तिंग-पणग-दगमट्टी-मक्कड़ासंताणा-संकमणे।',
          hindi: isEnglish
            ? 'For any living beings, seeds, vegetation, dew drops, moisture, ants, or webs inadvertently stepped on, I repent with a contrite heart.'
            : 'मार्ग में आते-जाते समय, जीवों को दबाने, बीज, हरी वनस्पति, ओस, दीमक, काई, पानी, मिट्टी, मकड़ी आदि के जालों पर पैर पड़ने से जो हिंसा हुई हो, उन सबका मैं पश्चाताप करता हूँ।',
        },
        {
          heading: isEnglish ? '3. Kayotsarga Resolution (Tassa Uttari Sutra)' : '3. कायोत्सर्ग संकल्प (तस्स उत्तरी सूत्र)',
          prakrit: 'तस्स उत्तरी-करणेणं, पायच्छित्त-करणेणं, विसोही-करणेणं, विसल्ली-करणेणं, पावाणं कम्माणं निग्घाअणट्ठाए ठाएमि काउसग्गं।',
          hindi: isEnglish
            ? 'For the purification, expiation, and detachment of body from karmas, I enter the state of Kayotsarga meditation.'
            : 'उन पापों के प्रायश्चित, शुद्धि, शल्य-मुक्ति और पापकर्मों के नाश हेतु मैं कायोत्सर्ग (देह के प्रति ममत्व त्यागकर ध्यान) में स्थित होता हूँ।',
        },
        {
          heading: isEnglish ? '4. Meditation & Silent Navkar Mantra Chanting' : '4. ध्यान एवं णमोकार मंत्र जाप',
          prakrit: 'णमो अरिहंताणं, णमो सिद्धाणं, णमो आइरियाणं, णमो उवज्झायाणं, णमो लोए सव्व साहूणं।',
          hindi: isEnglish
            ? 'Remain motionless in Kayotsarga for 27 mindful breath cycles or 9 silent chants of the Navkar Mantra.'
            : 'कायोत्सर्ग में स्थिर रहकर 27 उच्छ्वास (श्वास) अथवा 9 बार णमोकार मंत्र का मौन चिंतन करें।',
        },
      ],
    },
    daivasik: {
      title: isEnglish ? 'Daivasik Pratikraman' : 'दैवसिक प्रतिक्रमण (Daivasik Pratikraman)',
      subtitle: isEnglish ? 'Evening spiritual purification for faults committed throughout the day' : 'दिनभर में मन-वचन-काया द्वारा लगे दोषों की आत्मशुद्धि',
      duration: isEnglish ? 'Approx 20 to 30 mins' : 'लगभग 20 से 30 मिनट',
      steps: [
        {
          heading: isEnglish ? '1. Mangalacharan & Guru Vandana' : '1. मंगलाचरण एवं गुरु वंदना',
          prakrit: 'तिहुयण-तिलओ, सव्वण्णू, सव्वदरिसी, सव्वलोय-महिओ, वंदामि जिणं सासयं।',
          hindi: isEnglish
            ? 'I bow down with profound reverence to the Omniscient Tirthankaras, the crown jewel of the three realms.'
            : 'तीनों लोकों के तिलक, सर्वज्ञ, सर्वदर्शी एवं पूज्य तीर्थंकर भगवान को मैं भावपूर्वक वंदन करता हूँ।',
        },
        {
          heading: isEnglish ? '2. Daytime Transgression Repentance' : '2. दिवस अतिचार आलोचना',
          prakrit: 'दिवस-संबद्धे, जे केइ जीवा विराहिआ, मण-वयण-काएणं, तस्स मिच्छा मे दुक्कडं।',
          hindi: isEnglish
            ? 'May all wrongful acts committed through mind, speech, or body today be nullified — Michchhami Dukkadam.'
            : 'आज के दिन में मन, वचन और शरीर से जितने भी जीवों की विराधना हुई हो, मेरा वह दुष्कृत्य निष्फल हो।',
        },
        {
          heading: isEnglish ? '3. Contemplation on 12 Vows & Shravak Dharma' : '3. बारह व्रत एवं श्रावक धर्म चिंतन',
          prakrit: 'पाणातिवाय-वेरमणं, मुसावाय-वेरमणं, अदत्तादाण-वेरमणं, मेहुण-वेरमणं, परिग्गह-वेरमणं।',
          hindi: isEnglish
            ? 'Self-reflection and repentance for transgressions in Ahimsa, Satya, Achaurya, Brahmacharya, and Aparigraha.'
            : 'अहिंसा, सत्य, अचौर्य, ब्रह्मचर्य एवं अपरिग्रह — इन पंच अणुव्रतों के अतिचारों की आलोचना करता हूँ।',
        },
      ],
    },
    shraman: {
      title: isEnglish ? 'Shraman Pratikraman' : 'श्रमण प्रतिक्रमण (Shraman Pratikraman)',
      subtitle: isEnglish ? 'Great Vow (Mahavrata) purification recitation for ascetics and dedicated practitioners' : 'साधु एवं गंभीर साधकों हेतु महाव्रत शुद्धि पाठ',
      duration: isEnglish ? 'Approx 45 mins' : 'लगभग 45 मिनट',
      steps: [
        {
          heading: isEnglish ? '1. Contemplation on 28 Mulagunas' : '1. 28 मूलगुण विचार',
          prakrit: 'पंच महाव्वय-जुत्तो, पंच-समिइ-तिगुत्ति-रक्खिओ, अट्ठावीस-मूलगुण-धारी समणो।',
          hindi: isEnglish
            ? 'Purification of subtle deviations in 5 Mahavratas, 5 Samitis, and 3 Guptis.'
            : '5 महाव्रत, 5 समिति और 3 गुप्ति — इन 28 मूलगुणों में लगे सूक्ष्म स्खलनों का आत्मशोधन।',
        },
      ],
    },
    pakshik: {
      title: isEnglish ? 'Pakshik & Kshamavani Pratikraman' : 'पाक्षिक एवं क्षमावाणी प्रतिक्रमण',
      subtitle: isEnglish ? 'Fortnightly fault rectification and universal forgiveness prayer' : 'पक्षभर के दोषों का परिहार एवं सर्व जीव क्षमा याचना',
      duration: isEnglish ? 'Approx 40 mins' : 'लगभग 40 मिनट',
      steps: [
        {
          heading: isEnglish ? '1. Universal Friendship & Forgiveness Sutra' : '1. विश्व मैत्री एवं क्षमा सूत्र',
          prakrit: 'खामेमि सव्व जीवे, सव्वे जीवा खमंतु मे। मित्ती मे सव्व भूएसु, वेरं मज्झं न केणइ॥',
          hindi: isEnglish
            ? 'I grant forgiveness to all living beings, may all living beings forgive me. I have friendship with all, enmity towards none.'
            : 'मैं संसार के समस्त जीवों से क्षमा मांगता हूँ, सब जीव मुझे क्षमा करें। मेरी सब प्राणियों से मैत्री है, किसी से वैर नहीं।',
        },
      ],
    },
  };

  const current = pratikramanData[selectedType];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🌸 *${current.title}*\n${current.subtitle}\n\nछत्र छाया ऐप से प्रतिदिन प्रतिक्रमण स्वाध्याय करें:\nhttps://chhatrachhaya.org/sadhna`,
        title: current.title,
      });
    } catch {
      Alert.alert('शेयर', 'शेयर संवाद नहीं खुला');
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
          {isEnglish ? 'Pratikraman Texts & Method' : 'प्रतिक्रमण पाठ व विधि'}
        </Text>

        <TouchableOpacity
          onPress={handleShare}
          className="w-11 h-11 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
        >
          <Share2 size={18} color="#903f00" />
        </TouchableOpacity>
      </View>

      {/* Pratikraman Segmented Tabs */}
      <View className="bg-[#f0f3ff] p-1.5 flex-row border-b border-[#dee8ff]">
        <TouchableOpacity
          onPress={() => setSelectedType('iryapath')}
          className={`flex-1 py-2 rounded-lg items-center ${
            selectedType === 'iryapath' ? 'bg-[#903f00]' : ''
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              selectedType === 'iryapath' ? 'text-white' : 'text-[#564338]'
            }`}
          >
            {isEnglish ? 'Iryapath' : 'ईर्यापथ'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedType('daivasik')}
          className={`flex-1 py-2 rounded-lg items-center ${
            selectedType === 'daivasik' ? 'bg-[#903f00]' : ''
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              selectedType === 'daivasik' ? 'text-white' : 'text-[#564338]'
            }`}
          >
            {isEnglish ? 'Daivasik' : 'दैवसिक'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedType('shraman')}
          className={`flex-1 py-2 rounded-lg items-center ${
            selectedType === 'shraman' ? 'bg-[#903f00]' : ''
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              selectedType === 'shraman' ? 'text-white' : 'text-[#564338]'
            }`}
          >
            {isEnglish ? 'Shraman' : 'श्रमण'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedType('pakshik')}
          className={`flex-1 py-2 rounded-lg items-center ${
            selectedType === 'pakshik' ? 'bg-[#903f00]' : ''
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              selectedType === 'pakshik' ? 'text-white' : 'text-[#564338]'
            }`}
          >
            {isEnglish ? 'Pakshik' : 'पाक्षिक'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
        {/* Title Banner */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          <View className="flex-row items-center justify-between mb-2">
            <View className="bg-[#ffdbca] px-3 py-1 rounded-full">
              <Text className="text-[#903f00] font-bold text-xs">{current.duration}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsPlayingAudio(!isPlayingAudio);
                Alert.alert(
                  isEnglish ? 'Audio Recitation' : 'ऑडियो पाठ',
                  isPlayingAudio
                    ? (isEnglish ? 'Audio paused' : 'ऑडियो रोक दिया गया')
                    : (isEnglish ? 'Prakrit audio recitation started...' : 'शुद्ध प्राकृत वाचन प्रारंभ...')
                );
              }}
              className="flex-row items-center gap-1.5 bg-[#f0f3ff] px-3 py-1.5 rounded-full border border-[#dee8ff]"
            >
              {isPlayingAudio ? (
                <Volume2 size={16} color="#903f00" />
              ) : (
                <VolumeX size={16} color="#564338" />
              )}
              <Text className="text-[#903f00] text-xs font-bold">
                {isPlayingAudio
                  ? (isEnglish ? 'Playing' : 'वाचन चालू')
                  : (isEnglish ? 'Listen Audio' : 'ऑडियो सुनें')}
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-[#111c2d] font-bold text-xl leading-7 mb-1">
            {current.title}
          </Text>
          <Text className="text-[#564338] text-sm leading-6">
            {current.subtitle}
          </Text>
        </View>

        {/* Kayotsarga Breath Counter Card */}
        <View className="bg-[#ffd9e1]/40 p-4 rounded-2xl border border-[#a5345d]/20 mb-4 flex-row items-center justify-between">
          <View className="flex-1 mr-3">
            <Text className="text-[#a5345d] font-bold text-sm">
              {isEnglish ? 'Kayotsarga Breath Counter:' : 'कायोत्सर्ग उच्छ्वास गणक (Breath Count):'}
            </Text>
            <Text className="text-[#564338] text-xs mt-0.5">
              {isEnglish ? `Target: 27 Breaths (Current: ${breathCount}/27)` : `लक्ष्य: 27 उच्छ्वास जाप (वर्तमान: ${breathCount}/27)`}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => setBreathCount(Math.min(27, breathCount + 1))}
              className="bg-[#a5345d] px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-bold text-sm">
                {isEnglish ? '+1 Count' : '+1 जाप'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBreathCount(0)}
              className="bg-white p-2 rounded-xl border border-[#a5345d]/20"
            >
              <RotateCcw size={16} color="#a5345d" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Steps List */}
        <View className="gap-3 mb-6">
          {current.steps.map((step, idx) => (
            <View
              key={idx}
              className="bg-white p-5 rounded-2xl border border-[#dee8ff] shadow-xs"
            >
              <Text className="text-[#903f00] font-bold text-base mb-2.5">
                {step.heading}
              </Text>

              {/* Prakrit */}
              <View className="bg-[#fff8f3] p-4 rounded-xl border border-[#ffdbca] mb-3">
                <Text className="text-[#903f00] font-bold text-base leading-7 italic">
                  "{step.prakrit}"
                </Text>
              </View>

              {/* Hindi / English Meaning */}
              <Text className="text-[#111c2d] text-sm leading-6 font-medium">
                {step.hindi}
              </Text>
            </View>
          ))}
        </View>

        {/* Universal Kshamavani Sutra at bottom */}
        <View className="bg-[#ffdbca] p-5 rounded-2xl border border-[#b45309]/30 mb-8 items-center">
          <Sparkles size={24} color="#903f00" className="mb-2" />
          <Text className="text-[#903f00] font-bold text-lg text-center mb-1">
            खामेमि सव्व जीवे, सव्वे जीवा खमंतु मे।
          </Text>
          <Text className="text-[#903f00] font-bold text-lg text-center mb-2">
            मित्ती मे सव्व भूएसु, वेरं मज्झं न केणइ॥
          </Text>
          <Text className="text-[#763300] text-xs text-center">
            {isEnglish
              ? '(Forgiveness to all, may all forgive me, friendship with all, enmity towards none)'
              : '(सब जीवों से क्षमा, सब जीव मुझे क्षमा करें, सब जीवों से मैत्री हो)'}
          </Text>
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
