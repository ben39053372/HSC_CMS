import React from 'react'
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default (props) => {
  // props : setOpen open text
  return (
  <Collapse in={props.open}>
    <Alert
      severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            props.setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {props.text}
    </Alert>
  </Collapse>)
}