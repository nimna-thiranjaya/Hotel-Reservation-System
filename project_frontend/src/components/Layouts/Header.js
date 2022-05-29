import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { FaAlignLeft } from 'react-icons/fa';
import Logo from "../../asserts/Logo.png"
 function Header() {
    const [imageUrl, setimageUrl] = useState("")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const onredirect =() =>{
      window.location.href='/show';
    }

    const handleClose = () => {
      setAnchorEl(null);
    };
    const logOut = () => {
      if (window.confirm('Are you sure you wish to logout from this Account?')) {
        localStorage.removeItem('Authorization')
        console.log("log out complete")
        window.location = "/"
    }
    };

    const redirectToProfile = () => {
      window.location.href="/profile"
    };

    useEffect(() => {
        const getUserData = async () => {
           try {
              const config = {
                 headers: {
                    Authorization: localStorage.getItem("Authorization")
                 },
              }
              await axios.get("http://localhost:8000/traveler/profile", config)
                .then((res) => {
                    setimageUrl(res.data.traveler1.imageUrl);
                }).catch((error) => {
                  console.log(error.message)
                })
           } catch (error) {
              console.log(error.message)
           }
        }
        getUserData()
     }, [])
   

    return (
      <div>
        <nav className="navbar navbar-dark" style={{"background-color":"#060b26"}}>
            <div class="container-fluid">
               <img src={Logo} style={{height:75+"px"}}/>
                <br/> 
                <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className='float-left'>
                
        <img class="logo" src={imageUrl} alt="proimage"/>
        
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
  
        <MenuItem onClick={redirectToProfile}>Profile</MenuItem>
        <MenuItem onClick={onredirect}>My Reservations</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
            </div>
        </nav>
      </div>
    )

}
export default Header;