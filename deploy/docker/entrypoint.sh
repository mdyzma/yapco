#!/bin/bash
# Starts the PDF export service and Caddy in the YAPCO container; the container stops when either
# of them does, so Docker's restart policy brings both back.
#
# YAPCO_PORT    the port the site is published on (default 8080), for the allowed origins
# YAPCO_ORIGIN  more addresses people open the site with, comma-separated, e.g.
#               https://planner.example.com or http://192.168.1.20:8080
set -euo pipefail

port="${YAPCO_PORT:-8080}"
export EXPORT_ALLOWED_ORIGINS="http://localhost:$port,http://127.0.0.1:$port${YAPCO_ORIGIN:+,$YAPCO_ORIGIN}"

cd /app/apps/export-node
node_modules/.bin/tsx src/main.ts &
caddy run --config /etc/caddy/Caddyfile --adapter caddyfile &

wait -n
exit $?
