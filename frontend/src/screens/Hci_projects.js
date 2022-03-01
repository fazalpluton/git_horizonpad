import { Container, Row,Col, Table,Modal } from "react-bootstrap";
import IdoBox from "../components/ido-box"
import BannerImage from "../assets/images/none-crypto.png"
import SecondBackground from "../assets/images/second-background.png";
import Slider from "react-slick";
import { useState } from "react";


function HciProjects(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
        {props.header}
        <div className="position-relative">
            <img src={require('../assets/images/banner-background.png').default} className="banner-background"/>
            <div className="banner-section">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} sm={12} md={6}>
                            <h1 className="logo-text m-0">HCI Projects</h1>
                            <div className="btn-group-custom">
                            <a href="#live" class="btn-custom secondary-btn">Live Sales</a>
                            <a href="#upcomming" class="btn-custom primary-btn">Upcoming Sales</a>
                            </div>
                        </Col>
                        <Col lg={6} sm={12} md={6}>
                            <div className="open-video-hci">
                            <div className="background" onClick={handleShow}>
                            <i class="fa-solid fa-play"></i>
                            </div>
                            <img src={BannerImage} className="banner-img"/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        <div id="live">
            
            <h2 className="text-center h2">Live Projects.</h2>
            <Container>
            <Row className="feature-section g-lg-5">
                {
                    props.errorMessage ? <h2 className="text-center">No Projects</h2>:
                    <IdoBox status={"Live"} type={"HCI"} />
                }
            

            </Row>
            </Container>
        </div>
    

      

        <div className="position-relative" id="upcomming">

            <img src={SecondBackground} className="second-background"/>

            <Container className="ido-slider-section">
            
            <h2 className="text-center h2">Upcoming Projects.</h2>
            {
                props.errorMessage ? <h2 className="text-center mt-5">No Projects</h2>:
            <IdoBox status={"Upcomming"} type={"HCI"}/>
            }


            </Container>

            <Container className="feature-section">
            
            <h2 className="text-center h2">Closed Projects.</h2>
            
            <Row className="feature-section g-lg-5">

                {
                props.errorMessage? <h2 className="text-center">No Projects</h2>:

            <IdoBox status={"Close"} type={"HCI"} />
                }

                
                
    
                </Row>

            </Container>
          
        </div>

        {props.footer}
        <Modal show={show} onHide={handleClose}  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Body>
          <div className="d-flex mt-2 mb-3 align-items-center justify-content-between">
          <Modal.Title className="">THE HORIZONPAD CIRCLE INCLUSION</Modal.Title>
          <i class="fa-solid fa-xmark closer-icon" onClick={handleClose}></i>
          </div>
          <Row>
              <Col lg={12}>
              <iframe className="hci-iframe" src="https://www.youtube.com/embed/LFQv_hq_n4Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </Col>
              <Col lg={12}>
                  <div className="modal-hci-text">
                      <p>An oracle for Non Crypto Projects, Example coming...</p>
                      <p>Mr. A has a good project in Agriculture, such as Setting up the first Tomato Powder firm!</p>
                      <p>The project only needs 20 Investors with a weight of 2000 BUSD for each pool.</p>
                      <p>Users can View the project Information and Book a slot for screening for Final Screening.</p>
                      <p>Only Successful users First-tier can contribute</p>
                      <p>2nd Tier will have the ability to contribute if the first tier users are not able to buy all the shares.</p>
                      <p>The Startup will begin to work according to the roadmap plan and each stage of execution will be shared with the share owners and a stage virtual meeting will be set for decision makers. </p>
                      <p>Let's connect the world of Investors and Startups via the crypto pathway.</p>
                      <p>Sharing love by using the Horizonpad!</p>
                      
                  </div>
              </Col>
          </Row>
        </Modal.Body>
      </Modal>
        </>
    );
}
export default HciProjects;