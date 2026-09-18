import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import DevOpsTerminal from './components/DevOpsTerminal';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EnvironmentBadge from './components/EnvironmentBadge';
import { logEnvironmentToConsole } from './utils/envHelper';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const MatrixBlackoutOverlay = lazy(() => import('./components/MatrixBlackoutOverlay'));

export default function App() {
  const themeState = useTheme();
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 3000], [0, 180]);
  const orbY2 = useTransform(scrollY, [0, 3000], [0, -180]);

  // Scroll to top on page refresh or initial load & log environment
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    resetScroll();

    // Ensure hash links don't hold scroll position on refresh
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    window.addEventListener('beforeunload', resetScroll);
    const frameId = requestAnimationFrame(resetScroll);
    const timer = setTimeout(resetScroll, 100);

    logEnvironmentToConsole();

    return () => {
      window.removeEventListener('beforeunload', resetScroll);
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, []);

  const handleDownloadCV = async () => {
    try {
      const confettiModule = await import('canvas-confetti');
      const confetti = confettiModule.default || confettiModule;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch {
      // Fallback silently if confetti fails to load
    }

    // Triggers download or preview of CV PDF
    const link = document.createElement('a');
    link.href = '/assets/img/certificados/EDGAR_VARGAS.pdf';
    link.target = '_blank';
    link.download = 'CV_Edgar_Vargas_Software_DevOps.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Background Ambient Glowing Orbs with Scroll Parallax */}
      <motion.div className="ambient-orb-1" style={{ y: orbY1 }} aria-hidden="true" />
      <motion.div className="ambient-orb-2" style={{ y: orbY2 }} aria-hidden="true" />

      <Header themeState={themeState} onDownloadCV={handleDownloadCV} />

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Hero onDownloadCV={handleDownloadCV} onActivateMatrix={() => setIsMatrixActive(true)} />
        <About />
        <DevOpsTerminal onActivateMatrix={() => setIsMatrixActive(true)} />
        <Skills />
        <Experience />
        <Portfolio />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <EnvironmentBadge />
      <Suspense fallback={null}>
        {isMatrixActive && <MatrixBlackoutOverlay isActive={isMatrixActive} onClose={() => setIsMatrixActive(false)} />}
      </Suspense>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

