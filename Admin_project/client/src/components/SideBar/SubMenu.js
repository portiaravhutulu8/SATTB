import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideBarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  font-size: 18px;

  &:hover {
    background: #252631;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SideBarLabel = styled.span`
  margin-left: 16px;
  textDecoration: 'none';
`;

const SubMenu = ({ item }) => {
  return (
    <>
      <SideBarLink to={item.path} style={{ textDecoration: 'none' }}>
        <div>
          {item.icon}
          <SideBarLabel>{item.title}</SideBarLabel>
        </div>
      </SideBarLink>
    </>
  );
};

export default SubMenu;
