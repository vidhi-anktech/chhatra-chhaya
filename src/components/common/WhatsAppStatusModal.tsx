// ==============================================================================
// WHATSAPP STATUS IMAGE CREATOR & SHARING COMPONENT
// Captures a high-resolution spiritual card with 3-4 summary lines as an image
// and shares it directly to WhatsApp / System Share Sheet using expo-sharing.
// ==============================================================================

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  Share as RNShare,
  Platform,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import {
  X,
  Share2,
  Sparkles,
  CheckCircle2,
  Download,
  Calendar,
  MessageCircle,
} from 'lucide-react-native';
import { useLanguage } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');

interface WhatsAppStatusModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  date?: string;
  author?: string;
  summaryLines?: string[];
}

export default function WhatsAppStatusModal({
  visible,
  onClose,
  title,
  date,
  author,
  summaryLines,
}: WhatsAppStatusModalProps) {
  const { t, isEnglish } = useLanguage();
  const cardRef = useRef<View>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);

  const displayTitle =
    title ||
    (isEnglish
      ? 'Morning Amrit Discourse — Tattvartha Sutra Exposition (Part 42)'
      : 'प्रातःकालीन अमृत प्रवचन — तत्त्वार्थ सूत्र महाग्रंथ व्याख्यान (भाग 42)');

  const displayDate =
    date ||
    (isEnglish
      ? '12 Feb 2025 • Magh Shukla Dashami'
      : '12 Feb 2025 • माघ शुक्ल दशमी');

  const displayAuthor =
    author ||
    (isEnglish
      ? 'Revered Acharya Shri 108 Vibhav Sagar Ji Maharaj'
      : 'पूज्य आचार्य श्री 108 विभव सागर जी महाराज');

  const defaultLines = isEnglish
    ? [
        'External austerity without Right Faith is merely physical torment; internal purity of intention is the true path to liberation.',
        'To pacify anger and pride, 10 minutes of daily silence and self-introspection is essential.',
        'In householder life, balance between righteous wealth and charity is the foundation of religion.',
        'Maintaining witnessing awareness in favorable and adverse situations is true equanimity.',
      ]
    : [
        'सम्यक दर्शन के बिना किया गया बाह्य तप केवल कायाक्लेश है; आंतरिक भावों की निर्मलता ही मोक्षमार्ग है।',
        'क्रोध और मान कषाय को शांत करने हेतु प्रतिदिन 10 मिनट मौन व आत्मनिरीक्षण अनिवार्य करें।',
        'गृहस्थ जीवन में न्यायोपार्जित धन और दान का संतुलन ही धर्म की नींव है।',
        'संसार के अनुकूल-प्रतिकूल प्रसंगों में साक्षी भाव रखना ही वास्तविक समता है।',
      ];

  const lines = summaryLines || defaultLines;

  const handleShareImage = async () => {
    try {
      setIsGenerating(true);

      // Capture the card view as high-resolution PNG image
      if (!cardRef.current) {
        throw new Error('Card ref is not ready');
      }

      const uri = await captureRef(cardRef, {
        format: 'png',
        quality: 1.0,
        result: 'tmpfile',
      });

      setCapturedUri(uri);
      setIsGenerating(false);

      // Check if native file sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/png',
          dialogTitle: isEnglish
            ? 'Create & Share WhatsApp Status'
            : 'व्हाट्सएप स्टेटस बनाएं व साझा करें',
          UTI: 'public.png',
        });
      } else {
        // Fallback to text sharing
        await RNShare.share({
          message: isEnglish
            ? `🌸 *${displayTitle}*\n${displayAuthor}\n\n${lines.map((l, i) => `${i + 1}. ${l}`).join('\n\n')}\n\nShared via Chhatra Chhaya App`
            : `🌸 *${displayTitle}*\n${displayAuthor}\n\n${lines.map((l, i) => `${i + 1}. ${l}`).join('\n\n')}\n\nछत्र छाया ऐप से प्राप्त`,
          title: isEnglish ? 'Discourse Summary Status' : 'प्रवचन सार स्टेटस',
        });
      }
    } catch (error: any) {
      setIsGenerating(false);
      console.error('Error sharing status image:', error);
      Alert.alert(
        isEnglish ? 'Sharing Error' : 'शेयर त्रुटि',
        isEnglish
          ? 'An error occurred generating the image card. Sharing text message instead.'
          : 'चित्र तैयार करने में त्रुटि आई। टेक्स्ट संदेश साझा किया जा रहा है।',
        [
          {
            text: isEnglish ? 'OK' : 'ठीक है',
            onPress: () => {
              RNShare.share({
                message: isEnglish
                  ? `🌸 *${displayTitle}*\n${displayAuthor}\n\n${lines.map((l, i) => `${i + 1}. ${l}`).join('\n\n')}\n\nChhatra Chhaya App`
                  : `🌸 *${displayTitle}*\n${displayAuthor}\n\n${lines.map((l, i) => `${i + 1}. ${l}`).join('\n\n')}\n\nछत्र छाया ऐप`,
              });
            },
          },
        ]
      );
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/75 justify-end">
        <View className="bg-white rounded-t-3xl max-h-[92%] p-5 pb-8 border-t border-[#dee8ff]">
          {/* Top Modal Bar */}
          <View className="flex-row items-center justify-between pb-3 border-b border-[#dee8ff]">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-full bg-[#ffdbca] items-center justify-center">
                <Sparkles size={16} color="#903f00" />
              </View>
              <Text className="text-[#111c2d] font-bold text-lg">
                {t('status.modalTitle', 'व्हाट्सएप स्टेटस चित्र बनाएं')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-9 h-9 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]"
            >
              <X size={18} color="#564338" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="py-3">
            <Text className="text-[#564338] text-xs font-medium text-center mb-3">
              {t(
                'status.modalSub',
                'नीचे दिया गया सुंदर आध्यात्मिक स्टेटस चित्र स्वतः तैयार होकर व्हाट्सएप पर साझा होगा:'
              )}
            </Text>

            {/* ================= STATUS IMAGE PREVIEW CANVAS ================= */}
            {/* This view is captured by captureRef to create the actual image */}
            <View className="items-center mb-4">
              <View
                ref={cardRef}
                collapsable={false}
                style={{ width: Math.min(width - 48, 360) }}
                className="bg-[#fff9f5] rounded-3xl p-6 border-2 border-[#b45309]/30 shadow-lg overflow-hidden relative"
              >
                {/* Spiritual Warm Gradient Halos */}
                <View className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#ffdbca] blur-2xl pointer-events-none opacity-60" />
                <View className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[#ffd9e1] blur-2xl pointer-events-none opacity-60" />

                {/* Card Header: Guru Emblem & Title */}
                <View className="flex-row items-center gap-3 pb-3 border-b border-[#ffdbca] mb-3">
                  <View className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#903f00] bg-white items-center justify-center shadow-xs">
                    <Image
                      source={require('../../../assets/images/guru_emblem.png')}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[#903f00] font-bold text-base leading-5">
                      {displayAuthor}
                    </Text>
                    <Text className="text-[#564338] text-xs font-semibold mt-0.5">
                      {displayDate}
                    </Text>
                  </View>
                </View>

                {/* Lecture Subject Tag */}
                <View className="self-start bg-[#903f00] px-3 py-1 rounded-full mb-3 shadow-xs">
                  <Text className="text-white font-bold text-xs">
                    {t('status.tag', '✨ आज का पावन अमृत प्रवचन सार')}
                  </Text>
                </View>

                <Text className="text-[#111c2d] font-bold text-lg leading-6 mb-3">
                  {displayTitle}
                </Text>

                {/* 3-4 Lines of Key Spiritual Insights */}
                <View className="gap-2.5 mb-4">
                  {lines.map((line, index) => (
                    <View
                      key={index}
                      className="bg-white/95 p-3 rounded-xl border border-[#ffdbca] flex-row items-start gap-2.5 shadow-2xs"
                    >
                      <View className="w-5 h-5 rounded-full bg-[#b45309] items-center justify-center shrink-0 mt-0.5">
                        <Text className="text-white font-bold text-[11px]">
                          {index + 1}
                        </Text>
                      </View>
                      <Text className="text-[#111c2d] text-sm leading-5 flex-1 font-medium">
                        {line}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Card Footer Stamp */}
                <View className="pt-3 border-t border-[#ffdbca] flex-row items-center justify-between">
                  <View>
                    <Text className="text-[#903f00] font-bold text-xs">
                      {isEnglish
                        ? '॥ Om Namah Siddhebhyah • Jai Jinendra ॥'
                        : '॥ ॐ नमः सिद्धेभ्यः • जय जिनेन्द्र ॥'}
                    </Text>
                    <Text className="text-[#564338] text-[10px] mt-0.5">
                      {isEnglish
                        ? 'Chhatra Chhaya — Jain Spiritual App'
                        : 'छत्र छाया — जैन आध्यात्मिक ऐप'}
                    </Text>
                  </View>
                  <View className="bg-[#ffdbca] px-2.5 py-1 rounded-md">
                    <Text className="text-[#903f00] font-bold text-[11px]">
                      {isEnglish ? 'Daily Blessing' : 'दैनिक दर्शन'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Status Share Action Button (Full 56px Senior Ergonomic) */}
            <TouchableOpacity
              onPress={handleShareImage}
              disabled={isGenerating}
              activeOpacity={0.85}
              className="bg-[#006165] min-h-[54px] rounded-2xl flex-row items-center justify-center gap-2.5 px-6 py-3.5 shadow-md active:bg-[#004d50] mb-3"
            >
              {isGenerating ? (
                <>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text className="text-white font-bold text-base">
                    {t('status.generating', 'चित्र तैयार हो रहा है...')}
                  </Text>
                </>
              ) : (
                <>
                  <Share2 size={20} color="#FFFFFF" />
                  <Text className="text-white font-bold text-base">
                    {t('status.shareButton', 'व्हाट्सएप स्टेटस पर साझा करें (Share Image)')}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              className="bg-[#f0f3ff] min-h-[46px] rounded-xl items-center justify-center border border-[#dee8ff]"
            >
              <Text className="text-[#564338] font-bold text-sm">
                {t('status.close', 'बंद करें')}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
