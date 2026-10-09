import { createClient } from '@supabase/supabase-js';
import { PRIVACY_CONFIG } from '../config/privacy';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SubmitSurveyPayload {
  phone: string;
  consent: boolean;
  mbti: string;
  causes: string[];
  causesOther?: string;
  reliefs: string[];
  reliefsOther?: string;
}

export async function submitSurvey(payload: SubmitSurveyPayload): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    // Supabase 설정 전 로컬 모드에서는 콘솔에 민감정보를 남기지 않고 성공 시뮬레이션
    return { success: true };
  }

  try {
    const functionUrl = `${supabaseUrl}/functions/v1/submit-survey`;
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
      },
      body: JSON.stringify({
        phone: payload.phone,
        consent: payload.consent,
        consent_version: PRIVACY_CONFIG.consentVersion,
        mbti: payload.mbti,
        causes: payload.causes,
        causes_other: payload.causesOther || null,
        reliefs: payload.reliefs,
        reliefs_other: payload.reliefsOther || null,
        retention_days: PRIVACY_CONFIG.retentionDays || 30,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      return { success: false, error: result.error || '제출에 실패했습니다.' };
    }

    return { success: true };
  } catch {
    return { success: false, error: '네트워크 연결 상태를 확인해 주세요.' };
  }
}
