// REACT_APP_API_SRV_ADDR is set at build time (e.g. REACT_APP_API_SRV_ADDR=foobar.com npm run build)
// can also be a relative path, e.g.: /api/
const API_SRV_ADDR = process.env.REACT_APP_API_SRV_ADDR;

// Set at build time.
// This is the hash of the last commit of the repo from which the webapp is built.
export const GIT_COMMIT_HASH = (process.env.REACT_APP_GIT_COMMIT_HASH+'').trim();

// This must be kept in sync with the server-side enforcement
export const MAX_FILE_SIZE = 750000000;
export const MAX_FILE_SIZE_FREE = 50000000;
export const MAX_UPLOAD_BODY_SIZE_PER_REQUEST = 1800000;

// base64 here is only to fool a little possible github crawlers
export const CONTACT_EMAIL = atob("d293QHRtcGZzLml0");

export const SERVER_NAME = "tmpfs.it";

// payments
export const SUPPORTED_CHAIN_IDS = process.env.REACT_APP_CHAIN_ID ? [parseInt(process.env.REACT_APP_CHAIN_ID)] : [3, 1337];
export const SUPPORTED_CURRENCIES = ['eth'];

export function getGitHubLink(commit, path='') {
  commit = commit || 'HEAD';
  let url = "https://github.com/tmpfs-code/webapp";
  return commit ? `${url}/tree/${commit}${path}` : url;
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

export const MAX_DOWNLOADS = {
  1:    {value: 1, free: true},
  10:   {value: 10, free: true},
  50:   {value: 50, free: true},
  100:  {value: 100, free: false},
  1000: {value: 1000, free: false},
};

export const LIFETIMES = {
  600:    {value: 600, free: true},
  3600:   {value: 3600, free: true},
  21600:  {value: 21600, free: true},
  43200:  {value: 43200, free: true},
  86400:  {value: 86400, free: true},
  259200: {value: 259200, free: false},
  604800: {value: 604800, free: false},
};
