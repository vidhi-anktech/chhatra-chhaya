// ==============================================================================
// CONTINUOUS AMBIENT BACKGROUND AUDIO PROVIDER
// Responsibilities:
// 1. Loads ambient spiritual flute / Om / soft Namokar chanting track
// 2. Plays continuously across all screen transitions inside the app
// 3. AppState listener: Auto-pause on background, auto-resume on active
// 4. Auto-ducking: Silences when user starts Pravachan, Bhajan, or Samayik
// 5. Exposes `isMuted`, `toggleMute()`, and `pauseForMedia()`
// ==============================================================================

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  pauseAmbient: () => void;
  resumeAmbient: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  toggleMute: () => {},
  pauseAmbient: () => {},
  resumeAmbient: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  // TODO: MANUAL WORK:
  // 1. Add `assets/audio/ambient_flute.mp3` file to project assets.
  // 2. Initialize expo-audio player with looping enabled at 20% volume.
  // 3. Load user's saved mute preference from AsyncStorage.

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && !isMuted) {
        // Resume playback
      } else {
        // Pause playback
      }
    });
    return () => subscription.remove();
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const pauseAmbient = () => {};
  const resumeAmbient = () => {};

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, pauseAmbient, resumeAmbient }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
