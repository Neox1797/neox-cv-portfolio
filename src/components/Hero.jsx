import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowDown, Code2, Cloud, Server, Sparkles, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';

export default function Hero({ onDownloadCV }) {
  const roles = [
    'Ingeniero de Software',
    'Especialista AMS & AWS Cloud',
    'Desarrollador Fullstack (Angular/React/PHP)',
    'Administrador de Servidores Linux / Red Hat',
    'Scrum Certified Developer (SDC®)'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
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
        padding: '120px 24px 60px',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 20%, rgba(56, 189, 248, 0.08) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 80%)'
      }}
    >
      <div style={{ maxWidth: '1100px', width: '100%', display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
        
        {/* Left Column: Text & Intro */}
        <div style={{ flex: '1 1 500px' }} className="fade-in-up">
          
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

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '16px' }}>
            Hola, soy <span className="gradient-text-cyan-violet">Edgar J. Vargas</span>
          </h1>

          {/* Animated Typed Role */}
          <div style={{
            height: '40px',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Code2 size={24} color="var(--cyan-main)" />
            <span style={{ color: 'var(--cyan-main)', transition: 'all 0.4s ease' }}>
              {roles[currentRoleIndex]}
            </span>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: '32px', lineHeight: 1.7 }}>
            Ingeniero en Sistemas Computacionales enfocado en arquitectura en la nube (AWS Cloud), desarrollo web integral (PHP, Angular, Java Spring, React) y optimización de infraestructura Linux. Apasionado por resolver problemas complejos y mejorar la eficiencia tecnológica de las organizaciones.
          </p>

          {/* Action CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <a
              href="https://wa.me/+525584752143?text=Hola%20Edgar,%20vi%20tu%20portafolio%20y%20me%20gustaria%20platicar%20contigo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <MessageSquare size={18} />
              <span>Contactar por WhatsApp</span>
            </a>

            <a
              href="#terminal"
              style={{
                textDecoration: 'none',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-highlight)',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-card)')}
            >
              <Server size={18} color="var(--cyan-main)" />
              <span>Probar Terminal Cloud</span>
            </a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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

        </div>

        {/* Right Column: Profile Image with Glow */}
        <div style={{ flex: '0 0 320px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div className="glowing-avatar" style={{ width: '280px', height: '280px' }}>
            <img
              src="/assets/img/me.jpeg"
              alt="Edgar J. Vargas Montiel"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '4px solid var(--bg-primary)'
              }}
            />
          </div>

          {/* Floating Badge */}
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            right: '10px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-highlight)',
            padding: '10px 16px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <Cloud size={24} color="var(--cyan-main)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Especialidad</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>AWS & DevOps</div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)',
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          fontWeight: '500'
        }}
      >
        <span>Desliza para explorar</span>
        <ArrowDown size={16} className="pulse-emerald" style={{ animationDuration: '1.5s' }} />
      </a>
    </section>
  );
}
