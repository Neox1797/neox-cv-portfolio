import React, { useState, useEffect } from 'react';
import { Play, RefreshCw, Copy, Check } from 'lucide-react';
import { FadeInSection } from './MotionWrapper';
import { getEnvironmentInfo } from '../utils/envHelper';

function TypewriterLine({ text, type }) {
  const [displayedText, setDisplayedText] = useState(type === 'input' ? text : '');

  useEffect(() => {
    if (type === 'input') {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    const speed = 10;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, type]);

  return (
    <div style={{ color: type === 'input' ? 'var(--cyan-main)' : 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
      {displayedText}
    </div>
  );
}

export default function DevOpsTerminal({ onActivateMatrix }) {

  const [history, setHistory] = useState([
    { type: 'output', text: '⚡ Bienvenido a la consola interactiva de Edgar J. Vargas (DevOps & Software Engineer)' },
    { type: 'output', text: 'Escribe "help" o presiona uno de los comandos rápidos a continuación:' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);

  const commandHandler = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', text: `neox@devops-aws:~$ ${cmdStr}` }];

    if (cleanCmd.includes('hire-neox') || cleanCmd.includes('hire_neox') || cleanCmd.includes('hireneox')) {
      newHistory.push({
        type: 'output',
        text: `🚀 EJECUTANDO PAQUETE DE CONTRATACIÓN NEOX CORE v2.0...
==================================================
  Candidato  : Edgar J. Vargas Montiel
  Rol        : Fullstack Software Engineer & AI Practitioner
  Estado     : DISPONIBLE PARA CONTRATACIÓN / PROYECTOS 🟢
  Stack      : React, Angular, PHP, Java Spring, AWS, Linux, IA
  Ubicación  : Querétaro, MX (Remoto / Híbrido)
  Contacto   : edgar.vmontiel@gmail.com | +52 55 8475 2143
==================================================
⚡ Cargando interfaz Matrix Rain...`
      });
      setHistory(newHistory);
      setInputVal('');
      if (onActivateMatrix) {
        setTimeout(() => {
          onActivateMatrix();
        }, 1200);
      }
      return;
    }

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Comandos disponibles:
  • help         : Muestra esta ayuda
  • env          : Diagnóstico del entorno activo (Local / Develop / Master)
  • about        : Resumen profesional de Edgar
  • skills       : Habilidades principales (AWS, Linux, Angular, Spring)
  • exp          : Experiencia laboral reciente
  • projects     : Portafolio de proyectos destacados
  • certs        : Certificaciones (Scrum, AWS, Udemy, Linux)
  • contact      : Datos de contacto directo
  • clear        : Limpiar la pantalla`
        });
        break;



      case 'matrix':
      case 'blackout':
      case 'dark':
      case 'hack':
        newHistory.push({
          type: 'output',
          text: `⚡ ACTIVANDO MODO BLACKOUT MATRIX HACKER...
🟢 Conectando con servidor seguro... [OK]
🟢 Sobrescribiendo interfaz global... [OK]
Presiona ESC o haz clic en el botón de la pantalla para restaurar el sitio.`
        });
        if (onActivateMatrix) {
          onActivateMatrix();
        }
        break;

      case 'env':
      case 'sys': {
        const env = getEnvironmentInfo();
        newHistory.push({
          type: 'output',
          text: `🌐 DIAGNÓSTICO DE ENTORNO DE DESPLIEGUE:
  • Entorno   : ${env.fullLabel} ${env.icon}
  • Rama Git  : ${env.branch}
  • Vercel Env: ${env.vercelEnv}
  • Commit SHA: ${env.commitSha}
  • Detalles  : ${env.description}`
        });
        break;
      }

      case 'about':
        newHistory.push({
          type: 'output',
          text: `📄 Edgar J. Vargas Montiel | Ingeniero en Sistemas Computacionales
Ubicación: Querétaro, MX
Rol Actual: Ingeniero de Software / AMS & Cloud en Encontrack SA de CV.
Especialidades: Mantenimiento e integración de microservicios, AWS Linux, Spring Boot, Angular, PHP, CI/CD.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `🛠️ Habilidades Técnicas:
  [Frontend] : HTML5, CSS3, JavaScript (ES6+), Angular (80%), React (30%), Bootstrap
  [Backend]  : PHP (60%), Java Spring (40%), Node.js (60%), Express, REST APIs
  [Cloud/Sys]: AWS EC2/S3/CodeCommit, Linux Red Hat / Ubuntu (75%), Apache Tomcat
  [Bases D.] : SQL, MySQL (80%), PostgreSQL
  [Agile]    : Scrum Certified SDC®, SDC Fundamentals, Kanban`
        });
        break;

      case 'exp':
        newHistory.push({
          type: 'output',
          text: `💼 Experiencia Profesional:
  1. Encontrack SA de CV (Actualidad) - Software Engineer / AMS & Cloud (AWS, PHP, Spring, Angular)
  2. INDRA Software Labs (2022) - Analista Programador COBOL II Mainframe
  3. Grupo CEFI (2019 - 2022) - Soporte Infraestructura TI (Estándares VW)
  4. BackLab Agency (2020 - 2021) - Desarrollador Frontend
  5. Automotriz Zumpango (2017 - 2018) - Auxiliar de Sistemas & Web`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `🚀 Proyectos Destacados:
  • Sitio Web Modo Oscuro : https://neox1797.github.io/modooscuro/
  • Plataforma E-Commerce : https://neox1797.github.io/ecommerce/
  • App de Clima Local    : https://github.com/Neox1797/Clima
  • Frontend HAVE Abogados: Proyecto Maquetado Bootstrap
  • Lista Tareas & Calc  : Proyectos de aprendizaje interactivo`
        });
        break;

      case 'certs':
        newHistory.push({
          type: 'output',
          text: `📜 Certificaciones:
  🏆 SCRUMstudy - Scrum Developer Certified (SDC®)
  🏆 SCRUMstudy - Scrum Fundamentals Certified (SFC™)
  ☁️ Google Cloud Computing Foundations ACADEMY - INROADS
  🐧 NDG Linux Unhatched Certificate
  🎓 Udemy - Windows Server & Linux Ubuntu Server
  🎓 SoloLearn - HTML, PHP, JavaScript Certificates`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `📫 Información de Contacto:
  • Email   : edgar.vmontiel@gmail.com
  • Teléfono: +52 55 8475 2143
  • WhatsApp: https://wa.me/+525584752143
  • LinkedIn: https://www.linkedin.com/in/edgar-vargas-465437200`
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case '':
        break;

      default:
        newHistory.push({
          type: 'output',
          text: `bash: comando no encontrado: ${cmdStr}. Escribe "help" para ver los comandos válidos.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      commandHandler(inputVal);
    }
  };

  const quickCmds = ['help', 'env', 'about', 'skills', 'exp', 'projects', 'certs', 'contact', 'clear'];

  const copyTerminalOutput = () => {
    const textToCopy = history.map(h => h.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <FadeInSection id="terminal" style={{ padding: '36px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '6px', textAlign: 'center' }}>
        CLOUDSHELL & DEVOPS INTERACTIVO
      </div>
      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', textAlign: 'center', marginBottom: '20px' }}>
        Terminal de Comandos Virtual
      </h2>

      {/* Terminal Container */}
      <div style={{
        background: 'var(--terminal-bg)',
        borderRadius: '16px',
        border: '1px solid var(--terminal-border)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden'
      }}>
        {/* Terminal Header */}
        <div style={{
          background: 'var(--terminal-header-bg)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', flexShrink: 0 }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }}></div>
            <span className="terminal-header-title" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '6px', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              bash - neox@devops-aws:~
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <button
              onClick={copyTerminalOutput}
              title="Copiar contenido de terminal"
              style={{
                background: 'var(--icon-box-bg)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '4px 8px',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {copied ? <Check size={14} color="var(--emerald-main)" /> : <Copy size={14} />}
              <span className="terminal-btn-text">{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
            <button
              onClick={() => commandHandler('clear')}
              title="Limpiar pantalla"
              style={{
                background: 'var(--icon-box-bg)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '4px 8px',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RefreshCw size={14} />
              <span className="terminal-btn-text">Clear</span>
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div style={{
          padding: '16px',
          minHeight: '260px',
          maxHeight: '380px',
          overflowY: 'auto',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.82rem',
          lineHeight: '1.6',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {history.map((item, idx) => (
            <TypewriterLine key={idx} text={item.text} type={item.type} />
          ))}


          {/* Prompt Input Line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <span className="terminal-prompt-full" style={{ color: 'var(--emerald-main)', fontWeight: '700', flexShrink: 0 }}>neox@devops-aws:~$</span>
            <span className="terminal-prompt-short" style={{ color: 'var(--emerald-main)', fontWeight: '700', flexShrink: 0, display: 'none' }}>neox:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe 'help'..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.85rem',
                outline: 'none',
                minWidth: '0'
              }}
            />
          </div>
        </div>

        {/* Terminal Footer Quick Command Buttons */}
        <div style={{
          background: 'var(--terminal-footer-bg)',
          padding: '10px 14px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600', marginRight: '2px' }}>RÁPIDOS:</span>
          {quickCmds.map((cmd) => (
            <button
              key={cmd}
              onClick={() => commandHandler(cmd)}
              style={{
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '6px',
                padding: '4px 8px',
                color: 'var(--cyan-main)',
                fontSize: '0.72rem',
                fontFamily: 'JetBrains Mono, monospace',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)')}
            >
              {cmd}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="terminal-enter-hint" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Presiona Enter para ejecutar</span>
            <button
              onClick={() => commandHandler(inputVal)}
              style={{
                background: 'var(--cyan-main)',
                border: 'none',
                borderRadius: '4px',
                width: '26px',
                height: '26px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Play size={12} fill="#000" />
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Styles for Terminal */}
      <style>{`
        @media (max-width: 540px) {
          .terminal-enter-hint { display: none !important; }
          .terminal-btn-text { display: none !important; }
        }
        @media (max-width: 480px) {
          .terminal-prompt-full { display: none !important; }
          .terminal-prompt-short { display: inline !important; }
        }
      `}</style>
    </FadeInSection>
  );
}
