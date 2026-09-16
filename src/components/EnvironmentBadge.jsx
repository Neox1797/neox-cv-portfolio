import React, { useState } from 'react';
import { getEnvironmentInfo } from '../utils/envHelper';
import { GitBranch, Server, X, Info, ShieldCheck } from 'lucide-react';

export default function EnvironmentBadge() {
  const [expanded, setExpanded] = useState(false);
  const env = getEnvironmentInfo();

  // En producción / master no se muestra ningún badge flotante
  if (env.type === 'production') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        zIndex: 9999,
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Expanded Modal / Card */}
      {expanded && (
        <div
          style={{
            marginBottom: '8px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${env.borderColor}`,
            borderRadius: '12px',
            padding: '14px 16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3)',
            color: '#f8fafc',
            minWidth: '260px',
            maxWidth: '320px',
            fontSize: '0.82rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: env.color }}>
              <span>{env.icon}</span>
              <span>{env.fullLabel}</span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              title="Cerrar detalle"
            >
              <X size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', gap: '8px' }}>
              <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <GitBranch size={13} /> Rama Git:
              </span>
              <span style={{ fontWeight: '600', fontFamily: 'monospace', color: '#f1f5f9' }}>{env.branch}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Server size={13} /> Vercel Env:
              </span>
              <span style={{ fontWeight: '600', fontFamily: 'monospace', color: env.color, textTransform: 'uppercase' }}>
                {env.vercelEnv}
              </span>
            </div>

            {env.commitSha && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={13} /> Commit:
                </span>
                <span style={{ fontWeight: '600', fontFamily: 'monospace', color: '#94a3b8' }}>{env.commitSha}</span>
              </div>
            )}

            <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px' }}>
              {env.description}
            </div>
          </div>
        </div>
      )}

      {/* Pill Badge */}
      <button
        onClick={() => setExpanded(!expanded)}
        title="Haz clic para ver detalles del entorno"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          background: env.bgColor,
          border: `1px solid ${env.borderColor}`,
          color: env.color,
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '0.5px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s ease-in-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: env.color,
            boxShadow: `0 0 8px ${env.color}`
          }}
        />
        <span>{env.label}</span>
        <span style={{ fontSize: '0.7rem', opacity: 0.8, fontFamily: 'monospace' }}>({env.branch})</span>
        <Info size={12} style={{ marginLeft: '2px', opacity: 0.7 }} />
      </button>
    </div>
  );
}
