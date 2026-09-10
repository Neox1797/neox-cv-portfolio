import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, Copy, Check } from 'lucide-react';

export default function DevOpsTerminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: '⚡ Bienvenido a la consola interactiva de Edgar J. Vargas (DevOps & Software Engineer)' },
    { type: 'output', text: 'Escribe "help" o presiona uno de los comandos rápidos a continuación:' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);

  const commandHandler = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', text: `neox@devops-aws:~$ ${cmdStr}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Comandos disponibles:
  • help         : Muestra esta ayuda
  • about        : Resumen profesional de Edgar
  • skills       : Habilidades principales (AWS, Linux, Angular, Spring)
  • exp          : Experiencia laboral reciente
  • projects     : Portafolio de proyectos destacados
  • certs        : Certificaciones (Scrum, AWS, Udemy, Linux)
  • contact      : Datos de contacto directo
  • clear        : Limpiar la pantalla`
        });
        break;

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

  const quickCmds = ['help', 'about', 'skills', 'exp', 'projects', 'certs', 'contact', 'clear'];

  const copyTerminalOutput = () => {
    const textToCopy = history.map(h => h.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--cyan-main)', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
        CLOUDSHELL & DEVOPS INTERACTIVO
      </div>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '32px' }}>
        Terminal de Comandos Virtual
      </h2>

      {/* Terminal Container */}
      <div style={{
        background: '#0a0d14',
        borderRadius: '16px',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 25px rgba(56,189,248,0.1)',
        overflow: 'hidden'
      }}>
        {/* Terminal Header */}
        <div style={{
          background: '#121722',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
            <span style={{ marginLeft: '12px', fontSize: '0.85rem', color: '#9ca3af', fontFamily: 'JetBrains Mono, monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TerminalIcon size={14} color="var(--cyan-main)" />
              neox@aws-cloud-us-east-1:~ (zsh)
            </span>
          </div>

          <button
            onClick={copyTerminalOutput}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem'
            }}
            title="Copiar texto de la terminal"
          >
            {copied ? <Check size={14} color="var(--emerald-main)" /> : <Copy size={14} />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
        </div>

        {/* Terminal Quick Chips */}
        <div style={{
          background: '#0d111a',
          padding: '8px 16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#6b7280', alignSelf: 'center', marginRight: '4px' }}>Comandos rápidos:</span>
          {quickCmds.map((cmd) => (
            <button
              key={cmd}
              onClick={() => commandHandler(cmd)}
              style={{
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--cyan-main)',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontFamily: 'JetBrains Mono, monospace',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(56, 189, 248, 0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)')}
            >
              $ {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Body */}
        <div style={{
          padding: '20px',
          minHeight: '260px',
          maxHeight: '400px',
          overflowY: 'auto',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.88rem',
          lineHeight: '1.6',
          color: '#e5e7eb'
        }}>
          {history.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '8px', whiteSpace: 'pre-wrap' }}>
              {item.type === 'input' ? (
                <span style={{ color: 'var(--cyan-main)', fontWeight: 'bold' }}>{item.text}</span>
              ) : (
                <span style={{ color: '#d1d5db' }}>{item.text}</span>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <span style={{ color: 'var(--emerald-main)', fontWeight: 'bold' }}>neox@devops-aws:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="escribe un comando (ej: help)..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.88rem',
                flex: 1
              }}
              autoComplete="off"
            />
            <button
              onClick={() => commandHandler(inputVal)}
              style={{
                background: 'var(--cyan-main)',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                color: '#000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Play size={12} fill="#000" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
