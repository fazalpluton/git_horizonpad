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

function Burgeon(props){
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
                    {/* <Row className="align-items-center">
                        <Col lg={6} sm={12} md={6}>
                            <h2 className="h2">BURGEON Project</h2>
                            <p className="custom-font">
                            
                            </p>
                            <div className="btn-group-custom">
                            <button class="btn-custom secondary-btn">COMING SOON</button>
                            </div>
                        </Col>
                        <Col lg={6} sm={12} md={6}>
                            <div className="video-section" onClick={handleShow}>
                            <i class="fa-solid fa-circle-play play-icon"></i>
                            </div>
                        </Col>
                    </Row> */}
                    <div className="pt-5 video-main-section">
                            <h2 className="h2 text-center mb-3">BURGEON Project</h2>
                            <div className="video-section">
                            <iframe width="100%" height="300" src="https://www.youtube.com/embed/g3HIv5aD7Q0?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <p className="custom-font text-start">
                            Burgeon is a decentralized blockchain network fostering the adoption of blockchain technology in the global ecosystem. The network was created to tackle the problems hindering organizations from utilizing blockchain to conduct their activities. 
The current transformation which blockchain brings to the global technology space is disruptional. Conventional organizations are however, lagging behind in the adoption of this transformational technology. Through the provision of tailor-made blockchain solutions, Burgeon is committed to bridging the gap between conventional organizations and blockchain adoption. Different sectors, ranging from finance and insurance to supply chain and logistics, are at the forefront of utilizing this opportunity which Burgeon offers.
In the long-term, Burgeon aims to capture all organizational activities in its blockchain solutions and provide individuals and organizations with the blockchain network required to execute transactions in a secure, scalable and decentralized way.
                            </p>
                            <div className="btn-group-custom custom-margin">
                            <button class="btn-custom secondary-btn">COMING SOON</button>
                            </div>
                        </div>
                </Container>
            </div>
        </div>
       
       
        {props.footer}
        <VideoModal show={show} handle_close={handleClose} id="g3HIv5aD7Q0"/>
        </>
    )
}
export default Burgeon;