# ===== Stage 1: Build Phase =====
FROM node:20-alpine AS build
WORKDIR /app

# Copiar manifiestos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar la aplicación React/Vite para producción
RUN npm run build

# ===== Stage 2: Production Phase con Nginx =====
FROM nginx:alpine AS production

# Copiar archivo de configuración personalizado de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar bundle compilado desde el Stage 1 a Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Iniciar servidor Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
