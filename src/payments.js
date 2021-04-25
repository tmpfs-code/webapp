import CryptoJS from "crypto-js";
import { getApiSrvAddr } from "./constants";
import contractDataDevelopment from "./contracts/tmpfs.development.json";
import contractDataRopsten from "./contracts/tmpfs.ropsten.json";
import contractDataMainnet from "./contracts/tmpfs.mainnet.json";
import { normalizeUploadPriceReq } from "./upload-price";

export const paymentNotVerifiedError = "payment not verified";

async function sendVerifyPaymentRequest({txHash}) {
  const url = `${getApiSrvAddr()}/api/v1/payments/verify/${txHash}`;

  const opts = {
    credentials: 'include',
  };

  const resp = await fetch(url, opts)
    .then(resp => resp.json());
  
  if (resp instanceof Object === true && resp.error) {
    return Promise.reject(resp.error);
  }

  return resp;
};

async function waitMs(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
};

export async function verifyPayment({txHash, timeout}) {
  const pollingInterval = 5000;

  for(let i = 0; i < timeout; i += pollingInterval) {
    const resp = await sendVerifyPaymentRequest({txHash});
    if (resp.valid) {
      return resp;
    }
    await waitMs(pollingInterval);
  }

  return Promise.reject(paymentNotVerifiedError);
};

export async function sendPaymentRequest({body}) {
  const url = `${getApiSrvAddr()}/api/v1/payments/request`;

  const opts = {
    credentials: 'include',
    method: "POST",
    body: JSON.stringify(body),
  };

  const resp = await fetch(url, opts)
    .then(resp => resp.json());
  
  if (resp instanceof Object === true && resp.error) {
    return Promise.reject(resp.error);
  }

  return resp;
};

export async function buildPaymentRequest({web3, account, uploadPriceReq, uploadPriceResp}) {
  const msg = `tmpfs:${uploadPriceResp.x}:${CryptoJS.lib.WordArray.random(6).toString(CryptoJS.enc.Hex)}`;
  const signature = await web3.eth.personal.sign(msg, account)

  return {
    a: account,
    m: msg,
    s: signature,
    p: {...uploadPriceResp},
    r: normalizeUploadPriceReq(uploadPriceReq),
  };
};

export async function doPayment({web3, account, amount, paymentId}) {
  const chainId = await web3.eth.net.getId();

  const data = {
    "5777": contractDataDevelopment,
    "3": contractDataRopsten,
    "1": contractDataMainnet,
  }[`${chainId}`];

  if (!data) {
    throw new Error(`missing contract definition for chain ${chainId}`);
  }

  const contract = new web3.eth.Contract(data.abi, data.address);
  
  if (!paymentId) {
    throw new Error("paymentId is empty")
  }

  const resp = await contract.methods.receivePayment(`0x${paymentId}`).send({
    from: account,
    value: amount,
  });
  
  return resp;
};

export function getFilesizeRange(exactFilesize) {
  let v = Math.floor(exactFilesize / 1000000.0);
  return parseInt(v);
};
