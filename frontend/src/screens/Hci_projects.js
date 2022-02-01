import { Container, Row,Col, Table } from "react-bootstrap";
import IdoBox from "../components/ido-box"
import BannerImage from "../assets/images/ido-banner-main.png"
import SecondBackground from "../assets/images/second-background.png";
import Slider from "react-slick";


function HciProjects(props){

    
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
                            <img src={BannerImage} className="banner-img"/>
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
                    // props.errorMessage? <div style={{color:"red"}}>{props.errorMessage}</div>:
            <IdoBox status={"Live"} type={"HCI"} />
                }
            

            </Row>
            </Container>
        </div>
    

      

        <div className="position-relative" id="upcomming">

            <img src={SecondBackground} className="second-background"/>

            <Container className="ido-slider-section">
            
            <h2 className="text-center h2">Upcoming Projects.</h2>
            
            <IdoBox status={"Upcomming"} type={"HCI"}/>


            </Container>

            <Container className="feature-section">
            
            <h2 className="text-center h2">Closed Projects.</h2>
            
            <Row className="feature-section g-lg-5">
                
            <IdoBox status={"Close"} type={"HCI"} />

                
                
    
                </Row>

            </Container>
          
        </div>

        {props.footer}
        
        </>
    );
}
export default HciProjects;