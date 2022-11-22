import {useState} from "react";
import { AppBar, Box, Button, Toolbar, Typography, Modal,Container } from '@mui/material';
import '../App.css';
import Bg from "../component/background";
import {Link} from 'react-router-dom';

const Main = () => {
    return(
        <Box className="bg">
            <Box sx ={{
                pt:'10%',
                pb:7,
                paddingX:15,
                fontWeight :400,
                fontSize :100
            }}>
                <Typography sx ={{
                    color:"white",
                    fontWeight :400,
                    fontSize :100,
                    height : 130
                }}>
                    CREATE
                </Typography>
                <Typography sx ={{
                    color:"white",
                    fontWeight :400,
                    fontSize :100,
                    height : 130
                }}>
                    YOUR
                </Typography>
                <Typography sx ={{
                    color:"white",
                    fontWeight :400,
                    fontSize :100,
                    height : 130
                }}>
                    NFTS
                </Typography>
            </Box>
            <Box sx={{
                    paddingX:15,    
                }}>
                <Link to ="/mint">
                    <Button sx ={{
                        border: 1,
                        borderColor: "white",
                        borderRadius:0,
                        color:"white",
                        width:170,
                        height:60,
                        fontSize:25,

                    }}>CREATE</Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Main;