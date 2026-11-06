import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Header from "../../src/components/common/Header";
import { useLanguage } from "../../src/context/LanguageContext";
import CategoryCard from "../../src/components/library/CategoryCard";
import LiteratureCard from "../../src/components/library/LiteratureCard";
import {
  Search,
  Mic,
  BookOpen,
  Bookmark,
  ChevronRight,
  FileText,
  Languages,
  Palette,
  Music,
  HelpCircle,
  Headphones,
  Download,
  X,
  Sun,
  Moon,
  Sparkles,
  WifiOff,
  Smile,
  ArrowRight,
} from "lucide-react-native";

interface ScriptureItem {
  id: string;
  title: string;
  author: string;
  category: string;
  pages: string;
  description: string;
  badge: string;
  fullText: string[];
}

export default function LibraryScreen() {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSizeZoom, setFontSizeZoom] = useState(1);
  const [selectedBook, setSelectedBook] = useState<ScriptureItem | null>(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [readerFontSize, setReaderFontSize] = useState(22);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<
    string | null
  >(null);

  // Accessible font-size controls for 50+ age users
  const handleZoomOut = () => {
    setFontSizeZoom((prev) => Math.max(0.9, +(prev - 0.1).toFixed(2)));
  };

  const handleZoomIn = () => {
    setFontSizeZoom((prev) => Math.min(1.3, +(prev + 0.1).toFixed(2)));
  };

  const handleVoiceSearch = () => {
    Alert.alert(
      "आवाज द्वारा खोजें (Voice Search)",
      "माइक्रोफोन चालू है... कृपया शास्त्र या लेखक का नाम बोलें।",
    );
  };

  const scriptures: Record<string, ScriptureItem> = {
    tattvarth: {
      id: "tattvarth",
      title: "तत्त्वार्थ सूत्र (Tattvartha Sutra)",
      author: "आचार्य उमास्वामी",
      category: "स्वाध्याय शास्त्र",
      pages: "10 अध्याय • 357 सूत्र",
      badge: "परम प्रमाण",
      description:
        "जैन दर्शन का सर्वमान्य एवं प्रामाणिक ग्रंथ, जिसके पठन से एक उपवास का फल कहा गया है।",
      fullText: [
        "॥ ॐ नमः सिद्धेभ्यः ॥",
        "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥ 1 ॥",
        "तत्वार्थश्रद्धानं सम्यग्दर्शनम्॥ 2 ॥",
        "तन्निbrandसार्गदधिगमाद्वा॥ 3 ॥",
        "जीवाजीवास्रवबन्धसंवरनिर्जरामोक्षास्तत्त्वम्॥ 4 ॥",
        "नामस्थापनाद्रव्यभावतस्तन्न्यासः॥ 5 ॥",
        "प्रमाणनयैरधिगमः॥ 6 ॥",
        "निर्देशस्वामित्वसाधनाधिकरणस्थितिविधानतः॥ 7 ॥",
        "सत्संख्याक्षेत्रस्पर्शनकालान्तरभावाल्पबहुत्वैश्च॥ 8 ॥",
        "मतिश्रुतावधिमनःपर्ययकेवलानि ज्ञानम्॥ 9 ॥",
        "तत्प्रमाणे॥ 10 ॥",
        "अध्याय 2, सूत्र 14: औपशमिकादि भाव निरूपण — औपशमिकक्षायिकौ भावौ मिश्रश्च जीवस्य स्वतः। औदयिकपारिणामिकौ च॥ 14 ॥",
      ],
    },
    pravachanPiyush: {
      id: "pravachanPiyush",
      title: "प्रवचन पीयूष (भाग 1 एवं 2)",
      author: "पूज्य आचार्य श्री 108 विभव सागर जी महाराज",
      category: "गुरुदेव साहित्य",
      pages: "324 पृष्ठ • चातुर्मास संकलन",
      badge: "अमृत वाणी",
      description:
        "आचार्य विभव सागर जी महाराज के चातुर्मास प्रवचनों का अमृत संकलन।",
      fullText: [
        "॥ ॐ श्री वीतरागाय नमः ॥",
        "प्रवचन पीयूष — प्रथम खण्ड",
        "आत्मा का स्वभाव केवल जानना और देखना है। संसार के समस्त पदार्थ ज्ञेय हैं और आत्मा ज्ञाता है।",
        'जब तक जीव पर-पदार्थों में "यह मेरा है" अथवा "मैं इसका कर्ता हूँ" की बुद्धि रखता है, तब तक भव-भ्रमण का अंत नहीं हो सकता।',
        "समता ही धर्म की प्रथम सीढ़ी है। अनुकूलता में अहंकार न करना और प्रतिकूलता में विचलित न होना ही सच्चे साधक की पहचान है।",
        "दैनिक जीवन में छोटे-छोटे संकल्प ही अंततः आत्म-कल्याण के विशाल वटवृक्ष बनते हैं।",
      ],
    },
    dashLakshan: {
      id: "dashLakshan",
      title: "दश लक्षण धर्म: चिंतन एवं सार",
      author: "पूज्य आचार्य श्री 108 विभव सागर जी महाराज",
      category: "गुरुदेव साहित्य",
      pages: "184 पृष्ठ • पर्व विशेषांक",
      badge: "पर्व आराधना",
      description:
        "उत्तम क्षमा, मार्दव, आर्जव आदि दसों धर्मों की सूक्ष्म विवेचना एवं जीवन में आचरण विधि।",
      fullText: [
        "॥ उत्तम क्षमा धर्म ॥",
        "क्षमा वीरों का भूषण है। क्रोध की ज्वाला में जलते हुए संसार को शांति का शीतल जल केवल क्षमा ही प्रदान कर सकती है।",
        "क्रोध दूसरे को जलाने से पहले स्वयं की आत्मा को भस्म कर देता है।",
        "क्षमा भाव धारण करने वाला जीव समस्त जीवों को अपने समान मानकर आत्म-कल्याण के मार्ग पर अग्रसर होता है।",
      ],
    },
  };

  const handleDownload = (bookTitle: string, size: string) => {
    Alert.alert(
      isEnglish ? "Download Started" : "डाउनलोड प्रारंभ",
      isEnglish
        ? `${bookTitle} (${size}) is being saved to your device for offline reading.`
        : `${bookTitle} (${size}) आपके डिवाइस में ऑफलाइन पठन हेतु सुरक्षित की जा रही है।`,
    );
  };

  const categories = [
    {
      id: "vidhan",
      filterKey: "विधान पुस्तक",
      title: isEnglish ? "Vidhan Books & Daily Puja" : "विधान पुस्तक एवं पूजन",
      subtitle: isEnglish
        ? "Indradhwaj, Siddhachakra, Dashlakshan"
        : "इन्द्रध्वज, सिद्धचक्र, दशलक्षण",
      tagText: isEnglish ? "PDF & Mantra Meaning" : "PDF व मंत्र व्याख्या",
      icon: Sun,
      tagIcon: FileText,
    },
    {
      id: "swadhyay",
      filterKey: "स्वाध्याय शास्त्र",
      title: isEnglish ? "Swadhyay Shastras & Agam" : "स्वाध्याय शास्त्र व आगम",
      subtitle: isEnglish
        ? "Samayasara, Chhahdhala, Tattvartha…"
        : "समयसार, छहढाला, तत्त्वार्थ…",
      tagText: isEnglish
        ? "Original Prakrit + Hindi Meaning"
        : "मूल प्राकृत + हिन्दी अनुवाद",
      icon: BookOpen,
      tagIcon: Languages,
    },
    {
      id: "balSanskar",
      filterKey: "बाल संस्कार",
      title: isEnglish
        ? "Children Values & Moral Stories"
        : "बाल संस्कार व जैन कथाएं",
      subtitle: isEnglish
        ? "Tirthankar biographies, truth & virtue"
        : "तीर्थंकर जीवन चरित्र, सत्य-…",
      tagText: isEnglish ? "With Colorful Illustrations" : "रंगीन चित्रों सहित",
      icon: Smile,
      tagIcon: Palette,
    },
    {
      id: "bhajan",
      filterKey: "भजन व महाकाव्य",
      title: isEnglish ? "Bhajan, Aarti & Stotras" : "भजन, आरती व महाकाव्य",
      subtitle: isEnglish
        ? "Bhaktamar Stotra, Kalyanmandir"
        : "भक्तामर स्तोत्र, कल्याणमंदिर,",
      tagText: isEnglish ? "Lyrics + Audio Chanting" : "लिरिक्स + ऑडियो कराओके",
      icon: Music,
      tagIcon: Sparkles,
    },
    {
      id: "articles",
      filterKey: "लेख व प्रश्नोत्तर",
      title: isEnglish
        ? "Spiritual Articles & Q&A"
        : "आध्यात्मिक लेख व शंका-समाधान",
      subtitle: isEnglish
        ? "Doubt resolution by Revered Gurudev"
        : "पूज्य गुरुदेव द्वारा समाधानित…",
      tagText: isEnglish
        ? "Searchable Q&A Repository"
        : "खोज योग्य प्रश्नोत्तरी",
      icon: HelpCircle,
      tagIcon: Search,
    },
    {
      id: "audioBooks",
      filterKey: "ऑडियो बुक्स",
      title: isEnglish
        ? "Audio Books & E-Granth Archive"
        : "ऑडियो बुक्स व ई-ग्रंथ संग्रह",
      subtitle: isEnglish
        ? "Listen on the go: Granth recitations"
        : "चलते-फिरते श्रवण करें:…",
      tagText: isEnglish ? "Listen Without Internet" : "बिना इंटरनेट सुनें",
      icon: Headphones,
      tagIcon: WifiOff,
    },
  ];

  const featuredBooks = [
    {
      id: "pravachanPiyush",
      title: isEnglish
        ? "Pravachan Piyush (Part 1 & 2)"
        : "प्रवचन पीयूष (भाग 1 एवं 2)",
      shortTitle: isEnglish ? "Pravachan Piyush" : "प्रवचन पीयूष",
      volumeSubtitle: isEnglish ? "Part 1 & 2" : "भाग 1 & 2",
      description: isEnglish
        ? "Nectar compilation of Acharya Vibhav Sagar Ji Maharaj chaturmas discourses…"
        : "आचार्य विभव सागर जी महाराज के चातुर्मास प्रवचनों का अमृत…",
      pages: isEnglish ? "324 Pages" : "324 पृष्ठ",
      icon: BookOpen,
      downloadSize: "24 MB",
      scripture: scriptures.pravachanPiyush,
    },
    {
      id: "dashLakshan",
      title: isEnglish
        ? "Dash Lakshan Dharma: Reflections & Essence"
        : "दश लक्षण धर्म: चिंतन एवं…",
      shortTitle: isEnglish ? "Dash Lakshan Dharma" : "दश लक्षण धर्म",
      volumeSubtitle: isEnglish ? "Reflections & Essence" : "चिंतन एवं सार",
      description: isEnglish
        ? "Profound exposition on Uttam Kshama, Mardava, Arjava and practice rules…"
        : "उत्तम क्षमा, मार्दव, आर्जव आदि दसों धर्मों की सूक्ष्म विवेचना एवं…",
      pages: isEnglish ? "184 Pages" : "184 पृष्ठ",
      icon: Sparkles,
      downloadSize: "14 MB",
      scripture: scriptures.dashLakshan,
    },
  ];

  return (
    <SafeAreaView
      className="flex-1 bg-[#f9f9ff]"
      edges={["top", "left", "right"]}
    >
      <Header
        title="जिनवाणी पुस्तकालय"
        subtitle="पवित्र शास्त्र, विधान, पाठ एवं ग्रंथ"
      />

      <View className="flex-1 bg-[#f9f9ff]">
        <ScrollView
          className="flex-1 px-4 py-3"
          showsVerticalScrollIndicator={false}
        >
          {/* ================= 1. SCREEN SUB-INTRO & ACCESSIBILITY ZOOM QUICK BAR ================= */}
          <View className="bg-[#f0f3ff] rounded-2xl p-3.5 mb-4 flex-row items-center justify-between border border-[#dee8ff] shadow-xs">
            <View className="flex-row items-center gap-3 flex-1 mr-2">
              <View className="w-11 h-11 rounded-full bg-[#903f00]/10 items-center justify-center">
                <BookOpen size={22} color="#903f00" />
              </View>
              <View className="flex-1 justify-center py-0.5">
                <Text
                  className="text-[#903f00] font-bold text-lg"
                  style={{
                    fontSize: 18 * fontSizeZoom,
                    lineHeight: Math.round(26 * fontSizeZoom),
                    paddingBottom: 2,
                  }}
                >
                  {t("library.title", "जिनवाणी ज्ञान गंगा")}
                </Text>
                <Text
                  className="text-[#564338] text-xs font-medium mt-0.5"
                  style={{
                    lineHeight: 18,
                  }}
                  numberOfLines={2}
                >
                  {t(
                    "library.subtitle",
                    "आगम, शास्त्र एवं पूज्य गुरुदेव रचित साहित्य",
                  )}
                </Text>
              </View>
            </View>

            {/* Quick Zoom Actions */}
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={handleZoomOut}
                className="w-11 h-11 rounded-full bg-[#e7eeff] items-center justify-center border border-[#dee8ff] active:bg-[#dee8ff]"
                accessibilityLabel="अक्षर छोटे करें"
              >
                <Text className="text-[#903f00] font-bold text-base">A-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleZoomIn}
                className="w-11 h-11 rounded-full bg-[#903f00] items-center justify-center shadow-xs active:bg-[#763300]"
                accessibilityLabel="अक्षर बड़े करें"
              >
                <Text className="text-white font-bold text-base">A+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ================= 2. SEARCH & VOICE INPUT BAR ================= */}
          <View className="bg-white rounded-xl border border-[#dee8ff] mb-4 flex-row items-center px-4 h-14 shadow-xs">
            <Search size={20} color="#564338" />
            <TextInput
              placeholder={t(
                "library.searchPlaceholder",
                "शास्त्र, विधान, भजन या लेखक खोजें...",
              )}
              placeholderTextColor="#564338"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 text-[#111c2d] text-base"
              style={{ fontSize: 16 * fontSizeZoom }}
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                className="p-1.5"
              >
                <X size={18} color="#564338" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleVoiceSearch}
                className="w-10 h-10 rounded-full items-center justify-center active:bg-[#f0f3ff]"
                accessibilityLabel="आवाज द्वारा खोजें (Voice Search)"
              >
                <Mic size={20} color="#903f00" />
              </TouchableOpacity>
            )}
          </View>

          {/* ================= 3. RESUME READING FLOATING CARD ================= */}
          <View className="bg-white rounded-2xl border border-[#dee8ff] p-4 mb-5 shadow-xs bg-gradient-to-r from-[#f0f3ff] to-white">
            {/* Top row with badge */}
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <Bookmark size={16} color="#903f00" fill="#903f00" />
                <Text className="text-[#903f00] font-bold text-xs uppercase tracking-wide">
                  {t(
                    "library.resumeBadge",
                    "अंतिम पढ़ा हुआ पृष्ठ • RESUME READING",
                  )}
                </Text>
              </View>
              <View className="bg-[#ffdbca] px-3 py-1 rounded-full border border-[#903f00]/20">
                <Text className="text-[#331200] font-bold text-xs">
                  {isEnglish ? "62% Complete" : "62% पूर्ण"}
                </Text>
              </View>
            </View>

            {/* Middle row: Title, Subtitle, and CTA Button */}
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1 mr-3 justify-center py-0.5">
                <Text
                  className="text-[#111c2d] font-bold text-xl"
                  style={{
                    fontSize: 19 * fontSizeZoom,
                    lineHeight: Math.round(28 * fontSizeZoom),
                    paddingBottom: 2,
                  }}
                >
                  {t(
                    "library.resumeBook",
                    "तत्त्वार्थ सूत्र (Tattvartha Sutra)",
                  )}
                </Text>
                <Text
                  className="text-[#564338] text-sm mt-1"
                  style={{
                    fontSize: 14 * fontSizeZoom,
                    lineHeight: Math.round(22 * fontSizeZoom),
                  }}
                >
                  {isEnglish
                    ? "Chapter 2, Verse 14 • Aupashamikadi Bhav"
                    : "अध्याय 2, सूत्र 14 •\nऔपशमिकादि भाव निरूपण"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  router.push(
                    "/details/book?title=" +
                      encodeURIComponent("तत्त्वार्थ सूत्र (Tattvartha Sutra)"),
                  )
                }
                className="bg-[#903f00] h-12 px-5 rounded-xl flex-row items-center justify-center gap-1.5 shadow-xs active:bg-[#763300]"
                accessibilityLabel="तत्त्वार्थ सूत्र पढ़ना जारी रखें"
              >
                <Text className="text-white font-bold text-sm">
                  {isEnglish ? "Read Now" : "आगे पढ़ें"}
                </Text>
                <ArrowRight size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Bottom Progress Bar */}
            <View className="h-2 w-full bg-[#dee8ff] rounded-full overflow-hidden">
              <View
                className="h-full bg-[#903f00] rounded-full"
                style={{ width: "62%" }}
              />
            </View>
          </View>

          {/* ================= 4. CORE 6 LIBRARY CATEGORIES SECTION ================= */}
          <View className="mb-5">
            {/* Section Header */}
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text
                  className="text-[#111c2d] font-bold text-2xl"
                  style={{ lineHeight: 34, paddingBottom: 2 }}
                >
                  {isEnglish ? "Library Collection" : "पुस्तकालय संकलन"}
                </Text>
                <Text
                  className="text-[#564338] text-xs font-medium mt-0.5"
                  style={{ lineHeight: 18 }}
                >
                  {isEnglish
                    ? "Core Canonical Sections (6 Divisions)"
                    : "प्रमुख शास्त्र संकलन (6 भाग)"}
                </Text>
              </View>
              <View className="bg-[#ffdbca]/60 px-3 py-1 rounded-full border border-[#903f00]/20">
                <Text className="text-[#903f00] font-bold text-xs">
                  {isEnglish ? "Total 600+ Scriptures" : "कुल 600+ शास्त्र"}
                </Text>
              </View>
            </View>

            {/* Reusable Category Cards */}
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                title={cat.title}
                subtitle={cat.subtitle}
                tagText={cat.tagText}
                icon={cat.icon}
                tagIcon={cat.tagIcon}
                fontSizeZoom={fontSizeZoom}
                onPress={() => setActiveCategoryFilter(cat.filterKey)}
              />
            ))}
          </View>

          {/* ================= 5. FEATURED LITERATURE BY ACHARYA SHRI ================= */}
          <View className="mb-6">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text
                  className="text-[#111c2d] font-bold text-2xl"
                  style={{ lineHeight: 34, paddingBottom: 2 }}
                >
                  {isEnglish
                    ? "Literature by Revered Gurudev"
                    : "पूज्य गुरुदेव रचित साहित्य"}
                </Text>
                <Text
                  className="text-[#564338] text-xs font-medium mt-0.5"
                  style={{ lineHeight: 18 }}
                >
                  {isEnglish
                    ? "Featured Books by Acharya Shri Vibhav Sagarji"
                    : "पूज्य आचार्य श्री विभव सागर जी महाराज"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    isEnglish
                      ? "Gurudev Literature Collection"
                      : "गुरुदेव साहित्य संग्रह",
                    isEnglish
                      ? "Total 18 authentic scriptures and reflective treatises composed by Revered Acharya Shri 108 Vibhav Sagar Ji Maharaj are available."
                      : "पूज्य आचार्य श्री 108 विभव सागर जी महाराज द्वारा रचित कुल 18 प्रामाणिक ग्रंथ एवं चिंतन संग्रह उपलब्ध हैं।",
                  )
                }
                className="flex-row items-center gap-1 bg-[#ffdbca]/40 px-3 py-1.5 rounded-full border border-[#903f00]/20"
              >
                <Text className="text-[#903f00] font-bold text-xs">
                  {isEnglish ? "All 18" : "सभी 18"}
                </Text>
                <ChevronRight size={14} color="#903f00" />
              </TouchableOpacity>
            </View>

            {/* Reusable Literature Cards */}
            {featuredBooks.map((book) => (
              <LiteratureCard
                key={book.id}
                title={book.title}
                shortTitle={book.shortTitle}
                volumeSubtitle={book.volumeSubtitle}
                description={book.description}
                pages={book.pages}
                icon={book.icon}
                downloadSize={book.downloadSize}
                fontSizeZoom={fontSizeZoom}
                readButtonText={isEnglish ? "Read PDF" : "PDF पढ़ें"}
                downloadButtonText={isEnglish ? "Download" : "डाउनलोड"}
                onReadPdf={() => setSelectedBook(book.scripture)}
                onDownload={() => handleDownload(book.title, book.downloadSize)}
              />
            ))}
          </View>

          <View className="h-10" />
        </ScrollView>
      </View>

      {/* ================= SCRIPTURE READER MODAL ================= */}
      <Modal visible={!!selectedBook} animationType="slide" transparent={false}>
        {selectedBook && (
          <SafeAreaView
            className={`flex-1 ${isNightMode ? "bg-[#0f172a]" : "bg-[#f9f9ff]"}`}
            edges={["top", "bottom"]}
          >
            {/* Modal Header */}
            <View
              className={`px-4 pt-3 pb-3 flex-row items-center justify-between border-b ${isNightMode ? "bg-[#1e293b] border-[#334155]" : "bg-white border-[#dee8ff]"}`}
            >
              <View className="flex-1 mr-3">
                <Text
                  className={`font-bold text-lg ${isNightMode ? "text-white" : "text-[#111c2d]"}`}
                  numberOfLines={1}
                >
                  {selectedBook.title}
                </Text>
                <Text className="text-[#564338] text-xs font-semibold">
                  {selectedBook.author} • {selectedBook.pages}
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                {/* Font Size Adjuster */}
                <TouchableOpacity
                  onPress={() =>
                    setReaderFontSize(
                      readerFontSize >= 30 ? 18 : readerFontSize + 4,
                    )
                  }
                  className={`px-3 py-1.5 rounded-full items-center justify-center border ${isNightMode ? "border-[#334155] bg-[#334155]" : "border-[#dee8ff] bg-[#e7eeff]"}`}
                >
                  <Text
                    className={`font-bold text-sm ${isNightMode ? "text-white" : "text-[#903f00]"}`}
                  >
                    अ {readerFontSize}px
                  </Text>
                </TouchableOpacity>

                {/* Night Mode Toggle */}
                <TouchableOpacity
                  onPress={() => setIsNightMode(!isNightMode)}
                  className={`w-9 h-9 rounded-full items-center justify-center border ${isNightMode ? "border-[#334155] bg-[#334155]" : "border-[#dee8ff] bg-[#e7eeff]"}`}
                >
                  {isNightMode ? (
                    <Sun size={18} color="#F59E0B" />
                  ) : (
                    <Moon size={18} color="#564338" />
                  )}
                </TouchableOpacity>

                {/* Close Modal */}
                <TouchableOpacity
                  onPress={() => setSelectedBook(null)}
                  className={`w-9 h-9 rounded-full items-center justify-center border ${isNightMode ? "border-[#334155] bg-[#334155]" : "border-[#dee8ff] bg-[#f0f3ff]"}`}
                >
                  <X size={18} color={isNightMode ? "#FFFFFF" : "#564338"} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sacred Text Body */}
            <ScrollView className="flex-1 px-5 py-6">
              <View
                className={`p-6 rounded-2xl border mb-6 ${isNightMode ? "bg-[#1e293b] border-[#334155]" : "bg-white border-[#dee8ff] shadow-sm"}`}
              >
                <Text
                  className={`font-bold text-center text-base mb-1 ${isNightMode ? "text-amber-400" : "text-[#903f00]"}`}
                >
                  ॥ ॐ श्री वीतरागाय नमः ॥
                </Text>
                <Text
                  className={`text-center font-bold text-xl mb-4 ${isNightMode ? "text-white" : "text-[#111c2d]"}`}
                >
                  {selectedBook.title}
                </Text>
                <View className="h-0.5 bg-[#dee8ff] mb-5" />

                {selectedBook.fullText.map((paragraph, idx) => (
                  <Text
                    key={idx}
                    style={{
                      fontSize: readerFontSize,
                      lineHeight: readerFontSize * 1.7,
                    }}
                    className={`mb-4 ${isNightMode ? "text-slate-200" : "text-[#111c2d]"} ${paragraph.startsWith("✨") ? "font-bold text-[#a5345d]" : ""}`}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
              <View className="h-12" />
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>

      {/* Category Filter Drawer/Alert when tapped */}
      {activeCategoryFilter && (
        <Modal
          visible={!!activeCategoryFilter}
          animationType="slide"
          transparent
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-3xl p-5 border-t border-[#dee8ff]">
              <View className="flex-row items-center justify-between pb-3 border-b border-[#dee8ff] mb-4">
                <View>
                  <Text className="text-[#903f00] font-bold text-xl">
                    {activeCategoryFilter}
                  </Text>
                  <Text className="text-[#564338] text-xs">
                    अनुभाग संग्रह सूची
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setActiveCategoryFilter(null)}
                  className="p-1.5 bg-[#f0f3ff] rounded-full"
                >
                  <X size={20} color="#564338" />
                </TouchableOpacity>
              </View>

              <Text className="text-[#111c2d] text-base leading-6 mb-4">
                {activeCategoryFilter} अनुभाग के अंतर्गत सभी डिजिटल ग्रंथ, पाठ
                एवं टीकाएं लोड हो रही हैं।
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setActiveCategoryFilter(null);
                  setSelectedBook(scriptures.tattvarth);
                }}
                className="bg-[#903f00] h-12 rounded-xl items-center justify-center mb-3"
              >
                <Text className="text-white font-bold text-base">
                  ग्रंथ वाचन प्रारंभ करें
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
