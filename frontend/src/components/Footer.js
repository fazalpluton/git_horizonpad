import { Container, Row ,Col} from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <>
          <div className="footer">
        <Container>
            <Row>
                <Col lg={3} md={6} sm={12}>
                    <h2 className="footer-heading">Horizonpad</h2>
                    <div className="footer-social-icon">
                    
                    <a href="https://twitter.com/horizonpad" target="_blank"><i class="fa-brands fa-twitter"></i></a>
                    <a href="https://t.me/horizonpad" target="_blank"><i class="fa-brands fa-telegram"></i></a>
                    <a href="https://www.linkedin.com/company/horizonpad" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href="https://www.youtube.com/channel/UCswpDaG-lgDtO7MlyQgFM_w" target="_blank"><i class="fa-brands fa-youtube"></i></a>
                    <a href="https://horizonpad01.medium.com/" target="_blank"><i class="fa-brands fa-medium"></i></a>
                    <a href="https://discord.gg/y342zJnB" target="_blank"><i class="fa-brands fa-discord"></i></a>
                    <a href="https://github.com/horizonpad" target="_blank"><i class="fa-brands fa-github"></i></a>

                    </div>
                    <p className="mt-3">2020 Horizonpad All Rights Reserved</p>
                </Col>
                <Col lg={3} md={6} sm={12} className="col-6">
                    <div className="">
                    <div>
                    <h2>About Us</h2>
                    <ul className="footer-ul">
                        <li>
                            <Link to={'/comming-soon'}>About</Link>
                        </li>
                        <li>
                            <Link to={'/comming-soon'}>Careers</Link>
                        </li>
                        <li>
                            <Link to={'/comming-soon'}>Blog</Link>
                        </li>
                        <li>
                            <Link to={'/comming-soon'}>Legal & Privacy</Link>
                        </li>
                       
                    </ul>
                    </div>
                    </div>
                </Col>
                <Col lg={3} md={6} sm={12} className="col-6">
                    <div className="">
                    <div>
                    <h2>Services</h2>
                    <ul className="footer-ul">
                        <li>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdd_zqTgIlJTxXGX24NmmAPLoWgqUuSOw_JKK0V_xA5CqfNmA/viewform?usp=pp_url" target="_blank">Apply for IDO</a>
                        </li>
                        <li>
                            <Link to={'/nft-marketplace'}>NFT Market Place</Link>
                        </li>
                        <li>
                            <Link to={'/comming-soon'}>Non-Crypto Projects</Link>
                        </li>
                        <li>
                            <Link to={'/burgeon-projects'}>Burgeon Project</Link>
                        </li>
                        <li>
                            <Link to={'/p2p-swap'}>P2P Swap</Link>
                        </li>
                       
                    </ul>
                    </div>
                    </div>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <div className="">
                    <div>
                    <h2>Learn</h2>
                    <ul className="footer-ul">
                        <li>
                            <Link to={'/comming-soon'}>What is Cryptocurrency?</Link>
                        </li>
                        <li>
                            <Link to={'/comming-soon'}>Crypto Basics</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Tips and Tutorials</Link>
                        </li>
                        <li>
                            <Link to={'/comming-soon'}>Market Update</Link>
                        </li>
                       
                    </ul>
                    </div>
                    </div>
                </Col>
{/*             
                <Col lg={4} md={4} sm={12}>
                <div className="text-right">
                <a href="#"><i class="fa-solid fa-arrow-up sroll-top"></i></a>
                </div>
                </Col> */}
            </Row>
        </Container>
        </div></>
    )
}
export default Footer;