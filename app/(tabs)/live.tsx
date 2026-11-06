import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Share,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '../../src/components/common/Header';
import WhatsAppStatusModal from '../../src/components/common/WhatsAppStatusModal';
import { useLanguage } from '../../src/context/LanguageContext';
import {
  Play,
  Pause,
  Share2,
  Maximize2,
  Sparkles,
  Search,
  X,
  Video,
  Headphones,
  Tag,
  Clock,
  Eye,
  Download,
  Bell,
  MapPin,
  FileText,
  Check,
} from 'lucide-react-native';

interface ArchivePravachan {
  id: string;
  tag: string;
  tagBg: string;
  tagTextColor: string;
  date: string;
  title: string;
  subtitle: string;
  duration: string;
  views: string;
  category: 'video' | 'audio' | 'topic';
}

export default function LiveScreen() {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();
  const [isPlayingLive, setIsPlayingLive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState<'video' | 'audio' | 'topic'>('video');
  const [reminderSet, setReminderSet] = useState(false);
  const [fullSummaryVisible, setFullSummaryVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Past pravachan archive data matching Figma specifications
  const archivePravachans: ArchivePravachan[] = [
    {
      id: '1',
      tag: 'छहढाला',
      tagBg: '#9df0f4',
      tagTextColor: '#002021',
      date: '12 Feb 2025',
      title: 'छहढाला तृतीय ढाल व्याख्यान — सम्यक दर्शन महिमा',
      subtitle: 'आचार्य श्री द्वारा वीतराग वाणी का सरल, मार्मिक और व्यावहारिक विवेचन...',
      duration: '52 min',
      views: '3,420',
      category: 'video',
    },
    {
      id: '2',
      tag: 'कर्म सिद्धान्त',
      tagBg: '#ffdbca',
      tagTextColor: '#763300',
      date: '11 Feb 2025',
      title: 'कर्म सिद्धांत एवं पूर्व जन्म के संस्कार',
      subtitle: 'अष्ट कर्मों का उदय, उपशम और क्षायिक भाव का आध्यात्मिक विश्लेषण...',
      duration: '46 min',
      views: '2,810',
      category: 'audio',
    },
    {
      id: '3',
      tag: 'पर्व विवेचन',
      tagBg: '#ffd9e1',
      tagTextColor: '#861a45',
      date: '10 Feb 2025',
      title: 'दशलक्षण महापर्व: उत्तम क्षमा धर्म विवेचन',
      subtitle: 'क्षमा वीरों का आभूषण है: मन की ग्रन्थियों को खोलकर मैत्री भाव धारण करें...',
      duration: '64 min',
      views: '5,190',
      category: 'topic',
    },
  ];

  const suggestionPills = ['क्षमा वाणी', 'रात्रिकालीन संयम', 'पुण्य और पाप', 'आहारचर्या'];

  const filteredPravachans = archivePravachans.filter((item) => {
    const matchesFilter =
      activeFilterTab === 'video'
        ? true
        : activeFilterTab === 'audio'
        ? item.category === 'audio' || item.category === 'video'
        : true;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleShareLive = async () => {
    try {
      await Share.share({
        message:
          '🔴 पूज्य आचार्य श्री 108 विभव सागर जी महाराज का अमृत प्रवचन सीधा प्रसारण देखें:\nhttps://chhatrachhaya.org/live\nजय जिनेन्द्र!',
        title: 'सीधा आध्यात्मिक प्रसारण - छत्र छाया',
      });
    } catch {
      Alert.alert('शेयर', 'शेयर संवाद खोला नहीं जा सका।');
    }
  };

  const handleSetReminder = () => {
    const newStatus = !reminderSet;
    setReminderSet(newStatus);
    if (newStatus) {
      Alert.alert(
        'स्मरण सेट हो गया 🔔',
        'संध्या आरती एवं भक्तामर पाठ हेतु आपको सायं 06:30 बजे (15 मिनट पूर्व) सूचना प्राप्त होगी।'
      );
    } else {
      Alert.alert('स्मरण हटाया गया', 'आगामी प्रसारण का स्मरण रद्द कर दिया गया है।');
    }
  };

  const handleWhatsAppStatus = () => {
    setStatusModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9ff]" edges={['top', 'left', 'right']}>
      {/* Universal Top Header */}
      <Header
        title="आचार्य श्री 108 विभव सागर जी महाराज"
        subtitle="जैन आध्यात्मिक साथी"
      />

      <ScrollView className="flex-1 px-4 py-2" showsVerticalScrollIndicator={false}>
        {/* ================= 1. TOP AMBIENT BROADCAST BAR ================= */}
        <View className="flex-row items-center justify-between pt-2 pb-3 px-1">
          <View className="flex-row items-center gap-2">
            <View className="w-5 h-5 items-center justify-center">
              <Sparkles size={18} color="#903f00" />
            </View>
            <Text className="text-[#903f00] font-medium text-[15px] tracking-wide">
              {t('live.broadcastTitle', 'सीधा आध्यात्मिक प्रसारण')}
            </Text>
          </View>

          <View className="bg-[#dee8ff] flex-row items-center gap-1.5 px-3 py-1 rounded-full shadow-xs">
            <View className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" />
            <Text className="text-[#ba1a1a] font-semibold text-[13px] tracking-wide">
              {t('live.activeBadge', 'लाइव सत्र सक्रिय')}
            </Text>
          </View>
        </View>

        {/* ================= 2. LIVE STREAM HERO PLAYER ================= */}
        <View className="bg-white rounded-2xl border border-[#dee8ff] mb-6 overflow-hidden shadow-sm">
          {/* Video Container Frame */}
          <View className="aspect-video bg-[#263143] items-center justify-center relative overflow-hidden">
            <Image
              source={require('../../assets/images/live_darshan_stream.png')}
              className="w-full h-full absolute inset-0 opacity-85"
              resizeMode="cover"
            />

            {/* Dark gradient overlay for senior readable contrast */}
            <View className="absolute inset-0 bg-black/40" />

            {/* Top-Left Live Pill */}
            <View className="absolute top-3 left-3 bg-[#ba1a1a] flex-row items-center gap-2 px-3 py-1.5 rounded-full shadow-md">
              <View className="w-2.5 h-2.5 rounded-full bg-white" />
              <Text className="text-white font-bold text-[13px] tracking-wide">
                🔴 सीधा प्रसारण (LIVE NOW)
              </Text>
            </View>

            {/* Top-Right YouTube HD Pill */}
            <View className="absolute top-3 right-3 bg-[#263143]/85 flex-row items-center gap-1.5 px-2.5 py-1 rounded-lg">
              <View className="w-4 h-3 bg-[#ba1a1a] rounded-xs items-center justify-center">
                <Play size={8} color="#FFFFFF" fill="#FFFFFF" />
              </View>
              <Text className="text-[#ecf1ff] font-semibold text-[13px]">
                YouTube HD
              </Text>
            </View>

            {/* Central Play/Pause Button (64x64px, Senior Ergonomic) */}
            <TouchableOpacity
              onPress={() => setIsPlayingLive(!isPlayingLive)}
              activeOpacity={0.85}
              className="w-16 h-16 rounded-full bg-[#b45309] items-center justify-center shadow-2xl active:scale-95"
            >
              {isPlayingLive ? (
                <Pause size={28} color="#FFFFFF" fill="#FFFFFF" />
              ) : (
                <Play size={28} color="#FFFFFF" fill="#FFFFFF" className="ml-1" />
              )}
            </TouchableOpacity>

            {/* Player status feedback bottom pill */}
            <View className="absolute bottom-3 left-3 bg-black/75 px-3 py-1.5 rounded-md flex-row items-center gap-2">
              <View
                className={`w-2 h-2 rounded-full ${
                  isPlayingLive ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <Text className="text-white text-xs font-bold">
                {isPlayingLive
                  ? 'लाइव स्ट्रीम चल रही है (1,840+ साधक जुड़े हैं)'
                  : '▶️ लाइव दर्शन एवं प्रवचन हेतु टैप करें'}
              </Text>
            </View>
          </View>

          {/* Video Title and Location Body */}
          <View className="p-5">
            <Text className="font-bold text-[#111c2d] text-[20px] leading-7 mb-2">
              प्रातःकालीन अमृत प्रवचन — तत्त्वार्थ सूत्र महाग्रंथ व्याख्यान (भाग 42)
            </Text>

            <View className="flex-row items-start gap-2 mb-4">
              <MapPin size={18} color="#564338" className="mt-0.5 shrink-0" />
              <Text className="text-[#564338] text-[15px] leading-6 flex-1">
                पूज्य आचार्य श्री 108 विभव सागर जी महाराज • श्री दिगंबर जैन अतिशय क्षेत्र, मानसरोवर
              </Text>
            </View>

            {/* Interaction Buttons (Minimum 48px height) */}
            <View className="flex-row items-center gap-3 pt-1 border-t border-[#f0f3ff]">
              <TouchableOpacity
                onPress={handleShareLive}
                activeOpacity={0.8}
                className="flex-1 bg-[#f0f3ff] h-12 rounded-xl flex-row items-center justify-center gap-2 border border-[#dee8ff]"
              >
                <Share2 size={18} color="#006165" />
                <Text className="text-[#006165] font-bold text-[15px]">शेयर करें</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'पूर्ण स्क्रीन',
                    'लाइव स्ट्रीम को लैंडस्केप फुलस्क्रीन में देखने हेतु डिवाइस को घुमाएं या यूट्यूब प्लेयर का उपयोग करें।'
                  )
                }
                activeOpacity={0.8}
                className="flex-1 bg-[#f0f3ff] h-12 rounded-xl flex-row items-center justify-center gap-2 border border-[#dee8ff]"
              >
                <Maximize2 size={18} color="#111c2d" />
                <Text className="text-[#111c2d] font-bold text-[15px]">पूर्ण स्क्रीन</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= 3. 2-MINUTE AI PRAVACHAN SUMMARY ================= */}
        <View className="bg-[#ffdbca] p-5 rounded-2xl shadow-sm mb-6 relative overflow-hidden border border-[#b45309]/20">
          {/* Subtle Warm Halo Background */}
          <View className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-[#ffb68e]/40 blur-2xl pointer-events-none" />

          {/* Section Heading */}
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2.5">
              <View className="w-9 h-9 rounded-full bg-[#903f00] items-center justify-center shadow-xs">
                <Sparkles size={18} color="#FFFFFF" />
              </View>
              <View>
                <Text className="font-bold text-[#331200] text-[20px] leading-6">
                  2-मिनट एआई प्रवचन सार
                </Text>
                <Text className="font-medium text-[#763300] text-[13px] tracking-wide">
                  AI Key Insights • त्वरित स्वाध्याय
                </Text>
              </View>
            </View>

            <View className="bg-[#331200]/10 px-3 py-1 rounded-full">
              <Text className="font-semibold text-[#331200] text-[13px]">
                आज का सार
              </Text>
            </View>
          </View>

          <Text className="font-semibold text-[#331200] text-[16px] mb-3 mt-1">
            आज के प्रवचन के 3 मुख्य सूत्र (AI Summary):
          </Text>

          {/* 3 Key Insights Points */}
          <View className="gap-3 mb-4">
            {/* Point 1 */}
            <View className="bg-white/85 p-3.5 rounded-xl flex-row items-start gap-3 shadow-xs border border-white/60">
              <View className="w-6 h-6 rounded-full bg-[#b45309] items-center justify-center shrink-0 mt-0.5">
                <Text className="text-white font-bold text-xs">1</Text>
              </View>
              <Text className="text-[#111c2d] text-[15px] leading-6 flex-1 font-medium">
                सम्यक दर्शन के बिना किया गया बाह्य तप केवल कायाक्लेश है; आंतरिक भावों की निर्मलता ही मोक्षमार्ग है।
              </Text>
            </View>

            {/* Point 2 */}
            <View className="bg-white/85 p-3.5 rounded-xl flex-row items-start gap-3 shadow-xs border border-white/60">
              <View className="w-6 h-6 rounded-full bg-[#b45309] items-center justify-center shrink-0 mt-0.5">
                <Text className="text-white font-bold text-xs">2</Text>
              </View>
              <Text className="text-[#111c2d] text-[15px] leading-6 flex-1 font-medium">
                क्रोध और मान कषाय को शांत करने हेतु प्रतिदिन 10 मिनट मौन व आत्मनिरीक्षण अनिवार्य करें।
              </Text>
            </View>

            {/* Point 3 */}
            <View className="bg-white/85 p-3.5 rounded-xl flex-row items-start gap-3 shadow-xs border border-white/60">
              <View className="w-6 h-6 rounded-full bg-[#b45309] items-center justify-center shrink-0 mt-0.5">
                <Text className="text-white font-bold text-xs">3</Text>
              </View>
              <Text className="text-[#111c2d] text-[15px] leading-6 flex-1 font-medium">
                गृहस्थ जीवन में न्यायोपार्जित धन और दान का संतुलन ही धर्म की नींव है।
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="gap-2.5">
            <TouchableOpacity
              onPress={() => setFullSummaryVisible(true)}
              activeOpacity={0.85}
              className="bg-[#903f00] min-h-[50px] rounded-xl flex-row items-center justify-center gap-2 px-5 py-3 shadow-sm active:bg-[#763300]"
            >
              <FileText size={18} color="#FFFFFF" />
              <Text className="text-white font-bold text-[16px]">
                {t('live.readFullSummary', 'पूरा सार पढ़ें (Read Full Summary)')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleWhatsAppStatus}
              activeOpacity={0.85}
              className="bg-white min-h-[50px] rounded-xl flex-row items-center justify-center gap-2 px-5 py-3 shadow-xs border border-[#a5345d]/20 active:bg-[#f0f3ff]"
            >
              <Share2 size={18} color="#a5345d" />
              <Text className="text-[#a5345d] font-bold text-[16px]">
                {t('live.makeStatus', 'व्हाट्सएप स्टेटस बनाएं')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= 4. SMART PRAVACHAN SEARCH ================= */}
        <View className="bg-white p-5 rounded-2xl shadow-sm mb-6 border border-[#dee8ff]">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Search size={20} color="#111c2d" />
              <Text className="font-bold text-[#111c2d] text-[20px]">
                {t('live.searchTitle', 'स्मार्ट प्रवचन खोज')}
              </Text>
            </View>
            <Text className="font-medium text-[#564338] text-[13px]">
              {t('live.searchSub', 'भाव अनुसार खोजें')}
            </Text>
          </View>

          {/* 56px High-Contrast Senior Ergonomic Input */}
          <View className="h-14 bg-[#f0f3ff] rounded-xl flex-row items-center px-4 mb-3 border border-[#dee8ff]">
            <Search size={18} color="#564338" />
            <TextInput
              placeholder={t('live.searchPlaceholder', 'प्रश्न या विषय लिखें (जैसे: क्रोध मुक्ति, सामायिक)...')}
              placeholderTextColor="#8a7366"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 text-[#111c2d] text-[15px]"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                className="w-8 h-8 rounded-full bg-[#dee8ff] items-center justify-center"
              >
                <X size={16} color="#564338" />
              </TouchableOpacity>
            )}
          </View>

          {/* Quick Suggestion Pills */}
          <View className="flex-row flex-wrap items-center gap-2 pt-1">
            <Text className="text-[#564338] text-[13px] font-medium mr-1">
              सुझाव:
            </Text>
            {suggestionPills.map((pill) => (
              <TouchableOpacity
                key={pill}
                onPress={() => setSearchQuery(pill === searchQuery ? '' : pill)}
                activeOpacity={0.7}
                className={`min-h-[40px] px-3.5 py-2 rounded-full border ${
                  searchQuery === pill
                    ? 'bg-[#903f00] border-[#903f00]'
                    : 'bg-[#e7eeff] border-transparent'
                }`}
              >
                <Text
                  className={`text-[14px] font-medium ${
                    searchQuery === pill ? 'text-white font-bold' : 'text-[#111c2d]'
                  }`}
                >
                  {pill}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ================= 5. PAST PRAVACHAN ARCHIVES ================= */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3 px-1">
            <View className="flex-row items-center gap-2">
              <Video size={20} color="#111c2d" />
              <Text className="font-bold text-[#111c2d] text-[20px]">
                विगत अमृत प्रवचन संग्रह
              </Text>
            </View>
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text className="font-bold text-[#903f00] text-[14px]">
                सभी देखें (All)
              </Text>
            </TouchableOpacity>
          </View>

          {/* 3 Category Filter Tabs (Min height 46px) */}
          <View className="bg-[#f0f3ff] p-1 rounded-xl flex-row items-center gap-1 mb-4 border border-[#dee8ff]">
            <TouchableOpacity
              onPress={() => setActiveFilterTab('video')}
              activeOpacity={0.8}
              className={`flex-1 min-h-[46px] rounded-lg flex-row items-center justify-center gap-2 ${
                activeFilterTab === 'video'
                  ? 'bg-white shadow-xs border border-[#dee8ff]'
                  : ''
              }`}
            >
              <Video
                size={16}
                color={activeFilterTab === 'video' ? '#903f00' : '#564338'}
              />
              <Text
                className={`text-[14px] font-bold ${
                  activeFilterTab === 'video' ? 'text-[#903f00]' : 'text-[#564338]'
                }`}
              >
                वीडियो (Video)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilterTab('audio')}
              activeOpacity={0.8}
              className={`flex-1 min-h-[46px] rounded-lg flex-row items-center justify-center gap-2 ${
                activeFilterTab === 'audio'
                  ? 'bg-white shadow-xs border border-[#dee8ff]'
                  : ''
              }`}
            >
              <Headphones
                size={16}
                color={activeFilterTab === 'audio' ? '#903f00' : '#564338'}
              />
              <Text
                className={`text-[14px] font-bold ${
                  activeFilterTab === 'audio' ? 'text-[#903f00]' : 'text-[#564338]'
                }`}
              >
                ऑडियो (MP3)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilterTab('topic')}
              activeOpacity={0.8}
              className={`flex-1 min-h-[46px] rounded-lg flex-row items-center justify-center gap-2 ${
                activeFilterTab === 'topic'
                  ? 'bg-white shadow-xs border border-[#dee8ff]'
                  : ''
              }`}
            >
              <Tag
                size={16}
                color={activeFilterTab === 'topic' ? '#903f00' : '#564338'}
              />
              <Text
                className={`text-[14px] font-bold ${
                  activeFilterTab === 'topic' ? 'text-[#903f00]' : 'text-[#564338]'
                }`}
              >
                विषयवार
              </Text>
            </TouchableOpacity>
          </View>

          {/* Archive Cards List */}
          <View className="gap-3">
            {filteredPravachans.length === 0 ? (
              <View className="bg-white p-8 rounded-2xl items-center border border-[#dee8ff]">
                <Text className="text-[#564338] text-[16px] text-center mb-2 font-medium">
                  कोई प्रवचन नहीं मिला।
                </Text>
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  className="bg-[#f0f3ff] px-4 py-2 rounded-lg"
                >
                  <Text className="text-[#903f00] font-bold">खोज रीसेट करें</Text>
                </TouchableOpacity>
              </View>
            ) : (
              filteredPravachans.map((item) => (
                <View
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-[#dee8ff] shadow-xs"
                >
                  {/* Top Row: Tag, Date & Thumbnail Play Icon */}
                  <View className="flex-row items-start justify-between gap-3 mb-2">
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-1.5">
                        <View
                          style={{ backgroundColor: item.tagBg }}
                          className="px-2.5 py-0.5 rounded"
                        >
                          <Text
                            style={{ color: item.tagTextColor }}
                            className="font-bold text-[13px]"
                          >
                            {item.tag}
                          </Text>
                        </View>
                        <Text className="text-[#564338] font-medium text-[13px]">
                          {item.date}
                        </Text>
                      </View>

                      <Text className="font-bold text-[#111c2d] text-[18px] leading-6 mb-1">
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={2}
                        className="text-[#564338] text-[14px] leading-5"
                      >
                        {item.subtitle}
                      </Text>
                    </View>

                    {/* Right Thumbnail Container */}
                    <TouchableOpacity
                      onPress={() => {
                        router.push(
                          `/details/pravachan?title=${encodeURIComponent(item.title)}&date=${encodeURIComponent(item.date)}&tag=${encodeURIComponent(item.tag)}&duration=${encodeURIComponent(item.duration)}&views=${encodeURIComponent(item.views)}`
                        );
                      }}
                      className="w-14 h-14 rounded-xl bg-[#dee8ff] items-center justify-center shrink-0 border border-[#dee8ff]"
                    >
                      <Play size={24} color="#903f00" fill="#903f00" />
                    </TouchableOpacity>
                  </View>

                  {/* Bottom Meta & Actions Row */}
                  <View className="flex-row items-center justify-between pt-3 mt-1 border-t border-[#f0f3ff]">
                    {/* Duration & Views */}
                    <View className="flex-row items-center gap-3">
                      <View className="flex-row items-center gap-1.5">
                        <Clock size={15} color="#564338" />
                        <Text className="text-[#564338] text-[13px] font-medium">
                          {item.duration}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1.5">
                        <Eye size={15} color="#564338" />
                        <Text className="text-[#564338] text-[13px] font-medium">
                          {item.views}
                        </Text>
                      </View>
                    </View>

                    {/* Listen & Download Action Buttons */}
                    <View className="flex-row items-center gap-2">
                      <TouchableOpacity
                        onPress={() => {
                          if (playingAudioId === item.id) {
                            setPlayingAudioId(null);
                          } else {
                            setPlayingAudioId(item.id);
                            Alert.alert('ऑडियो प्रवचन', `'${item.title}' चल रहा है 🎧`);
                          }
                        }}
                        activeOpacity={0.8}
                        className="bg-[#f0f3ff] min-h-[44px] px-3.5 py-2 rounded-lg flex-row items-center gap-1.5 border border-[#dee8ff]"
                      >
                        {playingAudioId === item.id ? (
                          <Pause size={16} color="#903f00" />
                        ) : (
                          <Play size={16} color="#903f00" fill="#903f00" />
                        )}
                        <Text className="text-[#903f00] font-bold text-[14px]">
                          {playingAudioId === item.id ? 'रोकें' : 'सुनें'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            'ऑडियो डाउनलोड',
                            `'${item.title}' को ऑफ़लाइन सुनने हेतु डाउनलोड किया जा रहा है...`
                          )
                        }
                        activeOpacity={0.8}
                        className="w-11 h-11 bg-[#f0f3ff] rounded-lg items-center justify-center border border-[#dee8ff]"
                      >
                        <Download size={16} color="#564338" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        {/* ================= 6. UPCOMING LIVE BROADCAST TIME ================= */}
        <View className="bg-white p-5 rounded-2xl shadow-sm mb-6 relative overflow-hidden border border-[#dee8ff]">
          {/* Left Calm Green Accent Ribbon */}
          <View className="absolute top-0 bottom-0 left-0 w-2.5 bg-[#006165]" />

          <View className="pl-2">
            {/* Header with Clock & Today Evening Pill */}
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <Clock size={20} color="#006165" />
                <Text className="font-bold text-[#111c2d] text-[20px]">
                  आगामी लाइव प्रसारण समय
                </Text>
              </View>
              <View className="bg-[#dee8ff] px-2.5 py-1 rounded-full">
                <Text className="font-semibold text-[#564338] text-[13px]">
                  आज शाम
                </Text>
              </View>
            </View>

            {/* Event Title & Subtitle */}
            <Text className="font-bold text-[#111c2d] text-[18px] leading-6 mb-1">
              संध्या आरती एवं भक्तामर पाठ: सायं 06:45 PM
            </Text>
            <Text className="text-[#564338] text-[15px] leading-6 mb-4">
              परम पावन 48 दीपकों के साथ मंगल महाआरती एवं सामूहिक 108 ऋद्धि मंत्र जाप।
            </Text>

            {/* Set Reminder Button (Full Ergonomic 54px height) */}
            <TouchableOpacity
              onPress={handleSetReminder}
              activeOpacity={0.85}
              className={`min-h-[54px] rounded-xl flex-row items-center justify-center gap-2 shadow-xs ${
                reminderSet ? 'bg-[#004d50]' : 'bg-[#006165]'
              }`}
            >
              {reminderSet ? (
                <Check size={20} color="#FFFFFF" />
              ) : (
                <Bell size={20} color="#FFFFFF" />
              )}
              <Text className="text-white font-bold text-[16px]">
                {reminderSet
                  ? 'स्मरण सक्रिय है 🔔 (Set for 06:30 PM)'
                  : 'स्मरण दिलाएं (Set Reminder 🔔)'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= 7. SPIRITUAL BLESSINGS FLOATING FOOTER NOTE ================= */}
        <View className="items-center pb-8 pt-2">
          <Text className="text-[#564338] font-bold text-[15px] mb-1">
            ॥ ॐ नमः सिद्धेभ्यः • जय जिनेन्द्र ॥
          </Text>
          <Text className="text-[#564338]/75 text-[13px] font-medium text-center">
            आचार्य श्री विभव सागर जी महाराज संघ सेवा समिति द्वारा संचालित
          </Text>
        </View>

        {/* Space for Bottom Navigation Tab Bar */}
        <View className="h-24" />
      </ScrollView>

      {/* ================= FULL AI SUMMARY MODAL ================= */}
      <Modal
        visible={fullSummaryVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFullSummaryVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl max-h-[85%] p-6">
            <View className="flex-row items-center justify-between pb-4 border-b border-[#dee8ff]">
              <View className="flex-row items-center gap-2.5">
                <View className="w-8 h-8 rounded-full bg-[#903f00] items-center justify-center">
                  <Sparkles size={16} color="#FFFFFF" />
                </View>
                <Text className="font-bold text-[#111c2d] text-[18px]">
                  सम्पूर्ण अमृत प्रवचन सार (विस्तृत)
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setFullSummaryVisible(false)}
                className="w-8 h-8 rounded-full bg-[#f0f3ff] items-center justify-center"
              >
                <X size={18} color="#564338" />
              </TouchableOpacity>
            </View>

            <ScrollView className="py-4" showsVerticalScrollIndicator={false}>
              <Text className="font-bold text-[#903f00] text-[16px] mb-2">
                विषय: तत्त्वार्थ सूत्र महाग्रंथ व्याख्यान (गाथा 42-45)
              </Text>
              <Text className="text-[#111c2d] text-[15px] leading-6 mb-4">
                पूज्य आचार्य श्री 108 विभव सागर जी महाराज ने आज के प्रवचन में संवर और निर्जरा तत्त्व के व्यावहारिक पक्षों पर गहन प्रकाश डाला:
              </Text>

              <View className="bg-[#ffdbca]/40 p-4 rounded-xl border border-[#b45309]/20 mb-4">
                <Text className="font-bold text-[#903f00] text-[15px] mb-1">
                  1. ज्ञाता-दृष्टा भाव:
                </Text>
                <Text className="text-[#111c2d] text-[14px] leading-6">
                  संसार में अनुकूल अथवा प्रतिकूल परिस्थितियों में राग-द्वेष न करते हुए केवल साक्षी भाव रखना ही वास्तविक समता है।
                </Text>
              </View>

              <View className="bg-[#ffdbca]/40 p-4 rounded-xl border border-[#b45309]/20 mb-4">
                <Text className="font-bold text-[#903f00] text-[15px] mb-1">
                  2. कषाय उपशमन:
                </Text>
                <Text className="text-[#111c2d] text-[14px] leading-6">
                  क्रोध, मान, माया और लोभ आत्मा के सहज गुणों को आवृत कर देते हैं। क्षमा और सरलता का अभ्यास ही इनसे मुक्ति का मार्ग है।
                </Text>
              </View>

              <View className="bg-[#ffdbca]/40 p-4 rounded-xl border border-[#b45309]/20 mb-4">
                <Text className="font-bold text-[#903f00] text-[15px] mb-1">
                  3. नित्य नियम और आत्मशुद्धि:
                </Text>
                <Text className="text-[#111c2d] text-[14px] leading-6">
                  एक छोटा सा त्याग भी यदि अखंड नियम से किया जाए, तो वह कर्म-निर्जरा का प्रबल कारण बनता है।
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setFullSummaryVisible(false);
                  handleWhatsAppStatus();
                }}
                className="bg-[#903f00] min-h-[50px] rounded-xl items-center justify-center mt-2 mb-6"
              >
                <Text className="text-white font-bold text-[16px]">
                  यह सार व्हाट्सएप पर साझा करें
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* WhatsApp Status Image Creation Modal */}
      <WhatsAppStatusModal
        visible={statusModalVisible}
        onClose={() => setStatusModalVisible(false)}
        title="प्रातःकालीन अमृत प्रवचन — तत्त्वार्थ सूत्र महाग्रंथ व्याख्यान (भाग 42)"
        date="12 Feb 2025 • माघ शुक्ल दशमी"
        author="पूज्य आचार्य श्री 108 विभव सागर जी महाराज"
        summaryLines={[
          'सम्यक दर्शन के बिना किया गया बाह्य तप केवल कायाक्लेश है; आंतरिक भावों की निर्मलता ही मोक्षमार्ग है।',
          'क्रोध और मान कषाय को शांत करने हेतु प्रतिदिन 10 मिनट मौन व आत्मनिरीक्षण अनिवार्य करें।',
          'गृहस्थ जीवन में न्यायोपार्जित धन और दान का संतुलन ही धर्म की नींव है।',
          'संसार के अनुकूल-प्रतिकूल प्रसंगों में साक्षी भाव रखना ही वास्तविक समता है।',
        ]}
      />
    </SafeAreaView>
  );
}
