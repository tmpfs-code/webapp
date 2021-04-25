import prettyBytes from "pretty-bytes";
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { MAX_FILE_SIZE } from '../constants';
import { encrypt } from "../crypto";
import { doUploadClearance } from "../upload-clearance";
import ErrorDialog from './ErrorDialog';
import Layout from "./Layout";
import KeyPoints from "./upload/KeyPoints";
import UploadCompleted from "./upload/UploadCompleted";
import UploadConfirm from "./upload/UploadConfirm";
import UploadProgress from './upload/UploadProgress';
import UploadSelectFile from "./upload/UploadSelectFile";

function Upload() {
  const { t } = useTranslation();
  const fileInputRef = React.useRef(null);
  const [errDialogProps, setErrDialogProps] = React.useState({})
  const [reader, setReader] = React.useState(new FileReader());
  const [fileInfo, setFileInfo] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(null);

  reader.addEventListener('loadend', (event) => {
    if (reader.error) {
      cancelUpload();
      return
    }
    setFileInfo({...fileInfo, ready: true, loadedBytes: event.loaded})
  });

  reader.onerror = function(event) {
    console.error(event)
    cancelUpload();
    setErrDialogProps({open: true, title: t('errors.invalid_file'), message: (event.target.error+'')})
  };

  function cancelUpload() {
    reader.abort();
    setReader(new FileReader());
    setUploadProgress(null);
    setFileInfo(null);
    fileInputRef.current.value = '';
  }

  async function confirmUpload({maxDownloads, lifetime, fileId}) {
    setUploadProgress({perc: 0});

    let clearance = await doUploadClearance();
  
    if (clearance.err) {
      cancelUpload();
      
      if (parseInt(clearance.err) > 0) {
        setErrDialogProps({open: true, title: t('errors.bot_title'), message: <Trans i18nKey='errors.bot_msg' />});
      } else {
        console.error(clearance);
        setErrDialogProps({open: true, title: t('errors.upload_failed'), message:  t('errors.upload_error')});
      }
      return
    }

    encrypt({
      fileId: fileId,
      buffer: reader.result,
      clearance: clearance.sol,
      filename: fileInfo.name,
      maxDownloads: maxDownloads,
      lifetime: lifetime,
      totSize: fileInfo.loadedBytes,
      onProgress: (obj) => {
        setUploadProgress(obj);
      },
      onError: (obj) => {
        console.error(obj);
        cancelUpload();
        setErrDialogProps({open: true, title: t('errors.upload_failed'), message:  t('errors.upload_error')});
      }
    });
  }

  function onFileSelected(event) {
    const fileList = event.target.files;
    const file = fileList ? fileList[0] : null;
  
    if (!file) {
      return;
    }

    if (file.size === 0) {
      cancelUpload();
      setErrDialogProps({open: true, title: t('errors.invalid_file'), message: t('errors.empty_file')})
      return;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      cancelUpload();
      setErrDialogProps({open: true, title: t('errors.invalid_file'), message: t('errors.file_too_large', {size: prettyBytes(MAX_FILE_SIZE)})})
      return;
    }

    setFileInfo({
      name: file.name,
      ready: false,
      size: file.size,
      truncName: file.name.length > 70 ? `${file.name.substr(0, 60).trim()}...` : file.name,
    });

    reader.readAsArrayBuffer(file);
  };

  return <Layout
    top={<React.Fragment>
      <ErrorDialog
        onClose={() => setErrDialogProps({open: false})}
        {...errDialogProps}
      />

      <input ref={fileInputRef}
        type="file"
        onChange={onFileSelected}
        style={{display:"none"}}
      />

      {!fileInfo &&
        <UploadSelectFile fileInputRef={fileInputRef} />
      }

      {fileInfo && !uploadProgress && 
        <UploadConfirm
          fileInfo={fileInfo}
          confirmUpload={confirmUpload}
        />
      }

      {uploadProgress && !uploadProgress.completed &&
        <UploadProgress
          fileInfo={fileInfo}
          perc={uploadProgress.perc}
        />
      }

      {uploadProgress && uploadProgress.completed &&
        <UploadCompleted
          fileInfo={fileInfo}
          url={uploadProgress.url}
        />
      }
    </React.Fragment>}
    middle={fileInfo ? undefined : <KeyPoints />}
  />
}

export default Upload;
