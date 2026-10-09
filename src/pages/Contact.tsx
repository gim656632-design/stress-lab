import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ShieldCheck, Check } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Character } from '../components/Character';
import { useSurvey } from '../store';
import { formatPhoneNumber, isValidPhoneNumber } from '../lib/validators';
import { PRIVACY_CONFIG, isPrivacyConfigReady } from '../config/privacy';
import { submitSurvey } from '../lib/supabase';

export const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { state, setPhone, setConsent, getMbtiString } = useSurvey();
  const [showDetails, setShowDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const isDev = import.meta.env.DEV || import.meta.env.VITE_SHOW_DEV_NOTICE === 'true';
  const isPhoneFilled = state.phone.trim().length > 0;
  const isPhoneValid = isValidPhoneNumber(state.phone);
  const canSubmit = isPhoneValid && state.consent && !isSubmitting;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    if (errorMessage) setErrorMessage('');
  };

  const handleSkip = () => {
    navigate('/survey/done');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid) {
      setErrorMessage('010-0000-0000 형식의 올바른 휴대전화 번호를 입력해 주세요.');
      return;
    }
    if (!state.consent) {
      setErrorMessage('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    if (!isPrivacyConfigReady()) {
      setErrorMessage('운영 정책(보유 기간) 검토 중으로 현재 저장이 비활성화되어 있습니다.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await submitSurvey({
        phone: state.phone,
        consent: state.consent,
        mbti: getMbtiString() || 'INFP',
        causes: state.causes,
        causesOther: state.causesOther,
        reliefs: state.reliefs,
        reliefsOther: state.reliefsOther,
      });

      if (!res.success) {
        setErrorMessage(res.error || '제출 처리 중 오류가 발생했습니다.');
        return;
      }

      navigate('/survey/done');
    } catch {
      setErrorMessage('제출 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col justify-between animate-fade-in">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mt-2 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-charcoal leading-snug">
                조금 더
                <br />
                이야기 나눠볼까요?
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5">
                추가 안내를 원하시면 연락처를 남겨 주세요. (선택 사항)
              </p>
            </div>

            <div className="shrink-0 pt-1">
              <Character pose="contact" size="sm" bubble="소중히 보관해요" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot trap for bots */}
            <input
              type="text"
              name="website_trap"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {/* Phone Input Card */}
            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-borderLine shadow-soft">
              <label
                htmlFor="phone-input"
                className="block text-xs font-bold text-charcoal mb-2"
              >
                휴대전화 번호
              </label>
              <input
                id="phone-input"
                type="tel"
                placeholder="010-0000-0000"
                value={state.phone}
                onChange={handlePhoneChange}
                maxLength={13}
                className="w-full px-4 py-3 text-base bg-cream/60 rounded-xl border border-borderLine focus:border-lavender focus:ring-2 focus:ring-lavender/40 focus:outline-none transition-all placeholder:text-charcoal-light font-medium tracking-wider"
              />

              {/* Exact guidance text mandated by prompt */}
              <p className="text-[11px] text-charcoal-muted mt-2 leading-relaxed">
                입력하신 번호는 안내 발송 목적으로만 사용되며, 그 외의 용도로는 사용하지 않아요.
              </p>

              {isPhoneFilled && !isPhoneValid && (
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  010으로 시작하는 11자리 번호 형식을 확인해 주세요.
                </p>
              )}
            </div>

            {/* Privacy Agreement Section */}
            <div className="p-4 bg-white/90 rounded-2xl border border-borderLine shadow-soft text-xs text-charcoal-muted space-y-3">
              <div className="flex items-start gap-2.5">
                <button
                  type="button"
                  onClick={() => setConsent(!state.consent)}
                  role="checkbox"
                  aria-checked={state.consent}
                  className={`
                    w-5 h-5 rounded-md border shrink-0 mt-0.5 flex items-center justify-center transition-all
                    ${
                      state.consent
                        ? 'bg-lavender border-lavender text-charcoal ring-2 ring-lavender-200'
                        : 'border-borderLine bg-white text-transparent'
                    }
                  `}
                >
                  <Check className={`w-3.5 h-3.5 stroke-[2.5] ${state.consent ? 'block' : 'hidden'}`} />
                </button>
                <div className="flex-1 leading-snug">
                  <span
                    onClick={() => setConsent(!state.consent)}
                    className="cursor-pointer font-medium text-charcoal select-none"
                  >
                    [필수] 개인정보 수집 및 이용에 동의합니다.
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="ml-2 text-lavender-600 hover:text-lavender-700 underline font-medium inline-flex items-center gap-0.5"
                  >
                    자세히 보기
                    {showDetails ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* Detailed Disclosure accordion */}
              {showDetails && (
                <div className="p-3 bg-cream/70 rounded-xl border border-borderLine space-y-2 text-[11px] leading-relaxed animate-fade-in text-charcoal-muted">
                  <div>
                    <span className="font-semibold text-charcoal">· 수집 주체: </span>
                    {PRIVACY_CONFIG.operatorName}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal">· 수집 목적: </span>
                    {PRIVACY_CONFIG.purpose}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal">· 수집 항목: </span>
                    {PRIVACY_CONFIG.itemsCollected.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal">· 보유 및 이용 기간: </span>
                    {PRIVACY_CONFIG.retentionPeriodText}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal">· 동의 거부 권리 및 불이익: </span>
                    동의하지 않아도 결과 확인과 설문 종료가 언제든 가능합니다.
                  </div>
                  <div className="pt-1">
                    <Link
                      to={PRIVACY_CONFIG.privacyPolicyUrl}
                      className="text-lavender-600 underline font-medium"
                    >
                      개인정보 처리방침 전문 보기 →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                {errorMessage}
              </div>
            )}
          </form>
        </div>

        {/* Bottom Actions and Dev Notice */}
        <div className="pt-6 pb-2 space-y-3 mt-auto">
          {/* Dev Notice */}
          {isDev && (
            <div className="flex items-center gap-1.5 justify-center text-[11px] text-amber-700/80 bg-amber-50/80 py-1.5 px-3 rounded-lg border border-amber-200/60 text-center">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>실제 배포 전 운영자의 개인정보 처리방침 검토가 필요합니다.</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={handleSkip}
              className="px-5 text-charcoal-muted"
            >
              건너뛰기
            </Button>

            <Button
              variant="primary"
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex-1 shadow-cta"
            >
              {isSubmitting ? '제출 중...' : '제출하기'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
