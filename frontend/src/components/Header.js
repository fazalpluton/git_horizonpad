import { useEffect } from "react";
import { Container, Form, FormControl, Nav, Navbar,Button, NavDropdown } from "react-bootstrap";
import { Link,useLocation } from "react-router-dom";
import VectorLogo from "../assets/images/vector-logo.png"
function Header(){
  
    return (
        <>
        <div className="custom-header">
        <Navbar  expand="lg">
    <Container >
      <Link to={'/'} className="navbar-brand"><img src={VectorLogo} className="logo"/></Link>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <a href="#feature" className="nav-link">Token Features</a>
        <a href="#how_it_work" className="nav-link">How it works</a>
        <a href="#tokenomic" className="nav-link">Tokenomics</a>
        <a href="#htc" className="nav-link">HCI</a>
        <a href="#apply" className="nav-link">Apply</a>
      </Nav>
      <Form className="d-flex">
       <Link to={'/ido-projects'} target="_blank" className="btn-custom secondary-btn">Launch App</Link>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
        </>
    )
}
export default Header;