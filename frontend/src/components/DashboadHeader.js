import { Container, Form, FormControl, Nav, Navbar,Button, NavDropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import VectorLogo from "../assets/images/vector-logo.png"
function DashboardHeader(){
  const [token,setToken] = useState(sessionStorage.getItem("token"));
  let url = process.env.REACT_APP_API;
  useEffect(async ()=>{
  await axios.post(url+'me', {
    token:token
  })
  .then(function (response) {
    if(!response.data){
      sessionStorage.setItem("token", null);
    }
  })
  .catch(function (error) {
    // console.log(error);
  });
  },[]);
    return (
        <>
         <div className="custom-header">
        <Navbar  expand="lg">
    <Container >
      <Link to={'/'} className="navbar-brand"><img src={VectorLogo} className="logo"/></Link>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Link to={'/staking'} className="nav-link">Staking</Link>
        <Link to={'/ido-projects'} className="nav-link">IDO Projects</Link>
        <Link to={'/hci-projects'} className="nav-link">HCI Projects</Link>
      </Nav>
      <Form className="d-flex">
       <button type="button" className="btn-custom secondary-btn">Connect Wallet</button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
        </>
    )
}
export default DashboardHeader;