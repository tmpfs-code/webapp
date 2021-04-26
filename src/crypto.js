import bs58 from "bs58";
import CryptoJS from "crypto-js";
import { Uint64LE } from "int64-buffer";
import { Base64 } from "js-base64";
import { v4 as uuidv4 } from 'uuid';
import { getApiSrvAddr, MAX_UPLOAD_BODY_SIZE_PER_REQUEST } from "./constants";

export function wordarrayToUint8Array(wa, sigBytes) {
  sigBytes = sigBytes || wa.sigBytes;
  let words = wa.words;
  let bytes = new Array(words.length * 4);
  let pos = 0
  let shifting = [24, 16, 8, 0];

  for (let i = 0; i < words.length; i++) {
    let num = words[i];
    for (let y = 0; y < 4; y++) {
      bytes[pos+y] = (num >> shifting[y]) & 0xFF;
    }
    pos = pos + 4;
  }

  return new Uint8Array(bytes).slice(0, sigBytes);
}

function closestMulOf16(num) { 
  while(true){
    if (num % 16 === 0) {
      return num;
    }
    num += 1;
  }
};

function wordArrayToBase58(wa) {
  let h = CryptoJS.enc.Hex.stringify(wa)
  let buf = Buffer.from(h, 'hex');
  return bs58.encode(buf);
}

export function base58ToWordArray(b) {
  let h = bs58.decode(b).toString('hex');
  return CryptoJS.enc.Hex.parse(h);
}

function randomKey() {
  return CryptoJS.lib.WordArray.random(32);
}

function wordArrayToLEByteArray(wa) {
  let ab = new Uint32Array(wa.words)
  const dv = new DataView(ab.buffer);
  
  let result = [];
  let i = 0;

  for (i = 0; i < dv.buffer.byteLength; i += 4) {
    result.push(dv.getUint32(i, false));
  }

  return new Uint32Array(result);
}

function wordArrayFromByteArray(ba) {
  return CryptoJS.lib.WordArray.create(ba);
}

// function checkEndian() {
//   var arrayBuffer = new ArrayBuffer(2);
//   var uint8Array = new Uint8Array(arrayBuffer);
//   var uint16array = new Uint16Array(arrayBuffer);
//   uint8Array[0] = 0xAA; // set first byte
//   uint8Array[1] = 0xBB; // set second byte
//   if(uint16array[0] === 0xBBAA) return "LE";
//   if(uint16array[0] === 0xAABB) return "BE";
//   else throw new Error("Something crazy just happened");
// }

function percentage(curr, tot) {
  let perc = parseInt(curr * 100 / tot);
  if (perc < 0) return 0;
  if (perc > 100) return 100;
  return perc;
}

function upload({id, from, to, data, header, clearance}) {
  let url = `${getApiSrvAddr()}/api/v1/upload/${id}/${from}/${to}`;
  
  if (header) {
    url += `?h=${header}`;
  }

  let fetchOpts = {
    credentials: 'include',
    method: "POST",
    body: data,
  }

  if (from === 0) {
    fetchOpts.headers = {
      'x-clearance': clearance,
    }
  }

  return fetch(url, fetchOpts).then(resp => resp.json())
};

function cancelReader(reader) {
  try {
    if(reader) reader.cancel();
  } catch (error) {
    console.error(`cancelReader failed: ${error}`)
  }
}

function fetchReadAll({reader, onData, onError}) {
  reader.read().then(resp => {
    onData(resp)
    if (!resp.done) {
      fetchReadAll({reader, onData, onError});
    }
  }).catch(error => {
    cancelReader(reader)
    onError(error);
  });
};

function download({url, onData, onError}) {
  let reader;

  fetch(url, {
    credentials: 'include',
    method: "GET",
  })
  .then(resp => {
    if (resp.status !== 200) {
      cancelReader(reader)
      onError({error: resp.status});
      return;
    } else {
      reader = resp.body.getReader();
      fetchReadAll({reader, onData, onError});
    }
  })
  .catch(error => {
    cancelReader(reader);
    onError(error)
  });
}

export function downloadHeader({id, key, onSuccess, onError}) {
  let bytes = CryptoJS.lib.WordArray.create();

  download({
    url: `${getApiSrvAddr()}/api/v1/download/${id}/header`,
    onError: onError,
    onData: ({value, done}) => {
      if (value) {
        bytes = bytes.concat(wordArrayFromByteArray(value));
      }
      if (done) {
        let sensitive, iv, timeLeft, dwnLeft;

        try {
          let text = CryptoJS.enc.Utf8.stringify(bytes);
          let header = JSON.parse(text);

          if (header && header.error) {
            onError("failed to decode header");
            return
          }

          iv = CryptoJS.enc.Hex.parse(header.fm.i);
          sensitive = decryptSensitiveMetadata({iv, key, encText: header.fm.x});

          dwnLeft = parseInt(header.dl);
          timeLeft = parseInt(header.tl);
        } catch (err) {
          console.error(err)
          onError("invalid_key");
          return;
        }

        onSuccess({
          iv: iv,
          dwnLeft: dwnLeft,
          timeLeft: timeLeft,
          clearSizeUint64: Uint64LE(sensitive.s, 16),
          clearSize: parseInt(Uint64LE(sensitive.s, 16).toString(10)),
          filename: sensitive.n,
        })
      }
    },
  })
}

export function decrypt({id, key, iv, writer, clearSize, onProgress, filename, onError}) {
  let aesDecryptor = CryptoJS.algo.AES.createDecryptor(key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
  });
  let writtenBytesCount = 0;
  let lastPerc = -1;

  download({
    url: `${getApiSrvAddr()}/api/v1/download/${id}`,
    onError: (error) => {
      writer.abort();
      onError(error);
    },
    onData: ({value, done}) => {
      let bytes = value ? wordArrayFromByteArray(value) : null;
      let chunk = null;
      
      // decrypt
      if (bytes) {
        chunk = aesDecryptor.process(bytes);
      }
      if (done) {
        chunk = chunk ? chunk.concat(aesDecryptor.finalize()) : aesDecryptor.finalize();
      }

      // write
      if (writtenBytesCount < clearSize) {
        let chunkOverflow = (writtenBytesCount + chunk.sigBytes) > clearSize;
        let bytesToWrite = chunkOverflow ? wordarrayToUint8Array(chunk, clearSize - writtenBytesCount) : wordarrayToUint8Array(chunk);
        writer.write(bytesToWrite);
        writtenBytesCount += bytesToWrite.byteLength;
      }
      
      // calc. percentage and emit progress
      if (chunk) {
        let perc = percentage(writtenBytesCount, clearSize);
        if (perc !== lastPerc) {
          onProgress({completed: false, perc: perc});
          lastPerc = perc;
        };
      }

      // trigger download
      if (done) {
        writer.close()
          .then(() => onProgress({completed: true, perc: 100}))
          .catch(err => onError(`There was an error while saving the file: ${err}`));
      }
    }
  });
}

function serializeHeader({iv, sensitive, maxDownloads, lifetime}) {
  let data = JSON.stringify({
    x: sensitive,
    i: CryptoJS.enc.Hex.stringify(iv),
    d: parseInt(maxDownloads || 1),
    e: parseInt(lifetime || 60),
  });

  let txt = Base64.encodeURL(data);

  if (txt.length >= 1024) {
    console.error("serialized header is too long")
  }

  return txt;
}

function encryptSensitiveMetadata({iv, key, filename, size}) {
  let trimmedFilename = (filename+'').trim();
  let getRndInteger = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum)) + minimum;
  let rndBytes = CryptoJS.lib.WordArray.random(getRndInteger(10,30));
  let rndBytesHex = CryptoJS.enc.Hex.stringify(rndBytes);
  let check = CryptoJS.SHA256(`${trimmedFilename}${rndBytesHex}`).toString().substr(0, 6);
  
  let clearText = JSON.stringify({
    n: trimmedFilename,
    r: rndBytesHex,
    s: Uint64LE(size).toString(16),
    c: check
  });

  let encText = CryptoJS.AES.encrypt(clearText, key, {iv: iv});
  return CryptoJS.enc.Hex.stringify(encText.ciphertext);
}

function decryptSensitiveMetadata({iv, key, encText}) {
  let cp = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(encText),
  });

  let decData = CryptoJS.AES.decrypt(cp, key, {iv: iv});
  let decText = decData.toString(CryptoJS.enc.Utf8);
  let decObj = JSON.parse(decText);
  
  let check = CryptoJS.SHA256(`${decObj.n}${decObj.r}`).toString().substr(0, 6);
  if (decObj.c !== check) {
    throw new Error("checksum failed");
  }

  return decObj;
}

export function encrypt({fileId, buffer, totSize, onProgress, onError, filename, maxDownloads, lifetime, clearance}) {
  let key = randomKey();
  let itemId = fileId || uuidv4().toString();
  let iv = CryptoJS.lib.WordArray.random(16);
  // see https://cryptojs.gitbook.io/docs/#ciphers
  let aesEncryptor = CryptoJS.algo.AES.createEncryptor(key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
  });

  let lastPerc = -1;

  let worker = (start, stop, encBytesCount) => {
    let padSize = stop - totSize;
    let completed = stop >= totSize;
    let bytes = wordArrayFromByteArray(buffer.slice(start, stop));
    let perc = percentage(start, totSize);
    let emitProgress = false;
    let encText;
    
    if (padSize > 0) {
      bytes.concat(CryptoJS.lib.WordArray.random(padSize));
    }

    encText = aesEncryptor.process(bytes);

    if (completed) {
      let finalData = aesEncryptor.finalize();
      // finalData should be always 0 since padding is done manually.
      encText = encText.concat(finalData);
    }

    if (lastPerc !== perc) {
      lastPerc = perc;
      emitProgress = true;
    }
    if (completed) {
      emitProgress = true;
    }

    upload({
      id: itemId,
      clearance: clearance,
      header: (!completed) ? null : serializeHeader({
        iv: iv,
        sensitive: encryptSensitiveMetadata({iv, key, filename, size: totSize}),
        maxDownloads: maxDownloads,
        lifetime: lifetime}),
      data: wordArrayToLEByteArray(encText),
      from: encBytesCount,
      to: encBytesCount+encText.sigBytes,
    }).then(body => {
      if (body instanceof Object === true && body.error) {
        onError(body);
        return  
      }
      
      if (emitProgress) {
        onProgress({
          completed: completed,
          url: completed ? `/file/${itemId}/#${wordArrayToBase58(key)}` : null,
          perc: completed ? 100 : perc,
        });
      }

      if (completed) {
        return;
      }
      worker(stop, nextChunkOffset({offset: stop, total: totSize}), encBytesCount+encText.sigBytes);
    }).catch(err => {
      onError(err);
    });
  };

  onProgress({perc: 0});
  worker(0, nextChunkOffset({offset: 0, total: totSize}), 0);
}

function nextChunkOffset({offset, total}) {
  let oneMb = 1000000;
  let step;
  let nextOffset;

  if (total < oneMb/2) {
    step = oneMb/4;
  } else if (offset < oneMb*4) {
    step = oneMb/2;
  } else if (offset < oneMb*10) {
    step = oneMb;
  } else {
    step = MAX_UPLOAD_BODY_SIZE_PER_REQUEST;
  }

  if (offset + step <= total) {
    nextOffset = offset + step;
  } else {
    nextOffset = total;
  }

  nextOffset = closestMulOf16(nextOffset);

  return nextOffset;
}
