#!/usr/bin/env sh
set -e

sleep 5  # optional: give pod DNS/bootstrap time

URL=$(curl -s -L -o /dev/null -w '%{url_effective}' https://en.wikipedia.org/wiki/Special:Random)

curl -X POST http://todo-backend-svc:3000/todos \
  -H "Content-Type: application/json" \
  -d "{\"content\": \"Read $URL\"}"

echo "✅ Created: Read $URL"
