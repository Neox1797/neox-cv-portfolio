import React from 'react';
import { User, Calendar, MapPin, Globe, Mail, Phone, Award, Briefcase, Code, ShieldCheck } from 'lucide-react';
import { FadeInSection, StaggerContainer, StaggerItem } from './MotionWrapper';

export default function About() {
  const metrics = [
    { label: 'Años de Experiencia', value: '5+', icon: <Briefcase size={22} color="var(--cyan-main)" /> },
    { label: 'Certificaciones Profesionales', value: '10+', icon: <Award size={22} color="var(--violet-main)" /> },
    { label: 'Proyectos & Despliegues', value: '15+', icon: <Code size={22} color="var(--emerald-main)" /> },
    { label: 'Disponibilidad Infraestructura', value: '99.9%', icon: <ShieldCheck size={22} color="var(--amber-main)" /> },
  ];

  const personalData = [
    { label: 'Cumpleaños', val: '17 Noviembre 1997', icon: <Calendar size={16} /> },
    { label: 'Ubicación', val: 'Santiago de Querétaro, Qro.', icon: <MapPin size={16} /> },
    { label: 'Email', val: 'edgar.vmontiel@gmail.com', icon: <Mail size={16} /> },
    { label: 'Teléfono', val: '+52 55 8475 2143', icon: <Phone size={16} /> },
    { label: 'Nacionalidad', val: 'Mexicana', icon: <Globe size={16} /> },
    { label: 'Idiomas', val: 'Español (Nativo) / Inglés (Intermedio)', icon: <User size={16} /> },
  ];

  return (
    <FadeInSection id="about" style={{ padding: '60px 20px 40px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '6px' }}>
        PRESENTACIÓN PROFESIONAL
      </div>
      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', marginBottom: '20px' }}>
        Sobre Mí & Enfoque Técnico
      </h2>

      {/* Metrics Row */}
      <StaggerContainer className="about-metrics-grid" style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
        {metrics.map((m, idx) => (
          <StaggerItem key={idx} className="glass-card about-metric-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="about-metric-icon" style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'var(--icon-box-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border)',
              flexShrink: 0
            }}>
              {m.icon}
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.3 }}>
                {m.label}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Bio and Personal Details */}
      <StaggerContainer className="about-details-grid" style={{ display: 'grid', gap: '20px' }}>
        
        {/* Bio text */}
        <StaggerItem className="glass-panel about-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '14px', color: 'var(--cyan-main)' }}>
            Perfil de Ingeniería de Software
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.65', fontSize: '0.92rem' }}>
            Soy un profesional enfocado en superar constantes retos técnicos y expandir los horizontes tecnológicos adquiridos en mi formación académica y experiencia corporativa.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.92rem' }}>
            Me destaco por mi capacidad para intervenir en soluciones técnicas críticas, desarrollo backend con Spring Boot/PHP, maquetación ágil frontend en Angular y React, integración de microservicios y soporte continuo con metodología Scrum / Agile.
          </p>
        </StaggerItem>

        {/* Quick Details Table */}
        <StaggerItem className="glass-panel about-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '18px', color: 'var(--violet-main)' }}>
            Datos Personales
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {personalData.map((item, idx) => (
              <div key={idx} className="about-detail-row" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '4px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ color: 'var(--cyan-main)', flexShrink: 0 }}>{item.icon}</div>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: '500' }}>{item.label}:</span>
                </div>
                <div className="about-detail-val" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', wordBreak: 'break-word' }}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>

      </StaggerContainer>

      {/* Responsive Breakpoint Styles */}
      <style>{`
        .about-metrics-grid {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        .about-details-grid {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        @media (max-width: 520px) {
          .about-panel {
            padding: 18px 16px !important;
          }
          .about-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-metric-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 14px 12px !important;
          }
          .about-metric-icon {
            width: 36px !important;
            height: 36px !important;
          }
          .about-details-grid {
            grid-template-columns: 1fr !important;
          }
          .about-detail-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 2px !important;
          }
          .about-detail-val {
            text-align: left !important;
            padding-left: 24px;
          }
        }
      `}</style>
    </FadeInSection>
  );
}

