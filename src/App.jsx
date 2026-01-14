import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Technology } from './pages/Technology';
import { Contact } from './pages/Contact';
import { Loader } from './components/Loader';
import { Header } from './components/layout/Header';
import { ThemeProvider } from './context/ThemeContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={
          <PageWrapper>
            <Services />
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

        {/* Fallback */}
        <Route path="*" element={
          <PageWrapper>
            <div className="h-screen flex items-center justify-center bg-[#09090b]">
              <h1 className="text-4xl font-serif italic text-white">404 - Not Found</h1>
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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Loader />
        <Header />
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
