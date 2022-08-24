import styled from 'styled-components'
import {NavLink as Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav`
 background: lightgrey;
 height: 80px;
 display: flex;
 justify-content: space-between;
 padding: 0.5rem calc((100vw - 1000px) / 2);
 z-index: 10;
`

export const NavLink = styled(Link)`
 color: black;
 display: flex;
 align-items: center;
 text-decoration: none;
 padding: 0 1rem;
 height: 100%;
 cursor: pointer;

&.active {
    color: white;
}
`
export const Bars = styled(FaBars)`
display: none;
color: white;

@media screen and (max-width: 760px){
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 2rem;
    cursor: pointer;
}
`

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -20px;

@media screen and (max-width: 786px){
display: none;
}
`

