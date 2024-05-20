import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const MyUrlField = ({ videoId = 'http://176.9.125.94:8081/yWbXvr1S/knst/playlist.m3u8' }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event:any) => {
    event.stopPropagation(); // Prevent the click from affecting the row
    setOpen(true);
  };

  const handleClose = (event:any) => {
    event.stopPropagation(); 
    setOpen(false);
  };

  const handleDialogClick = (event:any) => {
    event.stopPropagation(); 
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Watch Video
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        onClick={handleDialogClick}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Live Stream Video
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <ReactPlayer
            url={videoId}
            playing
            width="100%"
            height="100%"
            controls={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default MyUrlField;
