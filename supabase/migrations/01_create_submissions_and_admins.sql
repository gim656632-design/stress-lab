-- ==========================================
-- STRESS LAB: submissions 및 admins 테이블 & RLS
-- ==========================================

-- 1. submissions 테이블 생성
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  phone text not null check (phone ~ '^010-[0-9]{4}-[0-9]{4}$'),
  consent boolean not null check (consent = true),
  consent_at timestamptz not null,
  consent_version text not null,
  mbti text not null check (mbti ~ '^[EI][NS][FT][PJ]$'),
  causes text[] not null,
  causes_other text,
  reliefs text[] not null,
  reliefs_other text,
  expires_at timestamptz not null
);

-- 2. admins 테이블 생성 (인증된 관리자만)
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

-- 3. RLS(Row Level Security) 활성화
alter table public.submissions enable row level security;
alter table public.admins enable row level security;

-- 4. RLS 정책: 관리자만 submissions 조회 및 삭제 가능
drop policy if exists "admin read" on public.submissions;
create policy "admin read" on public.submissions
  for select to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

drop policy if exists "admin delete" on public.submissions;
create policy "admin delete" on public.submissions
  for delete to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- admins 테이블 읽기 정책 (인증된 본인 확인)
drop policy if exists "admin self read" on public.admins;
create policy "admin self read" on public.admins
  for select to authenticated
  using (user_id = auth.uid());

-- 주의: 일반 사용자(anon)에게는 select/insert/update/delete 권한을 부여하지 않음.
-- 저장은 service_role 키를 사용하는 Edge Function을 통해서만 수행됨.

-- 5. pg_cron 만료 데이터 자동 삭제 스케줄러 (pg_cron 활성화 후 사용)
-- select cron.schedule('daily-submission-cleanup', '0 3 * * *', $$delete from public.submissions where expires_at < now()$$);
