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
                    
                    <a href=""><i class="fa-brands fa-twitter"></i></a>
                    <a href=""><i class="fa-brands fa-telegram"></i></a>
                    <a href=""><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href=""><i class="fa-brands fa-youtube"></i></a>
                    <a href=""><i class="fa-brands fa-medium"></i></a>
                    <a href=""><i class="fa-brands fa-instagram"></i></a>

                    </div>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <div className="">
                    <div>
                    <h2>About Us</h2>
                    <ul className="footer-ul">
                        <li>
                            <Link to={'/'}>About</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Careers</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Blog</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Legal & Privacy</Link>
                        </li>
                       
                    </ul>
                    </div>
                    </div>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <div className="">
                    <div>
                    <h2>Services</h2>
                    <ul className="footer-ul">
                        <li>
                            <Link to={'/'} target="_blank">Apply for IDO</Link>
                        </li>
                        <li>
                            <Link to={'/nft-marketplace'}>NFT Market Place</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Non-Crypto Projects</Link>
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
                            <Link to={'/'}>What is Cryptocurrency?</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Crypto Basics</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Tips and Tutorials</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Market Update</Link>
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