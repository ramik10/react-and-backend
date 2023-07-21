import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
                                                                                                                                                          
const drawerWidth = 240;

export default function Navbar() {
  const navigate = useNavigate();
    return (
    
        <><AppBar  position="fixed" sx={{bgcolor:"#242424", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'flex-start', width: "auto" }}>
          <Typography color="#2196f3" variant="h5" component="div" sx={{ display: { xs: "none", lg: "block" }, flexGrow: 1 }}>
            COURSERA
          </Typography>
          <TokenDepend />
        </Toolbar>
      </AppBar><Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
                <ListItem key={"Home"} disablePadding>
                  <ListItemButton onClick={()=>{navigate("/")}}>
                    <ListItemIcon>
                      <HomeIcon /> 
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Courses"} disablePadding>
                  <ListItemButton onClick={()=>{navigate("/courses")}}>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Courses"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Mycourses"} disablePadding>
                  <ListItemButton onClick={()=>{navigate("/courses/purchased")}}>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Mycourses"} />
                  </ListItemButton>
                </ListItem>
                <Logout />
            </List>
          </Box>
        </Drawer></>

  );}
function Logout(){
  if (localStorage.getItem("token")) {
    return (
      <ListItem key={"Logout"} disablePadding>
                  <ListItemButton onClick={()=>{localStorage.removeItem("token")
                        localStorage.removeItem("username")
                        window.location.href = "/login"}}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItemButton>
                </ListItem>
    )}
}
 

function LoggedOut(){
  const navigate = useNavigate();
  return(   
       <><Button style={{ color: "#2196f3" }} onClick={()=>{navigate("/login")}}>Login</Button>
       <Button style={{ color: "#2196f3" }} onClick={()=>{navigate("/signup")}}>Signup</Button></>
  )
}

function LogoutButton(){
  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    window.location.href = "/login"
  }
  return(
    <Button sx={{paddingLeft:{lg:"10px", xs:"1px"},color:"#e5b000"}}onClick={logout}>Logout</Button>
  )
}
function MycoursesButton(){
  const navigate = useNavigate();
  return(<Button sx={{paddingLeft:{lg:"10px", xs:"1px"},color:"#e5b000"}} onClick={()=>{navigate("/courses/purchased")}}>MyCourses</Button>)
}
function CoursesButton(){
  const navigate = useNavigate();
  return(<Button sx={{paddingLeft:{lg:"10px", xs:"1px"},color:"#e5b000"}} onClick={()=>{navigate("/courses")}}>Courses</Button>)
}
function TokenDepend(){
 
  if (localStorage.getItem("token")) {
    return (
      <LoggedIn/>
    )}
  else{
      return(
        <LoggedOut/>
      )
    }
  }

function LoggedIn(){
  const username = localStorage.getItem("username")
  return(
    <div style={{display: 'flex', justifyContent:"flex-end"}}>
            <Typography xs="auto" color="#2196f3" variant="h3" component="div" sx={{fontSize:{lg:"140%", xs:"100%"}, flexGrow: 1,paddingTop:{lg:"1.5%", xs:"3%"}, paddingLeft:{lg:"10px", xs:"5px"}, paddingRight:{lg:"30px", xs:"0px"} }}>
              {username}
            </Typography>
            <Box sx={{paddingLeft:2, display:{lg:"none", xs:"block"}}} >
            <CoursesButton />
            <MycoursesButton />
            <LogoutButton />
            </Box>
     </div>
  )
}
