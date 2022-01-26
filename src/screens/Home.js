import { Container, Row,Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BannerImage from "../assets/images/banner-main.png"
import FirstImage from "../assets/images/first-section.png"
import SecondImage from "../assets/images/second-section.png"
import NotoIcon from "../assets/images/noto_coin.png";
import SecondBackground from "../assets/images/second-background.png";

function Home(props){
    return (
        <>
        {props.header}
        <div className="position-relative">
            <img src={require('../assets/images/banner-background.png').default} className="banner-background"/>
            <div className="banner-section">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} sm={12} md={6}>
                            <h1 className="logo-text">HORIZONPAD</h1>
                            <h5>The First of its’ kind</h5>
                            <p className="banner-p">The First of it’s kind Fundraising platform <br/> For Crypto and Non-Crpto Project, built<br/> and partnered with Binance Smart Chain</p>
                            <div className="btn-group-custom">
                            <button class="btn-custom secondary-btn">Learn More</button>
                            <button class="btn-custom primary-btn">Launch App</button>
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
            <h2 className="text-center h2">Token Features.</h2>
            <Container>
            <Row className="feature-section">
            <Col lg={6} md={6} sm={12}>
                <img src={FirstImage} className="feature-img"/>
            </Col>
            <Col lg={6} md={6} sm={12}>
                <ul className="feature-ul">
                   <li><Link to={'#'}><img src={NotoIcon}/><span>NFT Market Place</span></Link></li> 
                   <li><Link to={'#'}><img src={NotoIcon}/><span>P2P Swap</span></Link></li> 
                   <li><Link to={'#'}><img src={NotoIcon}/><span>Burgeon Project</span></Link></li> 
                   <li><Link to={'#'}><img src={NotoIcon}/><span>B2B Market</span></Link></li> 

                </ul>
            </Col>
            </Row>
            </Container>
        </div>
        <div className="pad-section">
            <Container>
            <h2 className="text-center h2">What is for the PAD?</h2>
            <Row>
                <Col lg={4} md={12} sm={12}>
                    <div className="text-icon">1</div>
                    <div className="text-box">
                        <h3>Lunchpad</h3>
                        <p>Discover top-tier cryptoprojects and earn allocationto invest.</p>
                    </div>
                </Col>
                <Col lg={4} md={12} sm={12}>
                    <div className="text-icon">2</div>
                    <div className="text-box">
                        <h3>HCI Projects</h3>
                        <p>Discover a promising non-crypto projects and beamong the shareholders.</p>
                    </div>
                </Col>
                <Col lg={4} md={12} sm={12}>
                    <div className="text-icon">3</div>
                    <div className="text-box">
                        <h3>Burgeon Projects</h3>
                        <p>Migrate your business database into theblockchain easily.</p>
                    </div>
                </Col>
            </Row>
            </Container>
        </div>
        <Container>
        <div className="non-crypto-section">
            <h2 className="h2">The Non-Crypto Project</h2>
            <Row className="non-crypto-inner">
                <Col lg={6} md={6} sm={12}>
                <img src={SecondImage} className="feature-img"/>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <p className="non-crypto-text">Horizonpad Circle Inclusion will consider the best Projects outside the CryptoSpace and allow few legitimate investors to invest their funds as shares with goodrecords tracking.</p>
                <button class="btn-custom secondary-btn">Learn More</button>
                </Col>
            </Row>
        </div>
        </Container>
        <div className="position-relative">
            <img src={SecondBackground} className="second-background"/>
            <Container>
            <div className="z-pad-section">
            <h2 className="h2 text-center">ZPAD Token<br/> Information & Tokenomics.</h2>
            <div className="z-pad-inner">
                <Row>
                    <Col lg={3}>
                        <div className="box-ul-column">
                            <div className="ul-box">
                                <div className="flex">
                                <p className="text-center">30%</p>
                                <h4>Public Sales</h4>
                                </div>
                            </div>
                            <div className="ul-box">
                                <div className="flex">
                                <p className="text-center">10%</p>
                                <h4>Private Sales</h4>
                                </div>
                            </div>
                            <div className="ul-box">
                                <div className="flex">
                                <p className="text-center">10%</p>
                                <h4>Team</h4>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="ul-box-between">
                            <div className="ul-between-flex">
                                <div>
                                    <h5>Initial Price</h5>
                                    <h5>$0.0005</h5>
                                </div>
                                <div>
                                    <h5>Initial Price</h5>
                                    <h5>$0.0005</h5>
                                </div>
                            </div>
                            <div className="ul-between-footer">
                                <h5>Initial Market Cap</h5>
                                <h5>$199,810</h5>
                            </div>
                        </div>
                        <div className="box-ul-flex">
                            <div className="ul-box">
                                <div className="flex">
                                <p className="text-center">30%</p>
                                <h4>Public Sales</h4>
                                </div>
                            </div>
                            <div className="ul-box">
                                <div className="flex">
                                <p className="text-center">10%</p>
                                <h4>Private Sales</h4>
                                </div>
                            </div>
                            <div className="ul-box">
                                <div className="flex">
                                <p className="text-center">10%</p>
                                <h4>Team</h4>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3}>
                    <div className="box-ul-column">
                            <div className="ul-box">
                                <div className="flex">
                                <p className="text-center">7%</p>
                                <h4>Partnership</h4>
                                </div>
                            </div>
                            <div className="ul-box">
                                <div className="flex">
                                <p className="text-center">8%</p>
                                <h4>Promotion</h4>
                                </div>
                            </div>
                            <div className="ul-box">
                                <div className="flex">
                                <p className="text-center">8%</p>
                                <h4>Echosystem</h4>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            </div>
            </Container>
            <div>

            </div>
            <div className="zpad-tier-section">
               <Container>
               <h2 className="h2 text-center">ZPAD Teir System.</h2>
                <p className="zpad-tier-text">Horizonpad token launch will follow a three tier system, all<br/> tiers of the token launch will haveguaranteed allocation<br/> with different pool weight.</p>
               <Row>
                   <Col lg={12}>
                       <div className="tier-table-section">
                       <Table responsive="sm">
                        <thead>
                        <tr>
                            <th>Tiers</th>
                            <th>ZPAD Stacked</th>
                            <th>Time before the IDO</th>
                            <th>Guaranteed Allocation</th>
                            <th>Poll Weight</th>
                    
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Bronze</td>
                            <td>30,000</td>
                            <td>4 Hrs</td>
                            <td>Yes</td>
                            <td>10</td>
                        
                        </tr>
                        <tr>
                            <td>Silver</td>
                            <td>75,000</td>
                            <td>4 Hrs</td>
                            <td>Yes</td>
                            <td>32</td>
                        
                        </tr>
                        <tr>
                            <td>Gold</td>
                            <td>170,000</td>
                            <td>4 Hrs</td>
                            <td>Yes</td>
                            <td>80</td>
                        </tr>
                        </tbody>
                    </Table>
                       </div>
                   </Col>
               </Row>
               </Container>
            </div>
        </div>
        </>
    )
}
export default Home;