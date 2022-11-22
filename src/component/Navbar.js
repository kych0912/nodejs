import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Button, Toolbar, Typography, Modal, IconButton, InputBase, Badge, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LoginModal from './LoginModal';
import "../App.css";
import {Link} from 'react-router-dom';
import { getAddress } from '../api/UseKlip';

const DEFAULT_ADDRESS = "0x000000000000000000000000000000";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLogin,setIsLogin] = React.useState(true);
  const [address,setAddress] = React.useState("0x88B667D86FC7B318E9916b89b02f0013ce010321");
  const [balance,setBalance] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box className='navbar'>
      <AppBar color='transparent'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ color : "white",mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color : "white",flexGrow:1,display: { xs: 'none', md: 'block' } }}
          >
            BlockShare
          </Typography>
          
        
            <Box sx={{textflexGrow :1,justifyContent: 'center', display: { xs: 'block', md: 'none' }}}>
                <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color : "white",textAlign: 'center'}}
                >
                    BlockShare
                </Typography>
        
            </Box>
            <Box sx={{flexGrow:1}}/>
   
          {isLogin?
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Link to="/MyPage" state = {{balance : balance,address : address}}>
                    <Button sx={{color:"white"}}>
                        DASHBOARD
                    </Button>
                </Link>
            </Box>:
            <Button 
            onClick ={()=>{
                setOpen(true);
            }}
            variant="text" 
            sx={{
                color : 'white',
                px : 5,
                display: { xs: 'none', md: 'flex' }

            }}>
                Login
            </Button>
          }
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <LoginModal setOpen={setOpen} setIsLogin={setIsLogin} setAddress = {setAddress} setBalance = {setBalance}></LoginModal>
      </Modal>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}