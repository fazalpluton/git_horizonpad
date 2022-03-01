import { Container, Row,Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BannerImage from "../assets/images/banner-main.png"
import FirstImage from "../assets/images/banner-new.png"
import SecondImage from "../assets/images/second-section.png"
import NotoIcon from "../assets/images/noto_coin.png";
import SecondBackground from "../assets/images/second-background.png";
import ThirdBackground from "../assets/images/background-3.png";
import VideoModal from "../components/VideoModal";
import { useState } from "react";

function B2B(props){
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
        {props.header}
        <div className="position-relative b2b-section-height">
            <img src={require('../assets/images/banner-background.png').default} className="single-project-background"/>
            <div className="single-project-section">
                <Container>
                       <Row>
                       <Col lg={6} className="m-auto">
                            <div className="pt-4 video-main-section">
                            <h2 className="h2 text-center">B2B Market</h2>
                            <div className="video-section">
                            <iframe width="100%" height="300" src="https://www.youtube.com/embed/JEU9qMXX2z0?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                          
                        </div>
                            </Col>
                       </Row>
                        <Row className="">
                          
                            <Col lg={6} className="m-auto">
                                <Row>
                                <Col lg={12} sm={12} md={12}>
                            <p className="banner-p text-center">Horizonpad B2B market, is an interface for projects launched on Horizonpad to make transactions, trade and support each other in case of partnership and collaborations. Functionalities will run by wallet connect.</p>
                            </Col>
                            <Col lg={12} sm={12} md={12} className="text-center">
                                <img src={FirstImage} className="feature-img mt-5"/>
                            </Col>
                            <Col lg={12} sm={12} md={12} className="">
                            <div className="mt-5 text-center">
                            <button class="btn-custom secondary-btn">COMING SOON</button>
                            </div>
                            </Col>
                                </Row>
                            </Col>
                        </Row>
                </Container>
            </div>
        </div>
       
       
        {props.footer}
        <VideoModal show={show} handle_close={handleClose}/>
        </>
    )
}
export default B2B;