#!/bin/sh
set -eu

cd /app

# node_modules is a Docker volume; keep it in sync with package-lock/package.json.
if command -v sha256sum >/dev/null 2>&1; then
  DEPS_HASH="$(sha256sum package.json package-lock.json 2>/dev/null | sha256sum | awk '{print $1}')"
else
  # Fallback (shouldn't happen on Debian images)
  DEPS_HASH="$(cat package.json package-lock.json 2>/dev/null | wc -c | tr -d ' ')"
fi

STAMP_FILE="node_modules/.deps_hash"

NEED_INSTALL=0
if [ ! -d node_modules ]; then
  NEED_INSTALL=1
elif [ ! -f "$STAMP_FILE" ]; then
  NEED_INSTALL=1
elif [ "$(cat "$STAMP_FILE" 2>/dev/null || true)" != "$DEPS_HASH" ]; then
  NEED_INSTALL=1
fi

if [ "$NEED_INSTALL" -eq 1 ]; then
  echo "[doodat] Installing dependencies (node_modules volume)..."
  npm ci || npm install
  mkdir -p node_modules
  echo "$DEPS_HASH" > "$STAMP_FILE"
fi

exec npx expo start --tunnel --clear


