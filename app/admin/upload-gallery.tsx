import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X, Image, UploadCloud, CheckCircle } from 'lucide-react-native';

export default function UploadGalleryModal() {
  const router = useRouter();
  const [albumTitle, setAlbumTitle] = useState('');
  const [category, setCategory] = useState('दीक्षा महोत्सव');
  const [location, setLocation] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [saved, setSaved] = useState(false);

  const categories = ['दीक्षा महोत्सव', 'पंचकल्याणक प्रतिष्ठा', 'चातुर्मास मंगल प्रवेश', 'संघ विहार दर्शन'];

  const handleSave = () => {
    if (!albumTitle || !location) {
      Alert.alert('कृपया ध्यान दें', 'कृपया एल्बम शीर्षक एवं स्थान अवश्य भरें।');
      return;
    }
    setSaved(true);
    setTimeout(() => {
      Alert.alert('सफलता', 'गैलरी एल्बम सफलतापूर्वक प्रकाशित कर दिया गया है!');
      router.back();
    }, 600);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-app" edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView className="flex-1 px-5 py-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between mb-5">
          <View>
            <Text className="text-slateText-title text-2xl font-bold">ई-गैलरी फोटो अपलोड</Text>
            <Text className="text-slateText-muted text-sm mt-0.5">दीक्षा, पंचकल्याणक एवं चातुर्मास पावन स्मृतियां</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-bg-input items-center justify-center border border-border"
          >
            <X size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        <View className="bg-bg-card p-5 rounded-2xl border border-border mb-6 shadow-sm">
          <Text className="text-slateText-title font-bold text-sm mb-2.5">एल्बम श्रेणी चुनें *</Text>
          <View className="flex-row flex-wrap gap-2.5 mb-4">
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                className={`px-3.5 py-2.5 rounded-xl border ${category === cat ? 'bg-primary border-primary' : 'bg-bg-input border-border'}`}
              >
                <Text className={`text-sm font-bold ${category === cat ? 'text-white' : 'text-slateText-body'}`}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-slateText-title font-bold text-sm mb-1.5">एल्बम शीर्षक *</Text>
          <TextInput 
            value={albumTitle} 
            onChangeText={setAlbumTitle}
            className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
            placeholder="उदा. भव्य जैनेश्वरी दीक्षा महोत्सव 2024"
          />

          <Text className="text-slateText-title font-bold text-sm mb-1.5">आयोजन स्थल *</Text>
          <TextInput 
            value={location} 
            onChangeText={setLocation}
            className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
            placeholder="उदा. कुंडलपुर महातीर्थ, मध्य प्रदेश"
          />

          <Text className="text-slateText-title font-bold text-sm mb-1.5">फोटो लिंक / इमेज यूआरएल</Text>
          <TextInput 
            value={photoUrl} 
            onChangeText={setPhotoUrl}
            className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
            placeholder="https://..."
            autoCapitalize="none"
          />

          <View className="border-2 border-dashed border-border rounded-xl p-6 items-center justify-center bg-bg-input/60 mb-5">
            <Image size={36} color="#A24B0C" />
            <Text className="text-slateText-title font-bold text-sm mt-2">गैलरी से चित्र चुनें</Text>
            <Text className="text-slateText-muted text-xs mt-0.5">JPG, PNG समर्थित (अधिकतम 10MB)</Text>
          </View>

          <TouchableOpacity 
            onPress={handleSave} 
            className="bg-primary py-4 rounded-xl items-center flex-row justify-center gap-2 shadow-md"
          >
            <UploadCloud size={20} color="#FFFFFF" />
            <Text className="text-white font-bold text-base">
              {saved ? 'अपलोड हो रहा है...' : 'एल्बम प्रकाशित करें'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
