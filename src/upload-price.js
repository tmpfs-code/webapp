
import { getApiSrvAddr, LIFETIMES, MAX_DOWNLOADS, MAX_FILE_SIZE_FREE } from "./constants";
import { getFilesizeRange } from "./payments";

export function normalizeUploadPriceReq({maxDownloads, lifetime, filesizeRange, currency}) {
  return {
    r: parseInt(filesizeRange),
    d: parseInt(maxDownloads),
    e: parseInt(lifetime),
    c: currency,
  };
}

export function shouldRequestUploadPrice({maxDownloads, lifetime, filesizeRange}) {
  if (!MAX_DOWNLOADS[maxDownloads].free) return true;
  if (!LIFETIMES[lifetime].free) return true;
  if (filesizeRange > getFilesizeRange(MAX_FILE_SIZE_FREE)) return true;
  return false;
};

export async function requestUploadPrice({maxDownloads, lifetime, filesizeRange, currency}) {
  const reqBody = normalizeUploadPriceReq({maxDownloads, lifetime, filesizeRange, currency});
  const url = `${getApiSrvAddr()}/api/v1/upload/price`;

  const opts = {
    credentials: 'include',
    method: "POST",
    body: JSON.stringify(reqBody),
  }

  const resp = await fetch(url, opts);
  const respObj = await resp.json();

  if (respObj.error) {
    console.error(respObj.error);
    return Promise.reject(respObj.error);
  }

  return respObj;
};
