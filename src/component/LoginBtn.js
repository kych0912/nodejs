import QRCode from "qrcode.react";
import { AppBar, Box, Button, Toolbar, Typography, Modal } from '@mui/material';
import { useState } from "react";



export function LoginBtn(value){
    
    return(
        <div className="flex w-max">
            <Button onClick = {()=>{
                value.setOpen(true);
                value.setLogin(true);
            }}className = "rounded-lg p-1.5" size="lg">
                Login
            </Button>
        </div>
    )
}