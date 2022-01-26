import { Container, Form, FormControl, Nav, Navbar,Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import VectorLogo from "../assets/images/vector-logo.png"
function Header(){
    return (
        <>
        <div className="custom-header">
        <Navbar  expand="lg">
    <Container >
    <Navbar.Brand href="#"><img src={VectorLogo} className="logo"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link >Staking</Nav.Link>
        <Nav.Link >IDO Projects</Nav.Link>
        <Nav.Link >HCI Projects</Nav.Link>
      </Nav>
      <Form className="d-flex">
       <button type="button" className="btn-custom secondary-btn">Launch App</button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
        </>
    )
}
export default Header;