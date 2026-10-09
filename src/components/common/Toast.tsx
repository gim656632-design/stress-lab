import React from 'react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fade-up">
      <div className="bg-ink-900/90 text-white text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2 border border-white/10">
        <span>💡</span>
        <span>{message}</span>
      </div>
    </div>
  );
};
