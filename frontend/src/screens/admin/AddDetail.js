import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function AddProjectDetail(props){
    // const [pcToggle,setPcToggle] = useState(false);
        const [selectedFile, setSelectedFile] = useState()
        const [preview, setPreview] = useState('logo')
        const [description, setDescription] = useState('')
        const [heading, setHeading] = useState('')
        const [subheading, setSubheading] = useState('')
        const [detaildescription, setDetaildescription] = useState('')
        const [message, setMessage] = useState('')
        const [detailmessage, setDetailmessage] = useState('')
        const { id } = useParams();
        const [token,setToken] = useState(localStorage.getItem("token"));
        const formData = new FormData();
        let url = process.env.REACT_APP_API;

         const handleChangeImage = e => {
          setSelectedFile(e.target.files[0]);

            setPreview({[e.target.name]: URL.createObjectURL(e.target.files[0])})
          }
        const formSubmit  = async e =>{
            e.preventDefault();
            await axios.post(url+'project-detail/create', {
                description: description,
                project_id:id,
                token:token,
              })
              .then(function (response) {
                setMessage(response.data.message);
              })
              .catch(function (error) {
              });
        }
        const addDetail  = async e =>{
            e.preventDefault();
            formData.append(
              "project_id",
              id
          );
            formData.append(
              "image",
              selectedFile
          );
          formData.append(
              "heading",
              heading
          );
          formData.append(
              "subheading",
              subheading
          );
          
        formData.append(
          "description",
          detaildescription
      );
          formData.append(
              'token',
              token
          )
            await axios.post(url+'project-description-detail/create',formData)
              .then(function (response) {
                setDetailmessage(response.data.message);
              })
              .catch(function (error) {
              });
        }
        // useEffect(async ()=>{
        //     await 
        // },[])
        return (
        <>
                {props.header}
                <Container>
                {/* <h2 className="main-heading">ADD PROJECT DETAIL</h2> */}
                <Row>
                    <Col lg={12} sm={12} md={12}>
                        <div className="ido-box mt-5">
                            <Row className="gy-5">
                                <Col lg={6} sm={12} md={6}>
                                <h3 class="main-heading">ADD HIGHLIGHT</h3>
                                <Form onSubmit={(e) => {
                                        formSubmit(e);
                                    }}>
                                <Form.Group className="mt-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={(e)=>setDescription(e.target.value)} required/>
                                </Form.Group>
                                <p className="text-success">{message}</p>
                                <button type="submit" className="btn-custom primary-btn mt-3">Submit</button>
                                </Form>
                                </Col>
                                <Col lg={6} sm={12} md={6}>
                                <h3 class="main-heading">ADD DETAIL</h3>
                                <Form onSubmit={(e) => {
                                        addDetail(e);
                                    }}>
                                
                                <img src={preview['img']} alt="upload image" className="upload-img mt-3"/>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control type="file" id="img" name="img" accept="image/*" className="w-100 mt-3 " onChange={(e)=>handleChangeImage(e)}/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="heading">
                                <Form.Label>Heading</Form.Label>
                                <Form.Control type="text" onChange={(e)=>setHeading(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="sub_heading">
                                <Form.Label>Sub Heading</Form.Label>
                                <Form.Control type="text" onChange={(e)=>setSubheading(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={detaildescription} onChange={(e)=>setDetaildescription(e.target.value)}/>
                                </Form.Group>
                                <p className="text-success">{detailmessage}</p>
                                <button className="btn-custom primary-btn mt-3">Submit</button>
                                </Form>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                 
                   
                   
                </Row>
                </Container>
                {props.footer}
        </>
    )
}
export default AddProjectDetail;