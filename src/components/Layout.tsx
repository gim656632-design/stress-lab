import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scroll';

export interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen w-full bg-cream text-charcoal flex justify-center selection:bg-lavender-200 selection:text-charcoal">
      {/* Centered Mobile-first Container (Max 480px) */}
      <div className="w-full max-w-[480px] min-h-screen flex flex-col bg-cream relative sm:border-x sm:border-borderLine/80 sm:shadow-soft">
        {/* Header */}
        {showHeader && (
          <header className="px-5 py-4 flex items-center justify-between border-b border-borderLine/70 bg-cream/90 backdrop-blur-sm sticky top-0 z-30">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => scrollToTopInstant()}
              className="flex items-center gap-2 group transition-opacity hover:opacity-85"
            >
              <div className="w-6 h-6 rounded-lg bg-lavender flex items-center justify-center text-charcoal font-black text-xs">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-charcoal leading-none">
                  STRESS LAB
                </span>
                <span className="text-[10px] text-charcoal-muted tracking-wide mt-0.5 font-normal">
                  스트레스 연구소
                </span>
              </div>
            </Link>

            {/* Right Nav */}
            <div className="flex items-center gap-3 text-xs font-medium text-charcoal-muted tracking-tight">
              <span className="hover:text-charcoal cursor-default transition-colors">
                ABOUT
              </span>
              <span className="text-borderLine">·</span>
              <span className="hover:text-charcoal cursor-default transition-colors">
                HOW IT WORKS
              </span>
            </div>
          </header>
        )}

        {/* Content Area */}
        <main className="flex-1 flex flex-col px-5 py-6">
          {children}
        </main>

        {/* Footer */}
        {showFooter && (
          <footer className="px-6 py-6 border-t border-borderLine/70 text-center text-xs text-charcoal-muted mt-auto">
            <div className="font-semibold text-[11px] tracking-widest text-charcoal-muted/80 uppercase mb-2">
              YOUR MIND, YOUR WAY.
            </div>
            <p className="text-[11px] text-charcoal-muted/70 leading-relaxed">
              본 서비스는 자기이해를 위한 참여형 설문이며, 의학적 진단을 대신하지 않습니다.<br />
              © STRESS LAB. All rights reserved.
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};
