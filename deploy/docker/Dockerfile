# YAPCO in one container: the app, the documentation and the PDF export service, the same as the
# Proxmox deployment (deploy/Caddyfile). Nothing to install but Docker (docs/operations/deploy.md).
#
#   docker compose -f deploy/docker/compose.yaml up -d --build
#
# Build context: the repository root.

# --- Build: install, build the static app and docs, and pack the export service ---------------
FROM node:24-bookworm-slim AS build
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    TURBO_TELEMETRY_DISABLED=1 \
    NEXT_TELEMETRY_DISABLED=1 \
    ASTRO_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /src
COPY . .
RUN pnpm install --frozen-lockfile
# Shown in the dashboard's footer ("Build 1a2b3c4"); compose passes the checked-out commit.
ARG BUILD_SHA=docker
RUN BUILD_SHA="$BUILD_SHA" pnpm turbo run build --filter=@planner/web... --filter=@planner/docs
# The export service with only its production dependencies (about 60 MB instead of the workspace).
RUN pnpm --filter @planner/export-node deploy --prod /out/apps/export-node \
 && cp -r apps/web/out /out/apps/web-out \
 && cp -r apps/docs/dist /out/apps/docs-dist

FROM caddy:2 AS caddy

# --- Run: Node.js, Chromium and Caddy -------------------------------------------------------------
FROM node:24-bookworm-slim
RUN apt-get update \
 && apt-get install -y --no-install-recommends chromium fonts-dejavu-core fonts-liberation tini \
 && rm -rf /var/lib/apt/lists/*
COPY --from=caddy /usr/bin/caddy /usr/bin/caddy
WORKDIR /app
# The same layout as the repository: the export service finds the app in ../web/out.
COPY --from=build /out/apps/export-node apps/export-node
COPY --from=build /out/apps/web-out apps/web/out
COPY --from=build /out/apps/docs-dist apps/docs/dist
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --chmod=755 deploy/docker/entrypoint.sh /usr/local/bin/yapco
# A checkout on Windows may have given it CRLF line endings.
RUN sed -i 's/\r$//' /usr/local/bin/yapco
ENV YAPCO_APP=/app \
    CHROME_PATH=/usr/bin/chromium \
    EXPORT_PORT=8787 \
    HOME=/tmp \
    XDG_CONFIG_HOME=/tmp \
    XDG_DATA_HOME=/tmp
USER node
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD node -e "fetch('http://127.0.0.1:8080/api/export/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"
ENTRYPOINT ["tini", "--", "yapco"]
