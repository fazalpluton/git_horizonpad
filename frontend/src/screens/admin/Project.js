import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import IdoBox from "../../components/ido-box";
import crowdsale from "../../assets/images/crowdsale.png"

function Projects(props){
        let url = process.env.REACT_APP_API;
        const [projects,setProjects] = useState([]);
        useEffect(async ()=>{
        await axios.get(url+'projects').then((res)=>{
            setProjects(res.data.projects)
        })
        },[]);

    return (
        <>
                {props.header}
                <Container className="admin-projects">
                <Row className="gy-5">
                    
                    {
                        projects.map((project)=>{
                            return<Col lg={6} sm={12}>
                                <div className="ido-box">

                                    {
                                        props.status == "Live" &&
                                        <p className="live">
                                        <i class="fa-solid fa-circle"></i>
                                        {props.status}</p>
                                    }

                                    {
                                        props.status == "Soon" &&
                                        <p className="soon">
                                        <i class="fa-solid fa-circle"></i>
                                        {props.status}</p>
                                    }

                                    {
                                        props.status == "Closed" &&
                                        <p className="closed">
                                        <i class="fa-solid fa-circle"></i>
                                        {props.status}</p>
                                    }

                                    <div className="ido"> 

                                        <img src={url+project.img} width={80}/>

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
                                project.twitter == null?
                                "":<li><a href="#" target="_blank"><i class="fa-solid fa-globe"></i></a></li>
                            }

                                            </ul>
                                        </div>

                                    </div>

                                    <p>{project.short_intro}</p>

                                    

                                    <div className="ido mt-5"> 

                                        <img src={crowdsale} />

                                        <div className="ido-details">

                                            <p>Aunction Type</p>
                                            <h5>{project.title}</h5>

                                        </div>

                                    </div>
                                    <div className="ido-box-footer">
                                        <Link to={'/admin/edit-project/'+project.id} className="btn-custom secondary-btn">Edit</Link>
                                        <Link to={'/admin/add-project-detail/'+project.id} className="btn-custom secondary-btn">Add Detail</Link>
                                    </div>
                                    </div>
                            </Col>
                            })
                    }
                </Row>
                </Container>
                {props.footer}
        
        </>
    )
}
export default Projects;