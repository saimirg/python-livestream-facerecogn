// import { useRecordContext } from "react-admin";
// import { Link } from "@mui/material";
// import LaunchIcon from "@mui/icons-material/Launch";

// const MyUrlField = ({ source }: { source: string }) => {
//     const record = useRecordContext();
//     return record ? (
//         <Link href={record[source]} sx={{ textDecoration: "none" }}>
//             {record[source]}
//             <LaunchIcon sx={{ fontSize: 15, ml: 1 }} />
//         </Link>
//     ) : null;
// };

// export default MyUrlField;

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// const MyUrlField = () => {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = (event:any) => {
//     event.stopPropagation(); // Prevent the click from affecting the row
//     setOpen(true);
//   };

//   const handleClose = (event:any) => {
//     event.stopPropagation(); // Also stop propagation here to handle edge cases
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Watch Video
//       </Button>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Video
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent dividers>
//           <Typography gutterBottom>
//             Cras mattis consectetur purus sit amet fermentum...
//           </Typography>
//         </DialogContent>
//       </BootstrapDialog>
//     </React.Fragment>
//   );
// }

// export default MyUrlField;


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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const MyUrlField = ({ videoId = 'dQw4w9WgXcQ' }) => { 
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

  const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0`; // Autoplay and mute parameters

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
          Video
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
          <iframe
            width="560"
            height="315"
            src={iframeSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
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

