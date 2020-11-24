// REACT_APP_API_SRV_ADDR is set at build time (e.g. REACT_APP_API_SRV_ADDR=foobar.com npm run build)
// can also be a relative path, e.g.: /api/
const API_SRV_ADDR = process.env.REACT_APP_API_SRV_ADDR;

// Set at build time.
// This is the hash of the last commit of the repo from which the webapp is built.
export const GIT_COMMIT_HASH = (process.env.REACT_APP_GIT_COMMIT_HASH+'').trim();

// This must be kept in sync with the server-side enforcement
export const MAX_FILE_SIZE = 50000000;

// This must be kept in sync with the server-side enforcement
export const MAX_UPLOAD_BODY_SIZE_PER_REQUEST = 1800000;

// base64 here is only to fool a little possible github crawlers
export const CONTACT_EMAIL = atob("d293QHRtcGZzLml0");

export const SERVER_NAME = "tmpfs.it";

export function getGitHubLink(commit) {
  let url = "https://github.com/tmpfs-code/webapp";
  return commit ? `${url}/tree/${commit}` : url;
}

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
