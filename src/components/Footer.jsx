import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', padding: '16px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} <strong style={{ color: 'var(--text-primary)' }}>Edgar J. Vargas</strong> · Software Engineer. Todos los derechos reservados.
        </div>

        <button
          onClick={scrollToTop}
          title="Volver arriba"
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
            marginLeft: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--cyan-main)';
            e.currentTarget.style.color = 'var(--cyan-main)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
          aria-label="Volver arriba"
        >
          <ArrowUp size={15} />
        </button>

      </div>
    </footer>
  );
}
