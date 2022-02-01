import ido_logos from "../assets/images/ido-logos.png"
import crowdsale from "../assets/images/crowdsale.png"
import React, { useState,useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useWeb3React } from "@web3-react/core";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import ContractCrowdSale from '../contract/CrowdSale.json';
import Slider from "react-slick";



function IdoBox(props){

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

    let url = process.env.REACT_APP_API;
    const [projects,setProjects] = useState(null);
    const [pro,setPro] = useState([]);
    const [loading,setLoading] = useState(false)
    const [isupdate,setIsupdate] = useState(false)
    const [latestProject,setLatestProject] = useState(null)

    useEffect(async ()=>{
        await axios.get(url+'projects?status='+props.status+'&type='+props.type).then((res)=>{
            setLatestProject(res.data.projects)
        })
    },[isupdate]);

    useEffect(async ()=>{
    await axios.get(url+'projects').then((res)=>{
        const promises = res.data.projects.map(async (p)=>{
                p["detail"]= await projectDetail(p.contract)
                return p;
            })
            Promise.all(promises).then(results => {
                setProjects(results)
              })
          });
      
     

    },[])

   
    useEffect( async ()=>{
        await axios.post(url+'update-status', {
            project:projects
          })
          .then(function (response) {
            setIsupdate(true)
          })
          .catch(function (error) {
          });
    },[projects]);

    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
          } catch (e) {
          }
      };
    
      const projectDetail = async (addr) => {
        try{
            let signer = await loadProvider()
            let crowdsale_contract = new ethers.Contract(addr, ContractCrowdSale, signer)
            let price = ethers.utils.formatEther(await crowdsale_contract.getPrice())
            let raised = ethers.utils.formatEther(await crowdsale_contract.weiRaised())
            let allocation = ethers.utils.formatEther(await crowdsale_contract.tokenAllocation())
            let getstatus = (await crowdsale_contract.getStatus()).toString()
            let total_user = (await crowdsale_contract.TOTAL_WHITELIST()).toString()
            let data = {"price":price,"raised":raised,"allocation":allocation,"getstatus":getstatus,"total_user":total_user}
            return data;
        }catch(e){
        }
        }
   useEffect(() => {
        (async () => {
            if (account) {
                try {
               

                } catch (error) {
                }
            }
        })()
    }, [account]);
    
    var ido_slider = {
        
        infinite:false,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows:false,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                        }
                    },
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
                    }
                },

                {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }

            }

            ]
      };

    return(

        <>
        {
            props.status == "Upcomming" && latestProject &&
        <Slider {...ido_slider} className="feature-section row">
    {
           
           latestProject && latestProject.map((project,index)=>{
                            return (
               
                 <div className="px-3 ido-box-slider">
                 <div className="text-icon mb-3">{index+1}</div>
                    <div className="ido-box">

                
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

                <div className="ido"> 
                <Link to={'/project-detail/'+project.contract} className=" anchor">

                    <img src={url+project.img} width={100}/>
                    </Link>

                    <div className="ido-details">
                    <Link to={'/project-detail/'+project.contract} className=" anchor">
                        <h4>{project.title}</h4>
                        </Link>

                        <ul className="ido-ul">
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
                    </div>

                </div>
                <Link to={'/project-detail/'+project.contract} className=" anchor">

                <p>{project.short_intro}</p>
                </Link>

                <div className="ido-cap my-5">

                    <span >
                        <p>Price</p>
                        <h4>{project.price} BUSD</h4>
                    </span>

                    <span className="text-center">
                        <p>Personal Allocation</p>
                        <h4>{project.personal_allocation}</h4>
                    </span>

                    <span className="text-end">
                        <p>Total Raised</p>
                        <h4>{project.total_raised} BUSD</h4>
                    </span>

                </div>

                <div className="ido"> 

                    <img src={crowdsale} />

                    <div className="ido-details">

                        <p>Aunction Type</p>
                        <h5>{project.title}</h5>

                    </div>

                </div>

            </div>
                             </div>
                            )
                          


                        })}
        </Slider>
                    }
                    {latestProject == 0 ? <h2 className="text-center">No Projects</h2>:""}
                  
            {
             props.status != "Upcomming" &&
                <>
                  {
           
           latestProject && latestProject.map((project,index)=>{
               return (
               <Col lg={6} md={6} sm={6}>
                   <Link to={'/project-detail/'+project.contract} className="anchor">
                    <div className="ido-box">
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
              <div className="ido"> 

                <img src={url+project.img} width={100}/>

                <div className="ido-details">

                    <h4>{project.title}</h4>

                    <ul className="ido-ul">
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
                </div>

                </div>

                <p>{project.short_intro}</p>

                <div className="ido-cap my-5">

                <span >
                        <p>Price</p>
                        <h4>{project.price} BUSD</h4>
                    </span>

                    <span className="text-center">
                        <p>Personal Allocation</p>
                        <h4>{project.personal_allocation}</h4>
                    </span>

                    <span className="text-end">
                        <p>Total Raised</p>
                        <h4>{project.total_raised} BUSD</h4>
                    </span>

                </div>

                <div className="ido"> 

                <img src={crowdsale} />

                <div className="ido-details">

                    <p>Aunction Type</p>
                    <h5>{project.title}</h5>

                </div>

                </div>
          
          </div>
          </Link>
               </Col>
  
               )
             


           })}
                </>
            }

        </>

    )

}

export default IdoBox;