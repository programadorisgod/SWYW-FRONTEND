#!/bin/sh
envsubst '${VITE_API_AUTH},${VITE_API_NOTES}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"