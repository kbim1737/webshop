import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import { withRouter } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './Navbar.css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AdminMenu from './AdminMenu';



const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
    //   anchorOrigin={{
    //     vertical: 'bottom',
    //     horizontal: 'center',
    //   }}
    //   transformOrigin={{
    //     vertical: 'top',
    //     horizontal: 'center',
    //   }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);


  
  

const Navbar = withRouter((props) => {
    
  
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

   


    const StyledBreadcrumb = withStyles((theme) => ({
        root: {
          backgroundColor: '#faf9f8',
          height: theme.spacing(3),
          color: theme.palette.grey[800],
          width: '6rem',
          fontWeight: theme.typography.fontWeightBold,
          '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
          },
          '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
          },
        },
      }))(Chip);


  
    

    const routeMen = () => {
        props.history.push("/men")    
    };

    const routeWomen = () => {
        props.history.push("/women")    
    };

    const routeLogin = () => {
        props.history.push("/login")    
    };

    const routeRegister = () => {
        props.history.push("/register")    
    };


    const routeProfile = () => {
        props.history.push("/profile")    
    };

    const routeHome = () => {
        props.history.push("/home")    
    };


    const routeLogout = () => {
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
                props.history.push("/home");
            }
        });
    }


    const routeAddNewProduct = () => {
        props.history.push("/newProducts")    
    };

    const routeDeleteProduct = () => {
        props.history.push("/home")    
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    


    const unauthenticatedNavBar = ()=>{
        return (
            <>
            <div className="left">
                <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                    label="MEN"
                    onClick={routeMen}
                />
                <StyledBreadcrumb
                    label="WOMEN"
                    onClick={routeWomen}
                />
                </Breadcrumbs>
            </div>
            <a className="normal-title text-monospace" onClick={routeHome}>

                    SLIPPER
                
            </a>
            <div className="right">
            <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
                label="LOGIN"
                onClick={routeLogin}
            />
            <StyledBreadcrumb
                label="REGISTER"
                onClick={routeRegister}
            />
            </Breadcrumbs> 
            </div>
            </>

        )
    }


    const authenticatedNavBar = ()=>{
        return(
             <>
             <div className="left">
            <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
                label="MEN"
                onClick={routeMen}
            />
            <StyledBreadcrumb
                label="WOMEN"
                onClick={routeWomen}
            />
            </Breadcrumbs> 
            </div>
            <div className="admin-title">
                <a className= "text-monospace" onClick={routeHome}>
                    SLIPPER   
                </a>
            </div>
            <div className="right">
            <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
                label="PROFILE"
                onClick={routeProfile}
            />
            <StyledBreadcrumb
                label="LOGOUT"
                onClick={routeLogout}
            />
          
            {
                user.role === "admin" ? 
                <AdminMenu></AdminMenu>:null
            }
               
        </Breadcrumbs> 
        </div>
            </>
  
        )
    }
    return(
        <nav className="navbar navbar-expand-sm border-bottom text-center">
            <div className="collapse navbar-collapse" id="navbarText">
                    { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar() }
            </div>
        </nav>
    )
});

export default Navbar;
