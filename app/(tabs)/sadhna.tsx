import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '../../src/components/common/Header';
import { useLanguage } from '../../src/context/LanguageContext';
import { 
  Sparkles, 
  RotateCcw, 
  Play, 
  Pause, 
  Video, 
  Heart, 
  Flame, 
  Check, 
  Clock, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Quote, 
  Trophy,
  Share2
} from 'lucide-react-native';

export default function SadhnaScreen() {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();
  // Samayik Timer State (48:00 = 2880 seconds)
  const [samayikSeconds, setSamayikSeconds] = useState(2880);
  const [isSamayikRunning, setIsSamayikRunning] = useState(false);

  // Digital Mala State (Target: 5 malas, 108 beads each)
  const [completedMalas, setCompletedMalas] = useState(3);
  const targetMalas = 5;
  const [hapticSoundEnabled, setHapticSoundEnabled] = useState(true);

  // Leaderboard Tab
  const [leaderboardTab, setLeaderboardTab] = useState<'weekly' | 'monthly' | 'myRank'>('weekly');
  const [cheeredUsers, setCheeredUsers] = useState<Record<string, boolean>>({});
  const [allCheered, setAllCheered] = useState(false);

  // Checklist state
  const [checklist, setChecklist] = useState({
    devDarshan: true,
    mala: true,
    swadhyay: true,
    samayik: false,
  });

  // Samayik Countdown Effect
  useEffect(() => {
    let interval: any = null;
    if (isSamayikRunning && samayikSeconds > 0) {
      interval = setInterval(() => {
        setSamayikSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsSamayikRunning(false);
            Vibration.vibrate([0, 500, 200, 500]);
            Alert.alert('सामायिक पूर्ण', 'आपकी 48-मिनट की पवित्र सामायिक साधना सफलतापूर्वक पूर्ण हुई! समता भाव का फल अक्षय है।');
            setChecklist(c => ({ ...c, samayik: true }));
            return 2880;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSamayikRunning, samayikSeconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMalaIncrement = (count: number = 1) => {
    if (hapticSoundEnabled) {
      Vibration.vibrate(40);
    }
    setCompletedMalas(prev => Math.min(21, prev + count));
  };

  const handleMalaDecrement = () => {
    setCompletedMalas(prev => Math.max(0, prev - 1));
  };

  const handleMalaReset = () => {
    Alert.alert('माला रीसेट', 'क्या आप जप माला गणना को पुनः 0 पर सेट करना चाहते हैं?', [
      { text: 'रद्द करें', style: 'cancel' },
      { text: 'हाँ, रीसेट करें', onPress: () => setCompletedMalas(0) }
    ]);
  };

  const toggleCheer = (userId: string) => {
    setCheeredUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
    if (hapticSoundEnabled) Vibration.vibrate(30);
  };

  const handleCheerAll = () => {
    setAllCheered(true);
    setCheeredUsers({
      '1': true,
      '2': true,
      '3': true,
    });
    Alert.alert('पुण्य अनुमोदना', 'आपने सभी साधक बंधुओं के संयम व तप की पावन अनुमोदना की! 🙏');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9ff]" edges={['top', 'left', 'right']}>
      <Header title="मेरी साधना" subtitle="सामायिक, जप माला एवं श्रावक अनुष्ठान" />

      <View className="flex-1 bg-[#f9f9ff]">
        <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>

          {/* ================= TOP GREETING & SACRED BLESSING ================= */}
          <View className="pt-1 pb-3">
            <View className="flex-row items-center justify-between mb-1.5">
              <View className="flex-row items-center gap-2">
                <Sparkles size={18} color="#903f00" />
                <Text className="text-[#903f00] font-bold text-xs tracking-wider uppercase">
                  {t('sadhna.headerTitle', 'आत्मानुशासन • आत्मशुद्धि')}
                </Text>
              </View>
              <View className="bg-[#e7eeff] px-3 py-1 rounded-full border border-[#dee8ff]">
                <Text className="text-[#564338] text-xs font-semibold">
                  {t('sadhna.tithiBadge', 'तिथि: शुक्ल दशमी')}
                </Text>
              </View>
            </View>

            <Text className="text-[#111c2d] font-bold text-2xl mb-1">
              {isEnglish ? 'My Sadhna & Devotee Board' : 'मेरी साधना एवं श्रावक बोर्ड'}
            </Text>
            <Text className="text-[#564338] text-sm leading-5">
              {isEnglish
                ? 'Daily Swadhyay, Samayik and Navkar Jap under the guidance of Acharya Shri Vibhav Sagar Ji Maharaj.'
                : 'आचार्य श्री विभव सागर जी महाराज के सान्निध्य में नित्य स्वाध्याय, सामायिक एवं णमोकार जप अनुष्ठान।'}
            </Text>
          </View>

          {/* ================= DAILY SADHNA PROGRESS CARD ================= */}
          <View className="bg-white rounded-2xl p-4 mb-4 border border-[#dee8ff] shadow-xs">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1 mr-2">
                <Text className="text-[#564338] text-xs font-semibold">
                  {t('sadhna.progressTitle', 'दैनिक साधना स्थिति')}
                </Text>
                <Text className="text-[#111c2d] font-bold text-lg leading-6 mt-0.5">
                  {isEnglish
                    ? `Today's Score: ${checklist.samayik ? '4/4 Completed' : '3/4 Completed'}`
                    : `आज का संकल्प स्कोर: ${checklist.samayik ? '4/4 पूर्ण' : '3/4 पूर्ण'}`}
                </Text>
              </View>
              {/* Circular Progress Ring */}
              <View className="w-16 h-16 rounded-full border-4 border-[#ffdbca] items-center justify-center relative">
                <View 
                  className="w-16 h-16 rounded-full border-4 border-[#903f00] absolute -top-1 -left-1" 
                  style={{ borderRightColor: 'transparent', borderBottomColor: checklist.samayik ? '#903f00' : 'transparent' }} 
                />
                <Text className="text-[#903f00] font-bold text-lg">
                  {checklist.samayik ? '100%' : '75%'}
                </Text>
              </View>
            </View>

            {/* Streak Ribbon */}
            <View className="bg-[#f0f3ff] p-3 rounded-xl mb-3 flex-row items-center justify-between border border-[#dee8ff]">
              <View className="flex-row items-center gap-3 flex-1 mr-2">
                <View className="w-10 h-10 rounded-full bg-[#ffdbca] items-center justify-center">
                  <Flame size={20} color="#903f00" />
                </View>
                <View className="flex-1">
                  <Text className="text-[#111c2d] font-bold text-sm">
                    {isEnglish ? '7-Day Continuous Streak 🔥' : '7 दिन का अटूट नियम प्रवाह 🔥'}
                  </Text>
                  <Text className="text-[#564338] text-xs">
                    {isEnglish ? '7-Day Unbroken Streak • Uttam Kshama' : '7-Day Unbroken Streak • उत्तम क्षमा'}
                  </Text>
                </View>
              </View>
              <View className="bg-[#d8e3fb] px-3 py-1 rounded-full">
                <Text className="text-[#903f00] font-bold text-xs">+140 pts</Text>
              </View>
            </View>

            {/* Quick 2x2 Checklist Grid */}
            <View className="flex-row flex-wrap gap-2">
              <TouchableOpacity 
                onPress={() => setChecklist(c => ({ ...c, devDarshan: !c.devDarshan }))}
                className={`w-[48.5%] p-2.5 rounded-lg flex-row items-center gap-2 border ${checklist.devDarshan ? 'bg-[#f0f3ff] border-[#dee8ff]' : 'bg-slate-50 border-slate-200'}`}
              >
                <Check size={16} color={checklist.devDarshan ? "#006165" : "#94A3B8"} />
                <Text className="text-[#111c2d] text-xs font-semibold">देवदर्शन पूर्ण</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setChecklist(c => ({ ...c, mala: !c.mala }))}
                className={`w-[48.5%] p-2.5 rounded-lg flex-row items-center gap-2 border ${checklist.mala ? 'bg-[#f0f3ff] border-[#dee8ff]' : 'bg-slate-50 border-slate-200'}`}
              >
                <Check size={16} color={checklist.mala ? "#006165" : "#94A3B8"} />
                <Text className="text-[#111c2d] text-xs font-semibold">णमोकार 3 माला</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setChecklist(c => ({ ...c, swadhyay: !c.swadhyay }))}
                className={`w-[48.5%] p-2.5 rounded-lg flex-row items-center gap-2 border ${checklist.swadhyay ? 'bg-[#f0f3ff] border-[#dee8ff]' : 'bg-slate-50 border-slate-200'}`}
              >
                <Check size={16} color={checklist.swadhyay ? "#006165" : "#94A3B8"} />
                <Text className="text-[#111c2d] text-xs font-semibold">स्वाध्याय 20 min</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setChecklist(c => ({ ...c, samayik: !c.samayik }))}
                className={`w-[48.5%] p-2.5 rounded-lg flex-row items-center gap-2 border ${checklist.samayik ? 'bg-[#f0f3ff] border-[#dee8ff]' : 'bg-[#dee8ff] border-[#c4d6ff]'}`}
              >
                {checklist.samayik ? (
                  <Check size={16} color="#006165" />
                ) : (
                  <Clock size={16} color="#903f00" />
                )}
                <Text className={`text-xs font-bold ${checklist.samayik ? 'text-[#111c2d]' : 'text-[#903f00]'}`}>
                  {checklist.samayik ? 'सामायिक पूर्ण' : 'सामायिक शेष'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ================= VISUAL DIVIDER ================= */}
          <View className="flex-row items-center justify-center gap-3 my-2">
            <View className="h-px bg-[#d8e3fb] w-16" />
            <Text className="text-[#897267] text-xs font-semibold uppercase tracking-wider">
              नित्य साधना उपकरण
            </Text>
            <View className="h-px bg-[#d8e3fb] w-16" />
          </View>

          {/* ================= MODULE A: 48-MIN SAMAYIK TIMER ================= */}
          <View className="bg-white rounded-2xl p-4 mb-4 border border-[#dee8ff] shadow-xs">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-xl bg-[#e7eeff] items-center justify-center">
                  <Sparkles size={20} color="#903f00" />
                </View>
                <View>
                  <Text className="text-[#111c2d] font-bold text-lg">48 मिनट सामायिक साधना</Text>
                  <Text className="text-[#564338] text-xs">समता भाव धारण • 2 घड़ी काल</Text>
                </View>
              </View>
              <View className="bg-[#f0f3ff] px-3 py-1 rounded-full border border-[#dee8ff]">
                <Text className="text-[#564338] text-xs font-semibold">दो घड़ी</Text>
              </View>
            </View>

            {/* Timer Display Panel */}
            <View className="bg-[#f0f3ff] rounded-xl py-3 items-center justify-center mb-3 border border-[#dee8ff]">
              <Text className="text-[#903f00] font-bold text-4xl tracking-widest">
                {formatTime(samayikSeconds)}
              </Text>
            </View>

            {/* Video Guide Row */}
            <View className="bg-[#e7eeff] p-3 rounded-xl mb-3 flex-row items-center justify-between border border-[#dee8ff]">
              <View className="flex-row items-center gap-3 flex-1 mr-2">
                <View className="w-10 h-10 rounded-lg bg-[#903f00] items-center justify-center">
                  <Video size={18} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-[#111c2d] font-bold text-xs" numberOfLines={1}>
                    48-मिनट सामायिक विधि वीडियो गाइड
                  </Text>
                  <Text className="text-[#564338] text-[11px]" numberOfLines={1}>
                    पूज्य गुरुदेव के सान्निध्य में पाठ एवं ध्यान विधि
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => Alert.alert('सामायिक विधि', 'पूज्य गुरुदेव श्री 108 विभव सागर जी महाराज की पावन वाणी में सामायिक पाठ एवं संकल्प विधि।')}
                className="bg-white px-3 py-1.5 rounded-lg border border-[#ddc1b3]"
              >
                <Text className="text-[#903f00] font-bold text-xs">वीडियो देखें</Text>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity
              onPress={() => setIsSamayikRunning(!isSamayikRunning)}
              className="bg-[#903f00] h-14 rounded-xl flex-row items-center justify-center gap-2 shadow-xs active:bg-[#763300] mb-2"
            >
              {isSamayikRunning ? <Pause size={20} color="#FFFFFF" /> : <Play size={20} color="#FFFFFF" fill="#FFFFFF" />}
              <Text className="text-white font-bold text-base">
                {isSamayikRunning ? 'सामायिक विराम दें (Pause)' : 'सामायिक प्रारंभ करें'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsSamayikRunning(false);
                setSamayikSeconds(2880);
              }}
              className="bg-[#e7eeff] h-12 rounded-xl items-center justify-center border border-[#dee8ff] active:bg-[#dee8ff]"
              accessibilityLabel="पुनः सेट करें"
            >
              <RotateCcw size={18} color="#903f00" />
            </TouchableOpacity>
          </View>

          {/* ================= MODULE B: DIGITAL 108 NAMOKAR JAPAMALA COUNTER ================= */}
          <View className="bg-white rounded-2xl p-4 mb-4 border border-[#dee8ff] shadow-xs">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-xl bg-[#e7eeff] items-center justify-center">
                  <Sparkles size={20} color="#903f00" />
                </View>
                <View>
                  <Text className="text-[#111c2d] font-bold text-lg">डिजिटल णमोकार जप माला</Text>
                  <Text className="text-[#564338] text-xs">पूर्ण माला अनुष्ठान (108 मणका प्रति माला)</Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => setHapticSoundEnabled(!hapticSoundEnabled)}
                className="w-10 h-10 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
              >
                {hapticSoundEnabled ? <Volume2 size={18} color="#903f00" /> : <VolumeX size={18} color="#564338" />}
              </TouchableOpacity>
            </View>

            {/* Target Row */}
            <View className="bg-[#f0f3ff] p-3 rounded-lg mb-3 flex-row items-center justify-between border border-[#dee8ff]">
              <View className="bg-[#ffdbca] px-2.5 py-1 rounded">
                <Text className="text-[#331200] font-bold text-xs">आज का लक्ष्य: {targetMalas} माला</Text>
              </View>
              <Text className="text-[#903f00] font-bold text-xs">
                पूर्ण: {completedMalas} माला ({completedMalas * 108} महामंत्र)
              </Text>
            </View>

            {/* Central Circle Display */}
            <View className="items-center justify-center py-2 mb-3">
              <View className="w-44 h-44 rounded-full border-4 border-[#ffdbca] items-center justify-center relative bg-[#f9f9ff]">
                <View 
                  className="w-44 h-44 rounded-full border-4 border-[#903f00] absolute -top-1 -left-1" 
                  style={{ 
                    borderRightColor: completedMalas >= 3 ? '#903f00' : 'transparent',
                    borderBottomColor: completedMalas >= 4 ? '#903f00' : 'transparent',
                    borderLeftColor: completedMalas >= 5 ? '#903f00' : 'transparent' 
                  }} 
                />
                <Text className="text-[#897267] text-xs uppercase font-semibold">साधना लक्ष्य</Text>
                <Text className="text-[#903f00] font-bold text-4xl my-0.5">{completedMalas} / {targetMalas}</Text>
                <Text className="text-[#564338] text-xs font-medium">माला पूर्ण</Text>
                <Text className="text-[#006165] font-bold text-xs mt-0.5">({completedMalas * 108} जाप)</Text>
              </View>
            </View>

            {/* Controls Row 1: -1 and +1 */}
            <View className="flex-row gap-3 mb-2.5">
              <TouchableOpacity
                onPress={handleMalaDecrement}
                className="w-12 h-12 rounded-xl bg-[#e7eeff] items-center justify-center border border-[#dee8ff] active:bg-[#dee8ff]"
              >
                <Text className="text-[#111c2d] font-bold text-xl">-1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleMalaIncrement(1)}
                className="flex-1 h-12 rounded-xl bg-[#903f00] items-center justify-center shadow-xs active:bg-[#763300]"
              >
                <Text className="text-white font-bold text-base">+1 पूर्ण माला जोड़ें</Text>
              </TouchableOpacity>
            </View>

            {/* Controls Row 2: Quick adds (+3, +5) */}
            <View className="flex-row gap-3 mb-3">
              <TouchableOpacity
                onPress={() => handleMalaIncrement(3)}
                className="flex-1 h-12 rounded-xl bg-[#e7eeff] items-center justify-center border border-[#dee8ff] active:bg-[#dee8ff]"
              >
                <Text className="text-[#903f00] font-bold text-sm">+3 माला</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleMalaIncrement(5)}
                className="flex-1 h-12 rounded-xl bg-[#e7eeff] items-center justify-center border border-[#dee8ff] active:bg-[#dee8ff]"
              >
                <Text className="text-[#903f00] font-bold text-sm">+5 माला</Text>
              </TouchableOpacity>
            </View>

            {/* Info & Reset Row */}
            <View className="flex-row items-center justify-between pt-1 pb-2 border-t border-[#dee8ff]">
              <Text className="text-[#897267] text-xs">प्रत्येक माला में 108 णमोकार महामंत्र स्मरण</Text>
              <TouchableOpacity onPress={handleMalaReset}>
                <Text className="text-[#903f00] font-bold text-xs">रीसेट</Text>
              </TouchableOpacity>
            </View>

            {/* Navkar Mantra sacred line */}
            <View className="items-center pt-2">
              <Text className="text-[#564338] text-xs text-center italic leading-5">
                "णमो अरिहंताणं • णमो सिद्धाणं • णमो आइरियाणं •{'\n'}णमो उवज्झायाणं • णमो लोए सव्वसाहूणं"
              </Text>
            </View>
          </View>

          {/* ================= MODULE C: 4 DIGAMBAR PRATIKRAMANS ================= */}
          <View className="bg-white rounded-2xl p-4 mb-4 border border-[#dee8ff] shadow-xs">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="w-11 h-11 rounded-xl bg-[#e7eeff] items-center justify-center">
                <BookOpen size={20} color="#903f00" />
              </View>
              <View>
                <Text className="text-[#111c2d] font-bold text-lg">
                  {isEnglish ? '4 Digambar Pratikraman Paths' : '4 दिगम्बर प्रतिक्रमण पथ'}
                </Text>
                <Text className="text-[#564338] text-xs">
                  {isEnglish ? 'Sacred recitation, Prakrit verses & audio' : 'शुद्ध पाठ, प्राकृत श्लोक एवं ऑडियो'}
                </Text>
              </View>
            </View>

            {[
              {
                id: '1',
                type: 'iryapath',
                title: isEnglish ? 'Iryapath Pratikraman' : 'इर्यापथ प्रतिक्रमण',
                subtitle: isEnglish ? 'Purification of movement faults • ~5 min' : 'गमन आगमन दोष शुद्धि • ~5 min',
                actionText: isEnglish ? 'Start' : 'आरंभ',
                isPrimary: true,
              },
              {
                id: '2',
                type: 'daivasik',
                title: isEnglish ? 'Daivasik / Shravak Pratikraman' : 'दैवसिक / श्रावक प्रतिक्रमण',
                subtitle: isEnglish ? 'Daily negligence atonement • ~20 min' : 'दिन भर के प्रमाद परिहार • ~20 min',
                actionText: isEnglish ? 'Start' : 'आरंभ',
                isPrimary: true,
              },
              {
                id: '3',
                type: 'shraman',
                title: isEnglish ? 'Shraman Pratikraman' : 'श्रमण प्रतिक्रमण',
                subtitle: isEnglish ? 'Great vow purification • ~45 min' : 'महाव्रत विशुद्धि साधना • ~45 min',
                actionText: isEnglish ? 'Recite' : 'पाठ',
                isPrimary: false,
              },
              {
                id: '4',
                type: 'pakshik',
                title: isEnglish ? 'Pakshik Pratikraman' : 'पाक्षिक प्रतिक्रमण',
                subtitle: isEnglish ? 'Chaturdashi/Ashtami festival • ~2 hrs' : 'चतुर्दशी/अष्टमी महापर्व • ~2 घंटे',
                actionText: isEnglish ? 'Recite' : 'पाठ',
                isPrimary: false,
              },
            ].map((item, index, arr) => (
              <View
                key={item.id}
                className={`bg-[#f0f3ff] p-3 rounded-xl flex-row items-center justify-between border border-[#dee8ff] ${
                  index < arr.length - 1 ? 'mb-2.5' : ''
                }`}
              >
                <View className="flex-row items-center gap-3 flex-1 mr-2">
                  <View className="w-9 h-9 rounded-full bg-[#e7eeff] items-center justify-center">
                    <Text className="text-[#903f00] font-bold text-sm">{item.id}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-[#111c2d] font-bold text-sm">{item.title}</Text>
                    <Text className="text-[#564338] text-xs">{item.subtitle}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => router.push(`/details/pratikraman?type=${item.type}`)}
                  className={`px-4 py-2 rounded-full ${
                    item.isPrimary
                      ? 'bg-[#903f00] shadow-xs active:bg-[#763300]'
                      : 'bg-[#e7eeff] border border-[#dee8ff]'
                  }`}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.title} ${item.actionText}`}
                >
                  <Text
                    className={`font-bold text-xs ${
                      item.isPrimary ? 'text-white' : 'text-[#111c2d]'
                    }`}
                  >
                    {item.actionText}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* ================= SECTION 3: SHRAVAK BHAKTI ANUMODANA LEADERBOARD ================= */}
          <View className="bg-white rounded-2xl p-4 mb-4 border border-[#dee8ff] shadow-xs">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <Trophy size={20} color="#903f00" />
                <Text className="text-[#111c2d] font-bold text-lg">श्रावक भक्ति अनुमोदना लीडरबोर्ड</Text>
              </View>
              <View className="bg-[#ffd9e1] px-2.5 py-1 rounded-full">
                <Text className="text-[#3f001a] font-bold text-xs">पुण्य अनुमोदना</Text>
              </View>
            </View>

            <Text className="text-[#564338] text-xs leading-4 mb-3">
              अन्य साधक बंधुओं के संयम व तप की अनुमोदना कर पुण्य उपार्जन करें।
            </Text>

            {/* Filter Tabs */}
            <View className="bg-[#f0f3ff] p-1 rounded-xl mb-3 flex-row border border-[#dee8ff]">
              <TouchableOpacity 
                onPress={() => setLeaderboardTab('weekly')}
                className={`flex-1 py-2 rounded-lg items-center ${leaderboardTab === 'weekly' ? 'bg-white shadow-xs' : ''}`}
              >
                <Text className={`text-xs font-bold ${leaderboardTab === 'weekly' ? 'text-[#903f00]' : 'text-[#564338]'}`}>साप्ताहिक</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setLeaderboardTab('monthly')}
                className={`flex-1 py-2 rounded-lg items-center ${leaderboardTab === 'monthly' ? 'bg-white shadow-xs' : ''}`}
              >
                <Text className={`text-xs font-bold ${leaderboardTab === 'monthly' ? 'text-[#903f00]' : 'text-[#564338]'}`}>मासिक</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setLeaderboardTab('myRank')}
                className={`flex-1 py-2 rounded-lg items-center ${leaderboardTab === 'myRank' ? 'bg-white shadow-xs' : ''}`}
              >
                <Text className={`text-xs font-bold ${leaderboardTab === 'myRank' ? 'text-[#903f00]' : 'text-[#564338]'}`}>मेरा स्थान</Text>
              </TouchableOpacity>
            </View>

            {/* User Rank 1 */}
            <View className="bg-[#f0f3ff] p-3 rounded-xl mb-2.5 flex-row items-center justify-between border border-[#dee8ff]">
              <View className="flex-row items-center gap-3 flex-1 mr-2">
                <View className="w-10 h-10 rounded-full bg-[#ffdbca] items-center justify-center">
                  <Text className="text-[#903f00] font-bold text-base">1</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-[#111c2d] font-bold text-sm">विमला जैन</Text>
                    <Text className="text-[#564338] text-xs">इंदौर</Text>
                    <View className="bg-[#ffb68e] px-2 py-0.5 rounded-full">
                      <Text className="text-[#331200] text-[10px] font-bold">स्वर्ण पदक</Text>
                    </View>
                  </View>
                  <Text className="text-[#564338] text-xs mt-0.5">
                    108 माला • 14 दिन नियम • <Text className="text-[#903f00] font-bold">980 pts</Text>
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => toggleCheer('1')}
                className={`w-10 h-10 rounded-full items-center justify-center border ${cheeredUsers['1'] ? 'bg-[#ffd9e1] border-[#a5345d]' : 'bg-[#e7eeff] border-[#dee8ff]'}`}
              >
                <Heart size={18} color={cheeredUsers['1'] ? "#a5345d" : "#564338"} fill={cheeredUsers['1'] ? "#a5345d" : "none"} />
              </TouchableOpacity>
            </View>

            {/* User Rank 2 */}
            <View className="bg-[#f0f3ff] p-3 rounded-xl mb-2.5 flex-row items-center justify-between border border-[#dee8ff]">
              <View className="flex-row items-center gap-3 flex-1 mr-2">
                <View className="w-10 h-10 rounded-full bg-[#e7eeff] items-center justify-center">
                  <Text className="text-[#111c2d] font-bold text-base">2</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-[#111c2d] font-bold text-sm">रमेश कुमार जैन</Text>
                    <Text className="text-[#564338] text-xs">जयपुर</Text>
                    <View className="bg-[#dee8ff] px-2 py-0.5 rounded-full">
                      <Text className="text-[#564338] text-[10px] font-bold">रजत पदक</Text>
                    </View>
                  </View>
                  <Text className="text-[#564338] text-xs mt-0.5">
                    72 माला • 12 दिन नियम • <Text className="text-[#903f00] font-bold">850 pts</Text>
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => toggleCheer('2')}
                className={`w-10 h-10 rounded-full items-center justify-center border ${cheeredUsers['2'] ? 'bg-[#ffd9e1] border-[#a5345d]' : 'bg-[#e7eeff] border-[#dee8ff]'}`}
              >
                <Heart size={18} color={cheeredUsers['2'] ? "#a5345d" : "#564338"} fill={cheeredUsers['2'] ? "#a5345d" : "none"} />
              </TouchableOpacity>
            </View>

            {/* User Rank 3 */}
            <View className="bg-[#f0f3ff] p-3 rounded-xl mb-3 flex-row items-center justify-between border border-[#dee8ff]">
              <View className="flex-row items-center gap-3 flex-1 mr-2">
                <View className="w-10 h-10 rounded-full bg-[#dee8ff] items-center justify-center">
                  <Text className="text-[#564338] font-bold text-base">3</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-[#111c2d] font-bold text-sm">डॉ. सुधीर शाह</Text>
                    <Text className="text-[#564338] text-xs">अहमदाबाद</Text>
                    <View className="bg-[#d8e3fb] px-2 py-0.5 rounded-full">
                      <Text className="text-[#564338] text-[10px] font-bold">कांस्य पदक</Text>
                    </View>
                  </View>
                  <Text className="text-[#564338] text-xs mt-0.5">
                    54 माला • 10 दिन नियम • <Text className="text-[#903f00] font-bold">720 pts</Text>
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => toggleCheer('3')}
                className={`w-10 h-10 rounded-full items-center justify-center border ${cheeredUsers['3'] ? 'bg-[#ffd9e1] border-[#a5345d]' : 'bg-[#e7eeff] border-[#dee8ff]'}`}
              >
                <Heart size={18} color={cheeredUsers['3'] ? "#a5345d" : "#564338"} fill={cheeredUsers['3'] ? "#a5345d" : "none"} />
              </TouchableOpacity>
            </View>

            {/* Your Rank Box */}
            <View className="bg-[#e7eeff] p-3.5 rounded-xl border border-[#dee8ff] mb-2">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-full bg-[#903f00] items-center justify-center">
                    <Text className="text-white font-bold text-sm">14</Text>
                  </View>
                  <View>
                    <Text className="text-[#111c2d] font-bold text-sm">आपकी रैंक: #14</Text>
                    <Text className="text-[#564338] text-xs">पुष्पा जैन, भोपाल • 36 माला • 510 pts</Text>
                  </View>
                </View>
                <View className="bg-white px-2.5 py-1 rounded-full border border-[#dee8ff]">
                  <Text className="text-[#903f00] font-bold text-xs">सक्रिय साधक</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleCheerAll}
                className="bg-[#a5345d] h-11 rounded-xl items-center justify-center flex-row gap-2 shadow-xs active:bg-[#852a4a]"
              >
                <Text className="text-white font-bold text-sm">
                  {allCheered ? 'सभी साधकों को अनुमोदित किया ✓' : 'सभी साधकों को अनुमोदना दें 👏 (128 अनुमोदित)'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ================= SPIRITUAL QUOTE FOOTER BANNER ================= */}
          <View className="bg-[#f0f3ff] rounded-2xl p-5 mb-8 items-center border border-[#dee8ff] shadow-xs">
            <Quote size={24} color="#903f00" />
            <Text className="text-[#903f00] font-bold text-lg text-center mt-2 mb-1">
              "साधना से ही कर्मों की निर्जरा संभव है।"
            </Text>
            <Text className="text-[#564338] text-xs text-center">
              — पूज्य आचार्य श्री 108 विभव सागर जी महाराज
            </Text>
          </View>

          <View className="h-10" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
