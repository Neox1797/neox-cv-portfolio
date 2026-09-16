import React, { useState, useEffect } from 'react';
import { Sun, Moon, Clock, Menu, X } from 'lucide-react';

export default function Header({ themeState, theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Experiencia', href: '#experience' },
    { name: 'Portafolio', href: '#portfolio' },
    { name: 'Certificados', href: '#certifications' },
    { name: 'Contacto', href: '#contact' },
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
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: isScrolled ? '6px 20px' : '10px 20px',
        boxShadow: isScrolled ? 'var(--shadow-card)' : 'none'
      }}
    >
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
            <span style={{ color: 'var(--text-muted)', opacity: 0.4, fontSize: '0.85rem' }}>/</span>
            <span style={{ fontSize: '0.74rem', color: 'var(--cyan-main)', fontFamily: 'JetBrains Mono, monospace', fontWeight: '500' }}>
              Software Engineer
            </span>
            <span className="pulse-emerald" style={{ width: '7px', height: '7px', marginLeft: '2px' }} title="Disponible para nuevos proyectos"></span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '16px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: '500',
                transition: 'color 0.2s ease',
                letterSpacing: '0.2px'
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--cyan-main)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Controls: Minimal Theme Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Theme Selector Button */}
          <button
            onClick={cycleThemeMode}
            title={getThemeTitle()}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '6px 14px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: 'var(--shadow-card)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--cyan-main)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            {mode === 'auto' && (
              <>
                <Clock size={15} color="var(--cyan-main)" />
                <span style={{ fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Auto <span style={{ opacity: 0.8 }}>({currentTimeText})</span>
                </span>
              </>
            )}
            {mode === 'light' && (
              <>
                <Sun size={15} color="var(--amber-main)" />
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Día ☀️</span>
              </>
            )}
            {mode === 'dark' && (
              <>
                <Moon size={15} color="var(--violet-main)" />
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Noche 🌙</span>
              </>
            )}
          </button>

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
              padding: '4px'
            }}
            className="mobile-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      {/* Responsive Media Query Styles */}
      <style>{`
        @media (min-width: 880px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
