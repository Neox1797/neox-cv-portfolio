import React, { useState } from 'react';
import { Code, Server, Cloud, Database, Heart, BookOpen, Music, Shield, Dumbbell, Plane, Cpu } from 'lucide-react';
import { FadeInSection, StaggerContainer, StaggerItem, AnimatedProgressBar } from './MotionWrapper';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas las Habilidades' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'cloud', name: 'Cloud & DevOps' },
    { id: 'db', name: 'Bases de Datos & OS' },
  ];

  const skillItems = [
    { name: 'HTML5 / CSS3', category: 'frontend', pct: 85, color: '#e34f26' },
    { name: 'JavaScript (ES6+)', category: 'frontend', pct: 75, color: '#f7df1e' },
    { name: 'Angular Framework', category: 'frontend', pct: 80, color: '#dd0031' },
    { name: 'React.js', category: 'frontend', pct: 65, color: '#61dafb' },
    { name: 'Bootstrap / CSS UI', category: 'frontend', pct: 85, color: '#7952b3' },

    { name: 'PHP / Laravel Ecosystem', category: 'backend', pct: 70, color: '#777bb4' },
    { name: 'Java / Spring Boot', category: 'backend', pct: 60, color: '#007396' },
    { name: 'Node.js / Express APIs', category: 'backend', pct: 65, color: '#339933' },
    { name: 'COBOL II Mainframe', category: 'backend', pct: 50, color: '#005596' },

    { name: 'AWS Cloud (EC2, S3, CodeCommit)', category: 'cloud', pct: 75, color: '#ff9900' },
    { name: 'Linux Red Hat / Ubuntu', category: 'cloud', pct: 80, color: '#e95420' },
    { name: 'Apache Tomcat Supervisor', category: 'cloud', pct: 70, color: '#f8dc75' },
    { name: 'CI/CD Automated Pipelines', category: 'cloud', pct: 70, color: '#38bdf8' },

    { name: 'SQL / MySQL / MariaDB', category: 'db', pct: 80, color: '#00758f' },
    { name: 'PostgreSQL', category: 'db', pct: 65, color: '#336791' },
    { name: 'Git & GitHub Version Control', category: 'db', pct: 85, color: '#f05032' },
  ];

  const hobbies = [
    { name: 'Exploración Musical', desc: 'Guitarra y Piano', icon: <Music size={20} color="var(--cyan-main)" /> },
    { name: 'GYM & Resistencia', desc: 'Levantamiento de pesas', icon: <Dumbbell size={20} color="var(--violet-main)" /> },
    { name: 'Deportes de Contacto', desc: 'Boxeo y disciplina personal', icon: <Shield size={20} color="var(--emerald-main)" /> },
    { name: 'Lectura & Mangas', desc: 'Ficción y libros técnicos', icon: <BookOpen size={20} color="var(--amber-main)" /> },
    { name: 'Viajes & Culturas', desc: 'Explorar horizontes', icon: <Plane size={20} color="#ec4899" /> },
    { name: 'Aprendizaje Continuo', desc: 'Cursos en línea e idiomas', icon: <Cpu size={20} color="var(--cyan-main)" /> },
  ];

  const filteredSkills = activeTab === 'all' ? skillItems : skillItems.filter((s) => s.category === activeTab);

  return (
    <FadeInSection id="skills" style={{ padding: '36px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '6px' }}>
        DOMINIO TÉCNICO Y PASATIEMPOS
      </div>
      <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: '800', marginBottom: '20px' }}>
        Matriz de Habilidades & Stack
      </h2>

      {/* Category Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '30px',
              border: activeTab === cat.id ? '1px solid var(--cyan-main)' : '1px solid var(--border)',
              background: activeTab === cat.id ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card)',
              color: activeTab === cat.id ? 'var(--cyan-main)' : 'var(--text-secondary)',
              fontWeight: '600',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skill Progress Bars Grid */}
      <StaggerContainer key={activeTab} className="skills-grid" style={{ display: 'grid', gap: '14px', marginBottom: '32px' }}>
        {filteredSkills.map((sk, idx) => (
          <StaggerItem key={sk.name} className="glass-card" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-primary)' }}>{sk.name}</span>
              <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--cyan-main)' }}>{sk.pct}%</span>
            </div>
            <AnimatedProgressBar pct={sk.pct} color={sk.color} />
          </StaggerItem>
        ))}
      </StaggerContainer>


      {/* Hobbies / Soft Skills Sub-section */}
      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)' }}>
        Pasatiempos & Desarrollo Personal
      </h3>
      <StaggerContainer className="hobbies-grid" style={{ display: 'grid', gap: '14px' }}>
        {hobbies.map((hob, idx) => (
          <StaggerItem key={idx} className="glass-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--icon-box-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border)',
              flexShrink: 0
            }}>
              {hob.icon}
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-primary)' }}>{hob.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{hob.desc}</div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Responsive Styles for Skills */}
      <style>{`
        .skills-grid {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        .hobbies-grid {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        @media (max-width: 540px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
          .hobbies-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 360px) {
          .hobbies-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </FadeInSection>
  );
}
