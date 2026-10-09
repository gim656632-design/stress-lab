import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Search,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../../components/Button';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { STRESS_CAUSES, RELIEF_METHODS } from '../../data/options';

export interface SubmissionRow {
  id: string;
  created_at: string;
  phone: string;
  consent: boolean;
  consent_at: string;
  consent_version: string;
  mbti: string;
  causes: string[];
  causes_other: string | null;
  reliefs: string[];
  reliefs_other: string | null;
  expires_at: string;
}

const MOCK_SUBMISSIONS: SubmissionRow[] = [
  {
    id: 'sub-1',
    created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    phone: '010-1234-5678',
    consent: true,
    consent_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    consent_version: 'v1.0.0',
    mbti: 'INFP',
    causes: ['relationships', 'myself'],
    causes_other: null,
    reliefs: ['alone_time', 'music_video'],
    reliefs_other: null,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'sub-2',
    created_at: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
    phone: '010-9876-5432',
    consent: true,
    consent_at: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
    consent_version: 'v1.0.0',
    mbti: 'ESTJ',
    causes: ['work', 'finance'],
    causes_other: null,
    reliefs: ['exercise_walk', 'sleep_rest'],
    reliefs_other: null,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'sub-3',
    created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    phone: '010-3333-8888',
    consent: true,
    consent_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    consent_version: 'v1.0.0',
    mbti: 'ENFJ',
    causes: ['health'],
    causes_other: null,
    reliefs: ['professional_help', 'talk_with_friends'],
    reliefs_other: null,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'sub-4',
    created_at: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    phone: '010-2468-1357',
    consent: true,
    consent_at: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    consent_version: 'v1.0.0',
    mbti: 'ENTP',
    causes: ['social_media', 'career'],
    causes_other: null,
    reliefs: ['delicious_food', 'game_hobby'],
    reliefs_other: null,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'sub-5',
    created_at: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    phone: '010-7777-9999',
    consent: true,
    consent_at: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    consent_version: 'v1.0.0',
    mbti: 'ISFP',
    causes: ['other'],
    causes_other: '계절성 무기력감',
    reliefs: ['trip_outing', 'other'],
    reliefs_other: '반려동물과 산책',
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
];

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // 1. 관리자 세션 체크 & 미사용 자동 로그아웃 (15분)
  const handleLogout = useCallback(async () => {
    sessionStorage.removeItem('admin_mock_auth');
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate('/admin');
  }, [navigate]);

  useEffect(() => {
    let timeoutId: number;

    const resetTimer = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        alert('보안을 위해 15분 동안 활동이 없어 자동 로그아웃되었습니다.');
        handleLogout();
      }, 15 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [handleLogout]);

  // 2. 제출 목록 불러오기
  const fetchSubmissions = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      const isMockAuth = sessionStorage.getItem('admin_mock_auth') === 'true';
      if (!isMockAuth) {
        navigate('/admin');
        return;
      }
      setSubmissions(MOCK_SUBMISSIONS);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        navigate('/admin');
        return;
      }

      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42501' || error.message.includes('permission denied')) {
          alert('관리자 권한(admins)이 없어 조회가 차단되었습니다.');
          navigate('/admin');
          return;
        }
      }

      setSubmissions(data || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      if (isMounted) {
        await fetchSubmissions();
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [fetchSubmissions]);

  // 3. 개별 삭제
  const handleDelete = async (id: string) => {
    if (!window.confirm('이 응답 데이터를 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.')) {
      return;
    }

    if (supabase) {
      const { error } = await supabase.from('submissions').delete().eq('id', id);
      if (error) {
        alert('삭제에 실패했습니다: ' + error.message);
        return;
      }
    }

    setSubmissions((prev) => prev.filter((item) => item.id !== id));
  };

  // 4. 전화번호 마스킹 및 토글
  const togglePhoneReveal = (id: string) => {
    setRevealedPhones((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatMaskedPhone = (phone: string, isRevealed: boolean) => {
    if (isRevealed) return phone;
    return phone.replace(/(\d{3})-(\d{4})-(\d{4})/, '$1-****-$3');
  };

  // 5. 검색 및 필터링
  const filteredList = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.phone.includes(searchQuery) ||
        sub.mbti.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate =
        !dateFilter ||
        sub.created_at.slice(0, 10) === dateFilter;

      return matchesSearch && matchesDate;
    });
  }, [submissions, searchQuery, dateFilter]);

  // 6. CSV 내보내기
  const exportCsv = () => {
    if (filteredList.length === 0) {
      alert('내보낼 데이터가 없습니다.');
      return;
    }

    const headers = ['제출시각', '전화번호', 'MBTI', '스트레스 원인', '해소 방법', '동의버전', '보존만료일'];
    const rows = filteredList.map((row) => [
      row.created_at,
      row.phone,
      row.mbti,
      `"${row.causes.join(', ')}"`,
      `"${row.reliefs.join(', ')}"`,
      row.consent_version,
      row.expires_at,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `stress_lab_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 원인 및 해소 라벨 변환 헬퍼
  const getCauseLabel = (id: string) => STRESS_CAUSES.find((c) => c.id === id)?.title || id;
  const getReliefLabel = (id: string) => RELIEF_METHODS.find((r) => r.id === id)?.title || id;

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col font-sans">
      {/* Admin Navbar */}
      <header className="bg-white border-b border-borderLine px-6 py-4 flex items-center justify-between shadow-soft sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-lavender flex items-center justify-center font-bold text-sm">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-charcoal">STRESS LAB 어드민</h1>
              {!isSupabaseConfigured && (
                <span className="px-2 py-0.5 bg-lavender-100 text-[10px] font-semibold rounded-full border border-lavender/40 text-charcoal">
                  로컬 테스트 모드
                </span>
              )}
            </div>
            <p className="text-[11px] text-charcoal-muted">설문 응답 및 연락처 관리</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchSubmissions}
            leftIcon={RefreshCw}
          >
            새로고침
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            leftIcon={LogOut}
          >
            로그아웃
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-borderLine shadow-soft">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="w-4 h-4 text-charcoal-light absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="전화번호 또는 MBTI 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-sm bg-cream/50 rounded-xl border border-borderLine focus:border-lavender focus:ring-2 focus:ring-lavender/30 focus:outline-none"
              />
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-charcoal-light" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 text-sm bg-cream/50 rounded-xl border border-borderLine focus:border-lavender focus:ring-2 focus:ring-lavender/30 focus:outline-none"
              />
              {dateFilter && (
                <button
                  onClick={() => setDateFilter('')}
                  className="text-xs text-charcoal-muted hover:text-charcoal underline"
                >
                  초기화
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-charcoal-muted font-medium">
              총 <span className="font-bold text-charcoal">{filteredList.length}</span>건
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={exportCsv}
              leftIcon={Download}
            >
              CSV 내보내기
            </Button>
          </div>
        </div>

        {/* Content Table or Cards */}
        {loading ? (
          <div className="text-center py-16 text-sm text-charcoal-muted bg-white rounded-2xl border border-borderLine">
            데이터를 불러오는 중입니다...
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16 text-sm text-charcoal-muted bg-white rounded-2xl border border-borderLine">
            등록된 설문 응답이 없습니다.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-borderLine shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-cream/60 border-b border-borderLine text-charcoal-muted font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">제출 시각</th>
                    <th className="py-3 px-4">전화번호</th>
                    <th className="py-3 px-4">MBTI</th>
                    <th className="py-3 px-4">스트레스 원인</th>
                    <th className="py-3 px-4">해소 방법</th>
                    <th className="py-3 px-4 text-center">동의 시각</th>
                    <th className="py-3 px-4 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderLine">
                  {filteredList.map((sub) => {
                    const isRevealed = Boolean(revealedPhones[sub.id]);

                    return (
                      <tr key={sub.id} className="hover:bg-cream/40 transition-colors">
                        <td className="py-3.5 px-4 whitespace-nowrap text-charcoal-muted text-xs">
                          {new Date(sub.created_at).toLocaleString('ko-KR')}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-medium whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{formatMaskedPhone(sub.phone, isRevealed)}</span>
                            <button
                              type="button"
                              onClick={() => togglePhoneReveal(sub.id)}
                              className="text-charcoal-light hover:text-charcoal p-0.5"
                              title={isRevealed ? '번호 숨기기' : '전체 보기'}
                            >
                              {isRevealed ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded bg-lavender-100 font-bold text-xs text-charcoal">
                            {sub.mbti}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {sub.causes.map((c, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-cream border border-borderLine text-[11px]"
                              >
                                {c === 'other' && sub.causes_other
                                  ? `기타: ${sub.causes_other}`
                                  : getCauseLabel(c)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {sub.reliefs.map((r, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-cream border border-borderLine text-[11px]"
                              >
                                {r === 'other' && sub.reliefs_other
                                  ? `기타: ${sub.reliefs_other}`
                                  : getReliefLabel(r)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap text-[11px] text-charcoal-muted">
                          {new Date(sub.consent_at).toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(sub.id)}
                            className="p-1.5 text-charcoal-light hover:text-rose-600 rounded-lg transition-colors"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.75]" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
