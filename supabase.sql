-- ============================================================
-- GUOKE · Skema Supabase (jalankan sekali di SQL Editor)
-- Dashboard → SQL Editor → New query → paste seluruh file → Run
-- Aman dijalankan ulang (idempotent, pakai IF NOT EXISTS).
-- ============================================================

-- 1) Komentar bersama per judul + episode --------------------
create table if not exists public.comments (
  id         bigint generated always as identity primary key,
  title      text not null,
  ep         text not null default '',
  name       text not null default 'Anonim',
  text       text not null check (char_length(text) between 1 and 500),
  created_at timestamptz not null default now()
);
create index if not exists comments_title_ep_idx
  on public.comments (title, ep, created_at desc);

-- 2) Bookmark sinkron antar perangkat ------------------------
-- device_id = id HP (tamu) atau "u_<user.id>" (sudah login)
create table if not exists public.bookmarks (
  device_id  text not null,
  title      text not null,
  created_at timestamptz not null default now(),
  primary key (device_id, title)
);

-- 3) Keamanan (RLS): aplikasi belum pakai login Supabase
--    untuk tulis, jadi akses dibuka untuk publik.
--    (Kalau nanti mau ketat, ganti ke to authenticated + auth.uid().)
alter table public.comments  enable row level security;
alter table public.bookmarks enable row level security;

drop policy if exists "comments readable by anyone"   on public.comments;
drop policy if exists "comments insertable by anyone" on public.comments;
drop policy if exists "bookmarks readable by anyone"  on public.bookmarks;
drop policy if exists "bookmarks writable by anyone"  on public.bookmarks;
drop policy if exists "bookmarks deletable by anyone" on public.bookmarks;

create policy "comments readable by anyone"
  on public.comments for select using (true);
create policy "comments insertable by anyone"
  on public.comments for insert with check (true);
create policy "bookmarks readable by anyone"
  on public.bookmarks for select using (true);
create policy "bookmarks writable by anyone"
  on public.bookmarks for insert with check (true);
create policy "bookmarks deletable by anyone"
  on public.bookmarks for delete using (true);

-- 4) Verifikasi (jalankan setelah Run, harus sukses) ----------
-- select * from public.comments  limit 1;
-- select * from public.bookmarks limit 1;

-- 5) Paksa PostgREST memuat ulang skema (agar API langsung
--    mengenali tabel baru tanpa menunggu cache) ---------------
notify pgrst, 'reload schema';
