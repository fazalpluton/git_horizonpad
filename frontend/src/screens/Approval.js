import React, { useEffect, useState } from "react";
import { Container, Row,Col, Table ,Form} from "react-bootstrap";
import BannerImage from "../../assets/images/ido-banner-main.png"
import SecondImage from "../../assets/images/second-section.png"
import SecondBackground from "../../assets/images/second-background.png";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();




function Approval(props){
      
    return (
        <>
        {props.header}
        <div className="position-relative">
            <img src={require('../../assets/images/banner-background.png').default} className="banner-background"/>
            <div className="banner-section">
                <Container>
                <Row>
                    <Col lg={6} sm={12} md={6} className="m-auto">
                        <div className="ido-box mt-5">
                            <Row className="gy-5">
                                <Col lg={12} sm={12} md={12}>
                                <h3 className="main-heading text-center mt-4">LOGIN</h3>
                                
                                <Form.Group className="mt-3" controlId="addr">
                                <Form.Label>Token Address</Form.Label>
                                <Form.Control type="text" autoComplete="off" required/>
                                </Form.Group>

                                <Form.Group className="mt-3" controlId="ammount">
                                <Form.Label>Ammount</Form.Label>
                                <Form.Control type="number" required/>
                                </Form.Group>
                                <span className="text-danger mt-3">{error}</span>
                                <br/>
                                <button type="submit" className="btn-custom primary-btn">Approve</button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                 
                   
                   
                </Row>
                </Container>
            </div>
        </div>

        {props.footer}
        
        </>
    );
}
export default Approval;