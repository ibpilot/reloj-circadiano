#!/usr/bin/env bash
# Cifra la app y genera index.html. La contraseña llega por env, nunca en git.
#   STATICRYPT_PASSWORD='...' ./encrypt.sh
set -euo pipefail

SRC="Reloj Circadiano.dc.html"
: "${STATICRYPT_PASSWORD:?Define STATICRYPT_PASSWORD antes de correr}"

npx staticrypt "$SRC" \
  --short \
  --remember 30 \
  -d encrypted

# StatiCrypt escribe encrypted/<nombre>; lo publicamos como index.html
cp "encrypted/${SRC}" index.html

# "Remember me" marcado por defecto (StatiCrypt no tiene flag nativo)
perl -0pi -e 's/(id="staticrypt-remember" type="checkbox" name="remember")/$1 checked/' index.html

echo "OK -> index.html cifrado ($(wc -c < index.html) bytes)"
