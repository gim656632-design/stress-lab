export type MbtiType =
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ'
  | 'UNKNOWN';

export interface SurveyState {
  mbti?: MbtiType;
  causes: string[];
  reliefs: string[];
  lastUpdated: number; // timestamp for 24h expiration
}

export interface CauseItem {
  id: string;
  emoji: string;
  title: string;
  example: string;
}

export interface ReliefItem {
  id: string;
  emoji: string;
  title: string;
  example: string;
  isExclusive?: boolean; // e.g. "특별한 방법이 없어요"
}

export interface ObservationPoint {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface StressTip {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ContactSubmission {
  phone: string;
  agreedRequired: boolean;
  agreedMarketing: boolean;
  isOver14: boolean;
  submittedAt: number;
}
