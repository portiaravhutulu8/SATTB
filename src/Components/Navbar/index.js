import React from 'react';
import {Nav, Bars, NavMenu, NavLink} from './NavbarElements';

const Navbar = () => {
  return (
    <>
    <Nav>
        <NavLink to="/">
            <h1> SATTB application</h1>
        </NavLink>
        <Bars />
        <NavMenu>
            <NavLink to="/tournaments" activeStyle>
            Tournaments    
            </NavLink>
            <NavLink to="/livetournaments" activeStyle>
            Live Tournaments
            </NavLink>
            <NavLink to="/rankings" activeStyle>
            Rankings  
            </NavLink>
            <NavLink to="/settings" activeStyle>
            Settings   
            </NavLink>
        </NavMenu>
    </Nav>
    </>
  );
};

export default Navbar;