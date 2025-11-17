#!/bin/sh
set -e

# 1. Cargar variables inyectadas por Vault
if [ -f /vault/secrets/frontend.env ]; then
  echo "[entrypoint] Loading Vault secrets..."
  . /vault/secrets/frontend.env
fi

# 2. Renderizar config con envsubst
echo "[entrypoint] Rendering NGINX config..."
envsubst '${VITE_API_AUTH} ${VITE_API_NOTES}' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

# 3. Iniciar NGINX
echo "[entrypoint] Starting NGINX..."
exec nginx -g 'daemon off;'
