import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { PRIVACY_CONFIG } from '../config/privacy';

export const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex-1 flex flex-col space-y-6 animate-fade-in py-2">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            leftIcon={ArrowLeft}
            className="p-2"
          >
            뒤로
          </Button>
          <h1 className="text-xl font-bold text-charcoal">개인정보 처리방침</h1>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-borderLine shadow-soft space-y-5 text-xs text-charcoal-muted leading-relaxed">
          <section>
            <h2 className="text-sm font-bold text-charcoal mb-1.5">1. 수집하는 개인정보 항목</h2>
            <p>
              STRESS LAB은 설문 결과 안내 및 맞춤 리포트 발송을 위해 다음 항목을 수집합니다.
            </p>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-charcoal">
              {PRIVACY_CONFIG.itemsCollected.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold text-charcoal mb-1.5">2. 개인정보의 수집 및 이용 목적</h2>
            <p>{PRIVACY_CONFIG.purpose}</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-charcoal mb-1.5">3. 개인정보의 보유 및 이용 기간</h2>
            <p>
              수집된 정보는 {PRIVACY_CONFIG.retentionPeriodText} 동안 보관되며, 기한 만료 시 지체 없이 파기됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-charcoal mb-1.5">4. 동의 거부 권리 및 불이익 안내</h2>
            <p>
              이용자는 개인정보 수집 및 이용에 동의하지 않을 권리가 있으며, 동의를 거부하더라도 설문 참여 및 결과 확인에 아무런 불이익이 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-charcoal mb-1.5">5. 수집 주체 및 문의</h2>
            <p>운영 주체: {PRIVACY_CONFIG.operatorName}</p>
            <p className="text-[11px] text-charcoal-light mt-1">버전: {PRIVACY_CONFIG.consentVersion}</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};
