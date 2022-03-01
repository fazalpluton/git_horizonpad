import { Container, Row,Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BannerImage from "../assets/images/banner-main.png"
import FirstImage from "../assets/images/first-section.png"
import SecondImage from "../assets/images/second-section.png"
import NotoIcon from "../assets/images/noto_coin.png";
import SecondBackground from "../assets/images/second-background.png";
import ThirdBackground from "../assets/images/background-3.png";
import NFTOne from '../assets/images/nft-1.jpg';
import NFTTwo from '../assets/images/nft-2.jpg';
import NFTThree from '../assets/images/nft-3.jpg';
import NFTFour from '../assets/images/nft-4.jpg';
import NFTFive from '../assets/images/nft-5.jpg';
import VideoModal from "../components/VideoModal";
import { useState } from "react";

function NFTMarket(props){
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
        {props.header}
        <div className="position-relative">
            <img src={require('../assets/images/banner-background.png').default} className="single-project-background"/>
            <div className="single-project-section ">
            <Container>
                        <div className="">
                            <h2 className="h2 text-center mb-3">NFT Market Place</h2>
                            <div className="">
                            <iframe width="100%" className="home-section-iframe" src="https://www.youtube.com/embed/OZACSA6lzJo?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <p className="banner-p text-start">
                            This is to promote young artists that are users of horizonpad,  artists would be able to submit pictures, links and descriptions of their NFTs and then horizonpad will feature them on the NFT marketplace page based on staking and usage level, interested buyers will use the links provided to be directed to the respective marketplace in which the artists minted their NFTs, this is to support the artists in getting views, exposure, buyers and likes.
                            </p>
                            <div className="btn-group-custom custom-margin">
                            <button class="btn-custom secondary-btn">COMING SOON</button>
                            </div>
                        </div>
                </Container>
            </div>
        </div>
        <div className="mt-5 pt-5">
            <Container>
                <Row >
                    <Col lg={5} md={12} className="custom-col-width m-auto">
                        <Row className="gy-5">
                        <Col lg={4} md={4} className="col-6">
                        <div className="image-card">
                            <img src={NFTOne}/>
                        </div>
                    </Col>
                    <Col lg={4} md={4} className="col-6">
                        <div className="image-card">
                            <img src={NFTTwo}/>
                        </div>
                    </Col>
                    <Col lg={4} md={4} className="col-6">
                        <div className="image-card">
                            <img src={NFTThree}/>
                        </div>
                    </Col>
                    <Col lg={4} md={4} className="col-6">
                        <div className="image-card">
                            <img src={NFTFour}/>
                        </div>
                    </Col>
                    <Col lg={4} md={4} className="col-6">
                        <div className="image-card">
                            <img src={NFTFive}/>
                        </div>
                    </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
       
       
        {props.footer}
        <VideoModal show={show} handle_close={handleClose}/>
        </>
    )
}
export default NFTMarket;