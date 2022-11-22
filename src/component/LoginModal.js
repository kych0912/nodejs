import { useState, useEffect } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, Modal,Container } from '@mui/material';
import LoginBtn from './LoginBtn';
import {getBalance} from "../api/UseCaver";
import * as KlipAPI from "../api/UseKlip";
import QRCode from "qrcode.react";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
  pt: 3,
  borderRadius: 2,
  textAlign: 'center'
};

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x000000000000000000000000000000";

const LoginModal = (props) => {

  const [myBalance, setMyBalance] = useState("0");
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);

  // UI
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

  const getAddress = async () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      const _balance = await getBalance(address);  //비동기(async) await 
      props.setOpen(false);
      props.setIsLogin(true);
      setMyAddress(address);
      props.setAddress(myAddress);
      props.setBalance(_balance);
      console.log(_balance);
    });
  }

  const [isLogin, setIsLogin] = useState('false');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAddress();
  }, []);
  
  return (
    <>
      <Box sx={style}>
        <Container
          style={{
            backgroundColor: "white",
            width: 300,
            height: 300,
            padding: 20
          }}>
            Klip Login
          <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />
        </Container>
      </Box>
    </>
  );
};

export default LoginModal;