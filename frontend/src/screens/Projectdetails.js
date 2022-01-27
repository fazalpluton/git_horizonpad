import { Container, Row,Col,DropdownButton,Dropdown,Table  } from "react-bootstrap";
import IdoBox from "../components/ido-box"
import BannerImage from "../assets/images/second-section.png"
import SecondBackground from "../assets/images/second-background.png";
import ido_logos from "../assets/images/ido-logos.png"
import { Link } from "react-router-dom";

function ProjectDetails(props){

   

    return (
        <>
        {props.header}
        <div className="position-relative">
            <img src={require('../assets/images/banner-background.png').default} className="banner-background"/>
            <div className="banner-section">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} sm={12} md={6}>

                            <div className="ido"> 

                                <img src={ido_logos} />

                                <div className="ido-details">

                                    <h4>DotOracles(DTO)</h4>

                                </div>

                            </div>

                            <div className="d-flex">
                                
                                <ul className="ido-ul w-50">

                                    <li><a href="#"><i class="fa-brands fa-medium"></i></a></li>
                                    <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa-brands fa-telegram"></i></a></li>
                                    <li><a href="#"><i class="fa-solid fa-globe"></i></a></li>

                                </ul>
                            
                                <p className="closed">
                                    <i class="fa-solid fa-circle"></i>
                                    Closed
                                </p>

                            </div>


                            <p className="f-bold my-3">Video game Bad Days gives you the chance to collect,
                                own, breed, and battle as your favourite heroes and
                                villains by Stan Lee!
                            </p>

                            <div className="my-5">
                                <Link to={'/'} className="btn-custom secondary-btn">Connect Wallet</Link>
                            </div>


                        </Col>
                        <Col lg={6} sm={12} md={6}>
                            <img src={BannerImage} className="banner-img"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

        <div className="py-5">

                    
            <Container>

            <DropdownButton  title="Project Details" className="staking-dropdown">

                <Dropdown.Item href="#">Dropdown 1</Dropdown.Item>
                <Dropdown.Item href="#">Dropdown 1</Dropdown.Item>
                        
            </DropdownButton>

            <Row className="feature-section g-lg-5">
                
            <Col lg={6} sm={12}>

                <Table responsive className="table-dashed">

                    <thead>
                        <tr>
                            <th colSpan={2}>Pool Information</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>Opens</td>
                            <td>2022-01-11 08:00:00 UTC</td>
                            
                        </tr>

                        <tr>
                            <td>Opens</td>
                            <td>2022-01-11 08:00:00 UTC</td>
                            
                        </tr>

                        <tr>
                            <td>Opens</td>
                            <td>2022-01-11 08:00:00 UTC</td>
                            
                        </tr>

                        <tr>
                            <td>Opens</td>
                            <td>2022-01-11 08:00:00 UTC</td>
                            
                        </tr>

                        <tr>
                            <td>Opens</td>
                            <td>2022-01-11 08:00:00 UTC</td>
                            
                        </tr>
                       
                    </tbody>

                </Table>

            </Col>

            <Col lg={6} sm={12}>
                <IdoBox status={"Live"} />
            </Col>

         
            
            

            </Row>
            </Container>
        </div>
    

      

        <div className="position-relative" id="upcomming">

            <img src={SecondBackground} className="second-background"/>

            <Container className="ido-slider-section">
            
            <h2 className="text-center h2">Upcoming Projects.</h2>
            
          

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
export default ProjectDetails;