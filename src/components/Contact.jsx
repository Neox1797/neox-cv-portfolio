import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, CheckCircle2, Copy, ExternalLink, ShieldAlert, Database, Loader2, Clock, Building2, Briefcase, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { LinkedinIcon } from './Icons';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submittedViaSupabase, setSubmittedViaSupabase] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // 1. Protección Honeypot (Boti-Spam Detection)
    if (formData.honeypot) {
      console.warn('Bot detectado vía honeypot');
      setSubmitted(true);
      return;
    }

    // 2. Rate Limiting por Cooldown en LocalStorage (3 minutos entre envíos)
    const lastSent = localStorage.getItem('last_contact_sent_time');
    const now = Date.now();
    const COOLDOWN_MS = 3 * 60 * 1000; // 3 minutos

    if (lastSent && now - parseInt(lastSent, 10) < COOLDOWN_MS) {
      const remainingSecs = Math.ceil((COOLDOWN_MS - (now - parseInt(lastSent, 10))) / 1000);
      setErrorMsg(`Por favor espera ${remainingSecs} segundos antes de enviar otro mensaje.`);
      return;
    }

    setLoading(true);
    setErrorMsg('');

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (isSupabaseConfigured && supabase) {
      try {
        const currentEnv =
          import.meta.env.VITE_VERCEL_ENV === 'preview' ? 'development' :
            import.meta.env.VITE_VERCEL_ENV === 'production' ? 'production' :
              (import.meta.env.DEV ? 'development' : import.meta.env.MODE);

        const { error } = await supabase
          .from('contact_messages')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              subject: formData.subject || 'Sin Asunto',
              message: formData.message,
              environment: currentEnv,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) {
          console.warn('SupaBase error fallback to mailto:', error.message);
          triggerMailtoFallback();
        } else {
          localStorage.setItem('last_contact_sent_time', Date.now().toString());
          setSubmittedViaSupabase(true);
          setSubmitted(true);
        }
      } catch (err) {
        console.warn('Network error fallback to mailto:', err);
        triggerMailtoFallback();
      } finally {
        setLoading(false);
      }
    } else {
      triggerMailtoFallback();
      setLoading(false);
    }
  };

  const triggerMailtoFallback = () => {
    setSubmittedViaSupabase(false);
    setSubmitted(true);
    const mailtoSubject = encodeURIComponent(formData.subject || `Mensaje de ${formData.name} desde tu Portafolio Web`);
    const mailtoBody = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`);
    window.location.href = `mailto:edgar.vmontiel@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('edgar.vmontiel@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" style={{ padding: '40px 24px 60px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '6px' }}>
        CANALES DIRECTOS Y MENSAJERÍA
      </div>
      <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '20px' }}>
        Información de Contacto
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>

        {/* Left Column: Direct Info */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            ¿Tienes alguna propuesta o duda?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Estoy disponible para oportunidades laborales a tiempo completo, proyectos freelance de desarrollo web/Cloud DevOps o consultoría técnica.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Email Card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan-main)' }}>
                <Mail size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Correo Electrónico</div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>edgar.vmontiel@gmail.com</div>
              </div>
              <button
                onClick={copyEmailToClipboard}
                title="Copiar correo"
                style={{ background: 'none', border: 'none', color: 'var(--cyan-main)', cursor: 'pointer', padding: '4px' }}
              >
                {copiedEmail ? <CheckCircle2 size={18} color="var(--emerald-main)" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Phone Card */}
            <a
              href="tel:5584752143"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'inherit', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--emerald-main)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--emerald-main)' }}>
                <Phone size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Teléfono Directo</div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>+52 55 8475 2143</div>
              </div>
            </a>

            {/* LinkedIn Profile Card */}
            <a
              href="https://www.linkedin.com/in/edgar-vargas-465437200"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'inherit', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--cyan-main)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan-main)' }}>
                <LinkedinIcon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Red Profesional</div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>LinkedIn / Edgar Vargas</div>
              </div>
              <ExternalLink size={16} color="var(--text-muted)" />
            </a>

            {/* Location Card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--violet-main)' }}>
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Residencia</div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Santiago de Querétaro, Qro. Centro</div>
              </div>
            </div>

          </div>

          {/* WhatsApp Direct CTA */}
          <a
            href="https://wa.me/+525584752143?text=Hola%20Edgar,%20vi%20tu%20portafolio%20y%20me%20gustaria%20platicar%20contigo"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              background: '#25D366',
              color: '#ffffff',
              padding: '14px',
              borderRadius: '12px',
              fontWeight: '700',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
            }}
          >
            <MessageSquare size={18} />
            <span>Enviar WhatsApp Directo</span>
          </a>
        </div>

        {/* Right Column: Contact Form */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)' }}>
            Envía un Mensaje por Correo
          </h3>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle2 size={50} color="var(--emerald-main)" style={{ marginBottom: '16px' }} />
              <h4 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px' }}>
                {submittedViaSupabase ? '¡Mensaje Guardado en Supabase!' : '¡Mensaje Preparado!'}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
                {submittedViaSupabase
                  ? 'Tu mensaje ha sido registrado exitosamente en la base de datos PostgreSQL en Supabase. Edgar lo revisará a la brevedad.'
                  : 'Se ha abierto tu cliente de correo para enviar la solicitud directamente a edgar.vmontiel@gmail.com.'}
              </p>
              {submittedViaSupabase && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--cyan-main)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '20px' }}>
                  <Database size={14} />
                  Persistido en PostgreSQL Cloud
                </div>
              )}
              <div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  style={{
                    background: 'var(--cyan-main)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    color: '#000',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {errorMsg && (
                <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldAlert size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Campo Honeypot Invisible Anti-Spam (Detecta bots) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  autoComplete="off"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Tu Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. María González"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Tu Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ejemplo@empresa.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Asunto del Mensaje
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Propuesta laboral / Proyecto Web"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Mensaje *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escribe aquí tu mensaje..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? 'var(--text-muted)' : 'linear-gradient(135deg, var(--cyan-main), var(--violet-main))',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 15px var(--cyan-glow)'
                }}
              >
                {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={18} />}
                <span>{loading ? 'Guardando...' : 'Enviar Mensaje'}</span>
              </button>
            </form>
          )}

        </div>

      </div>

      {/* Recruiter Summary & Location Card */}
      <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Sparkles size={18} color="var(--cyan-main)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Ficha de Disponibilidad para Reclutadores & TI
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'center' }}>
          
          {/* Recruiter Key Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={16} color="var(--emerald-main)" />
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>Estado:</strong> <span style={{ color: 'var(--emerald-main)', fontWeight: '700' }}>Open to Work / Disponible</span>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Building2 size={16} color="var(--cyan-main)" />
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>Modalidad:</strong> Remoto 100% / Híbrido (Querétaro)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={16} color="var(--violet-main)" />
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>Zona Horaria:</strong> CST (UTC-6) · Horario México
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Briefcase size={16} color="var(--amber-main)" />
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>Incorporación:</strong> Inmediata / 2 Semanas
              </span>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
              <span className="tech-badge">Full-time</span>
              <span className="tech-badge">Software Engineer</span>
              <span className="tech-badge">Inglés B1/B2 (Técnico & Laboral)</span>
            </div>

          </div>

          {/* Location Map Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                <MapPin size={16} color="var(--cyan-main)" />
                Santiago de Querétaro, Qro.
              </div>
              <a
                href="https://maps.google.com/?q=Santiago+de+Querétaro,+Qro."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--cyan-main)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Globe size={13} />
                Abrir Maps ↗
              </a>
            </div>

            <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)', height: '150px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119501.13226840018!2d-100.48025793178795!3d20.612122843817115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35b8fdc5b9255%3A0x97b094aa561b832f!2sSantiago%20de%20Quer%C3%A9taro%2C%20Qro.!5e0!3m2!1ses-419!2smx!4v1657632908893!5m2!1ses-419!2smx"
                style={{ width: '100%', height: '100%', border: 'none', filter: 'contrast(102%) brightness(98%)' }}
                allowFullScreen=""
                loading="lazy"
                title="Ubicación Querétaro"
              ></iframe>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
