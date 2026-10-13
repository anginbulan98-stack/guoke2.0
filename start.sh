#!/usr/bin/env bash
# Guoke on Next.js (server mode: SSR + middleware + API routes).
set -euo pipefail
cd "$(dirname "$0")"

PORT="${PORT:-3000}"

if [ ! -d node_modules ]; then
  npm install --no-audit --no-fund
fi

if [ ! -d .next ]; then
  npm run build
fi

exec npx next start --port "$PORT" --hostname 0.0.0.0
