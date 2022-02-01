import React, { useEffect, useState } from "react";
import { Container, Row,Col, Table ,Form} from "react-bootstrap";
import BannerImage from "../../assets/images/ido-banner-main.png"
import SecondImage from "../../assets/images/second-section.png"
import SecondBackground from "../../assets/images/second-background.png";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();




function Login(props){
        const navigate = useNavigate()
        const [email,setEmail] = useState('');
        const [password,setPassword] = useState('');
        const [error,setError] = useState('');
        const formSubmit  = async e =>{
            e.preventDefault();
            await axios.post(process.env.REACT_APP_API+'login', {
                email:email,
                password:password
            })
            .then(function (response) {
                if(response.data.access_token){
                    localStorage.setItem("token", response.data.access_token);
                    window.location = '/admin/projects'
                }
                else if(response.data.error){
                    setError(response.data.error)
                }
            })
            .catch(function (error) {
            });
        }
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
                                
                                <Form onSubmit={(e) => {
                                        formSubmit(e);
                                        }} enctype="multipart/form-data">
                                <Form.Group className="mt-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" autoComplete="off" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group className="mt-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                                </Form.Group>
                                <span className="text-danger mt-3">{error}</span>
                                <br/>
                                <button type="submit" className="btn-custom primary-btn">Login</button>
                                </Form>
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
export default Login;