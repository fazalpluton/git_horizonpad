import { Container, Row,Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BannerImage from "../assets/images/banner-main.png"
import FirstImage from "../assets/images/first-section.png"
import SecondImage from "../assets/images/first-section-new.png"
import NotoIcon from "../assets/images/noto_coin.png";
import SecondBackground from "../assets/images/second-background.png";
import ThirdBackground from "../assets/images/background-3.png";
import VideoModal from "../components/VideoModal";
import { useState } from "react";
// require('dotenv').config({path: __dirname+'/.env'})


function P2P(props){
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
                    <Row className="align-items-center">
                        <Col lg={6} sm={12} md={6}>
                            <h2 className="h2">P2P Swap</h2>
                            <p className="banner-p">
                            Horizonpad users will be able to swap/trade different tokens,  for example an IDO participant would like to trade his newly launched tokens for Zpad, BNB, BUSD or another IDO tokens, or an anticipating IDO participant would like to buy Zpad from a another Peer,  this is to reduce difficulties of buying token from DEX/CEX
                            </p>
                            <div className="btn-group-custom justify-content-center">
                            <button class="btn-custom secondary-btn ">COMING SOON</button>
                            </div>
                        </Col>
                        <Col lg={6} sm={12} md={6}>
                            <img src={SecondImage} className="feature-img"/>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                    {/* <Col lg={6} sm={12} md={6}>
                            <div className="video-section">
                            <iframe width="100%" height="300" src="https://www.youtube.com/embed/nJw2W1ZVqas?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </Col>
                        <Col lg={6} sm={12} md={6}>
                            <div className="btn-group-custom justify-content-center">
                            <button class="btn-custom secondary-btn ">COMING SOON</button>
                            </div>
                        </Col> */}
                       
                    </Row>
                </Container>
            </div>
        </div>
       
       
        {props.footer}
        <VideoModal show={show} handle_close={handleClose}/>
        </>
    )
}
export default P2P;