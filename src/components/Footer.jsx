import React from 'react';
import { ArrowUp, Heart, Code2 } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', padding: '40px 24px 30px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        
        <div>
          <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Edgar J. Vargas</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--cyan-main)', fontFamily: 'JetBrains Mono, monospace' }}>v2.0</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            &copy; {new Date().getFullYear()} Todos los derechos reservados. Diseñado & Desarrollado para impacto profesional.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Construido con <Code2 size={14} color="var(--cyan-main)" /> React + Vite & Tailwind Tokens
          </span>

          <button
            onClick={scrollToTop}
            title="Volver arriba"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--cyan-main)';
              e.currentTarget.style.color = 'var(--cyan-main)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <ArrowUp size={18} />
          </button>
        </div>

      </div>
    </footer>
  );
}
