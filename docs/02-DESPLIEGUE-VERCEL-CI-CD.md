# 🌐 Guía de Despliegue CI/CD en Vercel & Manejo de Ramas

Esta guía documenta el flujo de trabajo DevOps para el despliegue automático de tu portafolio entre entornos de **Desarrollo (Preview)** y **Producción**.

---

## 🌿 Flujo de Ramas en Git (Git Flow)

Tu proyecto cuenta con dos ramas principales configuradas:

1. **`master` (Producción)**:
   * Contiene únicamente el código estable.
   * Vercel despliega automáticamente hacia tu **URL oficial de Producción** (ejemplo: `https://neox-cv-portfolio.vercel.app`).
   * La insignia `DEV PREVIEW` se oculta automáticamente.
   * Los mensajes en Supabase se registran con `environment: 'production'`.

2. **`develop` (Desarrollo / Staging)**:
   * Es tu rama para crear nuevas características, probar diseños o ajustar código.
   * Vercel despliega automáticamente una **URL de Vista Previa (Preview)** exclusiva para esta rama (ejemplo: `https://neox-cv-portfolio-git-develop-neox1797.vercel.app`).
   * Muestra la insignia morada `DEV PREVIEW` en el encabezado.
   * Los mensajes en Supabase se registran con `environment: 'development'`.

---

## 💻 Comandos Diarios de Git

### Para trabajar en Desarrollo (`develop`):
```bash
git checkout develop
# Hace tus cambios de código y prueba localmente con npm run dev
git add .
git commit -m "feat: agregando nueva mejora"
git push origin develop
```

### Para promocionar cambios probados a Producción (`master`):
```bash
git checkout master
git merge develop
git push origin master
git checkout develop
```

---

## ⚙️ Variables de Entorno en Vercel

En tu panel de **Vercel** ➔ **Settings** ➔ **Environment Variables**:

| Nombre de Variable | Valor | Entornos Seleccionados |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | `https://ygukbilrtdeltdnphwjz.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_w-g0iNW1Uj85MHVbwLY-0A_E5pqARyY` | Production, Preview, Development |

---

## 📊 Vercel Speed Insights & Analytics

El proyecto incluye las librerías oficiales de medición de rendimiento en vivo:
- `@vercel/speed-insights/react`: Mide métricas Core Web Vitals (LCP, CLS, FID) en tiempo real.
- `@vercel/analytics/react`: Registra el número de visitantes y páginas vistas sin comprometer la privacidad ni la velocidad de tu web.
