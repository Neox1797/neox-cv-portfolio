import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', padding: '14px 16px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        
        <div style={{ fontSize: 'clamp(0.68rem, 2.5vw, 0.82rem)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          &copy; {new Date().getFullYear()} <strong style={{ color: 'var(--text-primary)' }}>Edgar J. Vargas</strong> · Software Engineer. Todos los derechos reservados.
        </div>

        <button
          onClick={scrollToTop}
          title="Volver arriba"
          aria-label="Volver arriba"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--indigo-main)';
            e.currentTarget.style.color = 'var(--indigo-main)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ArrowUp size={15} />
        </button>

      </div>
    </footer>
  );
}
