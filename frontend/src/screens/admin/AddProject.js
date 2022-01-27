import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { factory_addr } from "../../contract/addresses";
import Factory from '../../contract/Factory.json';
import ZPadAbi from '../../contract/ZPad.json'
import axios from 'axios';
import { useWeb3React } from "@web3-react/core";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
function AddProject(props){
    const [tokenAddress, setTokenAddress] = useState('0xdbC43Ba45381e02825b14322cDdd15eC4B3164E6')
    const [ownerAddress, setOwnerAddress] = useState('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    const [startTime, setStartTime] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [walletAddress, setWalletAddress] = useState('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    let url = process.env.REACT_APP_API;



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

    const api = async (e) =>{
        formData.append(
            "image",
            selectedFile
        );
        formData.append(
            "title",
            title
        );
        formData.append(
            "short_intro",
            shortintro
        );
        formData.append(
            "twitter",
            twitter
        );
        formData.append(
            "telegram",
            telegram
        );
        formData.append(
            "medium",
            medium
        );
        formData.append(
            "type",
            type
        );
        formData.append(
            "contract",
            e
        )
        formData.append(
            'token',
            token
        )
        console.log(formData.get('image'))
        await axios.post(url+'projects/create', formData)
          .then(function (response) {
            setMessage(response.data.message);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
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
    
      const formSubmit = async (e) => {
        e.preventDefault();
        try{
            let signer = await loadProvider()

            let eth_token_addr = ethers.utils.getAddress(tokenAddress)
            let eth_owner_addr = ethers.utils.getAddress(ownerAddress)
            let eth_wallet_addr = ethers.utils.getAddress(walletAddress)

            let ZPadContract = new ethers.Contract(eth_token_addr, ZPadAbi, signer)
            let allowanceCheck = await ZPadContract.allowance(eth_owner_addr, factory_addr)
            allowanceCheck = allowanceCheck.toString()
            let _value = await ethers.utils.parseEther('1000')
        
            if(allowanceCheck == 0){
                // console.log("allounceCheck>>", allowanceCheck)
                let approve = await ZPadContract.approve(factory_addr, _value)
                let approveTx = await approve.wait()

                if(approveTx.confirmations>=1){
                    let factory = new ethers.Contract(factory_addr, Factory, signer)
                    let price = ethers.utils.parseEther(salePrice)
                    let tx = await factory.create_TokenSale(eth_token_addr,eth_owner_addr,startTime,price,eth_wallet_addr)
                    let confirm = await tx.wait()
                    if(confirm.confirmations >= 1){
                     let ico_addr = await factory.ico_addr()
                    api(ico_addr)
            }
            else{
                console.log("error")
            }
                }
            }
            
        }catch(e){
            console.log(e)
        }
    }
    // end block chani states

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState('logo')
    const [title, setTitle] = useState('')
    const [shortintro, setShortintro] = useState('')
    const [message, setMessage] = useState('')
    const [type, setType] = useState('HCI')
    const [twitter, setTwitter] = useState('')
    const [telegram, setTelegram] = useState('')
    const [medium, setMedium] = useState('')
    const [token,setToken] = useState(sessionStorage.getItem("token"));

    const formData = new FormData();
      
     const handleChangeImage = e => {
        setSelectedFile(e.target.files[0]);
        
        setPreview({[e.target.name]: URL.createObjectURL(e.target.files[0])})

      }
     
  
    // useEffect(async ()=>{
    //     await 
    // },[])
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
    return(
        <>
        {props.header}
        <div className="position-relative">
            <img src={require('../../assets/images/banner-background.png').default} className="single-project-background"/>
            <div className="single-project-section admin-form-padding">
                <Container>
                <h2 className="h2 mb-3 text-center">Add Project</h2>
                <Row>
                    <Col lg={12} sm={12} md={6} className="m-auto">
                        <div className="ido-box">
                        <Form onSubmit={(e) => {
                                        formSubmit(e);
                                        }} enctype="multipart/form-data">
                            <Row className="gy-5">
                                <Col lg={6} sm={12} md={12}>
                             
                                <img src={preview['img']} alt="upload image" className="upload-img"/>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control type="file" id="img" name="img" accept="image/*" className="w-100 mt-3 " onChange={(e)=>handleChangeImage(e)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group className="mt-3" controlId="intro">
                                <Form.Label>Short Intro</Form.Label>
                                <Form.Control type="text" value={shortintro} onChange={(e)=>setShortintro(e.target.value)} required/>
                                </Form.Group>
                                
                                <Form.Group className="mt-3" controlId="twitter">
                                <Form.Label>Twitter Link</Form.Label>
                                <Form.Control type="text" value={twitter} onChange={(e)=>setTwitter(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="telegram">
                                <Form.Label>Telegram Link</Form.Label>
                                <Form.Control type="text" value={telegram} onChange={(e)=>setTelegram(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="medium">
                                <Form.Label>Medium Link</Form.Label>
                                <Form.Control type="text" value={medium} onChange={(e)=>setMedium(e.target.value)} required/>
                                </Form.Group>
                                
                                </Col>
                                <Col lg={6}>
                                    {/* block chain */}
                                <Form.Group className="mt-3" controlId="token">
                                <Form.Label>Token Address</Form.Label>
                                <Form.Control type="text" value={tokenAddress} onChange={(e)=>setTokenAddress(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="owner">
                                <Form.Label>Token Owner Address</Form.Label>
                                <Form.Control type="text" value={ownerAddress} onChange={(e)=>setOwnerAddress(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="start">
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="text" placeholder="Please put value in seconds" value={startTime} onChange={(e)=>setStartTime(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="price">
                                <Form.Label>Sale Price</Form.Label>
                                <Form.Control type="text" placeholder="Please put value in BUSD" value={salePrice} onChange={(e)=>setSalePrice(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="price">
                                <Form.Label>Payable Wallet Address</Form.Label>
                                <Form.Control type="text" placeholder="Please put value in BUSD" value={walletAddress} onChange={(e)=>setWalletAddress(e.target.value)} required/>
                                </Form.Group>
                                {/* block chain end  */}
                                <Form.Group className="mt-3" controlId="type">
                                <Form.Label>Type</Form.Label>
                                <Form.Select aria-label="Default select example" value={type} onChange={(e)=>setType(e.target.value)}>
                                <option value="HCI">HCI</option>
                                <option value="IDOs">IDOs</option>
                                </Form.Select>
                                </Form.Group>

                                <p className="text-success">{message}</p>
                                <button type="submit" className="btn-custom primary-btn mt-3">Submit</button>
                                </Col>
                            </Row>
                            </Form>

                        </div>
                    </Col>
                 
                   
                   
                </Row>
                </Container>
            </div>
        </div>

        {props.footer}
        
        </>
    )
}
export default AddProject;