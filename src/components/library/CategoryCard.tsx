import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRight, LucideIcon } from "lucide-react-native";

export interface CategoryCardProps {
  title: string;
  subtitle: string;
  tagText: string;
  icon: LucideIcon;
  tagIcon: LucideIcon;
  onPress: () => void;
  fontSizeZoom?: number;
  accessibilityLabel?: string;
}

/**
 * Reusable CategoryCard component for Canonical Library divisions
 * Strict Senior Accessibility standard: >= 48px touch targets, high contrast, font zoom scaling
 */
export default function CategoryCard({
  title,
  subtitle,
  tagText,
  icon: Icon,
  tagIcon: TagIcon,
  onPress,
  fontSizeZoom = 1,
  accessibilityLabel,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 mb-3 border border-[#dee8ff] flex-row items-center justify-between shadow-xs active:bg-[#f0f3ff]"
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
    >
      <View className="flex-row items-center gap-3.5 flex-1 mr-2">
        <View className="w-14 h-14 rounded-2xl bg-[#e7eeff] items-center justify-center">
          <Icon size={28} color="#903f00" />
        </View>
        <View className="flex-1 justify-center py-0.5">
          <Text
            className="text-[#111c2d] font-bold text-lg"
            style={{
              fontSize: 18 * fontSizeZoom,
              lineHeight: Math.round(28 * fontSizeZoom),
              paddingBottom: 2,
            }}
          >
            {title}
          </Text>
          <Text
            className="text-[#564338] text-sm"
            style={{
              fontSize: 14 * fontSizeZoom,
              lineHeight: Math.round(20 * fontSizeZoom),
              paddingTop: 1,
            }}
            numberOfLines={2}
          >
            {subtitle}
          </Text>
          {/* <View className="flex-row items-center gap-1.5 mt-1.5">
            <TagIcon size={13} color="#006165" />
            <Text className="text-[#006165] text-xs font-bold">{tagText}</Text>
          </View> */}
        </View>
      </View>
      <View className="w-11 h-11 rounded-full bg-[#f0f3ff] items-center justify-center border border-[#dee8ff]">
        <ChevronRight size={18} color="#903f00" />
      </View>
    </TouchableOpacity>
  );
}
