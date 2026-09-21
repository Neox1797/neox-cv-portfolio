---
name: Glassmorphism Design System
description: Directrices de diseño Glassmorphism y reglas UI para componentes Web/Angular/React en Antigravity.
---

# Design System Skill: Glassmorphism

## 1. Misión y Filosofía de Diseño
- Estilo con capas translúcidas, desenfoque de fondo (backdrop-blur) y bordes sutiles.
- Foco en la jerarquía visual mediante elevaciones, contraste de capas y legibilidad.

## 2. Style Foundations (Tokens)

### Colores
- Background: `rgba(15, 23, 42, 0.8)`
- Glass Surface Base: `rgba(255, 255, 255, 0.05)`
- Glass Surface Border: `rgba(255, 255, 255, 0.12)`
- Accent Primary: `#38BDF8` (Sky Blue)
- Text Primary: `#F8FAFC`
- Text Muted: `#94A3B8`

### Tipografía y Espaciado
- Font Family: `'Inter', system-ui, sans-serif`
- Spacing Scale: `xs: 4px`, `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`
- Blur Effects: `backdrop-filter: blur(12px) saturate(180%)`

## 3. Reglas de Componentes (Component Families)

### Tarjetas / Glass Cards
- Siempre aplicar `backdrop-filter: blur(...)` junto con `background: rgba(...)`.
- Usar un borde sutil: `border: 1px solid rgba(255, 255, 255, 0.12)`.
- Sombras suaves: `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37)`.

### Botones
- Estado Normal: Fondo translúcido con borde sutil.
- Hover: Incrementar la opacidad del fondo y el brillo del borde (`border-color: rgba(255,255,255,0.3)`).
- Active/Focus: Anillo de enfoque accesible visible (`outline: 2px solid #38BDF8`).

## 4. Reglas de Accesibilidad (WCAG 2.2 AA)
- No colocar texto de bajo contraste directamente sobre fondos de vidrio sin capa opaca de respaldo.
- Garantizar una relación de contraste mínima de 4.5:1 para texto normal.
- Todos los elementos interactivos deben contar con estados de foco por teclado claros.

## 5. Patrones Do / Don't (Aciertos y Anti-patrones)

- **Do:** Usar `backdrop-filter` con un color de fondo semitransparente como fallback.
- **Do:** Mantener bordes delgados de 1px con baja opacidad para simular reflejos de luz.
- **Don't:** Aplicar `backdrop-filter` excesivo en listas muy largas (impacto de rendimiento en renderizado).
- **Don't:** Utilizar texto puro blanco `#FFFFFF` sobre fondos transparentes claros sin contraste suficiente.

## 6. Quality Gates (Criterios de Aceptación de Código)
- Todo componente generado debe incluir soporte para `prefers-reduced-motion`.
- Las variables de diseño deben declararse mediante variables CSS (`--glass-bg`, `--glass-border`).