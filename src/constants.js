// REACT_APP_API_SRV_ADDR is set at build time (e.g. REACT_APP_API_SRV_ADDR=foobar.com npm run build)
// can also be a relative path, e.g.: /api/
const API_SRV_ADDR = process.env.REACT_APP_API_SRV_ADDR;

// This must be kept in sync with the server-side enforcement
export const MAX_FILE_SIZE = 50000000;

// This must be kept in sync with the server-side enforcement
export const MAX_UPLOAD_BODY_SIZE_PER_REQUEST = 1800000;

// base64 here is only to fool a little possible github crawlers
export const CONTACT_EMAIL = atob("d293QHRtcGZzLml0");

export const SERVER_NAME = "tmpfs.it";

export const GITHUB_LINK = "https://github.com/tmpfs-code/webapp";

function removeTrailSlash(str) {
  let v = str + '';

  if (v[v.length-1] === "/") {
    v = v.substr(0, v.length - 1);
  }

  return v;
}

export function getApiSrvAddr() {
  let addr = API_SRV_ADDR ? API_SRV_ADDR : "http://localhost:8077"
  return removeTrailSlash(addr);
}
