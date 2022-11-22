import * as React from 'react';
import {useState} from 'react';
import {TextField, Container, Modal} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DropFileInput from "../component/DropFileInput";
import { height } from '@mui/system';
import * as UseKAS from '../api/UseKAS';
import QRCode from "qrcode.react";
import * as KlipAPI from '../api/UseKlip'; 
import uploadImg from '../cloud-upload-regular-240.png';

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x000000000000000000000000000000";

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


const Mint = () => {

  const [imgBase64, setImgBase64] = useState(uploadImg); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일	
  const [uri,setURI] = useState("");
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [myBalance,setMyBalance] = useState('0');
  const [myAddress,setMyAddress] = useState('0x00000000000000000');

  const onClickMint = async (uri) => {
    if(myAddress === DEFAULT_ADDRESS) alert("NO ADDRESS");
    const randomTokenId = parseInt(Math.random()*10000);
    KlipAPI.mintCardWithURI(myAddress,randomTokenId,uri,setQrvalue,(result) =>{
      alert(JSON.stringify(result));
    });
    handleClose();
  }

const handleChangeFile = (event) => {
  const form = new FormData();

  console.log(event.target.files)
  setImgFile(event.target.files);
  form.append("file", event.target.files);
  setImgBase64([]);
  for(var i=0;i<event.target.files.length;i++){
  if (event.target.files[i]) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
    // 파일 상태 업데이트
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      console.log(base64)
      if (base64) {
      //  images.push(base64.toString())
      var base64Sub = base64.toString()
         
      setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
      //  setImgBase64(newObj);
        // 파일 base64 상태 업데이트
      //  console.log(images)
      }
    }
  }
}

}

  return (
    <Box>
      <Box className='bg1' sx={{
        display : 'flex',
        justifyContent: 'center',
        flexDirection : 'column',
        alignItems:'center',
      }}>
        <Box sx={{
          width: '400px',
          height: '400px',
          border:1,
          borderStyle : 'dashed',
          borderRadius : 5,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          }}>
          {imgBase64.length == 0? <DropFileInput/>:""}
            <img
              className="d-block w-100"
              src={imgBase64}
              alt="First slide"
              style={{
                width: '380px',
                height: 'auto',
              }}
            />
        </Box>
        Image URI
        <TextField id="outlined-basic" label="Image URI" variant="outlined" onChange={(e)=>{ 
          setURI(e.target.value);
          setImgBase64(e.target.value);
        }}/>
        ADDRESS
        <TextField id="outlined-basic" label="ADDRESS" variant="outlined" onChange={(e)=>{ 
          setMyAddress(e.target.value);
        }}/>
        <Button onClick = {() => {
          onClickMint(uri);
          handleOpen();
        }}>
          Mint
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
      </Modal>
  </Box>
  );
}

export default Mint;