import React from 'react';
import streamSaver from "streamsaver";
import { base58ToWordArray, decrypt, downloadHeader } from "../crypto";
import DownloadFailed from './download//DownloadFailed';
import DownloadCompleted from './download/DownloadCompleted';
import DownloadPrep from './download/DownloadPrep';
import DownloadProgress from './download/DownloadProgress';
import DownloadReady from './download/DownloadReady';
import ExpiredLink from './download/ExpiredLink';
import InvalidKey from './download/InvalidKey';
import ErrorDialog from './ErrorDialog';
import Layout from "./Layout";

// see https://jimmywarting.github.io/StreamSaver.js/ for more info
streamSaver.mitm = "/mitm.html";

function decodeKey(encodedKey) {
  let key = null;
  try {
    key = base58ToWordArray(encodedKey || '');
    if (!key || key.sigBytes !== 32) {
      return null;
    }
  } catch (err) {
    console.error(`failed to decode key: ${err}`);
    return null;
  }
  return key;
}

function Download(props) {
  const { id, encodedKey } = props;
  const key = decodeKey(encodedKey);
  const [errDialogProps, setErrDialogProps] = React.useState({})
  const [header, setHeader] = React.useState(null)
  const [expired, setExpired] = React.useState(null)
  const [downloadProgress, setDownloadProgress] = React.useState(null)
  const [downloadFailed, setDownloadFailed] = React.useState(null)
  
  const onStartClick = (clickEvent) => {
    // [...]Popups are often blocked but if you can't it's best that you initiate the createWriteStream on user interaction.[...]
    // see https://www.npmjs.com/package/streamsaver
    const writableStream = streamSaver.createWriteStream(header.filename, {size: header.clearSize});
    const writer = writableStream.getWriter();
    
    // abort so it dose not look stuck
    window.onunload = () => {
      writableStream.abort()
      writer.abort()
    };

    setDownloadProgress({perc: 0});

    decrypt({
      id: id,
      key: key,
      iv: header.iv,
      writer: writer,
      clearSize: header.clearSize,
      filename: header.filename,
      onProgress: (obj) => setDownloadProgress(obj),
      onError: (error) => {
        console.error(`download failed: ${error}`);
        setDownloadFailed(true);
      },
    });
  };

  // there requests are executed only one time when component is mounted.
  React.useEffect(()=>{
    if (key) {
      downloadHeader({
        id: id,
        key: key,
        onError: (error) => {
          let errorStr = `${error}`;
          console.error(`downloadHeader failed: ${errorStr}`);
          if (errorStr.match("Failed to fetch") || errorStr === "invalid_key") {
            setDownloadFailed(true);
          } else {
            setExpired(true);
          }
        },
        onSuccess: (header) => setHeader(header),
      });
    }
  }, []);

  let elem = null;

  if (downloadFailed) {
    elem = <DownloadFailed />; 
  } else if (!key) {
    elem = <InvalidKey />; 
  } else if (expired) {
    elem = <ExpiredLink />;
  } else if (!header) {
    elem = <DownloadPrep />
  } else if (!downloadProgress && header) {
    elem = <DownloadReady
      filename={header.filename}
      filesize={header.clearSize}
      timeLeft={header.timeLeft}
      dwnLeft={header.dwnLeft}
      onStartClick={onStartClick} />;
  } else if (downloadProgress && header && downloadProgress.completed) {
    elem = <DownloadCompleted filename={header.filename} filesize={header.clearSize} />;
  } else if (downloadProgress && header && !downloadProgress.completed) {
    elem = <DownloadProgress filename={header.filename} filesize={header.clearSize} perc={downloadProgress.perc} />;
  } else {
    elem = <ExpiredLink />;
  }

  return <Layout
    top={
      <React.Fragment>
      <ErrorDialog
        onClose={() => setErrDialogProps({open: false})}
        {...errDialogProps}
      />
      {elem}
    </React.Fragment>
    }
  />
};

export default Download;
