#!/usr/bin/env bash
set -euo pipefail
bash scripts/cloudflare-build.sh
bash scripts/cloudflare-deploy.sh
