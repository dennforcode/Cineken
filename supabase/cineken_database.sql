-- ============================================================
-- CINEKEN — FULL APPLICATION DATABASE
-- Run this against a Supabase (PostgreSQL) instance.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 0. EXTENSIONS
-- ────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ════════════════════════════════════════════════════════════
-- 1. TABLES
-- ════════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────────────────
-- 1.1  profiles  (extends Supabase auth.users)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  TEXT,
  email         TEXT,
  avatar_url    TEXT,
  role          TEXT NOT NULL DEFAULT 'user'
                CHECK (role IN ('user', 'admin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE  public.profiles IS 'Public user profiles extending Supabase Auth';
COMMENT ON COLUMN public.profiles.role IS 'Authorization role: user or admin';


-- ────────────────────────────────────────────────────────────
-- 1.2  chains
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.chains (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL UNIQUE,
  logo_url   TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.chains IS 'Cinema chain brands (PVR INOX, Miraj, etc.)';


-- ────────────────────────────────────────────────────────────
-- 1.3  cinemas
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.cinemas (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chain_id   UUID NOT NULL REFERENCES public.chains(id) ON DELETE CASCADE,
  venue      TEXT NOT NULL,
  city       TEXT,
  address    TEXT,
  latitude   DOUBLE PRECISION,
  longitude  DOUBLE PRECISION,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.cinemas IS 'Physical cinema venues belonging to a chain';


-- ────────────────────────────────────────────────────────────
-- 1.4  screens
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.screens (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT NOT NULL UNIQUE,
  cinema_id         UUID NOT NULL REFERENCES public.cinemas(id) ON DELETE CASCADE,
  auditorium        TEXT NOT NULL,
  screen_size       TEXT,
  aspect_ratio      TEXT,
  projection        TEXT,
  projection_desc   TEXT,
  audio             TEXT,
  audio_desc        TEXT,
  seating_capacity  TEXT,
  screen_type       TEXT,
  is_curved         BOOLEAN NOT NULL DEFAULT FALSE,
  photo_url         TEXT,
  color_theme       TEXT NOT NULL DEFAULT 'red'
                    CHECK (color_theme IN ('blue', 'red', 'purple')),
  certification     TEXT,
  editorial_ratings JSONB NOT NULL DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE  public.screens IS 'Individual auditoriums / halls within a cinema';
COMMENT ON COLUMN public.screens.slug IS 'URL-friendly identifier used in routes';
COMMENT ON COLUMN public.screens.editorial_ratings IS '{"visual","audio","thirdLabel","thirdScore","overall"}';


-- ────────────────────────────────────────────────────────────
-- 1.5  screen_badges
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.screen_badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  screen_id   UUID NOT NULL REFERENCES public.screens(id) ON DELETE CASCADE,
  badge       TEXT NOT NULL,
  UNIQUE(screen_id, badge)
);

COMMENT ON TABLE public.screen_badges IS 'Format badges: imax, dolby-atmos, screenx, premium';


-- ────────────────────────────────────────────────────────────
-- 1.6  sections
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.sections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  screen_id   UUID NOT NULL REFERENCES public.screens(id) ON DELETE CASCADE,
  sort_order  INT NOT NULL DEFAULT 0,
  title       TEXT,
  left_title  TEXT,
  right_title TEXT
);

COMMENT ON TABLE public.sections IS 'Seat layout sections (e.g. PREMIUM ROWS, STANDARD ROWS)';


-- ────────────────────────────────────────────────────────────
-- 1.7  seat_rows
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.seat_rows (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id  UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
  sort_order  INT NOT NULL DEFAULT 0,
  row_label   TEXT NOT NULL
);

COMMENT ON TABLE public.seat_rows IS 'Individual rows within a section (Row A, Row B, etc.)';


-- ────────────────────────────────────────────────────────────
-- 1.8  seats
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.seats (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  row_id      UUID NOT NULL REFERENCES public.seat_rows(id) ON DELETE CASCADE,
  seat_label  TEXT NOT NULL,
  col_start   INT NOT NULL,
  seat_number INT NOT NULL
);

COMMENT ON TABLE  public.seats IS 'Individual seats with grid positioning';
COMMENT ON COLUMN public.seats.col_start IS 'CSS grid column start position for rendering';
COMMENT ON COLUMN public.seats.seat_number IS 'Logical seat number within the row';


-- ────────────────────────────────────────────────────────────
-- 1.9  reviews
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.reviews (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  screen_id       UUID NOT NULL REFERENCES public.screens(id) ON DELETE CASCADE,
  rating          INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  rating_visual   NUMERIC(3,1) CHECK (rating_visual BETWEEN 1.0 AND 10.0),
  rating_audio    NUMERIC(3,1) CHECK (rating_audio  BETWEEN 1.0 AND 10.0),
  rating_comfort  NUMERIC(3,1) CHECK (rating_comfort BETWEEN 1.0 AND 10.0),
  review_text     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, screen_id)
);

COMMENT ON TABLE public.reviews IS 'User-submitted reviews for screens (one per user per screen)';


-- ════════════════════════════════════════════════════════════
-- 2. INDEXES
-- ════════════════════════════════════════════════════════════

CREATE INDEX idx_cinemas_chain       ON public.cinemas(chain_id);
CREATE INDEX idx_screens_slug        ON public.screens(slug);
CREATE INDEX idx_screens_cinema      ON public.screens(cinema_id);
CREATE INDEX idx_screen_badges_scr   ON public.screen_badges(screen_id);
CREATE INDEX idx_sections_screen     ON public.sections(screen_id, sort_order);
CREATE INDEX idx_seat_rows_section   ON public.seat_rows(section_id, sort_order);
CREATE INDEX idx_seats_row           ON public.seats(row_id);
CREATE INDEX idx_reviews_screen      ON public.reviews(screen_id, created_at DESC);
CREATE INDEX idx_reviews_user        ON public.reviews(user_id);


-- ════════════════════════════════════════════════════════════
-- 3. ROW-LEVEL SECURITY (RLS)
-- ════════════════════════════════════════════════════════════

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;


-- ── profiles ────────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_all"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_delete_own"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id);


-- ── chains ──────────────────────────────────────────────────
ALTER TABLE public.chains ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chains_select_all"
  ON public.chains FOR SELECT
  USING (true);

CREATE POLICY "chains_insert_admin"
  ON public.chains FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "chains_update_admin"
  ON public.chains FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "chains_delete_admin"
  ON public.chains FOR DELETE
  USING (public.is_admin());


-- ── cinemas ─────────────────────────────────────────────────
ALTER TABLE public.cinemas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cinemas_select_all"
  ON public.cinemas FOR SELECT
  USING (true);

CREATE POLICY "cinemas_insert_admin"
  ON public.cinemas FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "cinemas_update_admin"
  ON public.cinemas FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "cinemas_delete_admin"
  ON public.cinemas FOR DELETE
  USING (public.is_admin());


-- ── screens ─────────────────────────────────────────────────
ALTER TABLE public.screens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "screens_select_all"
  ON public.screens FOR SELECT
  USING (true);

CREATE POLICY "screens_insert_admin"
  ON public.screens FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "screens_update_admin"
  ON public.screens FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "screens_delete_admin"
  ON public.screens FOR DELETE
  USING (public.is_admin());


-- ── screen_badges ───────────────────────────────────────────
ALTER TABLE public.screen_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "screen_badges_select_all"
  ON public.screen_badges FOR SELECT
  USING (true);

CREATE POLICY "screen_badges_insert_admin"
  ON public.screen_badges FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "screen_badges_update_admin"
  ON public.screen_badges FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "screen_badges_delete_admin"
  ON public.screen_badges FOR DELETE
  USING (public.is_admin());


-- ── sections ────────────────────────────────────────────────
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sections_select_all"
  ON public.sections FOR SELECT
  USING (true);

CREATE POLICY "sections_insert_admin"
  ON public.sections FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "sections_update_admin"
  ON public.sections FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "sections_delete_admin"
  ON public.sections FOR DELETE
  USING (public.is_admin());


-- ── seat_rows ───────────────────────────────────────────────
ALTER TABLE public.seat_rows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "seat_rows_select_all"
  ON public.seat_rows FOR SELECT
  USING (true);

CREATE POLICY "seat_rows_insert_admin"
  ON public.seat_rows FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "seat_rows_update_admin"
  ON public.seat_rows FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "seat_rows_delete_admin"
  ON public.seat_rows FOR DELETE
  USING (public.is_admin());


-- ── seats ───────────────────────────────────────────────────
ALTER TABLE public.seats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "seats_select_all"
  ON public.seats FOR SELECT
  USING (true);

CREATE POLICY "seats_insert_admin"
  ON public.seats FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "seats_update_admin"
  ON public.seats FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "seats_delete_admin"
  ON public.seats FOR DELETE
  USING (public.is_admin());


-- ── reviews ─────────────────────────────────────────────────
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews_select_all"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "reviews_insert_auth"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reviews_update_own"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reviews_delete_own"
  ON public.reviews FOR DELETE
  USING (auth.uid() = user_id);


-- ════════════════════════════════════════════════════════════
-- 4. TRIGGER FUNCTIONS
-- ════════════════════════════════════════════════════════════

-- Auto-create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- Auto-update updated_at on reviews
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_review_updated
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();


-- ════════════════════════════════════════════════════════════
-- 5. HELPER FUNCTION — GENERATE SEATS
--    Mirrors the TypeScript generateRow() logic exactly.
-- ════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.generate_seats(
  p_row_id    UUID,
  p_start_col INT,
  p_start_num INT,
  p_count     INT,
  p_step      INT DEFAULT 1
) RETURNS VOID AS $$
DECLARE
  i   INT;
  num INT;
BEGIN
  FOR i IN 0..(p_count - 1) LOOP
    num := p_start_num + (i * p_step);
    INSERT INTO public.seats (row_id, seat_label, col_start, seat_number)
    VALUES (p_row_id, LPAD(ABS(num)::TEXT, 2, '0'), p_start_col + i, num);
  END LOOP;
END;
$$ LANGUAGE plpgsql;


-- ════════════════════════════════════════════════════════════
-- 6. SEED DATA
--    All existing screens + complete seat layouts
-- ════════════════════════════════════════════════════════════

DO $$
DECLARE
  -- Chain IDs
  v_chain_govt     UUID;
  v_chain_prasads  UUID;
  v_chain_pvr      UUID;
  v_chain_miraj    UUID;

  -- Cinema IDs
  v_cinema_sc      UUID;
  v_cinema_ntr     UUID;
  v_cinema_inorbit UUID;
  v_cinema_wadala  UUID;
  v_cinema_eva     UUID;

  -- Screen IDs
  v_scr_sc         UUID;
  v_scr_prasads    UUID;
  v_scr_screenx    UUID;
  v_scr_wadala     UUID;
  v_scr_eva1       UUID;
  v_scr_eva3       UUID;

  -- Reusable IDs
  v_section        UUID;
  v_row            UUID;

BEGIN

  -- ──────────────────────────────────────────────────────────
  -- CHAINS
  -- ──────────────────────────────────────────────────────────
  INSERT INTO public.chains (name) VALUES ('Government of Gujarat') RETURNING id INTO v_chain_govt;
  INSERT INTO public.chains (name) VALUES ('Prasads Multiplex')     RETURNING id INTO v_chain_prasads;
  INSERT INTO public.chains (name) VALUES ('PVR INOX')              RETURNING id INTO v_chain_pvr;
  INSERT INTO public.chains (name) VALUES ('Miraj Cinemas')         RETURNING id INTO v_chain_miraj;


  -- ──────────────────────────────────────────────────────────
  -- CINEMAS
  -- ──────────────────────────────────────────────────────────
  INSERT INTO public.cinemas (chain_id, venue, city) VALUES (v_chain_govt,    'Science City',                'Ahmedabad') RETURNING id INTO v_cinema_sc;
  INSERT INTO public.cinemas (chain_id, venue, city) VALUES (v_chain_prasads, 'NTR Gardens',                 'Hyderabad') RETURNING id INTO v_cinema_ntr;
  INSERT INTO public.cinemas (chain_id, venue, city) VALUES (v_chain_pvr,     'Inorbit Mall, Malad, Mumbai', 'Mumbai')    RETURNING id INTO v_cinema_inorbit;
  INSERT INTO public.cinemas (chain_id, venue, city) VALUES (v_chain_miraj,   'Wadala',                      'Mumbai')    RETURNING id INTO v_cinema_wadala;
  INSERT INTO public.cinemas (chain_id, venue, city) VALUES (v_chain_pvr,     'EVA Mall, Vadodara',          'Vadodara')  RETURNING id INTO v_cinema_eva;


  -- ──────────────────────────────────────────────────────────
  -- SCREENS
  -- ──────────────────────────────────────────────────────────

  -- Science City IMAX GT
  INSERT INTO public.screens (slug, cinema_id, auditorium, screen_size, aspect_ratio, projection, projection_desc, audio, audio_desc, seating_capacity, screen_type, is_curved, photo_url, color_theme, certification, editorial_ratings)
  VALUES ('science-city', v_cinema_sc, 'IMAX GT', '96 x 67 ft', '1.43:1', 'IMAX 15/70 Film',
    '(IMAX GT) The gold standard of analog projection.',
    'IMAX 6 Track', 'Proprietary sub-bass and precision-aligned point-source speakers.',
    '651', 'Purpose-built IMAX', TRUE, '/cinemas/imax_GT.png', 'blue', 'REFERENCE SCREEN',
    '{"visual":"10.0","audio":"9.8","thirdLabel":"IMMERSION","thirdScore":"10.0","overall":"9.9"}'::jsonb
  ) RETURNING id INTO v_scr_sc;

  -- Prasads PCX
  INSERT INTO public.screens (slug, cinema_id, auditorium, screen_size, aspect_ratio, projection, projection_desc, audio, audio_desc, seating_capacity, screen_type, is_curved, photo_url, color_theme, certification, editorial_ratings)
  VALUES ('prasads', v_cinema_ntr, 'PCX', '98.6 x 46 ft', '1.85:1', 'Dual Barco DP4K-60L',
    'RGB Laser delivering 60,000 lumens of absolute brilliance.',
    'Dolby Atmos', 'Floor-to-ceiling spatial audio array with zero-decibel noise floor isolation.',
    'Approx. 630', 'Premium Large Format', FALSE, '/cinemas/prasad_pcx.png', 'red', 'REFERENCE PREMIUM',
    '{"visual":"10.0","audio":"9.8","thirdLabel":"COMFORT","thirdScore":"9.4","overall":"9.8"}'::jsonb
  ) RETURNING id INTO v_scr_prasads;

  -- PVR INOX Megaplex ScreenX
  INSERT INTO public.screens (slug, cinema_id, auditorium, screen_size, aspect_ratio, projection, projection_desc, audio, audio_desc, seating_capacity, screen_type, is_curved, photo_url, color_theme, certification, editorial_ratings)
  VALUES ('pvr-inox-megaplex-screenx', v_cinema_inorbit, 'ScreenX', 'Approx. 62 x 32 ft', '2.39:1 (270 ScreenX)',
    'Triple Barco 4K Digital',
    'Three synchronized 4K projectors expand supported films across the front and side walls for a 270 immersive experience.',
    'Dolby Atmos', 'Object-based immersive surround sound with ceiling-mounted speakers engineered for large-format presentations.',
    'Approx. 300', 'ScreenX Premium Large Format', FALSE, '/cinemas/screenx_malad.png', 'purple', 'SCREENX EXPERIENCE',
    '{"visual":"9.6","audio":"9.5","thirdLabel":"IMMERSION","thirdScore":"10.0","overall":"9.6"}'::jsonb
  ) RETURNING id INTO v_scr_screenx;

  -- Miraj Wadala IMAX
  INSERT INTO public.screens (slug, cinema_id, auditorium, screen_size, aspect_ratio, projection, projection_desc, audio, audio_desc, seating_capacity, screen_type, is_curved, photo_url, color_theme, certification, editorial_ratings)
  VALUES ('wadala', v_cinema_wadala, 'IMAX', '72 x 41 ft', '1.90:1', 'IMAX XT Laser 4K',
    'Next-generation laser projection for incredibly sharp, bright images.',
    'IMAX Sound', 'Next-generation 12-channel immersive sound system.',
    'N/A', 'Commercial IMAX', FALSE, '/cinemas/imax_wadala.png', 'blue', 'ELITE',
    '{"visual":"9.8","audio":"9.6","thirdLabel":"COMFORT","thirdScore":"9.5","overall":"9.7"}'::jsonb
  ) RETURNING id INTO v_scr_wadala;

  -- PVR EVA Audi 1 (layout only)
  INSERT INTO public.screens (slug, cinema_id, auditorium, screen_type, is_curved, color_theme, editorial_ratings)
  VALUES ('pvr-eva-audi-1', v_cinema_eva, 'Audi 1', 'Premium Auditorium', FALSE, 'red', '{}'::jsonb)
  RETURNING id INTO v_scr_eva1;

  -- PVR EVA Audi 3
  INSERT INTO public.screens (slug, cinema_id, auditorium, screen_size, aspect_ratio, projection, projection_desc, audio, audio_desc, seating_capacity, screen_type, is_curved, photo_url, color_theme, certification, editorial_ratings)
  VALUES ('pvr-eva-audi-3', v_cinema_eva, 'Audi 3', 'Unknown', '2.39:1 (Estimated Scope Screen)',
    'Digital 2K Xenon', 'Standard digital cinema projection. No public evidence of laser projection in Audi 3.',
    'Dolby Atmos', 'Object-based immersive surround sound with overhead speakers.',
    '230', 'Premium Auditorium', FALSE, '/cinemas/PVR_EVA.png', 'purple', 'DOLBY ATMOS',
    '{"visual":"8.9","audio":"9.4","thirdLabel":"COMFORT","thirdScore":"9.1","overall":"9.2"}'::jsonb
  ) RETURNING id INTO v_scr_eva3;


  -- ──────────────────────────────────────────────────────────
  -- SCREEN BADGES
  -- ──────────────────────────────────────────────────────────
  INSERT INTO public.screen_badges (screen_id, badge) VALUES (v_scr_sc,      'imax');
  INSERT INTO public.screen_badges (screen_id, badge) VALUES (v_scr_prasads, 'premium');
  INSERT INTO public.screen_badges (screen_id, badge) VALUES (v_scr_prasads, 'dolby-atmos');
  INSERT INTO public.screen_badges (screen_id, badge) VALUES (v_scr_screenx, 'screenx');
  INSERT INTO public.screen_badges (screen_id, badge) VALUES (v_scr_screenx, 'dolby-atmos');
  INSERT INTO public.screen_badges (screen_id, badge) VALUES (v_scr_wadala,  'imax');
  INSERT INTO public.screen_badges (screen_id, badge) VALUES (v_scr_eva3,   'dolby-atmos');


  -- ════════════════════════════════════════════════════════════
  -- SEAT LAYOUTS
  -- ════════════════════════════════════════════════════════════


  -- ──────────────────────────────────────────────────────────
  -- SCIENCE CITY
  -- ──────────────────────────────────────────────────────────

  -- Section: PREMIUM ROWS
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_sc, 0, 'PREMIUM ROWS') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'J') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 40);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'I') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 40);

  -- Section: STANDARD ROWS
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_sc, 1, 'STANDARD ROWS') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'H') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 40);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'G') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 40);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'F') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 40);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 3, 'E') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 40);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 4, 'D') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 40);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 5, 'C') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 40);

  -- Section: FRONT ROWS
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_sc, 2, 'FRONT ROWS') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'B') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 2,  1,  5);
  PERFORM public.generate_seats(v_row, 10, 6,  22);
  PERFORM public.generate_seats(v_row, 35, 28, 5);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'A') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 4,  1,  4);
  PERFORM public.generate_seats(v_row, 12, 5,  18);
  PERFORM public.generate_seats(v_row, 34, 23, 4);


  -- ──────────────────────────────────────────────────────────
  -- PRASADS
  -- ──────────────────────────────────────────────────────────

  -- Section: GOLD + 3D Glass
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_prasads, 0, 'GOLD + 3D Glass') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'N') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 47, 47, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'M') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 47, 47, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'L') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 47, 47, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 3, 'K') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 47, 47, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 4, 'J') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 47, 47, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 5, 'I') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 47, 47, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 6, 'H') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 47, 47, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 7, 'G') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 47, 47, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 8, 'F') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 47, 47, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 9, 'E') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 47, 47, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 10, 'D') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 2, 45, 45, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 11, 'C') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 4, 41, 41, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 12, 'B') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 5, 39, 39, -1);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 13, 'A') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 8, 34, 34, -1);


  -- ──────────────────────────────────────────────────────────
  -- WADALA
  -- ──────────────────────────────────────────────────────────

  -- Section: SOFA
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_wadala, 0, 'SOFA') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'A') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 12, 1, 2);
  PERFORM public.generate_seats(v_row, 32, 3, 2);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'B') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 12, 1, 22);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'C') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 13, 1, 21);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 3, 'D') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 14, 1, 20);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 4, 'E') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 8, 1, 32);

  -- Section: EXECUTIVE
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_wadala, 1, 'EXECUTIVE') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'F') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 6,  1,  18);
  PERFORM public.generate_seats(v_row, 27, 19, 18);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'G') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 5,  1,  19);
  PERFORM public.generate_seats(v_row, 27, 20, 19);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'H') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 1, 46);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 3, 'I') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 43);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 4, 'J') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 40);

  -- Section: RECLINER IMAX
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_wadala, 2, 'RECLINER IMAX') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'K') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 14, 1, 20);

  -- Section: LOUNGER
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_wadala, 3, 'LOUNGER') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'L') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 14, 1, 20);


  -- ──────────────────────────────────────────────────────────
  -- PVR EVA AUDI 1
  -- ──────────────────────────────────────────────────────────

  -- Section: RECLINER ROWS
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_eva1, 0, 'RECLINER ROWS') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'M') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  1);
  PERFORM public.generate_seats(v_row, 3,  3,  2);
  PERFORM public.generate_seats(v_row, 6,  6,  1);
  PERFORM public.generate_seats(v_row, 11, 11, 4);

  -- Section: PRIME PLUS ROWS
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_eva1, 1, 'PRIME PLUS ROWS') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'L') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 5,  5,  2);
  PERFORM public.generate_seats(v_row, 13, 13, 1);
  PERFORM public.generate_seats(v_row, 15, 14, 5);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'K') RETURNING id INTO v_row;
  -- Row K is empty (no seats)

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'J') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 3, 'H') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  2);
  PERFORM public.generate_seats(v_row, 6,  6,  5);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 4, 'G') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  12);
  PERFORM public.generate_seats(v_row, 14, 14, 9);

  -- Section: PRIME ROWS
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_eva1, 2, 'PRIME ROWS') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'F') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  7);
  PERFORM public.generate_seats(v_row, 12, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'E') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  12);
  PERFORM public.generate_seats(v_row, 17, 19, 14);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'D') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  -- Section: CLASSIC ROWS
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_eva1, 3, 'CLASSIC ROWS') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'C') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'B') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'A') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  16);
  PERFORM public.generate_seats(v_row, 19, 18, 4);


  -- ──────────────────────────────────────────────────────────
  -- PVR EVA AUDI 3
  -- ──────────────────────────────────────────────────────────

  -- Section: Recliner Rows
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_eva3, 0, 'Recliner Rows') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'M') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 5, 1, 14);

  -- Section: Prime Plus Rows
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_eva3, 1, 'Prime Plus Rows') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'L') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'K') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'J') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 3, 'H') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 4, 'G') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  -- Section: Prime Rows
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_eva3, 2, 'Prime Rows') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'F') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'E') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'D') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  -- Section: Classic Rows
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_eva3, 3, 'Classic Rows') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'C') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'B') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'A') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  11);
  PERFORM public.generate_seats(v_row, 13, 12, 10);


  -- ──────────────────────────────────────────────────────────
  -- PVR INOX MEGAPLEX SCREENX
  -- ──────────────────────────────────────────────────────────

  -- Section: Prime Plus Rows
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_screenx, 0, 'Prime Plus Rows') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'A') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 1, 25);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'B') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  4);
  PERFORM public.generate_seats(v_row, 7,  7,  14);
  PERFORM public.generate_seats(v_row, 23, 23, 3);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'C') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  4);
  PERFORM public.generate_seats(v_row, 7,  7,  14);
  PERFORM public.generate_seats(v_row, 23, 23, 3);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 3, 'D') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1,  1,  4);
  PERFORM public.generate_seats(v_row, 7,  7,  14);
  PERFORM public.generate_seats(v_row, 23, 23, 3);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 4, 'E') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 1, 4);
  PERFORM public.generate_seats(v_row, 7, 7, 14);

  -- Section: Prime Rows
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_screenx, 1, 'Prime Rows') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'F') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 1, 4);
  PERFORM public.generate_seats(v_row, 7, 7, 14);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'G') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 1, 4);
  PERFORM public.generate_seats(v_row, 7, 7, 14);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'H') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 1, 4);
  PERFORM public.generate_seats(v_row, 7, 7, 14);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 3, 'I') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 1, 4);
  PERFORM public.generate_seats(v_row, 7, 7, 14);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 4, 'J') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 1, 4);
  PERFORM public.generate_seats(v_row, 7, 7, 14);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 5, 'K') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 1, 1, 4);
  PERFORM public.generate_seats(v_row, 7, 7, 14);

  -- Section: Classic Rows
  INSERT INTO public.sections (screen_id, sort_order, title) VALUES (v_scr_screenx, 2, 'Classic Rows') RETURNING id INTO v_section;

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 0, 'L') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 22);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 1, 'M') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 22);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 2, 'N') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 22);

  INSERT INTO public.seat_rows (section_id, sort_order, row_label) VALUES (v_section, 3, 'O') RETURNING id INTO v_row;
  PERFORM public.generate_seats(v_row, 3, 1, 22);


  RAISE NOTICE 'Seed complete: 4 chains, 5 cinemas, 6 screens, all seat layouts inserted.';

END $$;


-- ════════════════════════════════════════════════════════════
-- 7. VIEWS
-- ════════════════════════════════════════════════════════════

-- Screen directory view (replaces screens.json reads)
CREATE OR REPLACE VIEW public.v_screen_directory AS
SELECT
  s.id,
  s.slug,
  s.auditorium,
  s.screen_size,
  s.aspect_ratio,
  s.projection,
  s.projection_desc,
  s.audio,
  s.audio_desc,
  s.seating_capacity,
  s.screen_type,
  s.is_curved,
  s.photo_url,
  s.color_theme,
  s.certification,
  s.editorial_ratings,
  c.venue,
  ch.name AS chain,
  c.city,
  COALESCE(
    (SELECT json_agg(sb.badge) FROM public.screen_badges sb WHERE sb.screen_id = s.id),
    '[]'::json
  ) AS badges,
  COALESCE(
    (SELECT ROUND(AVG(r.rating), 1) FROM public.reviews r WHERE r.screen_id = s.id),
    0
  ) AS avg_user_rating,
  (SELECT COUNT(*) FROM public.reviews r WHERE r.screen_id = s.id) AS review_count
FROM public.screens s
JOIN public.cinemas c  ON s.cinema_id = c.id
JOIN public.chains  ch ON c.chain_id  = ch.id
ORDER BY (s.editorial_ratings ->> 'overall')::NUMERIC DESC NULLS LAST;


-- Screen layout view (replaces layouts.ts reads)
CREATE OR REPLACE VIEW public.v_screen_layout AS
SELECT
  scr.slug   AS screen_slug,
  sec.id     AS section_id,
  sec.sort_order AS section_order,
  sec.title  AS section_title,
  sec.left_title,
  sec.right_title,
  sr.id      AS row_id,
  sr.sort_order AS row_order,
  sr.row_label,
  st.id      AS seat_id,
  st.seat_label,
  st.col_start,
  st.seat_number
FROM public.screens    scr
JOIN public.sections   sec ON sec.screen_id  = scr.id
JOIN public.seat_rows  sr  ON sr.section_id  = sec.id
LEFT JOIN public.seats st  ON st.row_id      = sr.id
ORDER BY scr.slug, sec.sort_order, sr.sort_order, st.col_start;


-- ════════════════════════════════════════════════════════════
-- DONE.
-- ════════════════════════════════════════════════════════════
