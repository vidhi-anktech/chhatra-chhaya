import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BookOpen, Download, LucideIcon } from 'lucide-react-native';

export interface LiteratureCardProps {
  title: string;
  shortTitle: string;
  volumeSubtitle?: string;
  description: string;
  pages: string;
  icon: LucideIcon;
  downloadSize: string;
  onReadPdf: () => void;
  onDownload: () => void;
  fontSizeZoom?: number;
  readButtonText?: string;
  downloadButtonText?: string;
}

/**
 * Reusable LiteratureCard component for Featured Books by Acharya Shri
 * Senior-accessible touch targets (>= 48px), high contrast, font zoom scaling
 */
export default function LiteratureCard({
  title,
  shortTitle,
  volumeSubtitle,
  description,
  pages,
  icon: Icon,
  downloadSize,
  onReadPdf,
  onDownload,
  fontSizeZoom = 1,
  readButtonText = 'PDF पढ़ें',
  downloadButtonText = 'डाउनलोड',
}: LiteratureCardProps) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 border border-[#dee8ff] shadow-xs">
      <View className="flex-row gap-4 items-start mb-3">
        {/* Book Thumbnail */}
        <View className="w-24 h-32 rounded-xl bg-gradient-to-b from-[#ffdbca] to-[#e7eeff] p-2 items-center justify-center border border-[#dee8ff] shadow-xs">
          <Icon size={30} color="#903f00" />
          <Text className="text-[#903f00] font-bold text-xs text-center mt-2" numberOfLines={2}>
            {shortTitle}
          </Text>
          {volumeSubtitle ? (
            <Text className="text-[#564338] text-[10px] text-center" numberOfLines={1}>
              {volumeSubtitle}
            </Text>
          ) : null}
        </View>

        {/* Book Meta */}
        <View className="flex-1 justify-center py-0.5">
          <Text
            className="text-[#111c2d] font-bold text-lg"
            style={{
              fontSize: 18 * fontSizeZoom,
              lineHeight: Math.round(26 * fontSizeZoom),
              paddingBottom: 2,
            }}
          >
            {title}
          </Text>
          <Text
            className="text-[#564338] text-sm mt-1"
            style={{
              fontSize: 14 * fontSizeZoom,
              lineHeight: Math.round(21 * fontSizeZoom),
            }}
            numberOfLines={2}
          >
            {description}
          </Text>
          <View className="self-start bg-[#e7eeff] px-2.5 py-1 rounded-md mt-2">
            <Text className="text-[#111c2d] text-xs font-bold">{pages}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-2 pt-2 border-t border-[#dee8ff]">
        <TouchableOpacity
          onPress={onReadPdf}
          className="flex-1 bg-[#903f00] h-12 rounded-xl flex-row items-center justify-center gap-2 shadow-xs active:bg-[#763300]"
          accessibilityRole="button"
          accessibilityLabel={`${title} ${readButtonText}`}
        >
          <BookOpen size={16} color="#FFFFFF" />
          <Text className="text-white font-bold text-sm">{readButtonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDownload}
          className="bg-[#e7eeff] h-12 px-5 rounded-xl flex-row items-center justify-center gap-2 border border-[#dee8ff] active:bg-[#dee8ff]"
          accessibilityRole="button"
          accessibilityLabel={`${title} ${downloadButtonText} (${downloadSize})`}
        >
          <Download size={16} color="#111c2d" />
          <Text className="text-[#111c2d] font-bold text-sm">
            {downloadButtonText} ({downloadSize})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
