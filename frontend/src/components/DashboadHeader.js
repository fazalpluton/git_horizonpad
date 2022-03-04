import { Container, Form, FormControl, Nav, Navbar,Button, NavDropdown,  Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import axios from "axios";
import Web3Modal from "web3modal";
import { connectWallet } from "../utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import {injectedConnector} from "../../src/utils/connectors"
import VectorLogo from "../assets/images/vector-logo.png"
import HZPAD from "../assets/images/hzpad.png"
import { ethers, BigNumber } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider';
// import Web3Connect from "web3connect";
// import WalletConnectProvider from "@walletconnect/web3-provider";

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
  const location = useLocation();
  useEffect(() => {
    console.log("kicat",{location});
    window.scrollTo({
      top: 0,
    });
  }, [location]);

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

  let chain = chainId

  // const loadProvider = async () => {
  //   const web3Modal = new Web3Modal({
  //     // network: chainId, // optional
  //     cacheProvider: true, // optional
  //     providerOptions: {
  //       walletconnect: {
  //         package: WalletConnectProvider,
  //         options: {
  //           // chainId: chainId,
  //           infuraId: '4774218cabd3475da6e9fe41ab23f911',
  //         },
  //       },
  //     },
  //   });

  //   const connection = await web3Modal.connectTo('walletconnect')
  //   console.log("connection", connection)
  //   return new ethers.providers.Web3Provider(connection)
  // };

  // loadProvider()


  // export default function wallet_model() {
  //   const [loading, setLoading] = useState(false);
  //   return {
  //   get web3Loading() {
  //   return loading
  //   },
  //   async getweb3() {
  //   setLoading(true);
  //   let web3Modal;
  //   let provider;
  //   let web3;
  //   let providerOptions;
  //   providerOptions = {
  //   metamask: {
  //   id: "injected",
  //   name: "MetaMask",
  //   type: "injected",
  //   check: "isMetaMask",
  //   },
  //   walletconnect: {
  //   package: WalletConnectProvider, // required
  //   options: {
  //   infuraId: "INFURA_ID", // Required
  //   network: "rinkeby",
  //   qrcodeModalOptions: {
  //   mobileLinks: [
  //   "rainbow",
  //   "metamask",
  //   "argent",
  //   "trust",
  //   "imtoken",
  //   "pillar"
  //   ]
  //   }
  //   }
  //   },
  //   authereum: {
  //   package: Authereum // required
  //   },
  //   };
  //   web3Modal = new Web3Modal({
  //   network: "rinkeby",
  //   cacheProvider: true,
  //   providerOptions
  //   });
  //   provider = await web3Modal.connect();
 
  //   web3 = new Web3(provider);
  //   setLoading(false);
  //   return web3;
  //   },
  //   }
  //   }

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
             : (
             <div><button onClick={() => {
              connectWallet(activate, props.setErrorMessage);
              setAddress("1")
            }} type="button" className="btn-custom secondary-btn">Connect Wallet</button>
             
            </div>

            // <div><button onClick={loadProvider} type="button" className="btn-custom secondary-btn">Connect Wallet</button>
             
            //  </div>
            ) 
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