#! /usr/bin/env sh

set -e

# Ensure the current working dir is the root of the react app
cd "$(dirname "$0")" && ls package.json

# Ensure curl is installed
which curl

# Fetch https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js and save it to public/
# This is used as a fallback for browser that are not currenly supporting window.ReadableStream.
# Read more here: https://www.npmjs.com/package/web-streams-polyfill

# rm -f ./public/polyfill.min.js
# rm -f ./public/polyfill.min.js.map

# curl --location \
#   --max-redirs 3 \
#   --tlsv1.3 \
#   --connect-timeout 10 \
#   --output ./public/polyfill.min.js \
#   https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js 

# "[...] It's better to load the ponyfill instead of the polyfill and override the existing implementation [...]"
# see https://www.npmjs.com/package/streamsaver

rm -f ./public/ponyfill.min.js
rm -f ./public/ponyfill.min.js.map

curl --location \
  --max-redirs 3 \
  --tlsv1.2 \
  --connect-timeout 10 \
  --output ./public/ponyfill.min.js \
  https://cdn.jsdelivr.net/npm/web-streams-polyfill/dist/ponyfill.min.js


# Fetch https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js and save it to public/
# This is used as a fallback for browser that are not currenly supporting window.ReadableStream.
# Read more here: https://www.npmjs.com/package/web-streams-polyfill

rm -f ./public/mitm.html
rm -f ./public/sw.js

curl --tlsv1.2 \
  --connect-timeout 10 \
  --output ./public/mitm.html \
  https://raw.githubusercontent.com/jimmywarting/StreamSaver.js/master/mitm.html

curl --tlsv1.2 \
  --connect-timeout 10 \
  --output ./public/sw.js \
  https://raw.githubusercontent.com/jimmywarting/StreamSaver.js/master/sw.js


echo
echo "PLEASE UPDATE ext-libs-checksums.txt"
# To update ext-libs-checksums.txt use the command:
# sha256sum public/ponyfill.min.js public/sw.js public/mitm.html > ./ext-libs-checksums.txt 
