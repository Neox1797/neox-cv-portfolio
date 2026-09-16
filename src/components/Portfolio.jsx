import React, { useState } from 'react';
import { ExternalLink, Eye, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [activeModalImg, setActiveModalImg] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Plataforma E-COMMERCE',
      category: 'fullstack',
      image: '/assets/img/portfolio/portfolio-3.jpg',
      description: 'Tienda en línea interactiva con catálogo dinámico de productos, carrito de compras y diseño 100% adaptativo.',
      demoUrl: 'https://neox1797.github.io/ecommerce/index.html',
      repoUrl: 'https://github.com/Neox1797/ecommerce',
      tags: ['JavaScript', 'HTML5', 'E-Commerce', 'Responsive UX']
    },
    {
      id: 2,
      title: 'App Clima Local (OpenWeather API)',
      category: 'fullstack',
      image: '/assets/img/portfolio/portfolio-6.jpeg',
      description: 'Aplicación web interactiva para consulta del pronóstico meteorológico consumiendo la API REST de OpenWeather.',
      demoUrl: 'https://github.com/Neox1797/Clima',
      repoUrl: 'https://github.com/Neox1797/Clima',
      tags: ['REST API', 'JavaScript ES6+', 'JSON', 'CSS Flexbox']
    },
    {
      id: 3,
      title: 'Motor de Tematización Día / Noche',
      category: 'frontend',
      image: '/assets/img/portfolio/portfolio-2.gif',
      description: 'Implementación interactiva de cambio de tema en tiempo real con JavaScript ES6+, localStorage y CSS3 variables.',
      demoUrl: 'https://neox1797.github.io/modooscuro/',
      repoUrl: 'https://github.com/Neox1797/modooscuro',
      tags: ['JavaScript', 'CSS3', 'HTML5', 'LocalStorage']
    },
    {
      id: 4,
      title: 'Frontend HAVE ABOGADOS',
      category: 'frontend',
      image: '/assets/img/portfolio/portfolio-1.jpg',
      description: 'Sitio web corporativo maquetado para bufete legal utilizando Bootstrap, JavaScript y PHPMailer.',
      demoUrl: '#',
      repoUrl: '#',
      tags: ['Bootstrap', 'PHPMailer', 'JavaScript', 'cPanel']
    },
    {
      id: 5,
      title: 'Gestor de Tareas Interactivo',
      category: 'frontend',
      image: '/assets/img/portfolio/portfolio-4.png',
      description: 'Aplicación para gestión de tareas (To-Do List) con persistencia de datos y Bootstrap 5.',
      demoUrl: 'https://github.com/Neox1797/ListaTareasBV5',
      repoUrl: 'https://github.com/Neox1797/ListaTareasBV5',
      tags: ['Bootstrap 5', 'JavaScript', 'CRUD']
    },
    {
      id: 6,
      title: 'Calculadora Web Dinámica',
      category: 'frontend',
      image: '/assets/img/portfolio/portfolio-5.jpeg',
      description: 'Calculadora funcional para operaciones matemáticas rápidas desarrollada con manipulación de DOM en JS.',
      demoUrl: 'https://github.com/Neox1797/calculadoraBV5',
      repoUrl: 'https://github.com/Neox1797/calculadoraBV5',
      tags: ['Bootstrap 5', 'JavaScript', 'DOM']
    }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '6px' }}>
        PORTAFOLIO DE PROYECTOS
      </div>
      <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '20px' }}>
        Trabajos & Desarrollos Destacados
      </h2>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {[
          { id: 'all', label: 'Todos los Proyectos' },
          { id: 'frontend', label: 'Frontend & UI' },
          { id: 'fullstack', label: 'Fullstack & APIs' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: filter === tab.id ? '1px solid var(--cyan-main)' : '1px solid var(--border)',
              background: filter === tab.id ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card)',
              color: filter === tab.id ? 'var(--cyan-main)' : 'var(--text-secondary)',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {filteredProjects.map((p) => (
          <div key={p.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            
            {/* Image Preview Container */}
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#111827' }}>
              <img
                src={p.image}
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
              <button
                onClick={() => setActiveModalImg(p.image)}
                title="Ampliar vista previa"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Eye size={18} />
              </button>
            </div>

            {/* Content Container */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {p.tags.map((t, idx) => (
                    <span key={idx} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                {p.demoUrl !== '#' && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      textDecoration: 'none',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: 'var(--cyan-main)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}

                {p.repoUrl !== '#' && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      textDecoration: 'none',
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <GithubIcon size={14} />
                    Código
                  </a>
                )}
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Image Modal Lightbox */}
      {activeModalImg && (
        <div
          onClick={() => setActiveModalImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <img
            src={activeModalImg}
            alt="Preview"
            style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '12px', border: '2px solid var(--cyan-main)' }}
          />
        </div>
      )}
    </section>
  );
}
