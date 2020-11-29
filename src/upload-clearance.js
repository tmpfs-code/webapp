import CryptoJS from "crypto-js";
import { getApiSrvAddr } from "./constants";
import { wordarrayToUint8Array } from "./crypto";

function sendRequest() {
  let url = `${getApiSrvAddr()}/api/v1/upload/clearance`;

  return fetch(url, { credentials: 'include', method: "POST" })
    .then(resp => resp.json())
    .catch((err) => err);
};

function solveChallenge(respObj) {
  return new Promise((resolutionFunc, rejectionFunc) => {    
    let difficulty = parseInt(respObj.d);
    let zeros = (new Array(difficulty+1)).join("0");
    let bytes = wordarrayToUint8Array(CryptoJS.enc.Hex.parse(respObj.s));
    let secret = `${bytes.reduce((p, c) => c += p, 0)}`;
    let sol;
    
    while(true) {
      sol = CryptoJS.lib.WordArray.random(16);
      
      let hash = CryptoJS.algo.MD5.create();
      hash.update(secret);
      hash.update(sol);
      if (hash.finalize().toString(CryptoJS.enc.Hex).startsWith(zeros)) {
        break;
      }
    }

    return resolutionFunc(sol.toString(CryptoJS.enc.Hex));
  });
};

export async function doUploadClearance() {
  return new Promise((resolutionFunc, rejectionFunc) => {
    sendRequest()
      .then(challenge => {
        if (challenge.err) {
          resolutionFunc({err: challenge.err});
          return
        }

        solveChallenge(challenge)
          .then(sol => resolutionFunc({sol}))
          .catch(err => resolutionFunc({err}))
      })
      .catch(err => resolutionFunc({err}));
  });
};
