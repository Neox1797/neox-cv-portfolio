import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * FadeInSection: Animates a full section softly when scrolled into view.
 * Uses viewport.once = true to ensure elements never get stuck hidden.
 */
export function FadeInSection({ children, delay = 0, className = '', style = {}, id }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px 0px 0px 0px', amount: 0.05 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}


/**
 * StaggerContainer: Parent wrapper for grid layouts.
 * Automatically delays child items sequentially.
 */
export function StaggerContainer({ children, staggerDelay = 0.06, className = '', style = {} }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px 0px 0px 0px', amount: 0.05 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          }
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem: Individual items inside a StaggerContainer.
 */
export function StaggerItem({ children, className = '', style = {}, enableHover = false, onClick }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: 'easeOut' }
        }
      }}
      whileHover={enableHover ? { y: -4, transition: { duration: 0.2, ease: 'easeOut' } } : undefined}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverCard: Card wrapper with smooth springy lift on hover.
 */
export function HoverCard({ children, className = '', style = {}, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/**
 * SpotlightCard: Interactive card wrapper where a subtle radial spotlight gradient follows the user's cursor.
 */
export function SpotlightCard({ children, className = '', style = {}, onClick }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={className}
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >

      {/* Spotlight Radial Overlay */}
      {isHovered && (
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.14), transparent 80%)`,
            borderRadius: 'inherit',
            transition: 'opacity 0.2s ease',
            zIndex: 1
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </motion.div>
  );
}

/**
 * AnimatedProgressBar: Fills smoothly from 0 to percentage when scrolled into view.
 */
export function AnimatedProgressBar({ pct, color = 'var(--cyan-main)', height = '8px' }) {
  return (
    <div style={{ width: '100%', height, background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}, var(--cyan-main))`,
          borderRadius: '4px'
        }}
      />
    </div>
  );
}


