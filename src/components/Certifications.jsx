import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, Award, CheckCircle2, AlertCircle } from 'lucide-react';
import { FadeInSection, StaggerContainer, StaggerItem, SpotlightCard } from './MotionWrapper';

export default function Certifications() {
  const [filter, setFilter] = useState('all');

  const certs = [
    {
      institution: 'SCRUMstudy',
      title: 'Scrum Developer Certified (SDC®)',
      code: 'ID: 824166',
      verifyUrl: 'https://www.scrumstudy.com/certification/verify?type=SDC&number=824166',
      badge: 'Agile & Scrum',
      color: '#8b5cf6',
      status: 'Expirada'
    },
    {
      institution: 'SCRUMstudy',
      title: 'Scrum Fundamentals Certified (SFC™)',
      code: 'ID: 907479',
      verifyUrl: 'https://www.scrumstudy.com/certification/verify?type=SFC&number=907479',
      badge: 'Agile & Scrum',
      color: '#8b5cf6',
      status: 'Vigente'
    },
    {
      institution: 'Google Cloud Academy',
      title: 'Google Cloud Computing Foundations',
      code: 'Programa Súbete a la Nube INROADS',
      verifyUrl: '/assets/img/certificados/GoogleCloud.pdf',
      badge: 'Cloud & Infrastructure',
      color: '#4285f4',
      status: 'Vigente'
    },
    {
      institution: 'NDG / Cisco NetAcad',
      title: 'Linux Unhatched Certificate',
      code: 'Linux Systems Administration',
      verifyUrl: '/assets/img/certificados/NDG_Linux_Unhatc-certificate.pdf',
      badge: 'Linux SysAdmin',
      color: '#e95420',
      status: 'Vigente'
    },
    {
      institution: 'Udemy Academy',
      title: 'Windows Server 2012 y Linux Ubuntu Server',
      code: 'UC-6W1KYXMN',
      verifyUrl: 'https://www.udemy.com/certificate/UC-6W1KYXMN/',
      badge: 'Servers & Admin',
      color: '#a435f0',
      status: 'Vigente'
    },
    {
      institution: 'Udemy Academy',
      title: 'GIT y GITHUB desde 0!',
      code: 'Control de Versiones Profesional',
      verifyUrl: 'https://www.udemy.com/share/1035JQ3@F3hPykz2NwAwFzBjU5XFs0iTXBtb3LrfA9OuD5M83sw82YnP5V9lnxUXJnl5bMPJ/',
      badge: 'DevOps & Git',
      color: '#f05032',
      status: 'Vigente'
    },
    {
      institution: 'SoloLearn',
      title: 'HTML & Web Development Certificate',
      code: 'ID: 1014-18521821',
      verifyUrl: 'https://www.sololearn.com/Certificate/1014-18521821/jpg/',
      badge: 'Frontend',
      color: '#10b981',
      status: 'Vigente'
    },
    {
      institution: 'SoloLearn',
      title: 'PHP Programming Certificate',
      code: 'ID: 1059-18521821',
      verifyUrl: 'https://www.sololearn.com/Certificate/1059-18521821/jpg/',
      badge: 'Backend',
      color: '#777bb4',
      status: 'Vigente'
    },
    {
      institution: 'SoloLearn',
      title: 'JavaScript Course Certificate',
      code: 'ID: 18521821/1024',
      verifyUrl: 'https://www.sololearn.com/certificates/course/en/18521821/1024/landscape/png',
      badge: 'Frontend',
      color: '#f7df1e',
      status: 'Vigente'
    }
  ];

  const filteredCerts = filter === 'all'
    ? certs
    : certs.filter((c) => c.status === filter);

  const activeCount = certs.filter((c) => c.status === 'Vigente').length;
  const expiredCount = certs.filter((c) => c.status === 'Expirada').length;

  return (
    <FadeInSection id="certifications" style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '6px' }}>
        ACREDITACIONES OFICIALES
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', margin: 0 }}>
          Cursos & Certificaciones
        </h2>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-card)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          {[
            { id: 'all', label: `Todas (${certs.length})` },
            { id: 'Vigente', label: `Vigentes (${activeCount})` },
            { id: 'Expirada', label: `Expiradas (${expiredCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                background: filter === tab.id ? 'var(--cyan-main)' : 'transparent',
                color: filter === tab.id ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {filteredCerts.map((c, idx) => {
          const isVigente = c.status === 'Vigente';

          return (
            <StaggerItem key={idx}>
              <SpotlightCard className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '8px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      background: 'rgba(255,255,255,0.06)',
                      color: c.color,
                      border: `1px solid ${c.color}40`,
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      {c.badge}
                    </span>

                    {/* Status Pill */}
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      background: isVigente ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                      color: isVigente ? 'var(--emerald-main)' : 'var(--amber-main)',
                      border: isVigente ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
                    }}>
                      {isVigente ? (
                        <>
                          <CheckCircle2 size={13} color="var(--emerald-main)" />
                          <span>Vigente</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={13} color="var(--amber-main)" />
                          <span>Expirada</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>
                    {c.title}
                  </h3>

                  <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--cyan-main)', marginBottom: '8px' }}>
                    {c.institution}
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    {c.code}
                  </div>
                </div>

                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--cyan-main)';
                    e.currentTarget.style.color = 'var(--cyan-main)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  <ExternalLink size={14} />
                  Verificar Certificado
                </a>
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </FadeInSection>
  );
}


