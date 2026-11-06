# 🙏 Chhatra Chhaya (छत्र छाया) — Master Architecture & Developer Guide

> **Official Spiritual Mobile Application dedicated to Poojya Acharya Shri 108 Vibhav Sagarji Maharaj**  
> Built with **React Native Expo SDK 52+**, **TypeScript**, **Supabase PostgreSQL**, and **Firebase** on a **100% Perpetual Free Tier ($0.00/Month)**.

---

## 📋 Table of Contents
1. [Core Architectural Decisions](#1-core-architectural-decisions)
2. [Role Management & Permissions Matrix](#2-role-management--permissions-matrix)
3. [Design System & Color Tokens](#3-design-system--color-tokens)
4. [File & Folder Structure](#4-file--folder-structure)
5. [Manual Work Checklist for Further Assistance](#5-manual-work-checklist-for-further-assistance)

---

## 1. Core Architectural Decisions

1. **Zero-Friction Devotee Onboarding:** Normal devotees have NO login, password, or SMS OTP requirement. On first app launch, they enter `Name`, `Age`, and `City`. This is stored locally in `AsyncStorage` and synced to Supabase.
2. **Unified In-App Admin / Sangh Portal:** No separate web panel. Admin and Sangh coordinators log in directly inside the app to publish Vihar halts, discourse links, and gallery photos from their smartphones.
3. **Continuous Ambient Background Audio:** An ambient spiritual instrumental track (flute / Om / soft Namokar mantra) plays continuously across screens using a root-level AudioProvider, with an instant mute button in the top header and auto-ducking during video/audio playback.
4. **Home Screen Dainik Niyam & Live Anumodna Wall:** Devotees select daily vows (Ratri Bhojan Tyag, Chauvihar, etc.). Their commitments broadcast in real time to all devotees via Supabase Realtime, with a morning check-in prompt the next day.
5. **Shravak Devotion Leaderboard:** Inside *Meri Sadhna*, tracking Mala counts (108 counter with haptics), Swadhyay reading minutes, Pratikraman, and Niyam streaks.
6. **Dedicated Scope with Up-Sangh Context:** Dedicated to Acharya Shri 108 Vibhav Sagarji Maharaj, with contextual coverage of Up-Sanghs in Vihar notices and compact profiles in Jeevan Parichay.
7. **Deferred Features for V1:** 9 Bhaktis & Chhahdhala, Seva & Jeevdaya Helplines, Aaj Ka Sankalp (merged into Dainik Niyam), Ek Achha Karya, and Abhakshya Food Scanner are deferred to maintain a fast initial release.

---

## 2. Role Management & Permissions Matrix

| Role | Authentication | In-App Permissions & Capabilities |
|---|---|---|
| **Devotee Shravak (`user`)** | **Zero Friction** (Name, Age, City) | Read scriptures, perform Samayik/Mala, watch Live darshan, take Dainik Niyam, view Leaderboard. |
| **Sangh Coordinator (`sangh`)** | **In-App Login** (Email/Passcode) | All user rights + upload Vihar halting dates, upload discourse links/audio, upload Diksha Mahotsav photos. |
| **Master Admin (`admin`)** | **In-App Login** (Master Credentials) | Master control over daily quotes, banners, user roles, community moderation, and system settings. |

---

## 3. Design System & Color Tokens

- **Primary Action (Ochre/Terracotta):** `#A24B0C` (Pressed: `#853B06`)
- **App Background:** `#F4F6FC` (Cool lavender-grey)
- **Input & Inactive Surfaces:** `#EFF4FF` (Soft periwinkle)
- **Cards:** `#FFFFFF` (Pure white with soft elevation)
- **Pastel Highlights:** Peach `#FEE4D4`, Rose `#FFE4E6`, Pink `#FCE7F3`, Cyan `#CFFAFE`, Orange `#FFEDD5`
- **Text:** Deep Navy Title `#1E293B`, Medium Slate Body `#334155`, Muted `#64748B`

---

## 4. File & Folder Structure

```
chhatra-chhaya/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root Layout (Audio, Auth, Query providers)
│   ├── index.tsx                 # Splash screen & router logic
│   ├── onboarding.tsx            # Language selection & Devotee profile
│   ├── auth/                     # Sangh & Admin login
│   ├── (tabs)/                   # 5 Bottom Navigation Tabs (Home, Library, Sadhna, Live, More)
│   └── admin/                    # In-app content publishing screens
├── src/
│   ├── components/               # UI components matching mockups
│   ├── context/                  # Global Audio, Auth, Language contexts
│   ├── services/                 # Supabase, Firebase, Offline Panchang
│   ├── store/                    # Zustand state management
│   ├── types/                    # TypeScript interfaces
│   └── constants/                # Theme colors and default niyam lists
└── supabase/
    └── schema.sql                # Complete PostgreSQL schema with RLS
```

---

## 5. Manual Work Checklist for Further Assistance

The following items are marked with `// TODO: MANUAL WORK` across the codebase:

- [ ] **1. Supabase Project Setup:** Create a free project at [supabase.com](https://supabase.com) and execute `supabase/schema.sql` in the SQL editor.
- [ ] **2. Firebase Project Setup:** Create a free project at [console.firebase.google.com](https://console.firebase.google.com), enable Firebase Storage (5 GB free) and Cloud Messaging (FCM), and add Android/iOS app credentials.
- [ ] **3. Environment Variables:** Copy `.env.example` to `.env` and fill in your Supabase URL, Anon Key, and Firebase keys.
- [ ] **4. Ambient Audio Assets:** Place a peaceful royalty-free instrumental flute/Om audio file at `assets/audio/ambient_flute.mp3`.
- [ ] **5. App Branding Assets:** Place the high-res Ahimsa emblem and Guru Maharaj portrait in `assets/icon.png` and `assets/splash.png`.
- [ ] **6. YouTube Channel ID:** In `src/services/youtube.ts`, configure Poojya Acharya Shri's official YouTube channel ID for live streaming.
- [ ] **7. Push Notification Certificates:** Configure APNs (iOS) and FCM (Android) credentials in the Expo dashboard for automated push alerts.
