import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { SideBarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: centre;
`;

const NavIcon = styled(Link)`
  margin-left: 1rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SideBarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SideBarWrap = styled.div`
  width: 100%;
`;


export const SideBar = () => {
  const [sidebar, setSideBar] = useState(false);
  const showSideBar = () => setSideBar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <IoIcons.IoIosMenu onClick={showSideBar} />
              {/*This "div" is for the blank space 
              above the side bar I'll add the SATTB 
              Logo here later*/}
          </NavIcon>
        </Nav>
        <SideBarNav sidebar={sidebar}>
          <SideBarWrap>
            <NavIcon to="#">
              <IoIcons.IoIosMenu onClick={showSideBar} />
              {/*This "div" is for the blank space 
              above the side bar I'll add the SATTB 
              Logo here later*/}
              {/*<img src={require('../../images/logo.png')} 
              style={{ 
                width: 50,
              height: 50,}}/>*/}
            </NavIcon>
            {SideBarData.map((item, index) => {
              return <SubMenu item={item} key={index}></SubMenu>;
            })}
          </SideBarWrap>
        </SideBarNav>
      </IconContext.Provider>
    </div>
  );
};
