import { Container, Form, FormControl, Nav, Navbar,Button, NavDropdown,  Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Web3Modal from "web3modal";
import { connectWallet } from "../utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import {injectedConnector} from "../../src/utils/connectors"
import VectorLogo from "../assets/images/vector-logo.png"
import HZPAD from "../assets/images/hzpad.png"
import { ethers, BigNumber } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider';



function DashboardHeader(props){

  const {
    connector,
    library,
    account,
    chainId,
    activate,
    deactivate,
    active,
    errorWeb3Modal,
    active: networkActive, error: networkError, activate: activateNetwork
  } = useWeb3React();
  // const { activateBrowserWallet, deactivate } = useEthers();
  // console.log("account", account)

  const [token,setToken] = useState(localStorage.getItem("token"));

  const [loaded, setLoaded] = useState(false)
  const [address, setAddress] = useState(localStorage.getItem("status"))
  const [shortAddress,setShortAddress] = useState()
  const [detectMetamask, setDetectMetamask] = useState("")
  const [show1, setShow1] = useState(false)
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
  


  useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true)
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injectedConnector)
        }
      })
      .catch(() => {
        setLoaded(true)
      })
  }, [activateNetwork, networkActive, networkError])

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
    localStorage.setItem("token", null);

  });

  

  },[]);

  useEffect(() => {
    (async () => {
      if (account && library) {
        try {
          let len = account.length 
          let short = account.slice(0, 4)+"..." + account.slice(len-5, len-1)
          setShortAddress(short);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [account,library]);

  const detect = async () => {
    const provider = await detectEthereumProvider();

  if (provider) {
    // console.log('Metamask Installed')
    return 
  } else {
    setDetectMetamask("Install Metamask")
    console.log('Please install MetaMask!');
  }
  }
  detect()

  const logout = () => {
    setAddress("0")
    handleClose1()
    // localStorage.setItem("status", address);
    // localStorage.getItem('status') ==
  }
  localStorage.setItem("status", address);

  const disconnect = () => {
    handleShow1()
  }

  console.log("address", localStorage.getItem('status'))



    return (
        <>
        <div>{detectMetamask}</div>
         <div className="custom-header">
         {
          networkError?
          <div className="text-center">
          <span className="text-center text-red">{networkError.toString()}</span>
          </div>
       :null
        }
        <Navbar  expand="lg">
    <Container >
      {
        props.logo ?
        <Link to={'/'} className="navbar-brand"><img src={VectorLogo} className="logo"/></Link>
        :
        <Link to={'/'} className="navbar-brand"><img src={HZPAD} height={80} className="logo"/></Link>
      }
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
          token == 'null' || token == null ? '':<NavDropdown title="Manager" id="basic-nav-dropdown" className="manager-dropdown">
          <Link to={'/admin/add-project'} className="dropdown-item">Add Project</Link>
          <Link to={'/admin/projects'} className="dropdown-item">List Projects</Link>
        </NavDropdown>
        }
      </Nav>
      <Form className="d-flex">

     {/* { active ? (<div><button type="button"  className="btn-custom secondary-btn" onClick={deactivate} >Disconnect</button></div>) : <p>sss</p>} */}
       
         {
           networkError?<button type="button" className="btn-custom secondary-btn">Connect Wallet</button>:
           active && address ==  "1"
            ? (<div>
              
              <button type="button"  className="btn-custom secondary-btn" onClick={disconnect} >Disconnect</button>
              <button type="button" className="btn-custom secondary-btn">{shortAddress}</button>
              </div>)
             : (<div><button onClick={() => {
              connectWallet(activate, props.setErrorMessage);
              setAddress("1")
            }} type="button" className="btn-custom secondary-btn">Connect Wallet</button>
             
            </div>) 
         }

                        {active  ? (
                                
                                <Modal show={show1} onHide={handleClose1}  className='custom-modal' 
                                aria-labelledby="contained-modal-title-vcenter"
                                centered>
                                    <Modal.Body>
                                    <div style={{textAlign:"center"}}>
                                          <p style={{ color:"white"}} >{account}</p>
                                          <button type="button"  className="btn-custom secondary-btn" onClick={logout} >Disconnect</button>
                                    </div>
                                    </Modal.Body>
                                
                            </Modal>
                            
                        ): null}

         {/* {
           active && address !== "0"  ? (<div>
             <button type="button" className="btn-custom secondary-btn">CONNECTED</button>
              <button type="button"  className="btn-custom secondary-btn" onClick={logout} >Disconnect</button>
           </div>): (<div><button onClick={() => {
              connectWallet(activate, props.setErrorMessage);
            }} type="button" className="btn-custom secondary-btn">Connect Wallet</button></div>)
         } */}
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
    
        
        </>
    )
}
export default DashboardHeader;