import { Container, Row,Col, Table } from "react-bootstrap";
import IdoBox from "../components/ido-box"
import BannerImage from "../assets/images/ido-banner-main.png"
import SecondImage from "../assets/images/second-section.png"
import SecondBackground from "../assets/images/second-background.png";
import Slider from "react-slick";

function HciProjects(props){

    
    var ido_slider = {
        
        infinite:false,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows:false,
        responsive: [
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
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }

            }

            ]
      };

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
                            <button class="btn-custom secondary-btn">Live Sales</button>
                            <button class="btn-custom primary-btn">Upcoming Sales</button>
                            </div>
                        </Col>
                        <Col lg={6} sm={12} md={6}>
                            <img src={BannerImage} className="banner-img"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        <div>
            <h2 className="text-center h2">Live Projects.</h2>
            <Container>
            <Row className="feature-section g-lg-5">
                
            <Col lg={6} sm={12}>
                <IdoBox status={"Live"} />
            </Col>

            <Col lg={6} sm={12}>
                <IdoBox status={"Live"} />
            </Col>

            <Col lg={6} sm={12}>
                <IdoBox status={"Live"} />
            </Col>

            <Col lg={6} sm={12}>
                <IdoBox status={"Live"} />
            </Col>
            
            

            </Row>
            </Container>
        </div>
    

      

        <div className="position-relative">

            <img src={SecondBackground} className="second-background"/>

            <Container className="ido-slider-section">
            
            <h2 className="text-center h2">Upcoming Projects.</h2>
            
            <Slider {...ido_slider} className="feature-section">
               
              
                <div className="px-3">
                <div className="text-icon mb-3">1</div>
                <IdoBox status={"Soon"} />
                </div>

                <div className="px-3">
                <div className="text-icon  mb-3">2</div>
                <IdoBox status={"Soon"} />
                </div>

                <div className="px-3">
                <div className="text-icon  mb-3">3</div>
                <IdoBox status={"Soon"} />
                </div>


            </Slider>

            </Container>

            <Container className="feature-section">
            
            <h2 className="text-center h2">Closed Projects.</h2>
            
            <Row className="feature-section g-lg-5">
                
                <Col lg={6} sm={12}>
                    <IdoBox status={"Closed"} />
                </Col>
    
                <Col lg={6}  sm={12}>
                    <IdoBox status={"Closed"} />
                </Col>
    
                <Col lg={6}  sm={12}>
                    <IdoBox status={"Closed"} />
                </Col>
    
                <Col lg={6} sm={12}>
                    <IdoBox status={"Closed"} />
                </Col>
                
                
    
                </Row>

            </Container>
          
        </div>

        {props.footer}
        
        </>
    );
}
export default HciProjects;