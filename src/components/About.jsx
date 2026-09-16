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
    <FadeInSection id="about" style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '6px' }}>
        PRESENTACIÓN PROFESIONAL
      </div>
      <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '20px' }}>
        Sobre Mí & Enfoque Técnico
      </h2>

      {/* Metrics Row */}
      <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {metrics.map((m, idx) => (
          <StaggerItem key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border)'
            }}>
              {m.icon}
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1 }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {m.label}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Bio and Personal Details */}
      <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        
        {/* Bio text */}
        <StaggerItem className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px', color: 'var(--cyan-main)' }}>
            Perfil de Ingeniería de Software
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' }}>
            Soy un profesional enfocado en superar constantes retos técnicos y expandir los horizontes tecnológicos adquiridos en mi formación académica y experiencia corporativa.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Me destaco por mi capacidad para intervenir en soluciones técnicas críticas, desarrollo backend con Spring Boot/PHP, maquetación ágil frontend en Angular y React, integración de microservicios y soporte continuo con metodología Scrum / Agile.
          </p>
        </StaggerItem>

        {/* Quick Details Table */}
        <StaggerItem className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: 'var(--violet-main)' }}>
            Datos Personales
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {personalData.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--cyan-main)' }}>{item.icon}</div>
                <div style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.label}:</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </StaggerItem>

      </StaggerContainer>
    </FadeInSection>
  );
}

