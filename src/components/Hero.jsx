import React, { useState, useEffect } from 'react';
import { MessageSquare, Code2, Cloud, Server, Sparkles, Mail, Phone, FileText } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { FadeInSection } from './MotionWrapper';
import SecretAchievementModal from './SecretAchievementModal';

export default function Hero({ onDownloadCV }) {
  const roles = [
    'Ingeniero de Software',
    'Ingeniero de Software & AMS',
    'Desarrollador Fullstack (Angular/React/PHP)',
    'Administrador de Servidores Linux / Red Hat',
    'Scrum Certified Developer (SDC®)'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Multi-tap Easter Egg State
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [isAchievementOpen, setIsAchievementOpen] = useState(false);
  const [tapBadgeText, setTapBadgeText] = useState('');
  const [showTapBadge, setShowTapBadge] = useState(false);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 75]);
  const parallaxYRight = useTransform(scrollY, [0, 600], [0, 110]);
  const parallaxOpacity = useTransform(scrollY, [0, 500], [1, 0.55]);

  const handleAvatarTap = () => {
    const now = Date.now();
    let newCount = 1;
    if (now - lastTapTime < 500) {
      newCount = tapCount + 1;
    }

    setLastTapTime(now);
    setTapCount(newCount);

    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try { navigator.vibrate(35); } catch (e) {}
    }

    if (newCount < 5) {
      setTapBadgeText(`⚡ ${newCount}/5 toques...`);
      setShowTapBadge(true);

      clearTimeout(window.tapBadgeTimer);
      window.tapBadgeTimer = setTimeout(() => {
        setShowTapBadge(false);
        setTapCount(0);
      }, 1200);
    } else {
      setShowTapBadge(false);
      setTapCount(0);
      setIsAchievementOpen(true);
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '90px 20px 36px',
        position: 'relative',
        background: 'var(--hero-radial)'
      }}
    >
      <FadeInSection style={{ maxWidth: '1100px', width: '100%', display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', justifyContent: 'space-between', gap: '36px' }}>
        
        {/* Left Column: Text & Intro */}
        <motion.div style={{ flex: '1 1 300px', y: parallaxY, opacity: parallaxOpacity, width: '100%' }}>

          
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '30px',
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: 'var(--cyan-main)',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            <Sparkles size={16} />
            <span>Portafolio Profesional & CV Virtual</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 5.5vw, 3.8rem)', fontWeight: '800', lineHeight: 1.15, marginBottom: '16px' }}>
            Hola, soy <span className="gradient-text-cyan-violet">Edgar J. Vargas</span>
          </h1>

          {/* Animated Typed Role */}
          <div style={{
            minHeight: '44px',
            fontSize: 'clamp(0.95rem, 2.3vw, 1.45rem)',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            position: 'relative'
          }}>
            <Code2 size={24} color="var(--cyan-main)" style={{ flexShrink: 0 }} />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{ color: 'var(--cyan-main)', display: 'inline-block', lineHeight: 1.3 }}
              >
                {roles[currentRoleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: '32px', lineHeight: 1.7 }}>
            Ingeniero en Sistemas Computacionales enfocado en desarrollo web integral (PHP, Angular, Java Spring, React), integración de microservicios y soluciones tecnológicas de Software & AMS. Apasionado por resolver problemas complejos y mejorar la eficiencia tecnológica de las organizaciones.
          </p>

          {/* Action CTA Buttons */}
          <div className="hero-cta-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
            <button
              onClick={onDownloadCV}
              className="hero-btn"
              style={{
                background: 'linear-gradient(135deg, var(--cyan-main), var(--violet-main))',
                color: '#ffffff',
                border: 'none',
                padding: '12px 22px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px var(--cyan-glow)',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px var(--cyan-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px var(--cyan-glow)';
              }}
            >
              <FileText size={18} />
              <span>Descargar CV PDF</span>
            </button>

            <a
              href="https://wa.me/+525584752143?text=Hola%20Edgar,%20vi%20tu%20portafolio%20y%20me%20gustaria%20platicar%20contigo"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn"
              style={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#ffffff',
                padding: '12px 22px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <MessageSquare size={18} />
              <span>WhatsApp</span>
            </a>

            <a
              href="#terminal"
              className="hero-btn"
              style={{
                textDecoration: 'none',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-highlight)',
                padding: '12px 20px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-card)')}
            >
              <Server size={18} color="var(--cyan-main)" />
              <span>Terminal Cloud</span>
            </a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>REDES:</span>
            {[
              { icon: <LinkedinIcon size={20} />, href: 'https://www.linkedin.com/in/edgar-vargas-465437200', title: 'LinkedIn' },
              { icon: <GithubIcon size={20} />, href: 'https://github.com/Neox1797', title: 'GitHub' },
              { icon: <InstagramIcon size={20} />, href: 'https://www.instagram.com/_neoxvamo/', title: 'Instagram' },
              { icon: <Mail size={20} />, href: 'mailto:edgar.vmontiel@gmail.com', title: 'Correo' },
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                title={soc.title}
                style={{
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--cyan-main)';
                  e.currentTarget.style.borderColor = 'var(--cyan-main)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {soc.icon}
              </a>
            ))}
          </div>

        </motion.div>

        {/* Right Column: Profile Image with Elegant Fixed Glow */}
        <motion.div
          style={{
            flex: '0 1 340px',
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            margin: '0 auto',
            y: parallaxYRight
          }}
          className="desktop-avatar-parallax"
        >
          {/* Ambient soft glow backdrop */}
          <div className="avatar-ambient-glow" />

          {/* Top-Left Status Pill */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '0px',
            zIndex: 3,
            background: 'var(--glass-bg)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            padding: '5px 12px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
            fontSize: '0.78rem',
            fontWeight: '600',
            color: 'var(--text-primary)'
          }}>
            <span className="pulse-emerald" />
            <span>Disponible</span>
          </div>

          {/* Main Avatar Frame */}
          <div
            className="glowing-avatar hero-avatar-frame"
            onClick={handleAvatarTap}
            style={{ position: 'relative', zIndex: 1, cursor: 'pointer', userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}
            title="¡Toca 5 veces rápidamente para desbloquear una sorpresa!"
          >
            <img
              src="/assets/img/me.jpeg"
              alt="Edgar J. Vargas Montiel"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
                borderRadius: '50%',
                border: '4px solid var(--bg-primary)',
                display: 'block'
              }}
            />

            {/* Tap Count Feedback Badge */}
            <AnimatePresence>
              {showTapBadge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    background: 'rgba(16, 185, 129, 0.92)',
                    color: '#ffffff',
                    border: '2px solid #ffffff',
                    padding: '8px 16px',
                    borderRadius: '24px',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(16, 185, 129, 0.6)',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tapBadgeText}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom-Right Floating Feature Badge */}
          <div className="hero-feature-badge" style={{
            position: 'absolute',
            bottom: '-10px',
            right: '0px',
            zIndex: 3,
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-highlight)',
            padding: '8px 14px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 12px 28px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(12px)'
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Code2 size={18} color="var(--cyan-main)" />
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Enfoque</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>Software & Fullstack</div>
            </div>
          </div>
        </motion.div>


      </FadeInSection>

      {/* Secret Achievement Easter Egg Modal */}
      <SecretAchievementModal
        isOpen={isAchievementOpen}
        onClose={() => setIsAchievementOpen(false)}
      />

      {/* Responsive & Animation Styles for Hero */}
      <style>{`
        .hero-avatar-frame {
          width: 280px;
          height: 280px;
        }
        @media (max-width: 880px) {
          #hero {
            padding-top: 90px !important;
            padding-bottom: 50px !important;
            min-height: auto !important;
          }
        }
        @media (max-width: 480px) {
          .hero-avatar-frame {
            width: 220px;
            height: 220px;
          }
          .hero-cta-container {
            flex-direction: column;
          }
          .hero-btn {
            width: 100% !important;
          }
          .hero-feature-badge {
            padding: 6px 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
