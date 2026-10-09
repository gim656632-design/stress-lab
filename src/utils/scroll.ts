/**
 * Instantly reset scroll position to top (0, 0) across all platforms and browsers.
 * Disables smooth scrolling animation and forces immediate top positioning
 * on window, documentElement, and body.
 */
export const scrollToTopInstant = (): void => {
  if (typeof window === 'undefined') return;

  try {
    // 1. Enforce manual scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Immediate window scroll without animation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });

    // 3. Fallback for mobile WebViews, iOS Safari and Android Chrome
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  } catch {
    // Fallback standard call
    window.scrollTo(0, 0);
  }
};
