import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from './pages/Home';
import { ExperiencePage } from './pages/ExperiencePage';
import { About } from './pages/About';
import { Technology } from './pages/Technology';
import { Contact } from './pages/Contact';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProjectForm } from './pages/admin/ProjectForm';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Loader } from './components/Loader';
import { Header } from './components/layout/Header';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { preloadExperienceAssets, preloadExperienceComponents } from './utils/preloadExperience';
import ErrorBoundary from './components/ErrorBoundary';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={
          <PageWrapper>
            <ExperiencePage />
          </PageWrapper>
        } />
        <Route path="/about" element={
          <PageWrapper>
            <About />
          </PageWrapper>
        } />
        <Route path="/technology" element={
          <PageWrapper>
            <Technology />
          </PageWrapper>
        } />
        <Route path="/contact" element={
          <PageWrapper>
            <Contact />
          </PageWrapper>
        } />
        <Route path="/projects" element={
          <PageWrapper>
            <Projects />
          </PageWrapper>
        } />
        <Route path="/projects/:id" element={
          <PageWrapper>
            <ProjectDetail />
          </PageWrapper>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/projects/new" element={
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        } />
        <Route path="/admin/projects/:id/edit" element={
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={
          <PageWrapper>
            <div className="h-screen flex items-center justify-center bg-[#09090b]">
              <h1 className="text-4xl font-display italic text-white">404 - Not Found</h1>
            </div>
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Preload Experience page assets on app mount
  useEffect(() => {
    // Preload 3D models and components for Experience page
    preloadExperienceAssets();
    // Preload components after a short delay to not block initial render
    setTimeout(() => {
      preloadExperienceComponents();
    }, 1000);
  }, []);

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Loader />}
      {!isAdminRoute && <Header />}
      <AnimatedRoutes />
    </>
  );
}



function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
