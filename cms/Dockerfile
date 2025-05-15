# Build
FROM node:20.19-slim@sha256:83e53269616ca1b22cf7533e5db4e2f1a0c24a8e818b21691d6d4a69ec9e2c6d AS build

ENV NODE_ENV=production

# Copy, build static files; see .dockerignore for exclusions
WORKDIR /app
COPY . ./
RUN mkdir -p /.config
RUN mkdir -p .tmp 
RUN npm install && npm run build

# Boilerplate, not used in OpenShift/Kubernetes
EXPOSE 1337 
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:1337/admin

CMD ["npm","run","start"]

# Nonroot user, limit heap size to 50 MB
USER 1001
