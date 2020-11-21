import prettyBytes from "pretty-bytes";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MAX_FILE_SIZE } from '../constants';
import { encrypt } from "../crypto";
import ErrorDialog from './ErrorDialog';
import UploadCompleted from "./UploadCompleted";
import UploadConfirm from "./UploadConfirm";
import UploadProgress from './UploadProgress';
import UploadSelectFile from "./UploadSelectFile";

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
    setErrDialogProps({open: true, title: t('errors.text0'), message: (event.target.error+'')})
  };

  function cancelUpload() {
    reader.abort();
    setReader(new FileReader());
    setUploadProgress(null);
    setFileInfo(null);
    fileInputRef.current.value = '';
  }

  function confirmUpload({maxDownloads, lifetime}) {
    setUploadProgress({perc: 0});

    encrypt({
      buffer: reader.result,
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
        setErrDialogProps({open: true, title: t('errors.text2'), message:  t('errors.text3')});
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
      setErrDialogProps({open: true, title: t('errors.text0'), message: t('errors.text1')})
      return;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      cancelUpload();
      setErrDialogProps({open: true, title: t('errors.text0'), message: t('errors.text9', {size: prettyBytes(MAX_FILE_SIZE)})})
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

  return <React.Fragment>
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
  </React.Fragment>
}

export default Upload;
