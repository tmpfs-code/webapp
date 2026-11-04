import { getApiSrvAddr } from "./constants";
import { normalizeUploadPriceReq } from "./upload-price";

export async function redeemPromoCode({code, uploadPriceReq}) {
  const url = `${getApiSrvAddr()}/api/v1/promo/redeem`;

  const opts = {
    credentials: 'include',
    method: "POST",
    body: JSON.stringify({
      co: code,
      r: normalizeUploadPriceReq(uploadPriceReq),
    }),
  };

  const resp = await fetch(url, opts)
    .then(resp => resp.json());

  if (resp instanceof Object === true && resp.error) {
    return Promise.reject(resp.error);
  }

  return resp;
};
