import React, { useEffect, useState } from "react";
import { Container, Row,Col, Table ,Form} from "react-bootstrap";
import BannerImage from "../assets/images/ido-banner-main.png"
import SecondImage from "../assets/images/second-section.png"
import SecondBackground from "../assets/images/second-background.png";
import { Link,Navigate,useNavigate } from "react-router-dom";
import { ethers, BigNumber } from 'ethers'
import StakingAbi from "../contract/Staking.json"
import ZPadAbi from "../contract/ZPad.json"
import {staking_addr, zpad_addr, rewardToken_addr} from "../contract/addresses"
import Web3Modal from 'web3modal'
import { useWeb3React } from "@web3-react/core";
import detectEthereumProvider from '@metamask/detect-provider'




function Collect(props){
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

    const [walletaddress,setWalletaddress] = useState()
    const [token,setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    const [ammount,setAmmount] = useState()
    const [totalammount,setTotalammount] = useState()
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

      const CollectFeee = async (e) => {
        try{
            let signer = await loadProvider()

            let wallet_addr = ethers.utils.getAddress(walletaddress)
            let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
            let value = ethers.utils.parseUnits( ammount , 4 ) ;
            let collect = await stakingContract.collectFee(wallet_addr,value)
            let tx = await collect.wait()
            
        }catch(e){
            console.log(e)
        }
    }

    const Feee = async (e) => {
        try{
            let signer = await loadProvider()

            let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
            let collect = await stakingContract.fee()
            setTotalammount(collect.toString())
            
        }catch(e){
            console.log(e)
        }
    }

      if(token == "null" || token == null){
        window.location = '/admin/login';
        }
   useEffect(() => {
    (async () => {
        if (account) {
            try {
                Feee()
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
                                <h3 className="main-heading text-center mt-4">Collect</h3>
                                <div className="mt-1 d-flex align-items-center justify-content-between">
                                    <span>Ammount to collect</span>
                                    <span>{totalammount} HZ</span>
                                </div>
                                <Form.Group className="mt-3" controlId="addr">
                                <Form.Label>Wallet Address</Form.Label>
                                <Form.Control type="text" autoComplete="off" value={walletaddress} onChange={(e)=>setWalletaddress(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group className="mt-3" controlId="ammount">
                                <Form.Label>Ammount</Form.Label>
                                <Form.Control type="number" value={ammount} onChange={(e)=>setAmmount(e.target.value)} required/>
                                </Form.Group>
                                <br/>
                                <button type="submit" className="btn-custom primary-btn" onClick={CollectFeee}>Collect</button>
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
export default Collect;