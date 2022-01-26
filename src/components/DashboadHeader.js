import { Container, Form, FormControl, Nav, Navbar,Button, NavDropdown } from "react-bootstrap";

import VectorLogo from "../assets/images/vector-logo.png"
function DashboardHeader(){
    return (
        <>
        <div className="custom-header">
            <Navbar  expand="lg">
            <Container className="justify-content-between">
                <Navbar.Brand href="#"><img src={VectorLogo} className="logo"/></Navbar.Brand>
                
               
            
                <Form className="d-flex">
                <button type="button" className="btn-custom secondary-btn">Connect Wallet</button>
                </Form>
               
            </Container>
            </Navbar>
        </div>
        </>
    )
}
export default DashboardHeader;