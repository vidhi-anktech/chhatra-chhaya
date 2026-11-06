import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X, MapPin, Calendar, CheckCircle } from 'lucide-react-native';

export default function PostViharModal() {
  const router = useRouter();
  const [guruTitle, setGuruTitle] = useState('पूज्य आचार्य श्री 108 विभव सागर जी महाराज');
  const [city, setCity] = useState('');
  const [temple, setTemple] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [nextDestination, setNextDestination] = useState('');
  const [notes, setNotes] = useState('');
  const [contact, setContact] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!city || !temple) {
      Alert.alert('कृपया ध्यान दें', 'कृपया नगर एवं मंदिर का नाम अवश्य भरें।');
      return;
    }
    setSaved(true);
    setTimeout(() => {
      Alert.alert('सफलता', 'विहार सूचना सफलतापूर्वक अद्यतित कर दी गई है!');
      router.back();
    }, 600);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-app" edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView className="flex-1 px-5 py-6" showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View className="flex-row items-center justify-between mb-5">
          <View>
            <Text className="text-slateText-title text-2xl font-bold">विहार सूचना प्रविष्टि</Text>
            <Text className="text-slateText-muted text-sm mt-0.5">आचार्य श्री एवं उप-संघों के मुकाम अपडेट</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-bg-input items-center justify-center border border-border"
          >
            <X size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

      <View className="bg-bg-card p-5 rounded-2xl border border-border mb-6 shadow-sm">
        <Text className="text-slateText-title font-bold text-sm mb-1.5">पूज्य गुरुवर / मुनि श्री का चयन *</Text>
        <TextInput 
          value={guruTitle} 
          onChangeText={setGuruTitle}
          className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
          placeholder="उदा. आचार्य श्री 108 विभव सागर जी"
        />

        <Text className="text-slateText-title font-bold text-sm mb-1.5">वर्तमान नगर / शहर *</Text>
        <TextInput 
          value={city} 
          onChangeText={setCity}
          className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
          placeholder="उदा. इंदौर (मध्य प्रदेश)"
        />

        <Text className="text-slateText-title font-bold text-sm mb-1.5">विराजमान स्थल / मंदिर का नाम *</Text>
        <TextInput 
          value={temple} 
          onChangeText={setTemple}
          className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
          placeholder="उदा. कमलदीप दिगम्बर जैन मंदिर, सुखलिया"
        />

        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Text className="text-slateText-title font-bold text-sm mb-1.5">आगमन तिथि</Text>
            <TextInput 
              value={arrivalDate} 
              onChangeText={setArrivalDate}
              className="bg-bg-input p-4 rounded-xl border border-border text-slateText-title text-base"
              placeholder="उदा. 02 नवम्बर 2024"
            />
          </View>
          <View className="flex-1">
            <Text className="text-slateText-title font-bold text-sm mb-1.5">आगामी मुकाम</Text>
            <TextInput 
              value={nextDestination} 
              onChangeText={setNextDestination}
              className="bg-bg-input p-4 rounded-xl border border-border text-slateText-title text-base"
              placeholder="उदा. उज्जैन तीर्थ"
            />
          </View>
        </View>

        <Text className="text-slateText-title font-bold text-sm mb-1.5">स्थानीय संघ संपर्क सूत्र</Text>
        <TextInput 
          value={contact} 
          onChangeText={setContact}
          className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
          placeholder="उदा. श्री प्रमोद जैन (+91 98765 00000)"
          keyboardType="phone-pad"
        />

        <Text className="text-slateText-title font-bold text-sm mb-1.5">अतिरिक्त विवरण / सूचना</Text>
        <TextInput 
          value={notes} 
          onChangeText={setNotes}
          className="bg-bg-input p-4 rounded-xl border border-border mb-5 text-slateText-title text-base"
          placeholder="उदा. प्रातः 6:30 शांतिधारा, 8:30 मंगल प्रवचन एवं आहारचर्या"
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity 
          onPress={handleSave} 
          className="bg-primary py-4 rounded-xl items-center flex-row justify-center gap-2 shadow-md"
        >
          <CheckCircle size={20} color="#FFFFFF" />
          <Text className="text-white font-bold text-base">
            {saved ? 'सुरक्षित हो रहा है...' : 'विहार सूचना प्रकाशित करें'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
}
