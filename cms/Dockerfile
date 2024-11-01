# Build
FROM node:20.18-slim AS build

ENV NODE_ENV=production

# Copy, build static files; see .dockerignore for exclusions
WORKDIR /app
COPY . ./
RUN npm install && npm run build

# Boilerplate, not used in OpenShift/Kubernetes
EXPOSE 1337 
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:1337/admin

CMD ["npm","run","start"]

# Nonroot user, limit heap size to 50 MB
USER 1001
