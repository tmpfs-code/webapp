#! /usr/bin/env sh

set -e

# Ensure the current working dir is the root of the react app
cd "$(dirname "$0")" && ls package.json

# Ensure curl is installed
which curl

# Fetch https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js and save it to public/
# This is used as a fallback for browser that are not currenly supporting window.ReadableStream.
# Read more here: https://www.npmjs.com/package/web-streams-polyfill

rm -f ./public/polyfill.min.js

curl --location \
  --max-redirs 3 \
  --tlsv1.3 \
  --connect-timeout 10 \
  --output ./public/polyfill.min.js \
  https://unpkg.com/web-streams-polyfill/dist/polyfill.min.js 


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


# Ensure sha256sum is installed.
which sha256sum

# Verify files integrity
sha256sum -c ./ext-libs-checksums.txt
