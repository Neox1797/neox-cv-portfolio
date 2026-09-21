import React, { useState, useEffect } from 'react';
import { Sun, Moon, Clock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function Header({ themeState, theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const mode = themeState?.mode || 'auto';
  const effectiveTheme = themeState?.effectiveTheme || theme || 'dark';
  const currentTimeText = themeState?.currentTimeText || '';
  const userTimeZone = themeState?.userTimeZone || '';
  const cycleThemeMode = themeState?.cycleThemeMode || toggleTheme;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'terminal', 'skills', 'experience', 'portfolio', 'certifications', 'contact'];
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, { threshold: 0.25 });
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'hero', name: 'Inicio', href: '#hero' },
    { id: 'about', name: 'Sobre Mí', href: '#about' },
    { id: 'terminal', name: 'Terminal', href: '#terminal' },
    { id: 'skills', name: 'Habilidades', href: '#skills' },
    { id: 'experience', name: 'Experiencia', href: '#experience' },
    { id: 'portfolio', name: 'Portafolio', href: '#portfolio' },
    { id: 'certifications', name: 'Certificados', href: '#certifications' },
    { id: 'contact', name: 'Contacto', href: '#contact' },
  ];

  const getThemeTitle = () => {
    const tzStr = userTimeZone ? ` - ${userTimeZone}` : '';
    if (mode === 'auto') {
      return `Modo Horario Automático: ${effectiveTheme === 'light' ? 'Día ☀️' : 'Noche 🌙'} (${currentTimeText} hs${tzStr}). Clic para cambiar a Modo Día.`;
    }
    if (mode === 'light') {
      return 'Modo Día activo. Clic para cambiar a Modo Noche.';
    }
    return 'Modo Noche activo. Clic para volver a Modo Horario Automático (Zona Horaria Local).';
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'var(--glass-blur)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'var(--glass-blur)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: isScrolled ? '6px 20px' : '10px 20px',
        boxShadow: isScrolled ? 'var(--shadow-card)' : 'none'
      }}
    >
      {/* Reading Progress Bar Line */}
      <motion.div
        style={{
          scaleX,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--cyan-main), var(--violet-main))',
          transformOrigin: '0%',
          zIndex: 1001,
          boxShadow: '0 0 10px var(--cyan-glow)'
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Ultra Minimal Single-Line Brand */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--cyan-main), var(--violet-main))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '0.82rem',
            boxShadow: '0 2px 8px var(--cyan-glow)',
            letterSpacing: '0.5px'
          }}>
            EV
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: '800', fontSize: '0.92rem', color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
              Edgar J. Vargas
            </span>
            <span className="brand-sub-role" style={{ color: 'var(--text-muted)', opacity: 0.4, fontSize: '0.85rem' }}>/</span>
            <span className="brand-sub-role" style={{ fontSize: '0.74rem', color: 'var(--cyan-main)', fontFamily: 'JetBrains Mono, monospace', fontWeight: '500' }}>
              Software Engineer
            </span>
            <span className="pulse-emerald" style={{ width: '7px', height: '7px', marginLeft: '2px' }} title="Disponible para nuevos proyectos"></span>
          </div>
        </a>

        {/* Center Desktop Navigation with Active ScrollSpy Indicator */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '8px' }} className="desktop-nav" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  color: isActive ? 'var(--cyan-main)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? '700' : '500',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.2px'
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '20px',
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      zIndex: -1
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>


        {/* Right Action Controls: Minimal Theme Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Theme Selector Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={cycleThemeMode}
            title={getThemeTitle()}
            aria-label={mode === 'auto' ? `Auto (${currentTimeText}) - Cambiar modo de tema` : mode === 'light' ? 'Día - Cambiar modo de tema' : 'Noche - Cambiar modo de tema'}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '6px 12px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {mode === 'auto' && (
              <>
                <Clock size={15} color="var(--cyan-main)" aria-hidden="true" />
                <span className="theme-btn-label" style={{ fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Auto <span style={{ opacity: 0.8 }}>({currentTimeText})</span>
                </span>
              </>
            )}
            {mode === 'light' && (
              <>
                <Sun size={15} color="var(--amber-main)" aria-hidden="true" />
                <span className="theme-btn-label" style={{ fontSize: '0.75rem', fontWeight: '600' }}>Día ☀️</span>
              </>
            )}
            {mode === 'dark' && (
              <>
                <Moon size={15} color="var(--violet-main)" aria-hidden="true" />
                <span className="theme-btn-label" style={{ fontSize: '0.75rem', fontWeight: '600' }}>Noche 🌙</span>
              </>
            )}
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '8px'
            }}
            className="mobile-toggle"
            aria-label="Abrir o cerrar menú principal"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--border)',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
              maxHeight: 'calc(100vh - 70px)',
              overflowY: 'auto'
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: isActive ? 'var(--cyan-main)' : 'var(--text-primary)',
                    background: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--cyan-main)' : '3px solid transparent',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? '700' : '500',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>


      {/* Responsive Media Query Styles */}
      <style>{`
        @media (min-width: 880px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 640px) {
          .brand-sub-role { display: none !important; }
        }
        @media (max-width: 576px) {
          .theme-btn-label { display: none !important; }
        }
      `}</style>
    </header>
  );
}
