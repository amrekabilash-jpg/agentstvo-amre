#!/usr/bin/env bash
# Отправляет все URL из sitemap в IndexNow (Bing, Яндекс и др.).
# Запускать после публикации новых страниц: bash scripts/indexnow.sh
set -euo pipefail

HOST="www.geoaeo.pro"
KEY="1ab7f0024e532abbecc58d09d0897d31"

urls=$(curl -s "https://${HOST}/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed -E 's|</?loc>||g')
url_json=$(printf '%s\n' "$urls" | awk 'NF' | sed 's|.*|"&"|' | paste -sd, -)

body=$(cat <<JSON
{"host":"${HOST}","key":"${KEY}","keyLocation":"https://${HOST}/${KEY}.txt","urlList":[${url_json}]}
JSON
)

for endpoint in https://api.indexnow.org/indexnow https://www.bing.com/indexnow https://yandex.com/indexnow; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json; charset=utf-8" -d "$body" "$endpoint")
  echo "$endpoint -> HTTP $code"
done
