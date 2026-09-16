import React from 'react';
import { ShieldCheck, ExternalLink, Award } from 'lucide-react';

export default function Certifications() {
  const certs = [
    {
      institution: 'SCRUMstudy',
      title: 'Scrum Developer Certified (SDC®)',
      code: 'ID: 824166',
      verifyUrl: 'https://www.scrumstudy.com/certification/verify?type=SDC&number=824166',
      badge: 'Agile & Scrum',
      color: '#8b5cf6'
    },
    {
      institution: 'SCRUMstudy',
      title: 'Scrum Fundamentals Certified (SFC™)',
      code: 'ID: 907479',
      verifyUrl: 'https://www.scrumstudy.com/certification/verify?type=SFC&number=907479',
      badge: 'Agile & Scrum',
      color: '#8b5cf6'
    },
    {
      institution: 'Google Cloud Academy',
      title: 'Google Cloud Computing Foundations',
      code: 'Programa Súbete a la Nube INROADS',
      verifyUrl: '/assets/img/certificados/GoogleCloud.pdf',
      badge: 'Cloud & Infrastructure',
      color: '#4285f4'
    },
    {
      institution: 'NDG / Cisco NetAcad',
      title: 'Linux Unhatched Certificate',
      code: 'Linux Systems Administration',
      verifyUrl: '/assets/img/certificados/NDG_Linux_Unhatc-certificate.pdf',
      badge: 'Linux SysAdmin',
      color: '#e95420'
    },
    {
      institution: 'Udemy Academy',
      title: 'Windows Server 2012 y Linux Ubuntu Server',
      code: 'UC-6W1KYXMN',
      verifyUrl: 'https://www.udemy.com/certificate/UC-6W1KYXMN/',
      badge: 'Servers & Admin',
      color: '#a435f0'
    },
    {
      institution: 'Udemy Academy',
      title: 'GIT y GITHUB desde 0!',
      code: 'Control de Versiones Profesional',
      verifyUrl: 'https://www.udemy.com/share/1035JQ3@F3hPykz2NwAwFzBjU5XFs0iTXBtb3LrfA9OuD5M83sw82YnP5V9lnxUXJnl5bMPJ/',
      badge: 'DevOps & Git',
      color: '#f05032'
    },
    {
      institution: 'SoloLearn',
      title: 'HTML & Web Development Certificate',
      code: 'ID: 1014-18521821',
      verifyUrl: 'https://www.sololearn.com/Certificate/1014-18521821/jpg/',
      badge: 'Frontend',
      color: '#10b981'
    },
    {
      institution: 'SoloLearn',
      title: 'PHP Programming Certificate',
      code: 'ID: 1059-18521821',
      verifyUrl: 'https://www.sololearn.com/Certificate/1059-18521821/jpg/',
      badge: 'Backend',
      color: '#777bb4'
    },
    {
      institution: 'SoloLearn',
      title: 'JavaScript Course Certificate',
      code: 'ID: 18521821/1024',
      verifyUrl: 'https://www.sololearn.com/certificates/course/en/18521821/1024/landscape/png',
      badge: 'Frontend',
      color: '#f7df1e'
    }
  ];

  return (
    <section id="certifications" style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '6px' }}>
        ACREDITACIONES OFICIALES
      </div>
      <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '20px' }}>
        Cursos & Certificaciones
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {certs.map((c, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
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
                <ShieldCheck size={18} color="var(--emerald-main)" />
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
          </div>
        ))}
      </div>
    </section>
  );
}
