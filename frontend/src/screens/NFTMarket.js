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
                        <div className="pt-5 video-main-section">
                            <h2 className="h2 text-center mb-3">NFT Market Place</h2>
                            <div className="video-section" onClick={handleShow}>
                            <i class="fa-solid fa-circle-play play-icon"></i>
                            </div>
                            <p className="banner-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatisurus sit amet luctus </p>
                            <div className="btn-group-custom custom-margin">
                            <button class="btn-custom secondary-btn">COMING SOON</button>
                            </div>
                        </div>
                </Container>
            </div>
        </div>
       
       
        {props.footer}
        <VideoModal show={show} handle_close={handleClose}/>
        </>
    )
}
export default NFTMarket;