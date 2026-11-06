# 📄 Project Proposal: Chhatra Chhaya (छत्र छाया) Mobile App

**Official App Name:** **Chhatra Chhaya (छत्र छाया)**  
**Dedicated Guru:** Poojya Acharya Shri 108 Vibhav Sagarji Maharaj  
**Platform:** iOS & Android (Single Cross-Platform Codebase via React Native Expo)  
**Backend & Database:** Supabase PostgreSQL + Firebase Cloud Storage (100% Perpetual Free Tier)  
**Recurring Server Cost:** $0.00 / month (Zero Infrastructure Cost for up to 50k MAU)  
**Tradition:** Digambar Jainism (Grounded in Kundakunda Acharya Siddhanta)  

---

## 1. Executive Summary

This proposal outlines the product blueprint, feature transcription, and architectural specifications for **Chhatra Chhaya (छत्र छाया)**, the official spiritual mobile companion dedicated to **Poojya Acharya Shri 108 Vibhav Sagarji Maharaj** and his devotees.

### Key Decisions Finalized in Stakeholder Meeting
1. **Official App Identity:** Named **Chhatra Chhaya (छत्र छाया)**, reflecting the sacred shelter and divine blessings of Guru Maharaj.
2. **Frictionless Devotee Onboarding:** Normal devotees have NO login or password barrier. A simple 3-field setup collects `Name`, `Age`, and `City` on first launch.
3. **In-App Admin & Sangh System:** No separate web portal required. Admin and Up-Sangh sevaks log in securely inside the mobile app to upload Pravachans, update Vihar halting points, and publish photos.
4. **Splash ➔ Language Selection:** Immediately after splash, users select their preferred language (Hindi / English / Gujarati; Hindi default), switchable anytime in Settings.
5. **Continuous Ambient Background Audio:** Soft ambient spiritual flute/chanting plays across app screens with auto-ducking during media playback and an instant mute button.
6. **Home Screen "Dainik Niyam" & Live Community Feed:** Users select their daily vow (e.g. *Ratri Bhojan Tyag, Chauvihar, Dev Darshan*). Their name and city appear on a public community wall for spiritual rejoicing (*Anumodna*). The app checks in the next morning.
7. **Shravak Devotion Leaderboard:** Encourages spiritual consistency by ranking devotees based on Navkar Mala count, Swadhyay reading minutes, Pratikraman completions, and Niyam streaks.
8. **Streamlined V1 Scope:** Five modules are deferred/merged for V1 (9 Bhaktis & Chhahdhala, Seva & Jeevdaya, Aaj Ka Sankalp merged into Dainik Niyam, Ek Achha Karya, Abhakshya Food Scanner).

---

## 2. Detailed Handwritten Notes Feature Transcription & Scope Audit

| Category | Hindi Term | English Feature | Detailed Functionality | Status |
|---|---|---|---|---|
| **Digital Library** | डिजिटल पुस्तकालय | Digital Jinvaani Library | ① विधान पुस्तक (Vidhan Path & Pujan Vidhi)<br>② स्वाध्याय शास्त्र (Self-study Scriptures & Agams)<br>③ बाल संस्कार (Kids moral stories & paath)<br>④ भजन-आरती-महाकाव्य (Devotional hymns & poetic epics)<br>⑤ लेख व प्रश्न-उत्तर (Articles & Guru Q&A)<br>⑥ ऑडियो बुक व जनरल PDF (Audiobooks & General PDFs) | ✅ **Active Core (V1)** |
| **Religious Calendar** | धार्मिक कैलेंडर व पच्चक्खाण | Digambar Calendar & Panchang | Daily Jain Tithi, lunar date significance, Parva alerts (Ashtami, Chaturdashi, Paryushan), sunrise/sunset timings, and daily Pachkhan rules. | ✅ **Active Core (V1)** |
| **Travel Schedule** | विहार एवं कार्यक्रम | Vihar & Event Schedule | Detailed vihar route, halting temples, and upcoming programs of Acharya Shri 108 Vibhav Sagarji Maharaj + current halting location updates of Up-Sanghs. | ✅ **Active Core (V1)** |
| **Social Compassion** | सेवा एवं जीवदया | Seva & Jeevdaya Helplines | Emergency animal rescue directory, Gaushala contacts, and bird hospital listings. | ⏸️ **Deferred for V1** |
| **Smart Search** | स्मार्ट सर्च | Smart Search | AI-powered semantic concept search across all scriptures, pravachan audio transcripts, and library books. | ✅ **Active Core (V1)** |
| **Home Dashboard** | होम पेज डैशबोर्ड | Home Dashboard | ① दैनिक धर्म संदेश (Guru Daily Quote)<br>② आज का प्रवचन (Featured Discourse)<br>③ दैनिक नियम व अनुमोदना डैशबोर्ड (Live Community Niyam Feed)<br>④ लाइव दर्शन (Live Darshan Stream)<br>⑤ आज का कार्यक्रम (Today's Programs)<br>⑥ आज की तिथि व महत्व (Daily Tithi Header) | ✅ **Active Core (V1)** |
| **Pratikraman** | ४ दिगम्बर प्रतिक्रमण | 4 Digambar Pratikramans | ① इर्यापथ प्रतिक्रमण (Iryapath)<br>② दैवसिक/श्रावक प्रतिक्रमण (Daivik/Shravak)<br>③ श्रमण प्रतिक्रमण (Shraman)<br>④ पाक्षिक प्रतिक्रमण (Pakshik)<br>Complete with synchronized text and audio recital guide. | ✅ **Active Core (V1)** |
| **Devotional Stotras** | ९ भक्तियां व छहढाला | 9 Bhaktis & Chhahdhala | Yogi, Siddh, Nandishwar, Samadhi, Jinvaani, Acharya, Chaitya, Panchguru, Shanti Bhaktis and Chhahdhala. | ⏸️ **Deferred for V1** |
| **Gallery & Media** | दीक्षा महोत्सव व ई-गैलरी | Diksha Mahotsav & Gallery | High-resolution photo albums of Diksha Mahotsavs, Panchkalyanak Pratishtha, Chaturmas events, and sangh pravachan gallery. | ✅ **Active Core (V1)** |
| **Guru Lineage** | जीवन परिचय व शिष्य परिवार | Guru Biography & Lineage | Comprehensive detailed biography of Acharya Shri 108 Vibhav Sagarji Maharaj, accompanied by compact biographical overviews of Up-Sanghs & Shishya Munis. | ✅ **Active Core (V1)** |
| **Personal Sadhna** | मेरी साधना | Devotee Sadhna Suite | ① ४८ मिनट सामायिक टाइमर (With 12-min meditative chimes)<br>② डिजिटल णमोकार माला (Haptic 108 counter)<br>③ ४ दिगम्बर प्रतिक्रमण<br>④ 🏆 श्रावक लीडरबोर्ड (Devotion Engagement Board) | ✅ **Active Core (V1)** |
| **Daily Intention** | आज का संकल्प व एक अच्छा कार्य | Today's Resolve & Good Deed | Daily micro-intention and virtuous deed tracker. | 🔄 **Merged into 'दैनिक नियम'** |
| **AI Food Scanner** | अभक्ष्य एआई स्कैनर | Abhakshya Food Scanner | Camera-based packaged food ingredient scanner to detect non-Jain ingredients. | ⏸️ **Deferred for V1** |

---

## 3. Finalized 5-Tab Screen Hierarchy

```
Chhatra Chhaya (5 Core Bottom Tabs):
│
├── 🏠 1. Home (होम)
│   ├── Guru Dharm Sandesh (Daily quote & banner)
│   ├── Today's Pravachan Player & Highlight
│   ├── Dainik Niyam Checklist & Live Anumodna Wall
│   ├── Live Darshan Window & Today's Schedule
│   └── Jain Tithi, Sunrise/Sunset & Panchang
│
├── 📚 2. Library (पुस्तकालय)
│   ├── Vidhan Pustak & Pujan Path (PDF Reader)
│   ├── Swadhyay Granths & Scriptures
│   ├── Bal Sanskar (Kids moral paath & stories)
│   ├── Bhajans, Aarti & Mahakavya Poetry
│   ├── Spiritual Articles & Guru Q&A
│   └── Audiobooks & General PDF Library
│
├── 🙏 3. Sadhna (साधना)
│   ├── 48-Min Samayik Timer (12-min chimes)
│   ├── Digital Namokar Mantra Mala (108 counter)
│   ├── 4 Digambar Pratikramans (Audio + Text)
│   └── 🏆 Shravak Devotion Leaderboard (Anumodna)
│
├── 📺 4. Live (लाइव)
│   ├── YouTube Live Streaming (Embed & Live Chat)
│   ├── Past Pravachan Audio & Video Archives
│   ├── 2-Minute AI Pravachan Key Summaries
│   └── Smart Semantic Search (pgvector)
│
└── ☰ 5. Sangh & More (संघ एवं अधिक)
    ├── Jeevan Parichay (Detailed Acharya Shri + Compact Up-Sangh)
    ├── Vihar Updates & Halting Map (Acharya Shri + Up-Sanghs)
    ├── Digambar Monthly Lunisolar Calendar & Pachkhan
    ├── Diksha Mahotsav Albums & Event Photo Gallery
    ├── Language Selection (Hindi / English / Gujarati)
    └── App Settings & 🔐 Sangh/Admin Login Portal
```

---

## 4. User Roles & Permissions Matrix

| Role | Authentication | Key Capabilities & Permissions | UI Experience |
|---|---|---|---|
| **Devotee Shravak (Normal User)** | **No Password/OTP** (Collects Name, Age, City on first launch) | Access to all sacred literature, sadhna suite, live streams, vihar updates, participate in Dainik Niyam & Leaderboard. | Clean, spiritual interface without administrative buttons. |
| **Sangh Coordinator** | **Secure In-App Login** (Email/Password or Sangh Passcode) | Upload Pravachan links/audio, update Vihar halting location & dates, upload Diksha & event photos. | Contextual floating `+` buttons on Vihar, Pravachan, and Gallery screens + Coordinator Center in More tab. |
| **Super Admin** | **Secure In-App Login** (Master Credentials) | Full master control over app banners, user roles, daily Dharm Sandesh, and system configuration. | Complete Admin Control Center in More tab + full moderation rights. |

---

## 5. Technical Architecture & 100% Free-Tier Budget ($0/Month)

| Component | Selected Technology | Capacity & Free-Tier Limits | Cost |
|---|---|---|---|
| **Mobile App** | React Native Expo (TypeScript) | Single codebase for iOS and Android, free cloud EAS builds | **$0.00** |
| **Database & Realtime** | Supabase PostgreSQL | 500 MB DB, unlimited API requests, Realtime pub/sub for Anumodna Wall | **$0.00** |
| **Media Storage** | Firebase Storage | 5 GB free storage for book PDFs, high-res photos, and audio | **$0.00** |
| **Push Notifications** | Firebase Cloud Messaging (FCM) | Completely free unlimited push alerts for Pravachans & Vihar arrivals | **$0.00** |
| **Live Streaming** | YouTube Live API & Embed | Zero bandwidth/hosting costs using YouTube's global CDN | **$0.00** |
| **AI Summaries** | Google Gemini Flash API | 2-minute daily pravachan summaries and semantic search | **$0.00** |
| **Total Monthly Cost** | | **Supports up to 50,000 active devotees** | **$0.00 / Month** |
