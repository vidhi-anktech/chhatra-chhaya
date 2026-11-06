import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Phone, 
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react-native';

export default function SanghAdminLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState<'sangh' | 'admin'>('sangh');
  const [identifier, setIdentifier] = useState('');
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!identifier.trim() || !pin.trim()) {
      Alert.alert('त्रुटि', 'कृपया पंजीकृत ईमेल/मोबाइल एवं सुरक्षा पिन दर्ज करें।');
      return;
    }
    await login(identifier, pin, role);
    router.replace('/(tabs)/more');
  };

  const handleDemoLogin = async () => {
    await login('demo@sangh.org', '123456', role);
    router.replace('/(tabs)/more');
  };

  const openSupportCall = () => {
    Linking.openURL('tel:+919876543210').catch(() => {
      Alert.alert('त्रुटि', 'फोन डायलर खोलने में असमर्थ');
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9ff]" edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView className="flex-1 px-5 py-4" showsVerticalScrollIndicator={false}>
        
        {/* Back Link */}
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="self-start bg-[#f0f3ff] px-4 py-2.5 rounded-xl mb-4 border border-[#dee8ff] flex-row items-center gap-2 shadow-xs active:bg-[#e7eeff]"
        >
          <ArrowLeft size={16} color="#903f00" />
          <Text className="text-[#903f00] text-sm font-semibold">सामान्य श्रावक ऐप पर लौटें</Text>
        </TouchableOpacity>

        {/* Portal Header Card */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          <View className="self-start bg-[#ffd9e1] px-3.5 py-1 rounded-full mb-3 flex-row items-center gap-1.5">
            <Lock size={12} color="#3f001a" />
            <Text className="text-[#3f001a] text-xs font-bold">सुरक्षित संघ पोर्टल</Text>
          </View>
          <Text className="text-[#111c2d] text-2xl font-bold">संघ एवं व्यवस्थापक लॉगिन</Text>
          <Text className="text-[#564338] text-sm mt-1 leading-6">
            आचार्य श्री एवं उप-संघों के विहार, प्रवचन एवं दैनिक सूचना प्रबंधन हेतु अधिकृत प्रवेश।
          </Text>
        </View>

        {/* Role Toggle Switch */}
        <View className="bg-[#e7eeff] p-1.5 rounded-xl mb-4 flex-row border border-[#dee8ff]">
          <TouchableOpacity 
            onPress={() => setRole('sangh')} 
            className={`flex-1 py-3 rounded-lg items-center justify-center flex-row gap-2 ${role === 'sangh' ? 'bg-white shadow-xs' : ''}`}
          >
            <ShieldCheck size={16} color={role === 'sangh' ? '#903f00' : '#564338'} />
            <Text className={`text-sm font-bold ${role === 'sangh' ? 'text-[#903f00]' : 'text-[#564338]'}`}>
              संघ प्रबंधक
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setRole('admin')} 
            className={`flex-1 py-3 rounded-lg items-center justify-center flex-row gap-2 ${role === 'admin' ? 'bg-white shadow-xs' : ''}`}
          >
            <Sparkles size={16} color={role === 'admin' ? '#903f00' : '#564338'} />
            <Text className={`text-sm font-bold ${role === 'admin' ? 'text-[#903f00]' : 'text-[#564338]'}`}>
              मुख्य एडमिन
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Form Card */}
        <View className="bg-white p-5 rounded-2xl border border-[#dee8ff] mb-4 shadow-xs">
          {/* Email / Mobile Field */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-[#111c2d] text-sm font-semibold">पंजीकृत ईमेल आईडी / मोबाइल</Text>
              <Text className="text-[#a5345d] text-xs font-semibold">*अनिवार्य</Text>
            </View>
            <View className="bg-[#f0f3ff] px-4 py-3 rounded-xl border border-[#dee8ff] flex-row items-center">
              <Mail size={18} color="#564338" />
              <TextInput 
                placeholder="उदा. admin@sangh.org" 
                placeholderTextColor="#9ca3af"
                value={identifier} 
                onChangeText={setIdentifier} 
                autoCapitalize="none"
                keyboardType="email-address"
                className="flex-1 ml-3 text-[#111c2d] text-base" 
              />
            </View>
          </View>

          {/* Secret PIN / Password Field */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-[#111c2d] text-sm font-semibold">सुरक्षा पिन / पासवर्ड</Text>
              <Text className="text-[#a5345d] text-xs font-semibold">*अनिवार्य</Text>
            </View>
            <View className="bg-[#f0f3ff] px-4 py-3 rounded-xl border border-[#dee8ff] flex-row items-center">
              <Lock size={18} color="#564338" />
              <TextInput 
                placeholder="6 अंकों का गोपनीय पिन दर्ज करें" 
                placeholderTextColor="#9ca3af"
                value={pin} 
                onChangeText={setPin} 
                secureTextEntry={!showPassword}
                keyboardType="numeric"
                className="flex-1 ml-3 text-[#111c2d] text-base" 
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
                {showPassword ? <EyeOff size={18} color="#564338" /> : <Eye size={18} color="#564338" />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Primary CTA */}
          <TouchableOpacity 
            onPress={handleLogin} 
            className="bg-[#903f00] min-h-[54px] rounded-xl items-center justify-center flex-row gap-2 shadow-xs active:bg-[#763300] mb-3"
          >
            <ShieldCheck size={18} color="#FFFFFF" />
            <Text className="text-white font-bold text-base">लॉगिन करें (Secure Login)</Text>
          </TouchableOpacity>

          {/* Quick Demo Access */}
          <TouchableOpacity 
            onPress={handleDemoLogin}
            className="bg-[#ffdbca] py-3.5 rounded-xl items-center border border-[#903f00]/20 mb-3"
          >
            <Text className="text-[#903f00] font-bold text-sm">
              ⚡ त्वरित 1-Click डेमो लॉगिन ({role === 'admin' ? 'Admin' : 'Sangh'})
            </Text>
          </TouchableOpacity>

          {/* Sub Links */}
          <View className="flex-row items-center justify-between pt-1">
            <TouchableOpacity onPress={() => Alert.alert('सहायता', 'पिन पुनर्प्राप्ति हेतु कृपया नीचे दिए गए ट्रस्ट सहायता केंद्र नंबर पर संपर्क करें।')}>
              <Text className="text-[#903f00] text-xs font-semibold underline">सुरक्षा पिन भूल गए?</Text>
            </TouchableOpacity>
            <View className="flex-row items-center gap-1">
              <CheckCircle2 size={12} color="#564338" />
              <Text className="text-[#564338] text-xs">256-बिट सुरक्षित</Text>
            </View>
          </View>
        </View>

        {/* Shravak Notice Card */}
        <View className="bg-[#f0f3ff] p-4 rounded-xl border border-[#dee8ff] mb-4 flex-row items-start gap-3 shadow-xs">
          <View className="w-9 h-9 rounded-full bg-[#e7eeff] items-center justify-center mt-0.5">
            <Info size={18} color="#903f00" />
          </View>
          <View className="flex-1">
            <Text className="text-[#111c2d] font-bold text-sm">श्रावक बंधुओं हेतु सूचना</Text>
            <Text className="text-[#564338] text-xs leading-5 mt-1">
              सामान्य श्रावकों को लॉगिन की आवश्यकता नहीं है, वे सीधे होम स्क्रीन से आचार्य श्री के मंगल दर्शन, प्रवचन एवं दैनिक नियम का लाभ ले सकते हैं।
            </Text>
          </View>
        </View>

        {/* Support Card */}
        <View className="bg-[#ffd9e1] p-5 rounded-2xl border border-[#a5345d]/20 mb-6">
          <View className="flex-row items-center gap-2 mb-1.5">
            <Phone size={18} color="#3f001a" />
            <Text className="text-[#3f001a] font-bold text-base">वरिष्ठ व्यवस्थापक सहायता केंद्र</Text>
          </View>
          <Text className="text-[#3f001a] text-xs leading-5 mb-3 opacity-90">
            यदि आपको लॉगिन अथवा पिन प्रविष्टि में कोई कठिनाई आ रही है, तो कृपया ट्रस्ट कार्यालय से संपर्क करें:
          </Text>
          
          <TouchableOpacity 
            onPress={openSupportCall}
            className="self-start bg-[#3f001a] px-5 py-3 rounded-xl flex-row items-center gap-2 shadow-xs active:bg-[#2a0011]"
          >
            <Phone size={14} color="#ffd9e1" />
            <Text className="text-[#ffd9e1] font-bold text-sm">+91 98765 43210</Text>
          </TouchableOpacity>
          <Text className="text-[#3f001a] text-xs mt-2 opacity-80">(समय: प्रातः 08:00 से सायं 07:00)</Text>
        </View>

        {/* Footer */}
        <View className="items-center pb-6">
          <Text className="text-[#564338] text-xs">
            दिगम्बर जैन श्रमण संस्कृति न्यास • अधिकृत संघ प्रबंधन
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
