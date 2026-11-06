// ==============================================================================
// FIREBASE CLIENT (STORAGE & CLOUD MESSAGING FREE TIER)
// ==============================================================================

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

// TODO: MANUAL WORK:
// 1. Add your Firebase web app config to `.env`.
// 2. Enable Firebase Storage rules for public read access to book PDFs and photos.
