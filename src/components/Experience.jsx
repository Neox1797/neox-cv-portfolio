import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { FadeInSection, StaggerContainer, StaggerItem } from './MotionWrapper';

export default function Experience() {
  const [activeSection, setActiveSection] = useState('work'); // 'work' or 'education'
  const [expandedItems, setExpandedItems] = useState({ 0: true });

  const toggleExpand = (idx) => {
    setExpandedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const workExperience = [
    {
      company: 'Encontrack SA de CV',
      role: 'Ingeniero de Software / AMS & Cloud',
      period: 'Actualidad',
      location: 'Querétaro, MX (Híbrido)',
      highlights: [
        'Mantenimiento y optimización de microservicios empresariales en PHP, Angular y Java Spring Boot, reduciendo tiempos de latencia en APIs en un 25%.',
        'Despliegue y administración de aplicaciones sobre servidores Linux Red Hat y Apache Tomcat, manteniendo una disponibilidad operacional del 99.9%.',
        'Diseño y desarrollo de endpoints RESTful seguros con Express.js para consumo de clientes corporativos.',
        'Control de versión y ramificación en AWS CodeCommit bajo metodología ágil Kanban y entrega continua (CI/CD).'
      ],
      techs: ['Spring Boot', 'Angular', 'PHP', 'Express', 'Linux Red Hat', 'AWS CodeCommit', 'Kanban']
    },
    {
      company: 'INDRA Software Labs',
      role: 'Analista Programador COBOL II Mainframe',
      period: 'Enero 2022 - Junio 2022',
      location: 'CDMX (Home Office)',
      highlights: [
        'Mantenimiento correctivo y evolutivo a módulos COBOL II en Mainframe/Host para aplicaciones bancarias de procesamiento masivo.',
        'Aplicación práctica de metodologías ágiles avalada por la certificación oficial Scrum Developer Certified (SDC®).'
      ],
      techs: ['COBOL II', 'Mainframe / Host', 'Scrum SDC®', 'Sistemas Bancarios']
    },
    {
      company: 'GRUPO CEFI SC',
      role: 'Soporte e Infraestructura TI',
      period: 'Mayo 2019 - Enero 2022',
      location: 'Querétaro, MX',
      highlights: [
        'Supervisión y soporte técnico Nivel 2 a infraestructuras TI en agencias automotrices bajo lineamientos corporativos de Volkswagen.',
        'Administración de Active Directory en Windows Server, estructuración de redes y resolución de incidencias en tiempos récord.'
      ],
      techs: ['Windows Server', 'Active Directory', 'Redes & Racks', 'Soporte Nivel 2']
    },
    {
      company: 'BackLab Agency',
      role: 'Desarrollador Web Frontend',
      period: 'Diciembre 2020 - Enero 2021',
      location: 'EDOMEX (Remote)',
      highlights: [
        'Maquetación web responsive optimizada para UX/UI utilizando Bootstrap 5, HTML5 y JavaScript ES6+.',
        'Integración de formularios dinámicos con PHPMailer y administración de hosting/DNS vía cPanel.'
      ],
      techs: ['Bootstrap 5', 'JavaScript ES6+', 'PHPMailer', 'cPanel']
    },
    {
      company: 'Automotriz Zumpango S.A. de C.V.',
      role: 'Auxiliar de Sistemas y Practicante',
      period: '2017 - 2018',
      location: 'Zumpango, EDOMEX',
      highlights: [
        'Desarrollo del sitio web corporativo en PHP/JS para la concesionaria Volkswagen Zumpango.',
        'Implementación de portal cautivo Hotspot para clientes y administración de respaldos programados en File Server.'
      ],
      techs: ['PHP', 'JavaScript', 'File Server', 'Portal Hotspot']
    }
  ];

  const educationList = [
    {
      institution: 'Universidad Bancaria de México (UBAM)',
      degree: 'Ingeniería en Sistemas Computacionales',
      period: '2015 - 2019',
      location: 'Teoloyucan, EDOMEX',
      details: 'Formación académica orientada a arquitectura de software, bases de datos relacionales y Programación Orientada a Objetos (POO).'
    },
    {
      institution: 'CDC Centro Integrador San Miguel',
      degree: 'Técnico en Reparación de Celulares (Básico & Avanzado)',
      period: '2018',
      location: 'Zumpango, EDOMEX',
      details: 'Diagnóstico por hardware y software, micro-soldadura y mantenimiento correctivo a dispositivos móviles.'
    },
    {
      institution: 'Preparatoria Oficial Anexa a la Normal',
      degree: 'Preparatoria General',
      period: '2012 - 2015',
      location: 'Zumpango, EDOMEX',
      details: 'Formación general con énfasis en ciencias exactas, análisis lógico y habilidades comunicativas.'
    }
  ];

  return (
    <FadeInSection id="experience" style={{ padding: '36px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '6px' }}>
        TRAYECTORIA Y FORMACIÓN
      </div>
      <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: '800', marginBottom: '20px' }}>
        Experiencia Profesional & Educación
      </h2>

      {/* Switcher Tabs */}
      <div className="exp-tabs-container" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveSection('work')}
          className="exp-tab-btn"
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            border: activeSection === 'work' ? '1px solid var(--cyan-main)' : '1px solid var(--border)',
            background: activeSection === 'work' ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card)',
            color: activeSection === 'work' ? 'var(--cyan-main)' : 'var(--text-secondary)',
            fontWeight: '700',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flex: '1 1 180px'
          }}
        >
          <Briefcase size={18} />
          <span>Experiencia Laboral</span>
        </button>

        <button
          onClick={() => setActiveSection('education')}
          className="exp-tab-btn"
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            border: activeSection === 'education' ? '1px solid var(--violet-main)' : '1px solid var(--border)',
            background: activeSection === 'education' ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-card)',
            color: activeSection === 'education' ? 'var(--violet-main)' : 'var(--text-secondary)',
            fontWeight: '700',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flex: '1 1 180px'
          }}
        >
          <GraduationCap size={18} />
          <span>Educación Académica</span>
        </button>
      </div>

      {/* Work Timeline */}
      {activeSection === 'work' && (
        <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {workExperience.map((item, idx) => (
            <StaggerItem key={idx} className="glass-panel" style={{ padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
              
              {/* Header Bar */}
              <div
                onClick={() => toggleExpand(idx)}
                className="exp-header-bar"
                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: '12px' }}
              >
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {item.role}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--cyan-main)', marginTop: '2px' }}>
                    {item.company}
                  </div>
                </div>

                <div className="exp-right-meta" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="exp-meta-text" style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--emerald-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      {item.period}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <MapPin size={12} />
                      {item.location}
                    </div>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}>
                    {expandedItems[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {/* Collapsible Details */}
              {expandedItems[idx] && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                    {item.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        <CheckCircle2 size={15} color="var(--cyan-main)" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.techs.map((t, i) => (
                      <span key={i} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {/* Education List */}
      {activeSection === 'education' && (
        <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {educationList.map((edu, idx) => (
            <StaggerItem key={idx} className="glass-panel" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '10px', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>{edu.degree}</h3>
                  <div style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--violet-main)' }}>{edu.institution}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--emerald-main)' }}>{edu.period}</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{edu.details}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 600px) {
          .exp-header-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .exp-right-meta {
            width: 100% !important;
            justify-content: space-between !important;
          }
          .exp-meta-text {
            text-align: left !important;
          }
        }
      `}</style>
    </FadeInSection>
  );
}
