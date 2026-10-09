import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { Button } from '../../components/Button';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isSupabaseConfigured || !supabase) {
      if (email === 'admin@stresslab.kr' && password === 'admin1234') {
        sessionStorage.setItem('admin_mock_auth', 'true');
        navigate('/admin/dashboard');
        return;
      }
      setError('로컬 테스트용 관리자 계정은 [ admin@stresslab.kr / admin1234 ] 입니다.');
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !authData.user) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        setLoading(false);
        return;
      }

      // Check admins table
      const { data: adminRecord, error: adminError } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', authData.user.id)
        .single();

      if (adminError || !adminRecord) {
        await supabase.auth.signOut();
        setError('관리자 권한이 등록되지 않은 계정입니다.');
        setLoading(false);
        return;
      }

      navigate('/admin/dashboard');
    } catch {
      setError('로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout showHeader={false} showFooter={false}>
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full py-12 animate-fade-in">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-charcoal mb-8 self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          메인으로 돌아가기
        </button>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-borderLine shadow-card">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-lavender-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-charcoal">
              <Lock className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h1 className="text-xl font-bold text-charcoal">STRESS LAB 관리자</h1>
            <p className="text-xs text-charcoal-muted mt-1">
              승인된 관리자 계정으로 로그인해 주세요.
            </p>
            {!isSupabaseConfigured && (
              <div className="mt-3 p-2 bg-lavender-100/80 rounded-xl text-[11px] text-charcoal border border-lavender/40 leading-relaxed text-left">
                <span className="font-bold text-lavender-700 block mb-0.5">💡 로컬 테스트 모드 (Supabase 미연동)</span>
                ID: <code className="font-mono font-bold">admin@stresslab.kr</code><br />
                PW: <code className="font-mono font-bold">admin1234</code>
              </div>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">
                이메일
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@stresslab.kr"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-cream/50 rounded-xl border border-borderLine focus:border-lavender focus:ring-2 focus:ring-lavender/30 focus:outline-none transition-all"
                />
                <Mail className="w-4 h-4 text-charcoal-light absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-cream/50 rounded-xl border border-borderLine focus:border-lavender focus:ring-2 focus:ring-lavender/30 focus:outline-none transition-all"
                />
                <Lock className="w-4 h-4 text-charcoal-light absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              size="md"
              fullWidth
              disabled={loading}
              className="mt-2"
            >
              {loading ? '인증 확인 중...' : '관리자 로그인'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
