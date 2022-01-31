import { Container, Form, FormControl, Nav, Navbar,Button, NavDropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Web3Modal from "web3modal";
import { connectWallet } from "../utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import {injectedConnector} from "../../src/utils/connectors"

import VectorLogo from "../assets/images/vector-logo.png"
function DashboardHeader(){

  const {
    connector,
    library,
    account,
    chainId,
    activate,
    deactivate,
    active,
    errorWeb3Modal,
    // active: networkActive, error: networkError, activate: activateNetwork
  } = useWeb3React();

  const [token,setToken] = useState(localStorage.getItem("token"));
  // console.log("library", library)

  const [loaded, setLoaded] = useState(false)


  // useEffect(() => {
  //   injectedConnector
  //     .isAuthorized()
  //     .then((isAuthorized) => {
  //       setLoaded(true)
  //       if (isAuthorized && !networkActive && !networkError) {
  //         activateNetwork(injectedConnector)
  //       }
  //     })
  //     .catch(() => {
  //       setLoaded(true)
  //     })
  // }, [activateNetwork, networkActive, networkError])

  let url = process.env.REACT_APP_API;
  useEffect(async ()=>{
  await axios.post(url+'me', {
    token:token
  })
  .then(function (response) {
    if(!response.data){
      localStorage.setItem("token", null);
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
        {
          token == null ? '':<NavDropdown title="Manager" id="basic-nav-dropdown" className="manager-dropdown">
          <Link to={'/admin/add-project'} className="dropdown-item">Add Project</Link>
          <Link to={'/admin/projects'} className="dropdown-item">List Projects</Link>
        </NavDropdown>
        }
      </Nav>
      <Form className="d-flex">
       {/* <button type="button" className="btn-custom secondary-btn">CONNECTED</button> */}
       {active
        ? (<div><button type="button" className="btn-custom secondary-btn">CONNECTED</button></div>)
         : (<div><button onClick={() => {
          connectWallet(activate);
        }} type="button" className="btn-custom secondary-btn">Connect Wallet</button></div>)
         }
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
        </>
    )
}
export default DashboardHeader;