import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SurveyProvider } from './store';
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

function App() {
  return (
    <SurveyProvider>
      <Router>
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
