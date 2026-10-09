import {
  Users,
  GraduationCap,
  Briefcase,
  Heart,
  Home,
  Compass,
  Coins,
  Activity,
  Share2,
  Smile,
  MoreHorizontal,
  Moon,
  MessageCircle,
  Coffee,
  Utensils,
  Footprints,
  Headphones,
  Gamepad2,
  MapPin,
  HelpCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface OptionItem {
  id: string;
  title: string;
  icon: LucideIcon;
}

export interface MbtiDimensionItem {
  key: 'ei' | 'ns' | 'ft' | 'pj';
  left: { code: 'E' | 'N' | 'F' | 'P'; label: string };
  right: { code: 'I' | 'S' | 'T' | 'J'; label: string };
}

export const MBTI_DIMENSIONS: MbtiDimensionItem[] = [
  {
    key: 'ei',
    left: { code: 'E', label: '외향' },
    right: { code: 'I', label: '내향' },
  },
  {
    key: 'ns',
    left: { code: 'N', label: '직관' },
    right: { code: 'S', label: '감각' },
  },
  {
    key: 'ft',
    left: { code: 'F', label: '감정' },
    right: { code: 'T', label: '사고' },
  },
  {
    key: 'pj',
    left: { code: 'P', label: '인식' },
    right: { code: 'J', label: '판단' },
  },
];

export const STRESS_CAUSES: OptionItem[] = [
  { id: 'relationships', title: '인간관계', icon: Users },
  { id: 'academics', title: '학업 및 시험', icon: GraduationCap },
  { id: 'work', title: '직장 및 업무', icon: Briefcase },
  { id: 'dating', title: '연애', icon: Heart },
  { id: 'family', title: '가족', icon: Home },
  { id: 'career', title: '진로 및 미래', icon: Compass },
  { id: 'finance', title: '경제적 문제', icon: Coins },
  { id: 'health', title: '건강', icon: Activity },
  { id: 'social_media', title: 'SNS·비교심리', icon: Share2 },
  { id: 'myself', title: '자기 자신', icon: Smile },
  { id: 'other', title: '기타', icon: MoreHorizontal },
];

export const RELIEF_METHODS: OptionItem[] = [
  { id: 'alone_time', title: '혼자만의 시간', icon: Moon },
  { id: 'talk_with_friends', title: '친구와 대화', icon: MessageCircle },
  { id: 'sleep_rest', title: '잠자기 및 휴식', icon: Coffee },
  { id: 'delicious_food', title: '맛있는 음식', icon: Utensils },
  { id: 'exercise_walk', title: '운동 및 산책', icon: Footprints },
  { id: 'music_video', title: '음악 및 영상', icon: Headphones },
  { id: 'game_hobby', title: '게임 및 취미', icon: Gamepad2 },
  { id: 'trip_outing', title: '여행 및 외출', icon: MapPin },
  { id: 'professional_help', title: '전문적인 도움 받기', icon: HelpCircle },
  { id: 'other', title: '기타', icon: MoreHorizontal },
];
