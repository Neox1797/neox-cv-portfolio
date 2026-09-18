import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, Terminal, X, Check, ShieldCheck, Cpu, Bot } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SecretAchievementModal({ isOpen, onClose, onActivateMatrix }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#38bdf8', '#10b981', '#a78bfa', '#fbbf24']
        });
      } catch (e) {
        // Fallback if confetti fails
      }

      // Haptic vibration feedback on mobile devices
      if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
        try {
          navigator.vibrate([100, 50, 100, 50, 200]);
        } catch (e) {}
      }
    }
  }, [isOpen]);

  const copySecretCommand = () => {
    navigator.clipboard.writeText('npx hire-neox --mode=fullstack-ai --level=senior');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTriggerMatrix = () => {
    onClose();
    if (onActivateMatrix) {
      onActivateMatrix();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          {/* Backdrop Click to Close */}
          <div
            style={{ position: 'absolute', inset: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: '440px',
              background: 'var(--bg-card)',
              border: '2px solid var(--cyan-main)',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 25px 60px rgba(14, 165, 233, 0.35), 0 0 30px rgba(139, 92, 246, 0.2)',
              color: 'var(--text-primary)',
              overflow: 'hidden'
            }}
          >
            {/* Top Ambient Glow */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'var(--icon-box-bg)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            {/* Achievement Icon Header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '16px' }}>
              <motion.div
                initial={{ rotate: -15, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2))',
                  border: '2px solid var(--cyan-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(56, 189, 248, 0.3)',
                  marginBottom: '12px'
                }}
              >
                <Bot size={34} color="var(--cyan-main)" />
              </motion.div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: 'var(--cyan-main)',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.5px',
                marginBottom: '8px'
              }}>
                <Sparkles size={13} /> LOGRO SECRETO DESBLOQUEADO
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                AI-Augmented Fullstack Engineer 🤖⚡
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', margin: 0, lineHeight: 1.4 }}>
                ¡Felicidades! Has descubierto la especialidad de Edgar: Desarrollo de Software de alto rendimiento potenciado por Inteligencia Artificial y arquitecturas modernas.
              </p>
            </div>

            {/* Secret Terminal Card */}
            <div style={{
              background: 'var(--terminal-bg)',
              border: '1px solid var(--terminal-border)',
              borderRadius: '16px',
              padding: '14px',
              marginBottom: '20px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.72rem' }}>
                <Cpu size={14} color="var(--cyan-main)" />
                <span>Nivel de Acceso: Fullstack & AI Agent Developer</span>
              </div>

              <div style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', wordBreak: 'break-all' }}>
                <span style={{ color: 'var(--emerald-main)', fontWeight: '700' }}>neox@ai-dev:~$</span>
                <span style={{ color: 'var(--cyan-main)' }}>npx hire-neox --mode=fullstack-ai</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleTriggerMatrix}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, var(--emerald-main), #047857)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)'
                }}
              >
                <span>🕶️ Activar Modo Blackout / Matrix Rain</span>
              </button>

              <button
                onClick={copySecretCommand}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, var(--cyan-main), var(--violet-main))',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(56, 189, 248, 0.3)'
                }}
              >
                {copied ? <Check size={18} /> : <Terminal size={18} />}
                <span>{copied ? '¡Comando Copiado al Portapapeles!' : 'Copiar Comando Secreto'}</span>
              </button>

              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '12px',
                  background: 'var(--icon-box-bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Continuar Explorando
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
