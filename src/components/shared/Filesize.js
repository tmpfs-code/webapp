import { Typography } from '@material-ui/core';
import prettyBytes from "pretty-bytes";
import React from 'react';

const BYTES_HR_STR = "Bytes";

function Filesize({bytes}) {
  bytes = (bytes === null || bytes === undefined || isNaN(bytes)) ? null : bytes;
  
  let pretty = bytes === null ? '' : prettyBytes(bytes);
  if (pretty.endsWith(" B")) {
    pretty = pretty.replace(" B", ` ${BYTES_HR_STR}`)
  }
  
  return <Typography color="secondary" title={bytes===null ? '' : `${bytes} ${BYTES_HR_STR}`}>
    {pretty ? pretty : <span>&nbsp;</span>}
  </Typography>
}

export default Filesize;
