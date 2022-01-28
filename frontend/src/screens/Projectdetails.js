import { Container, Row,Col,DropdownButton,Dropdown,Table  } from "react-bootstrap";
import React, { useState,useEffect } from "react";
import IdoBox from "../components/ido-box"
import BannerImage from "../assets/images/second-section.png"
import SecondBackground from "../assets/images/second-background.png";
import ido_logos from "../assets/images/ido-logos.png"
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function ProjectDetails(props){

    let url = process.env.REACT_APP_API;
    const [project,setProject] = useState([]);
    const [detailType,setDetailType] = useState("detail");
    const { id } = useParams();

    useEffect(async ()=>{
    await axios.get(url+'projects/'+id).then((res)=>{
        setProject(res.data.projects)
    })
    },[]);
    

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
                                        <p className="closed">
                                        <i class="fa-solid fa-circle"></i>
                                        Closed</p>
                                    }
                                    {
                                        project.time_status == "5" &&
                                        <p className="closed">
                                        <i class="fa-solid fa-circle"></i>
                                        Closed</p>
                                    }

                            </div>


                            <p className="f-bold my-3">
                            {project.short_intro}
                            </p>

                            <div className="my-5">
                                <Link to={'/'} className="btn-custom secondary-btn">Connect Wallet</Link>
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
                                <td>2022-01-11 08:00:00 UTC</td>
                                
                            </tr>

                            <tr>
                                <td>Whitelist Ends</td>
                                <td>2022-01-11 08:00:00 UTC</td>
                                
                            </tr>

                            <tr>
                                <td>Sale Opens</td>
                                <td>2022-01-11 08:00:00 UTC</td>
                                
                            </tr>
                            <tr>
                                <td>Sale Ends</td>
                                <td>2022-01-11 08:00:00 UTC</td>
                                
                            </tr>
                            <tr>
                                <td>Destribution Ends</td>
                                <td>2022-01-11 08:00:00 UTC</td>
                                
                            </tr>

                            <tr>
                                <td>Swap rate</td>
                                <td>1BUSD = 20YYY</td>
                                
                            </tr>

                            <tr>
                                <td>Cap</td>
                                <td>3000 BUSD</td>
                                
                            </tr>

                            <tr>
                                <td>Total User Participated</td>
                                <td>12345</td>
                                
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
                                <td>WeWay</td>
                                
                            </tr>

                            <tr>
                                <td>Token Symbol</td>
                                <td>WWW</td>
                                
                            </tr>

                            <tr>
                                <td className="bottom-none">Token Supply</td>
                                <td className="bottom-none">100000000</td>
                                
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
                                <td>2022-01-11 08:00:00 UTC</td>
                                <td>2022-01-11 08:00:00 UTC</td>
                            </tr>
                            <tr>
                                <td>FCFS Prepare</td>
                                <td>2022-01-11 08:00:00 UTC</td>
                                <td>2022-01-11 08:00:00 UTC</td>
                            </tr>
                            <tr>
                                <td className="bottom-none">FCFS Start</td>
                                <td className="bottom-none">2022-01-11 08:00:00 UTC</td>
                                <td className="bottom-none">2022-01-11 08:00:00 UTC</td>
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


                        </tbody>

                    </Table>
                </div>
            </Col>

         
            
            

            </Row>
            }
            </Container>
        </div>
    

      

        {props.footer}
        
        </>
    );
}
export default ProjectDetails;