-- ==============================================================================
-- CHHATRA CHHAYA (छत्र छाया) — SUPABASE POSTGRESQL SCHEMA
-- Supports 3-Tier In-App Role Architecture + Supabase Realtime for Anumodna Wall
-- ==============================================================================

-- 1. Profiles Table (Devotees, Sangh Coordinators, Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER,
  city TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'sangh', 'admin')),
  notification_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Dainik Niyam Logs Table (Realtime Enabled for Community Feed)
CREATE TABLE IF NOT EXISTS public.dainik_niyam_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_city TEXT NOT NULL,
  niyam_title TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'pledged' CHECK (status IN ('pledged', 'fulfilled', 'broken')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Supabase Realtime for Dainik Niyam live broadcast
ALTER PUBLICATION supabase_realtime ADD TABLE public.dainik_niyam_logs;

-- 3. Shravak Devotion Leaderboard Table
CREATE TABLE IF NOT EXISTS public.leaderboard (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_city TEXT NOT NULL,
  mala_count BIGINT DEFAULT 0,
  swadhyay_minutes INTEGER DEFAULT 0,
  pratikraman_count INTEGER DEFAULT 0,
  niyam_streak INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Vihar Updates Table (Acharya Shri & Up-Sanghs)
CREATE TABLE IF NOT EXISTS public.vihar_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guru_title TEXT NOT NULL, -- 'Acharya Shri 108 Vibhav Sagarji' or Up-Sangh Muni Name
  is_main_guru BOOLEAN DEFAULT false,
  current_city TEXT NOT NULL,
  temple_name TEXT NOT NULL,
  arrival_date DATE,
  departure_date DATE,
  next_destination TEXT,
  daily_schedule JSONB, -- Array of { time: '06:30', event: 'Abhishek & Pujan' }
  notes TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Pravachans & Discourses Table
CREATE TABLE IF NOT EXISTS public.pravachans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  youtube_video_id TEXT,
  audio_url TEXT,
  thumbnail_url TEXT,
  summary_2min TEXT,
  duration_mins INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Jinvaani Library Books Table
CREATE TABLE IF NOT EXISTS public.library_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('vidhan', 'swadhyay', 'bal_sanskar', 'bhajan_mahakavya', 'article_qa', 'general_pdf')),
  author TEXT DEFAULT 'Poojya Acharya Shri 108 Vibhav Sagarji Maharaj',
  pdf_url TEXT NOT NULL,
  audiobook_url TEXT,
  cover_image_url TEXT,
  total_pages INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Gallery & Diksha Mahotsav Table
CREATE TABLE IF NOT EXISTS public.gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('diksha_mahotsav', 'panchkalyanak', 'vihar_yatra', 'general')),
  event_date DATE,
  cover_url TEXT NOT NULL,
  photo_urls TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dainik_niyam_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vihar_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pravachans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;

-- Devotee Public Access Policies (Read-Only)
CREATE POLICY "Public profiles can be created and read" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Niyam logs readable by all" ON public.dainik_niyam_logs FOR SELECT USING (true);
CREATE POLICY "Users can pledge niyam" ON public.dainik_niyam_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Leaderboard readable by all" ON public.leaderboard FOR SELECT USING (true);
CREATE POLICY "Vihar updates readable by all" ON public.vihar_updates FOR SELECT USING (true);
CREATE POLICY "Pravachans readable by all" ON public.pravachans FOR SELECT USING (true);
CREATE POLICY "Library readable by all" ON public.library_items FOR SELECT USING (true);
CREATE POLICY "Gallery readable by all" ON public.gallery_albums FOR SELECT USING (true);

-- Sangh & Admin Write Policies
CREATE POLICY "Sangh and Admin can manage vihar" ON public.vihar_updates 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('sangh', 'admin')));

CREATE POLICY "Sangh and Admin can manage pravachans" ON public.pravachans 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('sangh', 'admin')));

CREATE POLICY "Sangh and Admin can manage library" ON public.library_items 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('sangh', 'admin')));

CREATE POLICY "Sangh and Admin can manage gallery" ON public.gallery_albums 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('sangh', 'admin')));
