import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';

export default function ErrorDialog(props) {
  const { open, onClose, message, title } = props;

  return <Dialog
    transitionDuration={0}
    open={!!open}
    onClose={onClose}
  >
    <DialogTitle>{title || "Error"}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Close
      </Button>
    </DialogActions>
  </Dialog>
}
