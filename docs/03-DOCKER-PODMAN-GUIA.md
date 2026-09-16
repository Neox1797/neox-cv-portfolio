# 🐳 Guía de Contenedores: Docker & Podman (Nginx Alpine)

Tu proyecto está empaquetado como un contenedor OCI compatible tanto con **Docker** como con **Podman** (nativo en entornos Red Hat Enterprise Linux / RHEL).

---

## 🏗️ Arquitectura del Dockerfile Multi-Stage

El `Dockerfile` utiliza una construcción en 2 etapas (*Multi-Stage Build*) para optimizar el tamaño de la imagen final:

1. **Stage 1 (`build`)**: Usa Node.js 20 Alpine para instalar dependencias y ejecutar `npm run build`.
2. **Stage 2 (`production`)**: Copia únicamente los archivos estáticos compilados a una imagen ultra ligera de `nginx:alpine` (< 25MB).

---

## 🚀 Comandos de Ejecución

### Opción A: Con Docker Compose (Recomendada)
```bash
# Levantar el contenedor en segundo plano (Puerto 8080)
docker compose up -d --build

# Ver logs del servidor
docker compose logs -f

# Detener el contenedor
docker compose down
```
👉 Abre `http://localhost:8080` en tu navegador.

---

### Opción B: Con Podman (Red Hat / RHEL Native)
```bash
# Compilar la imagen
podman build -t neox-portfolio .

# Ejecutar el contenedor en segundo plano
podman run -d -p 8080:80 --name neox_cv neox-portfolio

# Exportar a manifiesto YAML de Kubernetes / OpenShift
podman generate kube neox_cv > portfolio-k8s.yaml
```

---

## 📄 Configuración de Nginx (`nginx.conf`)

Servidor web configurado con:
- **Compresión Gzip**: Para reducir el tiempo de transferencia de texto, CSS y JS.
- **Rutas SPA**: Redirección fallback `try_files $uri $uri/ /index.html;` para soportar enrutamiento React.
- **Encabezados de Cache**: `expires 1y;` e `immutable` para los archivos en `/assets/`.
