import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/common/Header";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";
import { useLanguage } from "../../src/context/LanguageContext";
import {
  MapPin,
  Phone,
  ChevronRight,
  ShieldCheck,
  Globe,
  Bell,
  Music,
  Calendar,
  Compass,
  Sparkles,
  LogOut,
  PlusCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";

export default function MoreScreen() {
  const router = useRouter();
  const { role, isLoggedIn, logout } = useAuth();
  const { language, setLanguage, t, isEnglish } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [fluteAudioEnabled, setFluteAudioEnabled] = useState(true);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [fontSizeZoom, setFontSizeZoom] = useState(1);

  const toggleFontSize = () => {
    setFontSizeZoom((prev) => (prev === 1 ? 1.15 : 1));
  };

  const openDialer = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert("त्रुटि", "फोन डायलर खोलने में असमर्थ");
    });
  };

  const openMap = () => {
    Linking.openURL(
      "https://maps.google.com/?q=Shri+Digamber+Jain+Bada+Mandir+Mansarovar+Jaipur",
    ).catch(() => {
      Alert.alert("त्रुटि", "मानचित्र खोलने में असमर्थ");
    });
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#f9f9ff]"
      edges={["top", "left", "right"]}
    >
      <Header
        title={isEnglish ? "Sangh & More" : "संघ एवं अधिक"}
        subtitle={
          isEnglish
            ? "Biography, Vihar Updates, Gallery & Settings"
            : "जीवन परिचय, विहार सूचना, गैलरी व सेटिंग्स"
        }
      />

      <View className="flex-1 bg-[#f9f9ff]">
        <ScrollView
          className="flex-1 px-4 py-3"
          showsVerticalScrollIndicator={false}
        >
          {/* ================= TOP BREATHING ACCENT BANNER ================= */}
          <View className="bg-[#f0f3ff] rounded-xl p-4 mb-4 flex-row items-center justify-between border border-[#dee8ff] shadow-xs">
            <View className="flex-row items-center gap-3 flex-1 mr-2">
              <View className="w-12 h-12 rounded-full bg-[#903f00]/10 items-center justify-center">
                <Compass size={22} color="#903f00" />
              </View>
              <View className="flex-1">
                <Text className="text-[#903f00] font-bold text-lg">
                  {isEnglish ? "Revered Sangh Darshan" : "परम पूज्य संघ दर्शन"}
                </Text>
                <Text className="text-[#564338] text-sm" numberOfLines={1}>
                  {isEnglish
                    ? "Acharya Shri Vibhav Sagar Ji Sasangh Family"
                    : "आचार्य श्री विभव सागर जी ससंघ परिवार"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={toggleFontSize}
              className="bg-[#e7eeff] flex-row items-center justify-center px-3 h-11 rounded-lg border border-[#dee8ff]"
              accessibilityLabel="अक्षर का आकार बड़ा करें"
            >
              <Text className="text-[#903f00] font-bold text-sm">
                A+ {fontSizeZoom > 1 ? "✓" : ""}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ================= SECTION 1: GURU BIOGRAPHY HERO CARD ================= */}
          <View className="bg-white rounded-2xl border border-[#dee8ff] mb-5 overflow-hidden shadow-xs">
            {/* Image Banner with Gradient */}
            <View className="h-64 relative bg-slate-900 justify-end">
              <Image
                source={require("../../assets/images/more_parichay_1.png")}
                className="w-full h-full absolute inset-0 opacity-85"
                resizeMode="cover"
              />
              <View className="p-4 bg-gradient-to-t from-[#111c2d]/95 via-[#111c2d]/40 to-transparent">
                <View className="self-start bg-[#903f00] px-3 py-1 rounded-full flex-row items-center gap-1.5 mb-2 shadow-xs">
                  <Sparkles size={12} color="#FFFFFF" />
                  <Text className="text-white text-xs font-semibold">
                    {isEnglish
                      ? "Ascetic • Embodiment of Compassion"
                      : "तपोनिष्ठ वात्सल्य मूर्ति"}
                  </Text>
                </View>
                <Text className="text-white font-bold text-2xl leading-7">
                  {isEnglish
                    ? "Acharya Shri 108 Vibhav Sagar Ji Maharaj"
                    : "पूज्य आचार्य श्री 108 विभव सागर जी महाराज"}
                </Text>
              </View>
            </View>

            {/* Key Milestones */}
            <View className="p-4">
              <View className="bg-[#f0f3ff] p-3 rounded-xl mb-2 flex-row items-center gap-2.5 border border-[#dee8ff]">
                <Calendar size={18} color="#903f00" />
                <Text className="text-[#111c2d] text-sm font-semibold flex-1">
                  {isEnglish
                    ? "Diksha Year: 2002 • Current Acharya Title"
                    : "दीक्षा वर्ष: 2002 • वर्तमान आचार्य पद"}
                </Text>
              </View>

              <View className="bg-[#f0f3ff] p-3 rounded-xl mb-3 flex-row items-center gap-2.5 border border-[#dee8ff]">
                <Compass size={18} color="#903f00" />
                <Text className="text-[#111c2d] text-sm font-semibold flex-1">
                  {isEnglish
                    ? "Digambar Muni Tradition • Knowledge, Meditation & Penance"
                    : "दिगम्बर मुनि परम्परा • ज्ञान, ध्यान, तपोमय जीवन"}
                </Text>
              </View>

              {/* Biography Snippet */}
              <Text
                className="text-[#111c2d] leading-6 mb-3"
                style={{ fontSize: 15 * fontSizeZoom }}
              >
                {isEnglish
                  ? "Acharya Shri 108 Vibhav Sagar Ji Maharaj is a supreme ascetic, master of sacred Agamas, and an ocean of compassion in the Digambar Jain monk tradition. Through continuous padavihar (barefoot pilgrimages) and rigorous spiritual penance, he guides thousands of devotees toward liberation."
                  : "आचार्य श्री 108 विभव सागर जी महाराज दिगंबर जैन मुनि परंपरा के शीर्ष तपस्वी, आगम ज्ञाता एवं वात्सल्य की प्रतिमूर्ति हैं। निरंतर पदविहार, कठोर आत्म-साधना एवं जिनवाणी के प्रचार-प्रसार द्वारा आपने लाखों भव्य जीवों को सन्मार्ग की पावन प्रेरणा प्रदान की है।"}
              </Text>

              {isBioExpanded && (
                <View className="bg-[#f9f9ff] p-3.5 rounded-xl border border-[#dee8ff] mb-3">
                  <Text className="text-[#903f00] font-bold text-sm mb-1.5">
                    {isEnglish
                      ? "Sacred Life Principles & Diksha Details:"
                      : "पावन जीवन सूत्र व दीक्षा विवरण:"}
                  </Text>
                  <Text className="text-[#564338] text-sm leading-6 mb-1">
                    •{" "}
                    <Text className="font-bold text-[#111c2d]">
                      {isEnglish ? "Birth / Household Name:" : "गृहस्थ नाम:"}
                    </Text>{" "}
                    {isEnglish ? "Brahmachari Vimal Ji" : "ब्रह्मचारी विमल जी"}
                  </Text>
                  <Text className="text-[#564338] text-sm leading-6 mb-1">
                    •{" "}
                    <Text className="font-bold text-[#111c2d]">
                      {isEnglish ? "Diksha Guru:" : "दीक्षा गुरु:"}
                    </Text>{" "}
                    {isEnglish
                      ? "Revered Acharya Shri 108 Vishuddha Sagar Ji Maharaj"
                      : "परम पूज्य आचार्य श्री 108 विशुद्ध सागर जी महाराज"}
                  </Text>
                  <Text className="text-[#564338] text-sm leading-6 mb-1">
                    •{" "}
                    <Text className="font-bold text-[#111c2d]">
                      {isEnglish ? "Muni Diksha Site:" : "मुनि दीक्षा स्थल:"}
                    </Text>{" "}
                    {isEnglish
                      ? "Kundalpur Mahatirth"
                      : "अतिशय क्षेत्र कुंडलपुर महातीर्थ"}
                  </Text>
                  <Text className="text-[#564338] text-sm leading-6">
                    •{" "}
                    <Text className="font-bold text-[#111c2d]">
                      {isEnglish ? "Spiritual Discipline:" : "चर्या नियम:"}
                    </Text>{" "}
                    {isEnglish
                      ? "Continuous Padavihar, Panipatra meals, Ekashan, Silence"
                      : "नित्य पदविहार, पाणिपात्र चर्या, एकाशन, मौन साधना"}
                  </Text>
                </View>
              )}

              {/* CTA Button */}
              <TouchableOpacity
                onPress={() => router.push("/details/biography")}
                className="bg-[#903f00] min-h-[52px] rounded-xl items-center justify-center flex-row gap-2 shadow-xs active:bg-[#763300]"
              >
                <Text className="text-white font-bold text-base">
                  {isEnglish
                    ? "Read Full Biography & Diksha Journey"
                    : "संपूर्ण जीवन चरित्र व दीक्षा गाथा पढ़ें"}
                </Text>
                <ChevronRight size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* ================= SECTION 2: VIHAR SCHEDULE & HALTING STATION ================= */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <View className="w-2.5 h-6 rounded-full bg-[#903f00]" />
                <Text className="text-[#111c2d] font-bold text-xl">
                  {isEnglish
                    ? "Vihar Schedule & Current Halt"
                    : "विहार सूचना एवं प्रवास स्थल"}
                </Text>
              </View>
              <View className="bg-[#903f00]/10 px-2.5 py-1 rounded-full flex-row items-center gap-1.5">
                <View className="w-2 h-2 rounded-full bg-[#903f00]" />
                <Text className="text-[#903f00] text-xs font-bold">
                  {isEnglish ? "Live Updates" : "लाइव अपडेट"}
                </Text>
              </View>
            </View>

            <View className="bg-white p-4 rounded-2xl border border-[#dee8ff] shadow-xs">
              {/* Current Halt */}
              <View className="bg-[#f0f3ff] p-3.5 rounded-xl border border-[#dee8ff] mb-3">
                <View className="flex-row items-center justify-between mb-1.5">
                  <View className="bg-[#903f00] px-2.5 py-1 rounded">
                    <Text className="text-white text-xs font-bold">
                      {isEnglish
                        ? "Current Halt"
                        : "वर्तमान प्रवास (Current Halt)"}
                    </Text>
                  </View>
                  <Text className="text-[#564338] text-xs font-semibold">
                    {isEnglish
                      ? "10 Feb to 22 Feb 2025"
                      : "10 Feb से 22 Feb 2025"}
                  </Text>
                </View>
                <Text className="text-[#111c2d] font-bold text-lg mb-2">
                  {isEnglish
                    ? "Shri Digambar Jain Bada Mandir, Mansarovar, Jaipur"
                    : "श्री दिगंबर जैन बड़ा मंदिर, मानसरोवर, जयपुर (राज.)"}
                </Text>

                {/* Map Preview Image */}
                <View className="h-36 rounded-lg overflow-hidden relative bg-slate-200">
                  <Image
                    source={require("../../assets/images/more_parichay_2.png")}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => router.push("/details/vihar")}
                    className="absolute bottom-2 right-2 bg-[#111c2d]/90 px-3 py-1.5 rounded-md flex-row items-center gap-1.5"
                  >
                    <MapPin size={14} color="#FFFFFF" />
                    <Text className="text-white text-xs font-bold">
                      {isEnglish ? "Vihar Route Details" : "विहार मार्ग विवरण"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Upcoming Vihar Notice */}
              <View className="bg-[#dee8ff] p-3.5 rounded-xl border border-[#c4d6ff] mb-3 flex-row items-start gap-3">
                <View className="w-11 h-11 rounded-full bg-[#903f00] items-center justify-center mt-0.5">
                  <Compass size={20} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-[#903f00] font-bold text-xs">
                    {isEnglish
                      ? "Upcoming Vihar (Foot Journey)"
                      : "आगामी पदविहार (Upcoming Vihar)"}
                  </Text>
                  <Text className="text-[#111c2d] font-bold text-base leading-5 mt-0.5">
                    {isEnglish
                      ? "23 Feb 06:00 AM Departure ➔ Sanganer Atishay Kshetra"
                      : "23 Feb प्रातः 06:00 AM प्रस्थान ➔ सांगानेर अतिशय क्षेत्र"}
                  </Text>
                  <Text className="text-[#564338] text-xs leading-4 mt-1">
                    {isEnglish
                      ? "Route: Mansarovar ➔ New Sanganer Road ➔ Sanganer Mandir (Distance: ~7.5 km)"
                      : "मार्ग: मानसरोवर ➔ न्यू सांगानेर रोड ➔ सांगानेर दिगंबर जैन मंदिर (दूरी: लगभग 7.5 किमी)"}
                  </Text>
                </View>
              </View>

              {/* Daily Routine (Charya) */}
              <View className="mb-3">
                <Text className="text-[#111c2d] font-bold text-sm mb-2">
                  {isEnglish
                    ? "Daily Sacred Timetable:"
                    : "दैनिक पूज्य चर्या समय सारिणी:"}
                </Text>
                <View className="bg-[#f0f3ff] p-3 rounded-lg flex-row items-center justify-between mb-1.5 border border-[#dee8ff]">
                  <Text className="text-[#111c2d] text-sm">
                    {isEnglish
                      ? "Pure Ahara Charya (Morning Alms)"
                      : "शुद्ध आहारचर्या (निहार उपरांत)"}
                  </Text>
                  <Text className="text-[#903f00] font-bold text-sm">
                    10:15 AM
                  </Text>
                </View>
                <View className="bg-[#f0f3ff] p-3 rounded-lg flex-row items-center justify-between border border-[#dee8ff]">
                  <Text className="text-[#111c2d] text-sm">
                    {isEnglish
                      ? "Darshan & Spiritual Discourse"
                      : "दर्शन एवं शंका समाधान (प्रवचन)"}
                  </Text>
                  <Text className="text-[#903f00] font-bold text-sm">
                    04:30 PM
                  </Text>
                </View>
              </View>

              {/* Coordinator Contact */}
              <View className="pt-2 border-t border-[#dee8ff] flex-row items-center justify-between">
                <View className="flex-1 mr-2">
                  <Text className="text-[#564338] text-xs">
                    {isEnglish
                      ? "Vihar Coordinator Contact"
                      : "विहार व्यवस्थापक संपर्क"}
                  </Text>
                  <Text className="text-[#111c2d] font-bold text-sm">
                    {isEnglish
                      ? "Shri Ashok Ji Jain (+91 98290 12345)"
                      : "श्री अशोक जी जैन (+91 98290 12345)"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => openDialer("+919829012345")}
                  className="bg-[#e7eeff] px-4 py-2 rounded-xl flex-row items-center gap-1.5 border border-[#dee8ff]"
                >
                  <Phone size={14} color="#903f00" />
                  <Text className="text-[#903f00] font-bold text-xs">
                    {isEnglish ? "Call" : "कॉल करें"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ================= SECTION 3: UP-SANGH & SHISHYA PARIVAR DIRECTORY ================= */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <View className="w-2.5 h-6 rounded-full bg-[#006165]" />
                <Text className="text-[#111c2d] font-bold text-xl">
                  {isEnglish
                    ? "Sub-Sangh & Disciple Family"
                    : "उप-संघ एवं शिष्य परिवार"}
                </Text>
              </View>
              {/* <Text className="text-[#903f00] text-xs font-bold">
                {isEnglish ? 'Total: 3 Key Sangh Groups' : 'सकल संघ: 3 प्रमुख उप-संघ'}
              </Text> */}
            </View>

            {/* Shishya Card 1 */}
            <View className="bg-white p-3.5 rounded-2xl border border-[#dee8ff] mb-2.5 flex-row items-center gap-3.5 shadow-xs">
              <Image
                source={require("../../assets/images/more_parichay_3.png")}
                className="w-16 h-16 rounded-xl bg-slate-200"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-[#111c2d] font-bold text-base leading-5">
                  {isEnglish
                    ? "Muni Shri 108 Vinamra Sagar Ji"
                    : "मुनि श्री 108 विनम्र सागर जी"}
                </Text>
                <Text className="text-[#903f00] text-xs font-semibold mt-0.5">
                  {isEnglish ? "Disciple Sangh Family" : "ससंघ शिष्य परिवार"}
                </Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <MapPin size={12} color="#564338" />
                  <Text className="text-[#564338] text-xs">
                    {isEnglish
                      ? "Current Halt: Ajmer (Rajasthan)"
                      : "वर्तमान प्रवास: अजमेर (राजस्थान)"}
                  </Text>
                </View>
              </View>
              <View className="w-10 h-10 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]">
                <ChevronRight size={18} color="#903f00" />
              </View>
            </View>

            {/* Shishya Card 2 */}
            <View className="bg-white p-3.5 rounded-2xl border border-[#dee8ff] mb-2.5 flex-row items-center gap-3.5 shadow-xs">
              <Image
                source={require("../../assets/images/more_parichay_4.png")}
                className="w-16 h-16 rounded-xl bg-slate-200"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-[#111c2d] font-bold text-base leading-5">
                  {isEnglish
                    ? "Aryika 105 Vishuddhamati Mataji"
                    : "आर्यिका 105 विशुद्धमति माताजी"}
                </Text>
                <Text className="text-[#903f00] text-xs font-semibold mt-0.5">
                  {isEnglish ? "Mataji Sangh Family" : "ससंघ माताजी परिवार"}
                </Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <MapPin size={12} color="#564338" />
                  <Text className="text-[#564338] text-xs">
                    {isEnglish
                      ? "Current Halt: Jabalpur (M.P.)"
                      : "वर्तमान प्रवास: जबलपुर (म.प्र.)"}
                  </Text>
                </View>
              </View>
              <View className="w-10 h-10 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]">
                <ChevronRight size={18} color="#903f00" />
              </View>
            </View>

            {/* Shishya Card 3 */}
            <View className="bg-white p-3.5 rounded-2xl border border-[#dee8ff] flex-row items-center gap-3.5 shadow-xs">
              <Image
                source={require("../../assets/images/more_parichay_1.png")}
                className="w-16 h-16 rounded-xl bg-slate-200"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-[#111c2d] font-bold text-base leading-5">
                  {isEnglish
                    ? "Ailak Shri 105 Samyak Sagar Ji"
                    : "ऐलक श्री 105 सम्यक सागर जी"}
                </Text>
                <Text className="text-[#903f00] text-xs font-semibold mt-0.5">
                  {isEnglish ? "Disciple Ascetic" : "शिष्य साधक"}
                </Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <MapPin size={12} color="#564338" />
                  <Text className="text-[#564338] text-xs">
                    {isEnglish
                      ? "Current Halt: Kundalpur Mahatirth"
                      : "वर्तमान प्रवास: कुंडलपुर महातीर्थ"}
                  </Text>
                </View>
              </View>
              <View className="w-10 h-10 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]">
                <ChevronRight size={18} color="#903f00" />
              </View>
            </View>
          </View>

          {/* ================= SECTION 4: PANCHANG & PACHKHAN CALENDAR ================= */}
          <View className="bg-[#dee8ff] p-4 rounded-2xl border border-[#c4d6ff] mb-5 shadow-xs">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-full bg-[#903f00] items-center justify-center">
                  <Calendar size={20} color="#FFFFFF" />
                </View>
                <View>
                  <Text className="text-[#111c2d] font-bold text-base">
                    {isEnglish
                      ? "Digambar Jain Panchang & Pachkhan"
                      : "दिगंबर जैन पंचांग एवं पच्चक्खाण"}
                  </Text>
                  <Text className="text-[#903f00] text-xs font-semibold">
                    {isEnglish
                      ? "Year 2025 • Holy Festivals & Rules"
                      : "वर्ष 2025 • पर्व तिथियां व नियम"}
                  </Text>
                </View>
              </View>
              {/* <View className="bg-white px-2.5 py-1 rounded-full border border-[#dee8ff]">
                <Text className="text-[#111c2d] text-xs font-bold">
                  {isEnglish ? "Phalguna Month" : "फाल्गुन मास"}
                </Text>
              </View> */}
            </View>

            <Text className="text-[#111c2d] text-sm leading-5 mb-3">
              {isEnglish
                ? "Check monthly Jain calendar 2025, Ashtami/Chaturdashi holy days, and sunrise-sunset based daily vow timings."
                : "मासिक जैन पंचांग 2025, अष्टमी/चतुर्दशी पर्व तिथियां एवं सूर्योदय-सूर्यास्त आधारित दैनिक पच्चक्खाण (त्याग) समय सारिणी देखें।"}
            </Text>

            <View className="flex-row gap-2.5 mb-3">
              <View className="flex-1 bg-white p-3 rounded-xl border border-[#dee8ff]">
                <Text className="text-[#564338] text-xs">
                  {isEnglish ? "Upcoming Fast" : "आगामी पर्व तिथि"}
                </Text>
                <Text className="text-[#903f00] font-bold text-sm mt-0.5">
                  {isEnglish ? "Ashtami Fast: 21 Feb" : "अष्टमी व्रत: 21 Feb"}
                </Text>
              </View>
              <View className="flex-1 bg-white p-3 rounded-xl border border-[#dee8ff]">
                <Text className="text-[#564338] text-xs">
                  {isEnglish ? "Sunrise Pachkhan" : "सूर्योदय पच्चक्खाण"}
                </Text>
                <Text className="text-[#006165] font-bold text-sm mt-0.5">
                  07:08 AM
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/details/panchang")}
              className="bg-[#903f00] min-h-[48px] rounded-xl items-center justify-center flex-row gap-2 shadow-xs active:bg-[#763300]"
            >
              <Calendar size={18} color="#FFFFFF" />
              <Text className="text-white font-bold text-sm">
                {isEnglish
                  ? "Open Full Panchang & Pachkhan Calendar"
                  : "संपूर्ण पंचांग एवं पच्चक्खाण कैलेंडर खोलें"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ================= SECTION 5: DIKSHA MAHOTSAV & PHOTO GALLERY ================= */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <View className="w-2.5 h-6 rounded-full bg-[#a5345d]" />
                <Text className="text-[#111c2d] font-bold text-xl">
                  {isEnglish
                    ? "Diksha Mahotsav & E-Gallery"
                    : "दीक्षा महोत्सव व ई-गैलरी"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/details/gallery")}
                className="flex-row items-center gap-1"
              >
                <Text className="text-[#903f00] font-bold text-xs">
                  {isEnglish ? "View All" : "सभी देखें"}
                </Text>
                <ChevronRight size={14} color="#903f00" />
              </TouchableOpacity>
            </View>

            {/* Gallery Big Card */}
            <TouchableOpacity
              onPress={() => router.push("/details/gallery")}
              activeOpacity={0.85}
              className="bg-white rounded-2xl border border-[#dee8ff] mb-3 overflow-hidden shadow-xs"
            >
              <View className="h-44 bg-slate-900 relative">
                <Image
                  source={require("../../assets/images/more_gallery_1.png")}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute bottom-2 right-2 bg-[#111c2d]/80 px-2.5 py-1 rounded-md">
                  <Text className="text-white text-xs font-semibold">
                    {isEnglish ? "📸 48 Photos" : "📸 48 तस्वीरें"}
                  </Text>
                </View>
              </View>
              <View className="p-3.5 flex-row items-center justify-between">
                <View className="flex-1 mr-2">
                  <Text className="text-[#111c2d] font-bold text-base">
                    {isEnglish
                      ? "Grand Diksha Mahotsav Memories"
                      : "भव्य दीक्षा महोत्सव संस्मरण"}
                  </Text>
                  <Text className="text-[#564338] text-xs mt-0.5">
                    {isEnglish
                      ? "Historic Diksha & spiritual celebration photo gallery"
                      : "ऐतिहासिक दीक्षा दीक्षांत महामहोत्सव चित्रमाला"}
                  </Text>
                </View>
                <View className="w-11 h-11 rounded-full bg-[#e7eeff] items-center justify-center border border-[#dee8ff]">
                  <ExternalLink size={18} color="#903f00" />
                </View>
              </View>
            </TouchableOpacity>

            {/* Small 2-col Gallery Pair */}
            <View className="flex-row gap-3">
              <View className="flex-1 bg-white rounded-2xl border border-[#dee8ff] overflow-hidden shadow-xs">
                <View className="h-28 bg-slate-900 relative">
                  <Image
                    source={require("../../assets/images/more_gallery_2.png")}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute bottom-1.5 right-1.5 bg-[#111c2d]/80 px-2 py-0.5 rounded">
                    <Text className="text-white text-[10px] font-semibold">
                      120
                    </Text>
                  </View>
                </View>
                <View className="p-2.5">
                  <Text
                    className="text-[#111c2d] font-bold text-xs"
                    numberOfLines={1}
                  >
                    {isEnglish
                      ? "Panchkalyanak Pratishtha"
                      : "पंचकल्याणक प्रतिष्ठा"}
                  </Text>
                  <Text
                    className="text-[#564338] text-[11px] mt-0.5"
                    numberOfLines={1}
                  >
                    {isEnglish ? "Jaipur Mahotsav" : "जयपुर महामहोत्सव"}
                  </Text>
                </View>
              </View>

              <View className="flex-1 bg-white rounded-2xl border border-[#dee8ff] overflow-hidden shadow-xs">
                <View className="h-28 bg-slate-900 relative">
                  <Image
                    source={require("../../assets/images/more_gallery_3.png")}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute bottom-1.5 right-1.5 bg-[#111c2d]/80 px-2 py-0.5 rounded">
                    <Text className="text-white text-[10px] font-semibold">
                      35
                    </Text>
                  </View>
                </View>
                <View className="p-2.5">
                  <Text
                    className="text-[#111c2d] font-bold text-xs"
                    numberOfLines={1}
                  >
                    {isEnglish ? "Guru Purnima Pujan" : "गुरु पूर्णिमा पूजन"}
                  </Text>
                  <Text
                    className="text-[#564338] text-[11px] mt-0.5"
                    numberOfLines={1}
                  >
                    {isEnglish
                      ? "Sacred Pada Prakshalan"
                      : "पावन पाद प्रक्षालन"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* ================= SECTION 6: APP SETTINGS & CONTROLS ================= */}
          <View className="mb-5">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-2.5 h-6 rounded-full bg-[#564338]" />
              <Text className="text-[#111c2d] font-bold text-xl">
                {isEnglish
                  ? "App Settings & Preferences"
                  : "ऐप सेटिंग्स एवं सुविधाएँ"}
              </Text>
            </View>

            <View className="bg-white p-3 rounded-2xl border border-[#dee8ff] shadow-xs">
              {/* Language Selection */}
              <View className="flex-row items-center justify-between p-2.5 border-b border-[#dee8ff]">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-[#e7eeff] items-center justify-center">
                    <Globe size={18} color="#903f00" />
                  </View>
                  <View>
                    <Text className="text-[#111c2d] font-bold text-sm">
                      {isEnglish ? "Language" : "भाषा बदलें (Language)"}
                    </Text>
                    <Text className="text-[#564338] text-xs">
                      {isEnglish
                        ? "Current: English (Active)"
                        : "वर्तमान: हिंदी (सक्रिय)"}
                    </Text>
                  </View>
                </View>
                <View className="bg-[#e7eeff] flex-row rounded-lg p-1">
                  <TouchableOpacity
                    onPress={() => setLanguage("hi")}
                    className={`px-3 py-1 rounded ${language === "hi" ? "bg-[#903f00]" : ""}`}
                  >
                    <Text
                      className={`text-xs font-bold ${language === "hi" ? "text-white" : "text-[#564338]"}`}
                    >
                      हिंदी
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setLanguage("en")}
                    className={`px-3 py-1 rounded ${language === "en" ? "bg-[#903f00]" : ""}`}
                  >
                    <Text
                      className={`text-xs font-bold ${language === "en" ? "text-white" : "text-[#564338]"}`}
                    >
                      English
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Notifications Toggle */}
              <View className="flex-row items-center justify-between p-2.5 border-b border-[#dee8ff]">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-[#e7eeff] items-center justify-center">
                    <Bell size={18} color="#903f00" />
                  </View>
                  <View>
                    <Text className="text-[#111c2d] font-bold text-sm">
                      {isEnglish
                        ? "Vihar & Discourse Alerts"
                        : "विहार व प्रवचन सूचनाएं"}
                    </Text>
                    <Text className="text-[#564338] text-xs">
                      {isEnglish
                        ? "Reminders & instant notifications"
                        : "अलार्म एवं तत्काल संदेश"}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#dee8ff", true: "#903f00" }}
                  thumbColor="#FFFFFF"
                />
              </View>

              {/* Flute Audio Toggle */}
              <View className="flex-row items-center justify-between p-2.5">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-[#e7eeff] items-center justify-center">
                    <Music size={18} color="#903f00" />
                  </View>
                  <View>
                    <Text className="text-[#111c2d] font-bold text-sm">
                      {isEnglish
                        ? "Background Flute Melody"
                        : "पृष्ठभूमि आध्यात्मिक धुन"}
                    </Text>
                    <Text className="text-[#903f00] text-xs font-semibold">
                      {fluteAudioEnabled
                        ? isEnglish
                          ? "🔊 Calming flute music is playing"
                          : "🔊 शांत बांसुरी धुन सक्रिय है"
                        : isEnglish
                          ? "Muted"
                          : "मौन"}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setFluteAudioEnabled(!fluteAudioEnabled)}
                  className="bg-[#e7eeff] px-3 py-1.5 rounded-lg border border-[#dee8ff]"
                >
                  <Text className="text-[#903f00] text-xs font-bold">
                    {fluteAudioEnabled
                      ? isEnglish
                        ? "Mute"
                        : "बंद करें"
                      : isEnglish
                        ? "Play"
                        : "चालू करें"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ================= SECTION 7: COORDINATOR / SANGH LOGIN ================= */}
          <View className="bg-[#f0f3ff] rounded-2xl border border-[#dee8ff] mb-8 p-5 shadow-xs">
            <View className="flex-row items-center gap-3 mb-2">
              <View className="w-11 h-11 rounded-full bg-[#a5345d]/15 items-center justify-center">
                <ShieldCheck size={22} color="#a5345d" />
              </View>
              <View>
                <Text className="text-[#111c2d] font-bold text-base">
                  {isLoggedIn
                    ? role === "admin"
                      ? isEnglish
                        ? "🛡️ Main Admin Portal"
                        : "🛡️ मुख्य एडमिन पोर्टल"
                      : isEnglish
                        ? "👥 Sangh Manager Portal"
                        : "👥 संघ प्रबंधक पोर्टल"
                    : isEnglish
                      ? "Coordinator / Sangh Portal"
                      : "व्यवस्थापक / संघ सेवादार पोर्टल"}
                </Text>
                <Text className="text-[#564338] text-xs">
                  {isLoggedIn
                    ? isEnglish
                      ? "Active session"
                      : "सक्रिय व्यवस्थापक सत्र"
                    : isEnglish
                      ? "Authorized Sangh officials only"
                      : "अधिकृत संघ प्रभारियों हेतु सुरक्षित क्षेत्र"}
                </Text>
              </View>
            </View>

            {!isLoggedIn ? (
              <View>
                <Text className="text-[#564338] text-sm leading-6 mb-4">
                  {isEnglish
                    ? "Only registered Vihar coordinators and media coordinators may login to post halting stations, alms timings, and announcements."
                    : "केवल पंजीकृत विहार व्यवस्थापक एवं संघ मीडिया प्रभारी ही दैनिक प्रवास स्थल, आहारचर्या समय एवं नई घोषणाएं प्रकाशित करने हेतु लॉगिन करें।"}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/auth/login")}
                  className="bg-[#a5345d] min-h-[52px] rounded-xl items-center justify-center flex-row gap-2 shadow-xs active:bg-[#852a4a]"
                >
                  <ShieldCheck size={18} color="#FFFFFF" />
                  <Text className="text-white font-bold text-base">
                    {isEnglish
                      ? "Sangh Coordinator Login"
                      : "संघ व्यवस्थापक लॉगिन (Admin Portal)"}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="mt-2">
                <Text className="text-[#111c2d] text-sm mb-3 font-semibold">
                  {isEnglish
                    ? "Coordinator Actions:"
                    : "प्रबंधक त्वरित कार्य (Coordinator Actions):"}
                </Text>

                <TouchableOpacity
                  onPress={() => router.push("/admin/post-vihar")}
                  className="bg-white p-3.5 rounded-xl border border-[#dee8ff] mb-2 flex-row items-center justify-between shadow-xs"
                >
                  <View className="flex-row items-center gap-2.5">
                    <PlusCircle size={18} color="#903f00" />
                    <Text className="text-[#111c2d] font-bold text-sm">
                      {isEnglish
                        ? "Update Vihar Schedule"
                        : "विहार सूचना अपडेट करें"}
                    </Text>
                  </View>
                  <ChevronRight size={18} color="#564338" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/admin/upload-pravachan")}
                  className="bg-white p-3.5 rounded-xl border border-[#dee8ff] mb-2 flex-row items-center justify-between shadow-xs"
                >
                  <View className="flex-row items-center gap-2.5">
                    <PlusCircle size={18} color="#903f00" />
                    <Text className="text-[#111c2d] font-bold text-sm">
                      {isEnglish
                        ? "Add Daily Amrit Discourse"
                        : "दैनिक अमृत प्रवचन जोड़ें"}
                    </Text>
                  </View>
                  <ChevronRight size={18} color="#564338" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/admin/upload-gallery")}
                  className="bg-white p-3.5 rounded-xl border border-[#dee8ff] mb-3 flex-row items-center justify-between shadow-xs"
                >
                  <View className="flex-row items-center gap-2.5">
                    <PlusCircle size={18} color="#903f00" />
                    <Text className="text-[#111c2d] font-bold text-sm">
                      {isEnglish
                        ? "Upload Photo to E-Gallery"
                        : "ई-गैलरी फोटो अपलोड करें"}
                    </Text>
                  </View>
                  <ChevronRight size={18} color="#564338" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    logout();
                    Alert.alert(
                      isEnglish ? "Logout" : "लॉगआउट",
                      isEnglish
                        ? "You have logged out from coordinator session."
                        : "आप व्यवस्थापक सत्र से बाहर आ गए हैं।",
                    );
                  }}
                  className="bg-[#a5345d] min-h-[48px] rounded-xl items-center justify-center flex-row gap-2 active:bg-[#852a4a]"
                >
                  <LogOut size={16} color="#FFFFFF" />
                  <Text className="text-white font-bold text-sm">
                    {isEnglish ? "Logout" : "सत्र समाप्त करें (Logout)"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Sacred Footer Stamp */}
            <View className="items-center justify-center pt-5 mt-4 border-t border-[#dee8ff]">
              <Text className="text-[#903f00] font-bold text-sm mb-1">
                {isEnglish
                  ? "॥ Ahimsa Paramo Dharmah • Jai Jinendra ॥"
                  : "॥ अहिंसा परमो धर्मः • जय जिनेन्द्र ॥"}
              </Text>
              <Text className="text-[#564338] text-xs">
                {isEnglish
                  ? "Shri 108 Vibhav Sagar Ji Maharaj Seva Trust • Version 2.4.1"
                  : "श्री 108 विभव सागर जी महाराज सेवा ट्रस्ट • संस्करण 2.4.1"}
              </Text>
            </View>
          </View>

          <View className="h-10" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
