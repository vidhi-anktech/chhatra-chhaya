import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Share,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Share2,
  Download,
  X,
  Maximize2,
  Eye,
  Camera,
} from 'lucide-react-native';
import { useLanguage } from '../../src/context/LanguageContext';

const { width } = Dimensions.get('window');

interface GalleryItem {
  id: string;
  title: string;
  category: 'diksha' | 'panchkalyanak' | 'vihar' | 'darshan';
  date: string;
  source: any;
  views: string;
}

export default function GalleryDetailScreen() {
  const router = useRouter();
  const { isEnglish } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'diksha' | 'panchkalyanak' | 'vihar' | 'darshan'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: isEnglish
        ? 'Atishaya Kshetra Kundalpur Mahatirth — Diksha Mahotsav Sacred Moments'
        : 'अतिशय क्षेत्र कुंडलपुर महातीर्थ — दीक्षा महोत्सव पावन क्षण',
      category: 'diksha',
      date: isEnglish ? 'Kundalpur' : 'कुंडलपुर',
      source: require('../../assets/images/more_gallery_1.png'),
      views: '4.2k',
    },
    {
      id: '2',
      title: isEnglish
        ? 'Shri 1008 Adinath Bhagwan Panchkalyanak Pratishtha Mahotsav'
        : 'श्री 1008 आदिनाथ भगवान पंचकल्याणक प्रतिष्ठा महामहोत्सव',
      category: 'panchkalyanak',
      date: isEnglish ? 'Indore (M.P.)' : 'इंदौर (म.प्र.)',
      source: require('../../assets/images/more_gallery_2.png'),
      views: '6.8k',
    },
    {
      id: '3',
      title: isEnglish
        ? 'Morning Pad-Vihar & Aravalli Mountain Range Vihar Darshan'
        : 'प्रातःकालीन पदविहार एवं अरावली पर्वत शृंखला विहार दर्शन',
      category: 'vihar',
      date: isEnglish ? 'Rajasthan Division' : 'राजस्थान संभाग',
      source: require('../../assets/images/more_gallery_3.png'),
      views: '3.1k',
    },
    {
      id: '4',
      title: isEnglish
        ? 'Revered Acharya Shri Holy Pad-Prakshalan & Shantidhara'
        : 'पूज्य आचार्य श्री के पावन पाद-प्रक्षालन एवं शांतिधारा',
      category: 'darshan',
      date: isEnglish ? 'Mansarovar, Jaipur' : 'मानसरोवर, जयपुर',
      source: require('../../assets/images/more_parichay_1.png'),
      views: '5.9k',
    },
    {
      id: '5',
      title: isEnglish
        ? 'Digambar Muni Sangh & Devotee Family Dharma Prabhawna'
        : 'दिगंबर मुनि संघ एवं शिष्य परिवार संग धर्म प्रभावना',
      category: 'diksha',
      date: isEnglish ? 'Sangh Darshan' : 'संघ दर्शन',
      source: require('../../assets/images/more_parichay_3.png'),
      views: '4.5k',
    },
    {
      id: '6',
      title: isEnglish
        ? 'Auspicious Welcome with Pad-Vihar Group & Jinwani Rath'
        : 'पदविहार दल के साथ मंगल अगवानी व जिनवाणी रथ',
      category: 'vihar',
      date: isEnglish ? 'Vihar Route' : 'विहार मार्ग',
      source: require('../../assets/images/more_parichay_2.png'),
      views: '2.8k',
    },
  ];

  const filteredItems = galleryItems.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  const handleShare = async (item: GalleryItem) => {
    try {
      await Share.share({
        message: isEnglish
          ? `🌸 *${item.title}*\nAcharya Shri 108 Vibhav Sagar Ji Maharaj Sacred Darshan E-Gallery:\nhttps://chhatrachhaya.org/gallery`
          : `🌸 *${item.title}*\nआचार्य श्री 108 विभव सागर जी महाराज पावन दर्शन E-गैलरी:\nhttps://chhatrachhaya.org/gallery`,
        title: item.title,
      });
    } catch {
      Alert.alert(isEnglish ? 'Share' : 'शेयर', isEnglish ? 'Share dialog could not open' : 'शेयर संवाद नहीं खुला');
    }
  };

  const handleDownload = (item: GalleryItem) => {
    Alert.alert(
      isEnglish ? 'Download' : 'डाउनलोड',
      isEnglish
        ? `'${item.title}' is being saved to your photo gallery...`
        : `'${item.title}' चित्र आपकी फोटो गैलरी में सुरक्षित किया जा रहा है...`
    );
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
          {isEnglish ? 'Sacred Darshan E-Gallery' : 'पावन दर्शन E-गैलरी'}
        </Text>

        <View className="w-11 h-11 items-center justify-center">
          <Camera size={20} color="#903f00" />
        </View>
      </View>

      {/* Category Pills Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white px-4 py-2.5 border-b border-[#dee8ff] max-h-14"
      >
        <TouchableOpacity
          onPress={() => setSelectedCategory('all')}
          className={`mr-2 px-4 py-1.5 rounded-full border ${
            selectedCategory === 'all' ? 'bg-[#903f00] border-[#903f00]' : 'bg-[#f0f3ff] border-[#dee8ff]'
          }`}
        >
          <Text className={`text-xs font-bold ${selectedCategory === 'all' ? 'text-white' : 'text-[#564338]'}`}>
            {isEnglish ? 'All Photos' : 'सभी चित्र (All)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedCategory('diksha')}
          className={`mr-2 px-4 py-1.5 rounded-full border ${
            selectedCategory === 'diksha' ? 'bg-[#903f00] border-[#903f00]' : 'bg-[#f0f3ff] border-[#dee8ff]'
          }`}
        >
          <Text className={`text-xs font-bold ${selectedCategory === 'diksha' ? 'text-white' : 'text-[#564338]'}`}>
            {isEnglish ? 'Diksha Mahotsav' : 'दीक्षा महोत्सव'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedCategory('panchkalyanak')}
          className={`mr-2 px-4 py-1.5 rounded-full border ${
            selectedCategory === 'panchkalyanak' ? 'bg-[#903f00] border-[#903f00]' : 'bg-[#f0f3ff] border-[#dee8ff]'
          }`}
        >
          <Text className={`text-xs font-bold ${selectedCategory === 'panchkalyanak' ? 'text-white' : 'text-[#564338]'}`}>
            {isEnglish ? 'Panchkalyanak' : 'पंचकल्याणक'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedCategory('vihar')}
          className={`mr-2 px-4 py-1.5 rounded-full border ${
            selectedCategory === 'vihar' ? 'bg-[#903f00] border-[#903f00]' : 'bg-[#f0f3ff] border-[#dee8ff]'
          }`}
        >
          <Text className={`text-xs font-bold ${selectedCategory === 'vihar' ? 'text-white' : 'text-[#564338]'}`}>
            {isEnglish ? 'Pad-Vihar' : 'पदविहार'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedCategory('darshan')}
          className={`mr-4 px-4 py-1.5 rounded-full border ${
            selectedCategory === 'darshan' ? 'bg-[#903f00] border-[#903f00]' : 'bg-[#f0f3ff] border-[#dee8ff]'
          }`}
        >
          <Text className={`text-xs font-bold ${selectedCategory === 'darshan' ? 'text-white' : 'text-[#564338]'}`}>
            {isEnglish ? 'Shantidhara Darshan' : 'शांतिधारा दर्शन'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Grid of Images */}
      <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedImage(item)}
              activeOpacity={0.85}
              style={{ width: (width - 44) / 2 }}
              className="bg-white rounded-2xl border border-[#dee8ff] overflow-hidden shadow-xs"
            >
              <View className="h-40 bg-slate-900 relative">
                <Image source={item.source} className="w-full h-full" resizeMode="cover" />
                <View className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded flex-row items-center gap-1">
                  <Eye size={10} color="#FFFFFF" />
                  <Text className="text-white text-[10px] font-bold">{item.views}</Text>
                </View>
              </View>

              <View className="p-3">
                <Text className="text-[#903f00] font-semibold text-[11px] mb-0.5">{item.date}</Text>
                <Text className="text-[#111c2d] font-bold text-xs leading-4" numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="h-10" />
      </ScrollView>

      {/* Fullscreen Lightbox Modal */}
      <Modal
        visible={!!selectedImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View className="flex-1 bg-black/95 justify-between">
          {/* Top Modal Controls */}
          <View className="pt-12 px-5 flex-row items-center justify-between z-10">
            <TouchableOpacity
              onPress={() => setSelectedImage(null)}
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            >
              <X size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View className="flex-row items-center gap-3">
              {selectedImage && (
                <>
                  <TouchableOpacity
                    onPress={() => handleDownload(selectedImage)}
                    className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                  >
                    <Download size={18} color="#FFFFFF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleShare(selectedImage)}
                    className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                  >
                    <Share2 size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* Image */}
          {selectedImage && (
            <View className="flex-1 items-center justify-center px-2">
              <Image
                source={selectedImage.source}
                style={{ width: width, height: width * 0.9 }}
                resizeMode="contain"
              />
            </View>
          )}

          {/* Bottom Info Banner */}
          {selectedImage && (
            <View className="p-6 bg-black/60">
              <Text className="text-[#ffdbca] text-xs font-bold mb-1">
                {selectedImage.date} • {selectedImage.views} {isEnglish ? 'Devotees viewed' : 'दर्शनार्थी'}
              </Text>
              <Text className="text-white font-bold text-base leading-6">
                {selectedImage.title}
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
