import { Container, Row, Col, InputGroup,DropdownButton,Dropdown,FormControl,Form } from "react-bootstrap";
import IdoBox from "../components/ido-box"
import BannerImage from "../assets/images/ido-banner-main.png"
import checkpoint from "../assets/images/checkpoint.png";
import confirm from "../assets/images/confirm.png";
import confirmation from "../assets/images/confirmation.png";
import preauth from "../assets/images/pre-auth.png";
import amountstack from "../assets/images/amountstack.png";
import { Link } from "react-router-dom";





function Stacking(props){

    return (

        <>
        
        {props.header}
        <div className="position-relative">
            <img src={require('../assets/images/banner-background.png').default} className="banner-background"/>
            <div className="banner-section h-100 py-md-5">
                <Container>

                    <Row className="align-items-center mb-5">

                        <Col lg={3}>

                       
                            <DropdownButton  title="Staking" className="staking-dropdown">
                                <Dropdown.Item href="#">Unstaking</Dropdown.Item>
                                <Dropdown.Item href="#">Withdraw</Dropdown.Item>
                                
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
                                <h4>Staked</h4>
                                <h2>0.0000</h2>
                            </div>

                            <div className="staked">
                                <h4>Reward</h4>
                                <h2>0.0000</h2>
                            </div>
                        
                            <div className="btn-group-custom justify-content-between">
                                <a href="#live" class="btn-custom secondary-btn m-0">Live Sales</a>
                                <a href="#upcomming" class="btn-custom primary-btn">Upcoming Sales</a>
                            </div>

                        </div>

                        </Col>

                        

                    </Row>
                </Container>
            </div>
        </div>

        
            <h2 className="text-center h2">Stake your Zpad</h2>

            <Container>

            <div class="roadmap">

                <div class="roadmap-item circle-active">

                    <div class="roadmap-circle">
                        <img src={checkpoint}/>
                    </div>

                    <p>Checkpoint</p>

                </div>

                <hr class="roadmap-hr"/>

                <div class="roadmap-item">

                    <div class="roadmap-circle">
                    <img src={amountstack}/>
                    </div>

                    <p>Amount to Stake</p>

                </div>

                <hr class="roadmap-hr"/>

                <div class="roadmap-item">

                    <div class="roadmap-circle">
                    <img src={preauth}/>
                    </div>

                    <p>Pre-authorization</p>

                </div>

                <hr class="roadmap-hr"/>

                <div class="roadmap-item">

                    <div class="roadmap-circle">
                    <img src={confirm}/>
                    </div>

                    <p>Confirm</p>

                </div>

                <hr class="roadmap-hr"/>

                    <div class="roadmap-item">

                        <div class="roadmap-circle">
                        <img src={confirmation}/>
                        </div>

                        <p>Confirmation</p>

                    </div>

                

            </div>

            <h4 className="mb-4">The following conditions must be met before proceeding</h4>

            <div className="ido-box" style={{background: "transparent"}}>

                <div className="d-flex mb-5 flex-xs-wrap">

                    <div className="conditions">

                        <span className="conditions-met">
                            <h4>Connected with MetaMask</h4>
                            <span className="tick-enable"><i class="fa-solid fa-check"></i></span>
                        </span>

                        <p>If not connected, click
                            the "Connect Wallet" 
                            button in the top right
                            corner
                        </p>

                    </div>

                    <div className="conditions">

                         <span className="conditions-met">
                            <h4>Connected with MetaMask</h4>
                            <span className="tick-enable tick-disble"><i class="fa-solid fa-check"></i></span>
                        </span>

                        <p>If not connected, click
                            the "Connect Wallet" 
                            button in the top right
                            corner
                        </p>

                    </div>

                    <div className="conditions">

                         <span className="conditions-met">
                            <h4>Connected with MetaMask</h4>
                            <span className="tick-enable tick-disble"><i class="fa-solid fa-check"></i></span>
                        </span>

                        <p>If not connected, click
                            the "Connect Wallet" 
                            button in the top right
                            corner
                        </p>

                    </div>

                    <div className="conditions">

                         <span className="conditions-met">
                            <h4>Connected with MetaMask</h4>
                            <span className="tick-enable tick-disble"><i class="fa-solid fa-check"></i></span>
                        </span>

                        <p>If not connected, click
                            the "Connect Wallet" 
                            button in the top right
                            corner
                        </p>

                    </div>

                </div>

                <Form>
                    <div class="custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="defaultUnchecked" />
                        <label class="custom-control-label" for="defaultUnchecked">I have read the Terms and Conditions</label>
                    </div>
                </Form>

            </div>

            <div className="text-center my-5">
                <Link to={'/'} className="btn-custom secondary-btn">Next</Link>
            </div>

            </Container>
       
    

      

        

        {props.footer}

        </>

    )

}

export default Stacking;