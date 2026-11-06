import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X, Video, UploadCloud, CheckCircle } from 'lucide-react-native';

export default function UploadPravachanModal() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('02 नवम्बर 2024');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!title || !youtubeUrl) {
      Alert.alert('कृपया ध्यान दें', 'कृपया प्रवचन शीर्षक एवं यूट्यूब लिंक अवश्य भरें।');
      return;
    }
    setSaved(true);
    setTimeout(() => {
      Alert.alert('सफलता', 'अमृत प्रवचन सफलतापूर्वक अपलोड कर दिया गया है!');
      router.back();
    }, 600);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-app" edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView className="flex-1 px-5 py-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between mb-5">
          <View>
            <Text className="text-slateText-title text-2xl font-bold">अमृत प्रवचन अपलोड</Text>
            <Text className="text-slateText-muted text-sm mt-0.5">दैनिक मंगल प्रवचन, लाइव प्रसारण व AI सार</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-bg-input items-center justify-center border border-border"
          >
            <X size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        <View className="bg-bg-card p-5 rounded-2xl border border-border mb-6 shadow-sm">
          <Text className="text-slateText-title font-bold text-sm mb-1.5">प्रवचन विषय / शीर्षक *</Text>
          <TextInput 
            value={title} 
            onChangeText={setTitle}
            className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
            placeholder="उदा. तत्वार्थ सूत्र चिंतन — भाग 8"
          />

          <Text className="text-slateText-title font-bold text-sm mb-1.5">प्रवचन दिनांक</Text>
          <TextInput 
            value={date} 
            onChangeText={setDate}
            className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
            placeholder="उदा. 02 नवम्बर 2024"
          />

          <Text className="text-slateText-title font-bold text-sm mb-1.5">यूट्यूब वीडियो / लाइव URL *</Text>
          <TextInput 
            value={youtubeUrl} 
            onChangeText={setYoutubeUrl}
            className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
            placeholder="https://www.youtube.com/watch?v=..."
            autoCapitalize="none"
          />

          <Text className="text-slateText-title font-bold text-sm mb-1.5">ऑडियो MP3 लिंक (वैकल्पिक)</Text>
          <TextInput 
            value={audioUrl} 
            onChangeText={setAudioUrl}
            className="bg-bg-input p-4 rounded-xl border border-border mb-4 text-slateText-title text-base"
            placeholder="https://firebasestorage.../audio.mp3"
            autoCapitalize="none"
          />

          <Text className="text-slateText-title font-bold text-sm mb-1.5">2-मिनट AI सार (मुख्य आध्यात्मिक सूत्र)</Text>
          <TextInput 
            value={summary} 
            onChangeText={setSummary}
            className="bg-bg-input p-4 rounded-xl border border-border mb-5 text-slateText-title text-base"
            placeholder="• आत्मा का स्वभाव ज्ञाता-दृष्टा रहना है।&#10;• कषायों के उपशमन से ही वास्तविक शांति प्राप्त होती है।"
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity 
            onPress={handleSave} 
            className="bg-primary py-4 rounded-xl items-center flex-row justify-center gap-2 shadow-md"
          >
            <UploadCloud size={20} color="#FFFFFF" />
            <Text className="text-white font-bold text-base">
              {saved ? 'अपलोड हो रहा है...' : 'प्रवचन प्रकाशित करें'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
