import { Container, Row ,Col} from "react-bootstrap";

function Footer(){
    return(
        <>
          <div className="footer">
        <Container>
            <Row>
                <Col lg={4} md={4} sm={12}>
                    <h2 className="footer-heading">Horizonpad</h2>
                    <div className="footer-social-icon">
                    <a href=""><i class="fa-brands fa-medium"></i></a>
                    <a href=""><i class="fa-brands fa-twitter"></i></a>
                    <a href=""><i class="fa-brands fa-telegram"></i></a>
                    <a href=""><i class="fa-brands fa-discord"></i></a>

                    </div>
                </Col>
                <Col lg={4} md={4} sm={12}>
                    <div className="footer-right-text">
                    <div>
                    <h2>Quick Links</h2>
                    <ul className="footer-ul">
                        <li>
                            <a href="">Token Features</a>
                        </li>
                        <li>
                            <a href="">How it works</a>
                        </li>
                        <li>
                            <a href="">Tokenomics</a>
                        </li>
                        <li>
                            <a href="">HCI</a>
                        </li>
                        <li>
                            <a href="">HTC</a>
                        </li>
                        <li>
                            <a href="">Apply</a>
                        </li>
                    </ul>
                    </div>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12}>
                <div className="text-right">
                <a href="#"><i class="fa-solid fa-arrow-up sroll-top"></i></a>
                </div>
                </Col>
            </Row>
        </Container>
        </div></>
    )
}
export default Footer;