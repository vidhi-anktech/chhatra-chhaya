// ==============================================================================
// ZUSTAND DEVOTEE STATE STORE (LOCAL ASYNCSTORAGE SYNC)
// ==============================================================================

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevoteeProfile } from '../types';

interface UserState {
  profile: DevoteeProfile | null;
  isRegistered: boolean;
  loadUser: () => Promise<void>;
  registerDevotee: (data: Omit<DevoteeProfile, 'role'>) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isRegistered: false,

  loadUser: async () => {
    // TODO: MANUAL WORK:
    // 1. Read stored devotee profile from AsyncStorage key '@chhatra_devotee'.
    // 2. If present, update `profile` and set `isRegistered: true`.
    try {
      const stored = await AsyncStorage.getItem('@chhatra_devotee');
      if (stored) {
        set({ profile: JSON.parse(stored), isRegistered: true });
      }
    } catch (e) {
      console.error('Failed to load user', e);
    }
  },

  registerDevotee: async (data) => {
    // TODO: MANUAL WORK:
    // 1. Save devotee profile into AsyncStorage.
    // 2. Sync to Supabase `profiles` table.
    const newProfile: DevoteeProfile = { ...data, role: 'user' };
    await AsyncStorage.setItem('@chhatra_devotee', JSON.stringify(newProfile));
    set({ profile: newProfile, isRegistered: true });
  }
}));
