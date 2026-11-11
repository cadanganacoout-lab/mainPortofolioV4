import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import App from './App';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import './index.css';

function RouteScrollManager() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const previousPathname = useRef(location.pathname);

  useEffect(() => {
    const routeChanged = previousPathname.current !== location.pathname;
    previousPathname.current = location.pathname;
    if (routeChanged) window.scrollTo({ top: 0, behavior: 'auto' });

    let frameId;
    const timeoutId = window.setTimeout(() => {
      frameId = window.requestAnimationFrame(() => {
        if (routeChanged) {
          document
            .getElementById("main-content")
            ?.focus({ preventScroll: true });
        }

        if (location.hash) {
          document
            .getElementById(decodeURIComponent(location.hash.slice(1)))
            ?.scrollIntoView({
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
              block: 'start',
            });
          return;
        }

        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      });
    }, routeChanged && !prefersReducedMotion ? 300 : 0);

    return () => {
      window.clearTimeout(timeoutId);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, [location.hash, location.key, location.pathname, prefersReducedMotion]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <RouteScrollManager />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0 }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Routes location={location}>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </React.StrictMode>,
);
