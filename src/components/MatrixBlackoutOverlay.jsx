import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Terminal, Sparkles } from 'lucide-react';

export default function MatrixBlackoutOverlay({ isActive, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Matrix characters (Katakana + Numbers + Latin)
    const chars = '0123456789ABCDEFNEOXDEVOPSSOFTWARESYSTEMSAWSLINUX';
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black background to leave trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#10b981'; // Matrix emerald green
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Randomly highlight header character with bright cyan
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#38bdf8';
        } else {
          ctx.fillStyle = '#10b981';
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Listen for ESC key to exit
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onClose]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            background: '#000000',
            overflow: 'hidden'
          }}
        >
          {/* Canvas for Matrix Code Rain */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'block'
            }}
          />

          {/* Central Cyber HUD */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            width: '90%',
            maxWidth: '520px',
            background: 'rgba(10, 13, 20, 0.92)',
            border: '2px solid #10b981',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 0 50px rgba(16, 185, 129, 0.5), inset 0 0 20px rgba(16, 185, 129, 0.2)',
            color: '#f8fafc',
            backdropFilter: 'blur(12px)',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#10b981', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '12px' }}>
              <Terminal size={18} /> MODO BLACKOUT MATRIX ACTIVADO
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', margin: '0 0 8px', fontFamily: 'JetBrains Mono, monospace' }}>
              SYSTEM OVERRIDE: NEOX CORE
            </h2>

            <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '16px' }}>
              Has tomado el control completo de la consola de desarrollo de Edgar Vargas.
            </p>

            <div style={{
              background: '#07090e',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
              color: '#38bdf8',
              textAlign: 'left',
              marginBottom: '20px'
            }}>
              <div><span style={{ color: '#10b981' }}>root@neox-core:~#</span> status --global</div>
              <div style={{ color: '#10b981', marginTop: '4px' }}>✓ Matrix Stream: ACTIVE (100 FPS)</div>
              <div style={{ color: '#fbbf24' }}>✓ Security Level: MAXIMUM OVERDRIVE</div>
              <div style={{ color: '#94a3b8' }}>✓ Press ESC or tap button below to return</div>
            </div>

            {/* Exit Button */}
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                border: 'none',
                fontWeight: '800',
                fontSize: '0.9rem',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
              }}
            >
              <X size={18} />
              <span>Restaurar Pantalla Normal (ESC)</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
