import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { withRouter } from 'react-router-dom';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Dropdown from 'react-bootstrap/Dropdown'
import './AdminMenu.css'





const ButtonMenu =  withRouter((props) => {

  return (
    <Dropdown>
    <Dropdown.Toggle>
        ADMIN
    </Dropdown.Toggle>

    <Dropdown.Menu>
        <Dropdown.Item href="/newProduct">Add new product</Dropdown.Item>
        <Dropdown.Item href="/editShoes">Edit shoes</Dropdown.Item>
        <Dropdown.Item href="/editSlideshow">Edit slideshow</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
  );
});

export default ButtonMenu;
