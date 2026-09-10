import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, CheckCircle2, Copy, ExternalLink, ArrowRight, ShieldAlert, Database, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

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
        const { error } = await supabase
          .from('contact_messages')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              subject: formData.subject || 'Sin Asunto',
              message: formData.message,
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
    <section id="contact" style={{ padding: '80px 24px 100px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '8px' }}>
        CANALES DIRECTOS Y MENSAJERÍA
      </div>
      <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '32px' }}>
        Información de Contacto
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '60px' }}>
        
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
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'inherit' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--emerald-main)' }}>
                <Phone size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Teléfono Directo</div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>+52 55 8475 2143</div>
              </div>
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
            href="https://wa.me/+525584752143?text=Hola%20Edgar,%20quisiera%20ponerme%20en%20contacto%20contigo"
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
            <span>Enviar mensaje directo por WhatsApp</span>
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
                  Asunto
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

      {/* Google Maps iFrame */}
      <div className="glass-panel" style={{ overflow: 'hidden', padding: '8px', marginBottom: '60px' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119501.13226840018!2d-100.48025793178795!3d20.612122843817115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35b8fdc5b9255%3A0x97b094aa561b832f!2sSantiago%20de%20Quer%C3%A9taro%2C%20Qro.!5e0!3m2!1ses-419!2smx!4v1657632908893!5m2!1ses-419!2smx"
          style={{ width: '100%', height: '280px', border: 'none', borderRadius: '12px' }}
          allowFullScreen=""
          loading="lazy"
          title="Ubicación Querétaro"
        ></iframe>
      </div>

      {/* Hosting & Redirection Strategy Box */}
      <div className="glass-panel" style={{ padding: '32px', borderLeft: '4px solid var(--cyan-main)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <Globe size={22} color="var(--cyan-main)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Guía de Alojamiento Gratuito y Redirección
          </h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px', lineHeight: '1.6' }}>
          Para publicar esta nueva página web y hacer que la antigua (<code>neoxdevops.atwebpages.com</code>) redirija automáticamente a la nueva:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <h4 style={{ color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '6px' }}>1. Opción Hosting Gratuito (Vercel / Netlify)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Subes tu código a GitHub y lo conectas a Vercel.com o Netlify.com. Es 100% gratis, incluye SSL HTTPS automático y CDN ultra rápido.
            </p>
          </div>

          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <h4 style={{ color: 'var(--violet-main)', fontWeight: '700', marginBottom: '6px' }}>2. Opción GitHub Pages</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Puedes alojarlo gratis como <code>neox1797.github.io/cv</code> ejecutando <code>npm run build</code> y publicándolo directamente en tu cuenta de GitHub.
            </p>
          </div>

          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <h4 style={{ color: 'var(--emerald-main)', fontWeight: '700', marginBottom: '6px' }}>3. Redirección desde Hosting Antiguo</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Reemplazas el archivo <code>index.html</code> en <code>atwebpages.com</code> con una etiqueta Meta Refresh y script que redirija en 0 segundos a tu nueva URL.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
