# 🚀 PROMPT: Scaffold & Architect "Chhatra Chhaya" (छत्र छाया) Mobile App

> **Instructions for AI Agent / Lead Developer:**  
> Use this prompt to initialize and scaffold the complete React Native Expo mobile application. Follow all architectural decisions, design tokens, folder hierarchies, and database schemas specified below.

---

### Project Identity & Core Philosophy
You are building **"Chhatra Chhaya" (छत्र छाया)**, the official spiritual companion mobile app dedicated to **Poojya Acharya Shri 108 Vibhav Sagarji Maharaj** (Digambar Jain tradition). 

The app operates on a **100% Free-Tier architecture ($0.00/month)** using **Expo SDK 52+**, **TypeScript**, **NativeWind (Tailwind CSS)**, **Supabase PostgreSQL**, and **Firebase Storage/FCM**. It features an **In-App 3-Tier Role Management system** (eliminating the need for a separate web admin portal).

- **App Name:** Chhatra Chhaya (छत्र छाया)
- **App Slug / Package:** `chhatra-chhaya`
- **Bundle ID:** `com.chhatrachhaya.app`

---

## 🎨 1. Exact Design System & Color Palette

Configure `tailwind.config.js` and `src/constants/theme.ts` to strictly match the verified Figma/Mockup designs:

```typescript
// src/constants/theme.ts
export const colors = {
  // Primary CTA & Highlights (Enter App, Login, Play buttons, Active tabs)
  primary: {
    DEFAULT: '#A24B0C', // Sacred Terracotta / Ochre
    dark: '#853B06',    // Pressed state
    light: '#C25E17',
  },
  // Sacred & Brand Accents
  sacred: {
    maroon: '#6A141A',  // Ahimsa emblem background & headings
    wine: '#4A0E17',    // Support phone CTA button
    berry: '#9F1239',   // Leaderboard CTA & Tagline text
    gold: '#D4AF37',    // Emblem rays & ritual highlights
  },
  // Surfaces & Backgrounds
  background: {
    app: '#F4F6FC',     // Tinted cool lavender-grey main background
    card: '#FFFFFF',    // Pure white cards with subtle shadow
    input: '#EFF4FF',   // Soft periwinkle for inputs & inactive pills
  },
  // Soft Pastel Card Fills
  pastel: {
    peach: '#FEE4D4',   // Active Language card (Hindi), Panchang badge
    peachBorder: '#FDBA74',
    lavender: '#EFF4FF',// Inactive Language card (English), Info boxes
    rose: '#FFE4E6',    // Live Anumodna Wall background & Portal badge
    pink: '#FCE7F3',    // Tithi special strip & Vihar shortcut
    cyan: '#CFFAFE',    // 48-min Samayik shortcut circle
    amber: '#FEF3C7',   // E-Gallery shortcut circle
    orange: '#FFEDD5',  // Namokar Mala shortcut circle
  },
  // Status Badges
  status: {
    successGreen: '#0D9488', // Dainik Niyam checked state & "स्वीकृत" badge
    successBg: '#CCFBF1',
    alertRed: '#EF4444',     // "● लाइव दर्शन" live indicator
    alertBg: '#FEE2E2',
    sunYellow: '#F59E0B',    // Sunrise icon
  },
  // Typography
  text: {
    title: '#1E293B',   // Deep slate navy
    body: '#334155',    // Medium slate
    muted: '#64748B',   // Inactive labels, timestamps, placeholders
    white: '#FFFFFF',
  },
  border: {
    DEFAULT: '#E2E8F0',
    subtle: '#EEF2FF',
  }
};
```

---

## 📦 2. Dependencies to Install

Execute the following package installations:

```bash
# Initialize Expo App
npx create-expo-app@latest chhatra-chhaya --template blank-typescript
cd chhatra-chhaya

# Navigation & Layout
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# UI, Icons & Animations
npm install nativewind tailwindcss react-native-reanimated react-native-gesture-handler
npx expo install @expo/vector-icons expo-linear-gradient expo-image lucide-react-native

# Backend, Auth, DB & Offline Storage
npm install @supabase/supabase-js @react-native-async-storage/async-storage
npx expo install expo-secure-store expo-crypto
npm install firebase

# Audio & Media Playback
npx expo install expo-audio expo-av react-native-youtube-iframe react-native-pdf react-native-blob-util

# Native Haptics, Notifications & Localization
npx expo install expo-haptics expo-notifications expo-localization

# State & Server Cache
npm install zustand @tanstack/react-query
```

---

## 🏛️ 3. Core Architectural Requirements & User Flows

### A. 3-Tier In-App Role Management
1. **Devotee Shravak (`user`):**
   - **Zero Friction:** NO password or SMS OTP.
   - On first launch, collect `Name`, `Age`, and `City`. Save locally via `AsyncStorage` and sync to Supabase. Devotees enter immediately.
2. **Sangh Coordinator (`sangh`):**
   - Secure in-app login/signup (Email/Password or Sangh Passcode).
   - Contextual floating `+` buttons appear on Vihar, Pravachan, and Gallery screens to upload updates directly from their phone on the go.
3. **Master Admin (`admin`):**
   - Master Control Center in More tab to manage banners, approve sangh coordinators, and moderate community feeds.

### B. Onboarding & Language Flow
- `Splash Screen` (Ahimsa emblem, Guru title) ➔ `Language Selection` (Hindi [Default], English, Gujarati) ➔ `Devotee Registration (Name, Age, City)` ➔ `Home Screen`.
- Switch language anytime in Settings.

### C. Continuous Ambient Spiritual Audio Provider
- Mount a global Audio Context at root (`app/_layout.tsx`) using `expo-audio`.
- Plays soothing flute / Om / soft Namokar chanting continuously across all screen transitions.
- Listens to `AppState`: automatically pauses when app is backgrounded and resumes on active.
- Auto-ducks/pauses whenever the user plays a Pravachan video, Bhajan audio, or starts the Samayik timer.
- Includes a floating 🔊 / 🔇 toggle button in the top navigation header.

### D. Home Screen "Dainik Niyam" & Live Anumodna Wall
- Interactive daily checklist of Jain vows (*Ratri Bhojan Tyag, Chauvihar, Dev Darshan, Navkar Mala, Swadhyay*).
- When a user pledges, their name and city broadcast in real-time via **Supabase Realtime** on the **Live Anumodna Wall** (e.g., *"अमित जैन, जयपुर ने आज 'रात्रि भोजन त्याग' का नियम लिया"*).
- Morning check-in prompt: *"Did you observe your Niyam yesterday? Would you like to continue today or take a new one?"*

### E. Shravak Devotion Leaderboard (in Meri Sadhna)
- Ranked community board encouraging spiritual consistency (*Anumodna*):
  1. Namokar Mantra Mala Count (from digital 108 counter with haptics)
  2. Swadhyay Reading Minutes (from PDF reader)
  3. 4 Digambar Pratikramans Completed
  4. Dainik Niyam Streak (consecutive days)

### F. Dedicated Scope with Contextual Up-Sangh Coverage
- Dedicated specifically to **Acharya Shri 108 Vibhav Sagarji Maharaj**.
- **Vihar Schedule:** Detailed route for Acharya Shri + halting points for Up-Sangh munis.
- **Jeevan Parichay:** In-depth biography of Acharya Shri + compact cards for Up-Sanghs & Shishya Munis.
- *Note:* 5 features are deferred from V1: 9 Bhaktis/Chhahdhala, Seva/Jeevdaya, Aaj Ka Sankalp (merged into Dainik Niyam), Ek Achha Karya, and Abhakshya Food Scanner.

---

## 📂 4. Project Directory Structure

Scaffold the project with the following clean, modular structure:

```
chhatra-chhaya/
├── app/                               # Expo Router (File-based routing)
│   ├── _layout.tsx                    # Root Layout (Audio Provider, QueryClient, Auth Provider)
│   ├── index.tsx                      # Splash screen router
│   ├── onboarding.tsx                 # Language selection & Devotee profile setup
│   ├── auth/                          # Sangh & Admin secure in-app login
│   │   ├── login.tsx                  # Email/Password + Sangh Passcode login
│   │   └── sangh-register.tsx         # Coordinator request access form
│   ├── (tabs)/                        # 5 Bottom Navigation Tabs
│   │   ├── _layout.tsx                # Bottom Tab Bar configuration
│   │   ├── home.tsx                   # Panchang, Pravachan, Dainik Niyam & Live Wall, Shortcuts
│   │   ├── library.tsx                # Vidhan, Swadhyay, Bal Sanskar, Bhajans, General PDFs
│   │   ├── sadhna.tsx                 # 48-Min Samayik, Namokar Mala, 4 Pratikramans, Leaderboard
│   │   ├── live.tsx                   # YouTube Live stream, Audio archives, 2-Min AI summary
│   │   └── more.tsx                   # Vihar map, Biography, Calendar, Gallery, Admin Hub
│   └── admin/                         # In-App Admin / Sangh Management Screens
│       ├── post-vihar.tsx             # Post/update Vihar halting dates & locations
│       ├── upload-pravachan.tsx       # Post YouTube live URL or MP3 audio
│       └── upload-gallery.tsx         # Upload Diksha Mahotsav / event albums
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── common/                    # Header with Audio Mute toggle, Buttons, Modals
│   │   ├── home/                      # PanchangCard, PravachanCard, DainikNiyamCard, AnumodnaFeed
│   │   ├── sadhna/                    # SamayikTimer, MalaCounter, LeaderboardTable
│   │   └── library/                   # PDFReaderModal, AudioPlayerSheet
│   ├── context/                       # Global React Contexts
│   │   ├── AudioContext.tsx           # Continuous background ambient audio controller
│   │   ├── AuthContext.tsx            # Current role ('user' | 'sangh' | 'admin') & profile
│   │   └── LanguageContext.tsx        # Hindi / English / Gujarati localization
│   ├── services/                      # API & Backend clients
│   │   ├── supabase.ts                # Supabase client with AsyncStorage session persistence
│   │   ├── firebase.ts                # Firebase storage & FCM initialization
│   │   └── panchang.ts                # Offline Digambar astronomical calendar calculation
│   ├── store/                         # Zustand state stores
│   │   ├── useUserStore.ts            # Devotee profile & local storage
│   │   ├── useSadhnaStore.ts          # Mala counts, Samayik history, Niyam streak
│   │   └── useAudioStore.ts           # Ambient track state, mute status
│   ├── types/                         # TypeScript interfaces & types
│   │   └── index.ts                   # Role, User, Niyam, Vihar, Pravachan, Leaderboard types
│   └── constants/                     # Colors, Theme, Default Niyams
│       ├── theme.ts                   # Exact color palette from mockups
│       └── niyams.ts                  # Standard Digambar daily vows list
├── supabase/
│   └── schema.sql                     # Complete PostgreSQL tables, RLS policies & triggers
├── tailwind.config.js                 # NativeWind styling configuration
└── app.json                           # Expo app config (name: "Chhatra Chhaya")
```

---

## 🗄️ 5. Supabase SQL Schema (`supabase/schema.sql`)

Provide a production-ready SQL script with Row-Level Security (RLS):

```sql
-- 1. Profiles Table (Devotees + Sangh + Admin)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER,
  city TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'sangh', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Dainik Niyam Logs Table (Realtime Enabled)
CREATE TABLE public.dainik_niyam_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_city TEXT NOT NULL,
  niyam_title TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'pledged' CHECK (status IN ('pledged', 'fulfilled', 'broken')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER PUBLICATION supabase_realtime ADD TABLE public.dainik_niyam_logs;

-- 3. Devotion Leaderboard Table
CREATE TABLE public.leaderboard (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_city TEXT NOT NULL,
  mala_count BIGINT DEFAULT 0,
  swadhyay_minutes INTEGER DEFAULT 0,
  pratikraman_count INTEGER DEFAULT 0,
  niyam_streak INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Vihar Updates Table
CREATE TABLE public.vihar_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guru_title TEXT NOT NULL, -- 'Acharya Shri 108 Vibhav Sagarji' or Up-Sangh Muni name
  current_city TEXT NOT NULL,
  temple_name TEXT NOT NULL,
  arrival_date DATE,
  departure_date DATE,
  next_destination TEXT,
  notes TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Pravachans & Media Archives Table
CREATE TABLE public.pravachans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  youtube_url TEXT,
  audio_url TEXT,
  summary_2min TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dainik_niyam_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vihar_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pravachans ENABLE ROW LEVEL SECURITY;

-- Devotee Public Read/Insert Policies
CREATE POLICY "Public profiles can be created and read" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Public niyam logs readable by all" ON public.dainik_niyam_logs FOR SELECT USING (true);
CREATE POLICY "Users can insert their niyam log" ON public.dainik_niyam_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Leaderboard readable by all" ON public.leaderboard FOR SELECT USING (true);
CREATE POLICY "Vihar updates readable by all" ON public.vihar_updates FOR SELECT USING (true);
CREATE POLICY "Pravachans readable by all" ON public.pravachans FOR SELECT USING (true);

-- Sangh & Admin write policies
CREATE POLICY "Sangh and Admin can update vihar" ON public.vihar_updates 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('sangh', 'admin')));
CREATE POLICY "Sangh and Admin can upload pravachans" ON public.pravachans 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('sangh', 'admin')));
```

---

## ⚡ 6. Output & Verification Checklist
1. Generate the initial codebase with all dependencies cleanly installed.
2. Verify that `NativeWind` compiles with the custom color tokens (`primary`, `pastel`, `sacred`).
3. Implement the `AudioContext` so background ambient music plays continuously across tabs with an active mute button.
4. Scaffold all 5 bottom navigation tabs matching the UI mockups with card containers, pastel highlights, and rounded-2xl styling.
5. Implement the in-app role switch allowing Sangh coordinators to access upload forms on the go.
