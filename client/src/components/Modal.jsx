import React, { useEffect, useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      width: '1000px',
      position: 'absolute',
      margin: 'auto',
      right: 0,
      height: '100%'
    },
  }));

const ModalWindow = ({ open, children, close }) => {
    const classes = useStyles();
    const {request} = useHttp();
    const auth = useContext(AuthContext);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={close}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    {children}
                </div>
            </Fade>
        </Modal>
    )
};

export default ModalWindow;