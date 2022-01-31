import { Container, Row,Col,DropdownButton,Dropdown,Table, Modal, Form  } from "react-bootstrap";
import React, { useState,useEffect } from "react";
import IdoBox from "../components/ido-box"
import BannerImage from "../assets/images/second-section.png"
import SecondBackground from "../assets/images/second-background.png";
import ido_logos from "../assets/images/ido-logos.png"
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useWeb3React } from "@web3-react/core";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import ContractCrowdSale from '../contract/CrowdSale.json';
import TicketConsumer from '../contract/TicketConsumer.json';
import { busd_addr, ticketConsumer_addr } from "../contract/addresses";
import ZPadAbi from '../contract/ZPad.json'

function ProjectDetails(props){
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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let url = process.env.REACT_APP_API;
    const [project,setProject] = useState([]);
    const [detailType,setDetailType] = useState("detail");
    const [whitelist_start,setWhitelist_start] = useState('');
    const [whitelist_end,setWhitelist_end] = useState('');
    const [sale_start,setSale_start] = useState('');
    const [sale_end,setSale_end] = useState('');
    const [des_end,setDes_end] = useState('');
    const [ticketlist,setTicketlist] = useState([])
    const [claimstatus,setClaimstatus] = useState()
    const [busdvalue,setBusdvalue] = useState(0)
    const [allowancestatus,setAllowancestatus] = useState(false)
    const [pervalue,setPervalue] = useState(0)
    const [error, setError] = useState()
    const [errorMsg, setErrorMsg] = useState()

    const { id } = useParams();



    useEffect(async ()=>{
    await axios.get(url+'projects/'+id).then((res)=>{
        setProject(res.data.projects)
         let old_whitelist_start = new Date(res.data.projects.c_whitelist_start * 1000)
         let old_whitelist_end = new Date(res.data.projects.c_whitelist_end * 1000)
         let old_sale_start = new Date(res.data.projects.c_sale_start * 1000)
         let old_sale_end = new Date(res.data.projects.c_sale_end * 1000)
         let old_des_end = new Date(res.data.projects.c_destribution_end * 1000)
         setWhitelist_start(old_whitelist_start.toString())
         setWhitelist_end(old_whitelist_end.toString())
         setSale_start(old_sale_start.toString())
         setSale_end(old_sale_end.toString())
         setDes_end(old_des_end.toString())
         setPervalue(1 / res.data.projects.price)

    })
    },[]);

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
    
      const Whitelist_Application = async (e) => {
        try{
            let signer = await loadProvider()
            let crowdsale_contract = new ethers.Contract(project.contract, ContractCrowdSale, signer)
            let whitelist = await crowdsale_contract.getWhitlisted();
            await whitelist.wait();
            
        }catch(e){
            console.log(e)
        }
        }

        const Claim = async (e) => {
            try{
                let signer = await loadProvider()
                let crowdsale_contract = new ethers.Contract(project.contract, ContractCrowdSale, signer)
                let claim_time = await crowdsale_contract.claim();
                await claim_time.wait();
                
            }catch(e){
                console.log(e)
            }
            }
         
        const Finalize = async (e) => {
            try{
                let signer = await loadProvider()
                let crowdsale_contract = new ethers.Contract(project.contract, ContractCrowdSale, signer)
                let finalize_time = await crowdsale_contract.Finalize();
                await finalize_time.wait();
                
            }catch(e){
                console.log(e)
            }
            }   

        const Allocations = async (e) => {
            try{
                let signer = await loadProvider()
                let ticketcontract = new ethers.Contract(ticketConsumer_addr, TicketConsumer, signer)
                setTicketlist(await ticketcontract.getUserAppliedProjects(account))
                let crowdsale_contract = new ethers.Contract(project.contract, ContractCrowdSale, signer)
                let claim_status = await crowdsale_contract.getClaimed(account);
                setClaimstatus(claim_status);
                console.log(claim_status)
                
            }catch(e){
                console.log(e)
            }
        }

        const Swap_Token = async (e) => {
            try{
                let signer = await loadProvider()
                let BUSD = new ethers.Contract(busd_addr, ZPadAbi, signer)
                let allowanceCheck = await BUSD.allowance(account, project.contract)
                console.log(allowanceCheck.toString())
                if(allowanceCheck ==0){
                    let _value = await ethers.utils.parseEther(busdvalue)
                    let approve = await BUSD.approve(project.contract, _value)
                    let approveTx = await approve.wait()
                    allowanceCheck = await BUSD.allowance(account, project.contract)
                    if(approveTx.confirmations>=1){
                        setAllowancestatus(true)
                    }
                }
                else{
                    let crowdsale_contract = new ethers.Contract(project.contract, ContractCrowdSale, signer)
                    let buy_token = await crowdsale_contract.buyTokens();
                    await buy_token.wait();
                }
       
                
            }catch(e){
                console.log(e)
            }
        }


        const checkAllowence = async (e) => {
            try{
                let signer = await loadProvider()
                let BUSD = new ethers.Contract(busd_addr, ZPadAbi, signer)
                let allowanceCheck = await BUSD.allowance(account, project.contract)
                setBusdvalue(allowanceCheck.toString())
                if(allowanceCheck ==0){
                    setAllowancestatus(false)
                }
                else{
                    setAllowancestatus(true)
                }
                
            }catch(e){
                console.log(e)
            }
        }
        


   useEffect(() => {
        (async () => {
            if (account) {
                try {
                    checkAllowence()
                    Allocations()

                } catch (error) {
                    console.log(error)
                }
            }
        })()
    }, [account,project]);

    return (
        <>
        {props.header}
        <div className="position-relative">
            <img src={require('../assets/images/banner-background.png').default} className="banner-background"/>
            <div className="banner-section banner-section-m">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} sm={12} md={6} className="py-5">

                            <div className="ido"> 

                                <img src={url+project.img} />

                                <div className="ido-details">

                                    <h4>{project.title}</h4>

                                </div>

                            </div>

                            <div className="d-flex">
                                
                                <ul className="ido-ul w-50">
                            {
                                project.medium == null?
                                "":<li><a href={project.medium} target="_blank"><i class="fa-brands fa-medium"></i></a></li>
                            }
                            {
                                project.twitter == null?
                                "": <li><a href={project.twitter} target="_blank"><i class="fa-brands fa-twitter"></i></a></li>
                            }
                            {
                                project.telegram == null?
                                "":   <li><a href={project.telegram} target="_blank"><i class="fa-brands fa-telegram"></i></a></li>
                            }
                            {
                                project.web == null?
                                "":<li><a href={project.web} target="_blank"><i class="fa-solid fa-globe"></i></a></li>
                            }

                                </ul>
                            
                                {
                                    project.time_status == "0" &&
                                    <p className="soon">
                                    <i class="fa-solid fa-circle"></i>
                                    Soon</p>
                                }
                                {
                                    project.time_status == "1" &&
                                    <p className="live">
                                    <i class="fa-solid fa-circle"></i>
                                    Whitelist Open</p>
                                }
                                {
                                    project.time_status == "2" &&
                                    <p className="closed">
                                    <i class="fa-solid fa-circle"></i>
                                    Whitelist Closed</p>
                                }
                                   {
                                        project.time_status == "3" &&
                                        <p className="live">
                                        <i class="fa-solid fa-circle"></i>
                                        Live</p>
                                    }

                                    {
                                        project.time_status == "4" &&
                                        <p className="live">
                                        <i class="fa-solid fa-circle"></i>
                                        Destribution</p>
                                    }
                                    {
                                        project.time_status == "5" &&
                                        <p className="closed">
                                        <i class="fa-solid fa-circle"></i>
                                        Sale Ended</p>
                                    }

                            </div>


                            <p className="f-bold my-3">
                            {project.short_intro}
                            </p>

                            <div className="my-5 btn-group-custom">
                                
                                {
                                    project.time_status == 0 &&
                                    <button className="btn-custom secondary-btn" disabled>Apply Now</button>
                                }
                                {
                                    project.time_status == 1 &&
                                    <button className="btn-custom secondary-btn" onClick={(e)=>Whitelist_Application(e)}>Apply Now</button>
                                }
                                 {
                                    project.time_status == 2 &&
                                    <button className="btn-custom secondary-btn" disabled>Swap</button>
                                }
                                 {
                                    project.time_status == 3 &&
                                    <button className="btn-custom secondary-btn" onClick={handleShow}>Swap</button>
                                }
                                 {
                                    project.time_status == 4 &&
                                    <button className="btn-custom secondary-btn" disabled>Claim</button>
                                }
                                
                                {
                                    project.time_status == 5 &&
                                    <button className="btn-custom secondary-btn" onClick={Claim}>Claim</button>
                                }
                                {
                                    project.time_status >= 4 && project.token_owener == account &&
                                    <button className="btn-custom secondary-btn" onClick={Finalize}>Finalize</button>
                                }
                                
                            </div>


                        </Col>
                        <Col lg={6} sm={12} md={6}>
                            <img src={BannerImage} className="banner-img"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

        <div className="py-5">

                    
            <Container>

            <DropdownButton  title={detailType == "detail" ? "Project Details":detailType == "schedule" ? "Schedule":detailType == "allocation" ? "Allocation":"Project Details"} className="staking-dropdown">

                {
                    detailType == "schedule" ? "":
                    <Dropdown.Item href="#" onClick={(e)=>setDetailType('schedule')}>Schedule</Dropdown.Item>
                }
                {
                    detailType == "allocation" ? "":
                    <Dropdown.Item href="#" onClick={(e)=>setDetailType('allocation')}>Allocation</Dropdown.Item>
                }
                {
                    detailType == "detail" ? "":
                    <Dropdown.Item href="#" onClick={(e)=>setDetailType('detail')}>Project Details</Dropdown.Item>
                }
                        
            </DropdownButton>

            {
                detailType == "detail" &&
                <Row className="feature-section g-lg-5">
          
            <Col lg={6} sm={12}>

                <div className="custom-table">
                    <Table responsive className="table-dashed">

                        <thead>
                            <tr>
                                <th colSpan={2}>Pool Information</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>Whitelist Opens</td>
                                <td>{whitelist_start}</td>
                                
                            </tr>

                            <tr>
                                <td>Whitelist Ends</td>
                                <td>{whitelist_end}</td>
                                
                            </tr>

                            <tr>
                                <td>Sale Opens</td>
                                <td>{sale_start}</td>
                                
                            </tr>
                            <tr>
                                <td>Sale Ends</td>
                                <td>{sale_end}</td>
                                
                            </tr>
                            <tr>
                                <td>Destribution Ends</td>
                                <td>{des_end}</td>
                                
                            </tr>

                            <tr>
                                <td>Swap rate</td>
                                <td>1BUSD = {(1 / project.price).toFixed(3)+project.token_symbol}</td>
                                
                            </tr>

                            <tr>
                                <td>Cap</td>
                                <td>{project.cap +" "+ project.token_symbol} </td>
                                
                            </tr>

                            <tr>
                                <td>Total User Participated</td>
                                <td>{project.time_status >= 2 ?project.total_user : "NA"}</td>
                                
                            </tr>

                            <tr>
                                <td className="bottom-none">Total Fund Swapped</td>
                                <td className="bottom-none">{project.total_raised} BUSD</td>
                                
                            </tr>

                            {/* <tr>
                                <td>Access Type</td>
                                <td>Private</td>
                                
                            </tr> */}
                        
                        </tbody>

                    </Table>
                </div>

            </Col>

            <Col lg={6} sm={12}>
            <div className="custom-table">
                    <Table responsive className="table-dashed">

                        <thead>
                            <tr>
                                <th colSpan={2}>Token Information</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>Name</td>
                                <td>{project.token_name}</td>
                                
                            </tr>

                            <tr>
                                <td>Token Symbol</td>
                                <td>{project.token_symbol}</td>
                                
                            </tr>

                            <tr>
                                <td className="bottom-none">Token Supply</td>
                                <td className="bottom-none">{project.total_supply}</td>
                                
                            </tr>

                        
                        </tbody>

                    </Table>
                </div>
            </Col>

         
            
            

            </Row>
            }
            {
                detailType == "schedule" &&
                <Row className="feature-section g-lg-5">

            <Col lg={12} sm={12}>
            <div className="custom-table">
                    <Table responsive className="table-dashed">

                        <thead>
                            <tr>
                                <th >Round</th>
                                <th >Opens</th>
                                <th >Closes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Allocation</td>
                                <td>{whitelist_start}</td>
                                <td>{whitelist_end}</td>
                            </tr>
                            <tr>
                                <td>FCFS Prepare</td>
                                <td>{sale_start}</td>
                                <td>{sale_end}</td>
                            </tr>
                            <tr>
                                <td className="bottom-none">FCFS Start</td>
                                <td className="bottom-none">{sale_end}</td>
                                <td className="bottom-none">{des_end}</td>
                            </tr>

                        </tbody>

                    </Table>
                </div>
            </Col>

         
            
            

            </Row>
            }
              {
                detailType == "allocation" &&
                <Row className="feature-section g-lg-5">

            <Col lg={12} sm={12}>
            <div className="custom-table">
                    <Table responsive className="no-border-bottom table-dashed">

                        <thead>
                            <tr>
                                <th >No.</th>
                                <th >Allocation</th>
                                <th >Date</th>
                                <th >Claimed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="bottom-none">1</td>
                                <td className="bottom-none">{ticketlist.includes(project.contract) == true ?"Yes" : "No"}</td>
                                <td className="bottom-none">{whitelist_end}</td>
                                <td className="bottom-none text-start">{claimstatus == true ? "Yes" : "No"}</td>
                            </tr>
                            

                        </tbody>

                    </Table>
                </div>
            </Col>

         
            
            

            </Row>
            }
            </Container>
        </div>
    
        
            <Modal show={show} onHide={handleClose} centered>
            {/* <Modal.Header > */}
            {/* </Modal.Header> */}
            <h2 className="text-center mt-3">Swap</h2>
            <Modal.Body>
         
            <Form.Group className="mb-3" controlId="busd">
                <div className="position-relative">
                <Form.Label>From</Form.Label>
                {allowancestatus == false ? 
                <Form.Control type="number" value={busdvalue} onChange={(e)=>setBusdvalue(e.target.value)} min={0}/>
                : 
                <Form.Control type="number" value={busdvalue}  min={0} readOnly/>
                }
                <span className="text-ab">BUSD</span>
                </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="token_symbol">
             <div className="position-relative">
             <Form.Label>To</Form.Label>
                <Form.Control type="text" readOnly value={( pervalue * busdvalue)}/>
                <span className="text-ab">{project.token_symbol}</span>

             </div>
            </Form.Group>
            <div className="d-flex justify-content-between">
            <p>Price</p>
            <p>{parseFloat(pervalue.toFixed(8)) +" "+  project.token_symbol} per BUSD</p>

            </div>
            <div className="text-center mt-3 mb-2">
            <button class="btn-custom primary-btn w-100" onClick={Swap_Token}>{allowancestatus == false ? 'Approve' :'Confirm Swap'}</button>
            </div>
            </Modal.Body>
        </Modal>

        {props.footer}
        
        </>
    );
}
export default ProjectDetails;