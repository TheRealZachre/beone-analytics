#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"

load_secret() {
  if [ -n "${AUTH_SECRET:-}" ]; then return 0; fi
  if [ -n "${NEXTAUTH_SECRET:-}" ]; then
    AUTH_SECRET="$NEXTAUTH_SECRET"
    export AUTH_SECRET
    return 0
  fi
  if [ -f "$root/.dev.vars" ]; then
    set -a
    # shellcheck disable=SC1091
    source "$root/.dev.vars"
    set +a
  fi
}

load_secret
deploy_args=()
if [ -n "${AUTH_SECRET:-}" ]; then
  secrets_file="$(mktemp)"
  trap 'rm -f "$secrets_file"' EXIT
  printf 'AUTH_SECRET=%s\n' "$AUTH_SECRET" > "$secrets_file"
  deploy_args+=(--secrets-file "$secrets_file")
fi

cd "$root"
if [ ${#deploy_args[@]} -gt 0 ]; then
  echo "Uploading AUTH_SECRET with wrangler deploy..."
  exec npx wrangler deploy "${deploy_args[@]}"
fi

echo "WARNING: AUTH_SECRET not set locally — deploying without secret upload."
exec npx wrangler deploy
