import { Box, Grid, Typography,Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Possession from './Possession';
import { useLocation } from 'react-router-dom';
import {getBalance,fetchCardsOf} from '../api/UseCaver';

const MyPage = () => {
  const location = useLocation();
  const [nfts,setNfts] = useState([]);

  const typoStyle = {
    my: 1,
  };

  const fetchMyNFTs = async () =>{
    const _nfts = await fetchCardsOf(location.state.address);
    console.log(_nfts);
    setNfts(_nfts);
    console.log(nfts);
  }

  useEffect(()=>{
    console.log(location.state.address);
    fetchMyNFTs()},[]
  );
  
  return (
    <>
      <Grid className='bg1' container sx={{
        display : 'flex',
        justifyContent : 'center',
        pt : 10,

      }}>
        <Grid md={8} xs={12}>
          <Box mb={3}>
            <Typography variant='h6' sx={typoStyle}>
              보유 잔고
            </Typography>
            <Typography sx={{ bgcolor: 'aliceblue', fontSize: '1.2em', p: 1 }}>
              {location.state.balance } KLAY
            </Typography>
          </Box>
          <Grid>
            <Typography variant='h6' sx={typoStyle}>
              보유 교환권
            </Typography>
            <Box>
            <Grid container sx={{ display: 'flex' }} spacing={2}>
                {nfts.map((item, index) => (
                    <Grid
                        item
                        xs={6}
                        md={4}
                        key={index}
                        sx={{ cursor: 'pointer', textAlign: 'center', }}
                    // columnSpacing={5}
                    >
                        {/* <Paper sx={{ width: 230, height: 300, p:2 }}> */}
                        <Box
                            sx={{
                                bgcolor: '#ccc', width: '100%', height: 180,
                                // height는 이미지 heigh로 들어가게! 100%로ㄴ
                                backgroundImage: nfts[index].uri,
                                // backgroundImage: `url("https://source.unsplash.com/collection/${index}")`
                            }}
                        >
                        </Box>
                        {/* <Button>xs=2</Button> */}
                        
                        {/* </Paper> */}
                    </Grid>
                ))}
            </Grid>
        </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MyPage;