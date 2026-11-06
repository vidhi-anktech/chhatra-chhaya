// ==============================================================================
// 5 BOTTOM NAVIGATION TABS LAYOUT
// Tabs: Home (होम), Library (पुस्तकालय), Sadhna (साधना), Live (लाइव), More (संघ एवं अधिक)
// Clean white bar with active color #A24B0C (Terracotta) and inactive #64748B
// ==============================================================================

import React from 'react';
import { Tabs } from 'expo-router';
import { Home, BookOpen, HeartHandshake, Video, Menu } from 'lucide-react-native';
import { useLanguage } from '../../src/context/LanguageContext';

export default function TabsLayout() {
  const { t } = useLanguage();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#903F00',
        tabBarInactiveTintColor: '#564338',
        tabBarStyle: {
          backgroundColor: '#F9F9FF',
          borderTopColor: '#E7EEFF',
          borderTopWidth: 1,
          height: 76,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 2,
        }
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: t('tab.home', 'होम'),
          tabBarIcon: ({ color, size }) => <Home color={color} size={22} />
        }} 
      />
      <Tabs.Screen 
        name="library" 
        options={{ 
          title: t('tab.library', 'पुस्तकालय'),
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={22} />
        }} 
      />
      <Tabs.Screen 
        name="sadhna" 
        options={{ 
          title: t('tab.sadhna', 'साधना'),
          tabBarIcon: ({ color, size }) => <HeartHandshake color={color} size={22} />
        }} 
      />
      <Tabs.Screen 
        name="live" 
        options={{ 
          title: t('tab.live', 'लाइव'),
          tabBarIcon: ({ color, size }) => <Video color={color} size={22} />
        }} 
      />
      <Tabs.Screen 
        name="more" 
        options={{ 
          title: t('tab.more', 'संघ / अधिक'),
          tabBarIcon: ({ color, size }) => <Menu color={color} size={22} />
        }} 
      />
    </Tabs>
  );
}
