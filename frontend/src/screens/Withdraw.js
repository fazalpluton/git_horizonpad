import { Container, Row, Col, InputGroup,DropdownButton,Dropdown,FormControl,Form } from "react-bootstrap";
import IdoBox from "../components/ido-box"
import BannerImage from "../assets/images/ido-banner-main.png"
import checkpoint from "../assets/images/checkpoint.png";
import confirm from "../assets/images/confirm.png";
import confirmation from "../assets/images/confirmation.png";
import preauth from "../assets/images/pre-auth.png";
import amountstack from "../assets/images/amountstack.png";
import { Link } from "react-router-dom";





function Withdraw(props){

    return (

        <>
        
        {props.header}
        <div className="position-relative">
            <img src={require('../assets/images/banner-background.png').default} className="banner-background"/>
            <div className="banner-section h-100 py-md-5">
                <Container>

                    <Row className="align-items-center mb-5">

                        <Col lg={3}>

                       
                            <DropdownButton  title="Withdraw" className="staking-dropdown">

                                <Dropdown.Item href="/unstaking">Unstaking</Dropdown.Item>
                                <Dropdown.Item href="/staking">Staking</Dropdown.Item>
                                
                            </DropdownButton>
                           
                       

                        </Col>

                        <Col lg={3}>

                            <div className="ido-box ido-small" style={{background: "#39065E"}}>

                                <p className="f-bold text-center">Number Of Stackers</p>
                                <h4 className="soon text-center mt-2">123456</h4>

                            </div>

                        </Col>

                        <Col lg={3}>
                            
                        <div className="ido-box ido-small" style={{background: "#39065E"}}>

                            <p className="f-bold text-center">Total Zpad Stacked</p>
                            <h4 className="soon text-center mt-2">123456</h4>

                        </div>

                        </Col>

                        <Col lg={3}>
                            
                        <div className="ido-box ido-small" style={{background: "#39065E"}}>

                            <p className="f-bold text-center">APY</p>
                            <h4 className="soon text-center mt-2">123456</h4>

                        </div>

                        </Col>

                    </Row>

                    <Row className="align-items-center">

                        <Col lg={8} sm={12} md={6} className="text-center">
                            <img src={BannerImage} className="feature-img"/>
                        </Col>

                        <Col lg={4} sm={12} md={6}>
                           
                        <div className="ido-box" style={{background: "#39065E"}}>

                            <div className="staked">
                                <h4>Staked</h4>
                                <h2>0.0000</h2>
                            </div>

                            <div className="staked">
                                <h4>Unstaked</h4>
                                <h2>0.0000</h2>
                            </div>

                            <div className="staked">
                                <h4>Reward</h4>
                                <h2>0.0000</h2>
                            </div>
                        
                            <div className="text-center mt-5">
                                <Link to={'/'} className="btn-custom secondary-btn">Withdraw</Link>
                            </div>

                        </div>

                        </Col>

                        

                    </Row>
                </Container>
            </div>
        </div>

        

       
    

      

        

        {props.footer}

        </>

    )

}

export default Withdraw;