import { useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SurveyProvider, useSurvey } from './store';
import { scrollToTopInstant } from './utils/scroll';
import {
  Home,
  Mbti,
  Cause,
  Relief,
  Report,
  Contact,
  Done,
  Privacy,
} from './pages';
import { AdminLogin, AdminDashboard } from './pages/admin';

/**
 * Controller to handle:
 * 1. Immediate instant scroll-to-top on all route changes (Next, Prev, Result, Popstate).
 * 2. Automatic reset to Home (/) when reloaded during any test survey step (/survey/*).
 * 3. Prevention of browser scroll restoration.
 */
function NavigationController() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { resetSurvey } = useSurvey();
  const hasHandledReload = useRef(false);

  // 1. Reload detection & redirect to home on refresh
  useEffect(() => {
    if (hasHandledReload.current) return;
    hasHandledReload.current = true;

    // Detect if this page load was triggered by a reload
    const isReload = (() => {
      try {
        const navEntries = performance.getEntriesByType('navigation');
        if (navEntries && navEntries.length > 0) {
          return (navEntries[0] as PerformanceNavigationTiming).type === 'reload';
        }
        if (window.performance && window.performance.navigation) {
          return window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;
        }
      } catch {
        return false;
      }
      return false;
    })();

    // If reloaded while on any survey step, reset answers and redirect to Home
    if (isReload && window.location.pathname.startsWith('/survey')) {
      resetSurvey();
      scrollToTopInstant();
      navigate('/', { replace: true });
    }

    // Support Safari & mobile WebKit back-forward cache (bfcache)
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        scrollToTopInstant();
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [navigate, resetSurvey]);

  // 2. Instant scroll reset on every route change (Next, Prev, Result, Popstate)
  useLayoutEffect(() => {
    scrollToTopInstant();

    // Dual requestAnimationFrame sweeps for mobile browsers
    const raf1 = requestAnimationFrame(() => {
      scrollToTopInstant();
      const raf2 = requestAnimationFrame(() => {
        scrollToTopInstant();
      });
      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <SurveyProvider>
      <Router>
        <NavigationController />
        <Routes>
          {/* Main User Survey Flow */}
          <Route path="/" element={<Home />} />
          <Route path="/survey/mbti" element={<Mbti />} />
          <Route path="/survey/causes" element={<Cause />} />
          <Route path="/survey/relief" element={<Relief />} />
          <Route path="/survey/report" element={<Report />} />
          <Route path="/survey/result" element={<Report />} />
          <Route path="/survey/contact" element={<Contact />} />
          <Route path="/survey/done" element={<Done />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Admin Routes (Unlinked from menu) */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SurveyProvider>
  );
}

export default App;
