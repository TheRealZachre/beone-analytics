#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
OPENNEXT_CLOUDFLARE=1 npx opennextjs-cloudflare build
