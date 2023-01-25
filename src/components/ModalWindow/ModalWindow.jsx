import React from 'react'
import { Modal , Fade , Box , Typography ,  Backdrop ,} from '@mui/material';
function ModalWindow({text , handleClose , open , children}) {

   const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
      bgcolor: "background.paper",
      borderRadius: "10px",
      boxShadow: 24,
      p: 4,
      textAlign: "center",
   };
    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
           timeout: 500,
        }}
     >
        <Fade in={open}>
           <Box sx={style}>
              <Typography
                 id="transition-modal-title"
                 variant="h6"
                 component="h2"
              >
                 {text}
              </Typography>
            
              {children}
            
           </Box>
        </Fade>
     </Modal>
    )
}

export default ModalWindow
