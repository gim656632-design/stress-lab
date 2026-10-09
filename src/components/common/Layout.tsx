import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen w-full bg-[#FAFCFF] relative overflow-x-hidden flex justify-center">
      {/* Background Floating Orbs for Desktop / Tablet */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden sm:block">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-100/70 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-lilac-100/70 blur-3xl animate-float-reverse" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-sky-100/50 blur-3xl animate-float-slow" />
      </div>

      {/* Center 480px Mobile Column Container */}
      <main className="w-full max-w-[480px] min-h-screen bg-white shadow-soft relative z-10 flex flex-col border-x border-line/60">
        {showHeader && (
          <header className="px-5 py-3.5 flex items-center justify-between border-b border-line/40 bg-white/90 backdrop-blur-md sticky top-0 z-30">
            <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
              <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-300 to-lilac-300 flex items-center justify-center text-xs shadow-sm">
                🧪
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-ink-900 group-hover:text-ink-600 transition-colors">
                  STRESS LAB
                </span>
                <span className="text-[10px] text-ink-600 tracking-wider font-normal">
                  스트레스 연구소
                </span>
              </div>
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-sky-100/80 text-ink-900 font-medium">
              MVP 0.1
            </span>
          </header>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Minimal Footer */}
        {showFooter && (
          <footer className="px-6 py-6 border-t border-line/50 text-center text-xs text-ink-600 bg-appBg/60 mt-auto">
            <div className="flex justify-center gap-3 mb-2 font-medium">
              <Link to="/privacy" className="hover:text-ink-900 underline transition-colors">
                개인정보 처리방침
              </Link>
              <span>·</span>
              <a
                href="#safety"
                onClick={(e) => {
                  e.preventDefault();
                  alert('STRESS LAB은 20대를 위한 자기이해 콘텐츠이며, 전문 의료·심리 진단 서비스가 아닙니다.');
                }}
                className="hover:text-ink-900 transition-colors"
              >
                서비스 안내
              </a>
            </div>
            <p className="text-[11px] text-ink-600/80 leading-relaxed">
              본 서비스는 자기이해를 위한 참여형 설문으로 의학적 진단을 대신할 수 없습니다.<br />
              © 2026 STRESS LAB. All rights reserved.
            </p>
          </footer>
        )}
      </main>
    </div>
  );
};
