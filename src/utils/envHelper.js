/**
 * Utilidad para identificar y describir el entorno de ejecución actual (Vercel / Local)
 */

export function getEnvironmentInfo() {
  const vercelEnv = (import.meta.env.VITE_VERCEL_ENV || '').toLowerCase();
  const gitBranch = (import.meta.env.VITE_VERCEL_GIT_COMMIT_REF || '').toLowerCase();
  const commitSha = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA || '';
  const isLocalDev = import.meta.env.DEV || (!vercelEnv && !gitBranch);

  if (isLocalDev) {
    return {
      type: 'local',
      label: 'LOCAL',
      fullLabel: 'ENTORNO LOCAL (DEV)',
      branch: gitBranch || 'localhost',
      commitSha: commitSha ? commitSha.substring(0, 7) : 'dev-local',
      color: '#c084fc', // Purple/Violet
      bgColor: 'rgba(192, 132, 252, 0.15)',
      borderColor: 'rgba(192, 132, 252, 0.4)',
      icon: '💻',
      description: 'Servidor de desarrollo local (Vite dev server)',
      vercelEnv: 'development'
    };
  }

  // Si la rama es develop o el entorno es preview
  if (gitBranch === 'develop' || gitBranch.startsWith('dev') || gitBranch.startsWith('feature') || vercelEnv === 'preview') {
    return {
      type: 'develop',
      label: 'DEVELOP',
      fullLabel: `DEVELOP (${gitBranch || 'preview'})`,
      branch: gitBranch || 'develop',
      commitSha: commitSha ? commitSha.substring(0, 7) : 'head',
      color: '#f59e0b', // Amber
      bgColor: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'rgba(245, 158, 11, 0.4)',
      icon: '🚧',
      description: 'Despliegue de prueba en Vercel (Rama Develop)',
      vercelEnv: vercelEnv || 'preview'
    };
  }

  // Entorno Master / Main / Production
  return {
    type: 'production',
    label: 'MASTER',
    fullLabel: `MASTER (${gitBranch || 'production'})`,
    branch: gitBranch || 'master',
    commitSha: commitSha ? commitSha.substring(0, 7) : 'head',
    color: '#10b981', // Emerald
    bgColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
    icon: '🚀',
    description: 'Despliegue de producción en Vercel (Rama Master)',
    vercelEnv: vercelEnv || 'production'
  };
}

export function logEnvironmentToConsole() {
  const env = getEnvironmentInfo();
  // En producción no imprimir log de entorno
  if (env.type === 'production') return;

  console.log(
    `%c 🛠️ ENTORNO DETECTADO: ${env.fullLabel} %c Branch: ${env.branch} | Commit: ${env.commitSha} `,
    `background: ${env.color}; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;`,
    'background: #1e293b; color: #94a3b8; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );
}
