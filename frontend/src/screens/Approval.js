import React, { useEffect, useState } from "react";
import { Container, Row,Col, Table ,Form} from "react-bootstrap";
import BannerImage from "../assets/images/ido-banner-main.png"
import SecondImage from "../assets/images/second-section.png"
import SecondBackground from "../assets/images/second-background.png";
import { Link,useNavigate } from "react-router-dom";
import { factory_addr } from "../contract/addresses";
import Factory from '../contract/Factory.json';
import ZPadAbi from '../contract/ZPad.json'
import Crowdsale from '../contract/CrowdSale.json'
import axios from 'axios';
import { useWeb3React } from "@web3-react/core";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'




function Approval(props){
    const {
        connector,
        library,
        account,
        chainId,
        activate,
        deactivate,
        active,
        errorWeb3Modal
    } = useWeb3React();

    const [tokenaddress,setTokenaddress] = useState()
    const [ammount,setAmmount] = useState()
    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
          } catch (e) {
            console.log("loadProvider default: ", e);
          }
      };

      const checkAllowence = async (e) => {
        try{
            let signer = await loadProvider()

            let eth_token_addr = ethers.utils.getAddress(tokenaddress)

            let ZPadContract = new ethers.Contract(eth_token_addr, ZPadAbi, signer)
            let _value = await ethers.utils.parseEther(ammount)
        
                // console.log("allounceCheck>>", allowanceCheck)
                let approve = await ZPadContract.approve(factory_addr, _value)
                let approveTx = await approve.wait()
            
        }catch(e){
            console.log(e)
        }
    }
      
   useEffect(() => {
    (async () => {
        if (account) {
            try {

            } catch (error) {
                console.log(error)
            }
        }
    })()
}, [account]);
    return (
        <>
        {props.header}
        <div className="position-relative">
            <img src={require('../assets/images/banner-background.png').default} className="banner-background"/>
            <div className="banner-section">
                <Container>
                <Row>
                    <Col lg={6} sm={12} md={6} className="m-auto">
                        <div className="ido-box mt-5">
                            <Row className="gy-5">
                                <Col lg={12} sm={12} md={12}>
                                <h3 className="main-heading text-center mt-4">Approval</h3>
                                
                                <Form.Group className="mt-3" controlId="addr">
                                <Form.Label>Token Address</Form.Label>
                                <Form.Control type="text" autoComplete="off" value={tokenaddress} onChange={(e)=>setTokenaddress(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group className="mt-3" controlId="ammount">
                                <Form.Label>Ammount</Form.Label>
                                <Form.Control type="number" value={ammount} onChange={(e)=>setAmmount(e.target.value)} required/>
                                </Form.Group>
                                <br/>
                                <button type="submit" className="btn-custom primary-btn" onClick={checkAllowence}>Approve</button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                 
                   
                   
                </Row>
                </Container>
            </div>
        </div>

        {props.footer}
        
        </>
    );
}
export default Approval;