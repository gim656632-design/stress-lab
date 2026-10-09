import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ALLOWED_CAUSES = [
  'relationships',
  'academics',
  'work',
  'dating',
  'family',
  'career',
  'finance',
  'health',
  'social_media',
  'myself',
  'other',
];

const ALLOWED_RELIEFS = [
  'alone_time',
  'talk_with_friends',
  'sleep_rest',
  'delicious_food',
  'exercise_walk',
  'music_video',
  'game_hobby',
  'trip_outing',
  'professional_help',
  'other',
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();

    // 1. Honeypot check (봇 방지)
    if (body.website_trap && body.website_trap.length > 0) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const {
      phone,
      consent,
      consent_version,
      mbti,
      causes,
      causes_other,
      reliefs,
      reliefs_other,
      retention_days = 30,
    } = body;

    // 2. 검증 (Validation)
    // 전화번호 형식
    if (!phone || !/^010-\d{4}-\d{4}$/.test(phone)) {
      return new Response(JSON.stringify({ error: 'Invalid phone format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 동의 필수
    if (consent !== true) {
      return new Response(JSON.stringify({ error: 'Consent is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // MBTI 형식
    if (!mbti || !/^[EI][NS][FT][PJ]$/.test(mbti)) {
      return new Response(JSON.stringify({ error: 'Invalid MBTI' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 허용 목록 검증
    if (!Array.isArray(causes) || causes.length === 0 || !causes.every((c) => ALLOWED_CAUSES.includes(c))) {
      return new Response(JSON.stringify({ error: 'Invalid causes' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!Array.isArray(reliefs) || reliefs.length === 0 || !reliefs.every((r) => ALLOWED_RELIEFS.includes(r))) {
      return new Response(JSON.stringify({ error: 'Invalid reliefs' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 기타 텍스트 길이 제한 (100자)
    const sanitizedCausesOther = causes_other ? String(causes_other).slice(0, 100) : null;
    const sanitizedReliefsOther = reliefs_other ? String(reliefs_other).slice(0, 100) : null;

    // Supabase service client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 3. 같은 번호 24시간 내 중복 제출 방지
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from('submissions')
      .select('id')
      .eq('phone', phone)
      .gte('created_at', oneDayAgo)
      .limit(1);

    if (existing && existing.length > 0) {
      return new Response(JSON.stringify({ error: 'Duplicate submission within 24h' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 4. 만료 시각 계산
    const days = Math.max(1, Math.min(365, Number(retention_days) || 30));
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

    // 5. DB insert (service_role 권한)
    const { error: insertError } = await supabase.from('submissions').insert({
      phone,
      consent: true,
      consent_at: new Date().toISOString(),
      consent_version: consent_version || 'v1.0.0',
      mbti,
      causes,
      causes_other: sanitizedCausesOther,
      reliefs,
      reliefs_other: sanitizedReliefsOther,
      expires_at: expiresAt,
    });

    if (insertError) {
      return new Response(JSON.stringify({ error: 'Database insert failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 개인정보나 내부 상세를 돌려주지 않고 성공 응답만 반환
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
