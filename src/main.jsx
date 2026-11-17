import React, { useEffect, useRef, useState } from 'react';
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
import MusicNotch from './components/layout/MusicNotch';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
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
  const [iris, setIris] = useState(null);

  useEffect(() => {
    if (!iris || iris.phase !== 'cover' || location.pathname !== iris.destination) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIris((current) =>
        current?.destination === location.pathname
          ? { ...current, phase: 'reveal' }
          : current,
      );
    }, 440);

    return () => window.clearTimeout(timeoutId);
  }, [iris, location.pathname]);

  const handleRouteClick = (event) => {
    if (
      prefersReducedMotion ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      iris ||
      !(event.target instanceof Element)
    ) {
      return;
    }

    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

    const destination = new URL(link.href, window.location.href);
    if (
      destination.origin !== window.location.origin ||
      !['/about', '/projects'].includes(destination.pathname) ||
      destination.pathname === location.pathname
    ) {
      return;
    }

    const bounds = link.getBoundingClientRect();
    const x =
      event.detail === 0 ? bounds.left + bounds.width / 2 : event.clientX;
    const y =
      event.detail === 0 ? bounds.top + bounds.height / 2 : event.clientY;
    const radius = Math.ceil(
      Math.max(
        Math.hypot(x, y),
        Math.hypot(window.innerWidth - x, y),
        Math.hypot(x, window.innerHeight - y),
        Math.hypot(window.innerWidth - x, window.innerHeight - y),
      ),
    );

    setIris({
      destination: destination.pathname,
      origin: `circle(0px at ${x}px ${y}px)`,
      cover: `circle(${radius}px at ${x}px ${y}px)`,
      phase: 'cover',
    });
  };

  return (
    <>
      <RouteScrollManager />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          onClickCapture={handleRouteClick}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion || iris ? 0 : 0.28,
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
      {iris && (
        <motion.div
          className="route-iris-overlay"
          aria-hidden="true"
          initial={{ clipPath: iris.origin }}
          animate={{
            clipPath: iris.phase === 'cover' ? iris.cover : iris.origin,
          }}
          transition={{
            duration: iris.phase === 'cover' ? 0.42 : 0.38,
            ease: [0.76, 0, 0.24, 1],
          }}
          onAnimationComplete={() => {
            if (iris.phase === 'reveal') setIris(null);
          }}
        />
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MusicPlayerProvider>
        <MusicNotch />
        <AnimatedRoutes />
      </MusicPlayerProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
