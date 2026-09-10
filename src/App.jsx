import React, { useState, useEffect } from 'react';
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
import confetti from 'canvas-confetti';

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleDownloadCV = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 }
    });

    // Triggers download or preview of CV PDF
    const link = document.createElement('a');
    link.href = '/assets/img/certificados/EDGAR_VARGAS.pdf'; // Or direct PDF if available in assets
    link.target = '_blank';
    link.download = 'CV_Edgar_Vargas_Software_DevOps.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header theme={theme} toggleTheme={toggleTheme} onDownloadCV={handleDownloadCV} />
      <main style={{ flex: 1 }}>
        <Hero onDownloadCV={handleDownloadCV} />
        <About />
        <DevOpsTerminal />
        <Skills />
        <Experience />
        <Portfolio />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
