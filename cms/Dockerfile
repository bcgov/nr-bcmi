# Build
FROM node:20.18-slim AS build

ENV NODE_ENV=production

# Copy, build static files; see .dockerignore for exclusions
WORKDIR /app
COPY . ./
RUN npm run build

# Deploy using minimal Distroless image
FROM gcr.io/distroless/nodejs22-debian12:nonroot
ENV NODE_ENV=production

# Copy app and dependencies
WORKDIR /app
COPY --from=build /app/dist/build ./dist

# Boilerplate, not used in OpenShift/Kubernetes
EXPOSE 1337
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:1337/graphql

# Nonroot user, limit heap size to 50 MB
USER nonroot
CMD ["--max-old-space-size=50", "/app/dist/main"]
