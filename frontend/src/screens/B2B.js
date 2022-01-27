import { Container, Row,Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BannerImage from "../assets/images/banner-main.png"
import FirstImage from "../assets/images/first-section.png"
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
        <div className="position-relative">
            <img src={require('../assets/images/banner-background.png').default} className="single-project-background"/>
            <div className="single-project-section">
                <Container>
                        <div className="pt-4 video-main-section">
                            <h2 className="h2 text-center">B2B Market</h2>
                            <div className="video-section" onClick={handleShow}>
                            <i class="fa-solid fa-circle-play play-icon"></i>
                            </div>
                          
                        </div>
                        <Row className="align-items-center">
                            <Col lg={6} sm={12} md={6}>
                            <p className="banner-p ">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatisurus sit amet luctus </p>
                            
                            </Col>
                            <Col lg={6} sm={12} md={6}>
                                <img src={FirstImage} className="feature-img"/>
                            </Col>
                            <Col lg={12} sm={12} md={12} className="">
                            <div className="mt-5 text-center">
                            <button class="btn-custom secondary-btn">COMING SOON</button>
                            </div>
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