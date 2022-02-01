import React, { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Logo from '../../assets/images/vector-logo.png'
import { MDBDataTableV5 } from 'mdbreact';
import DetailUpdate from "../../components/UpdateDetail";

function UpdateProject(props){
    // const [pcToggle,setPcToggle] = useState(false);
        const [selectedFile, setSelectedFile] = useState()
        const [preview, setPreview] = useState('')
        const [title, setTitle] = useState('')
        const [shortintro, setShortintro] = useState('')
        const [twitter, setTwitter] = useState('')
        const [telegram, setTelegram] = useState('')
        const [medium, setMedium] = useState('')
        const [web, setWeb] = useState('')
        const [message, setMessage] = useState('')
        const [highlight, setHighlight] = useState([])
        const [image , setImage] = useState('')
        const { id } = useParams();
        const [projects,setProjects] = useState([]);
        const [show, setShow] = useState(false);
        const [hdescription,setHdescription] = useState('')
        const [hid,setHid] = useState('')
        const [datatable, setDatatable] = useState();
        const [token,setToken] = useState(localStorage.getItem("token"));
        let url = process.env.REACT_APP_API;
        const formData = new FormData();
        const [status, setStatus] = useState('')
        const [dshow, setDhow] = useState(false);
        const [deleteid,setDeleteid] = useState('')


        const dhandleClose = () => setDhow(false);
        const dhandleShow = () => setDhow(true);



        const handleClose =  ()  => setShow(false);
        const handleShow = () => setShow(true);

        const confirmation =  (e)=>{
          setDeleteid(e);
          setDhow(true)
      }
  
      const confirmdelete = async e =>{
            await axios.post(url+'project-detail/delete/'+deleteid, {
              token:token
            })
          .then(function (response) {
              setDhow(false)
          })
          .catch(function (error) {
            // console.log(error);
          });
        }

        const edithighlight = async (e)=>{
          await axios.get(url+'project-detail?id='+e).then((res)=>{
            setHdescription(res.data.highlight.description)
            setHid(e)
            
        })
          setShow(true)
        }
          const updatehighlight  = async e =>{
            e.preventDefault();
          await axios.post(url+'project-detail/update', {
              description:hdescription,
              id:hid,
              token:token

            })
            .then(function (response) {
              setShow(false)
            })
            .catch(function (error) {
              // console.log(error);
            });
        }
        let userData = [];
        useEffect(async ()=>{
        await axios.get(url+'projects/'+id).then((res)=>{
            setProjects(res.data.projects)
            setTitle(res.data.projects.title)
            setShortintro(res.data.projects.short_intro)
            setTwitter(res.data.projects.twitter)
            setTelegram(res.data.projects.telegram)
            setMedium(res.data.projects.medium)
            setWeb(res.data.projects.web)
            setImage(url+res.data.projects.img)
            setStatus(res.data.projects.status)
            
        })
        },[]);
        useEffect(async ()=>{
            await axios.get(url+'project-detail?project_id='+id).then((res)=>{
                setHighlight(res.data.highlight)
                setDatatable({
                  columns: [
                    {
                      label: 'Description',
                      field: 'description',
                      width: 150,
                      attributes: {
                        'aria-controls': 'DataTable',
                        'aria-label': 'Description',
                      },
                    },
                    {
                      label: 'Action',
                      field: 'action',
                      sort: 'asc',
                      width: 100,
                    },
                  ],
                  rows: res.data.highlight,
                })
            })
        },[show,dshow]);
        highlight.map((item, index) => {
          item.action = (
            <>
            <button  className='btn-custom primary-btn' onClick={(e) => edithighlight(item.id)}>Edit</button> 
            <button  className='btn-custom btn-danger ml-1' onClick={(e)=>confirmation(item.id)}>Delete</button>
            </>
          );
        });
         const handleChangeImage = e => {
          setSelectedFile(e.target.files[0]);
            setPreview({[e.target.name]: URL.createObjectURL(e.target.files[0])})
          }
        const formSubmit  = async e =>{
            e.preventDefault();
            formData.append(
              "image",
              selectedFile
            );
            formData.append(
                "title",
                title
            );
            formData.append(
                "short_intro",
                shortintro
            );
            formData.append(
              "twitter",
              twitter
            );
            formData.append(
                "telegram",
                telegram
            );
            formData.append(
                "medium",
                medium
            );
            formData.append(
                "web",
                web
           );
            formData.append(
                'token',
                token
            )
            await axios.post(url+'projects/update/'+id, formData)
              .then(function (response) {
                setMessage(response.data.message);
              })
              .catch(function (error) {
                // console.log(error);
              });
        }
        return (
        <>
                {props.header}
                <Container className="mt-3">

                <Row>
                <h2 className="h2 mb-3 text-center">Edit Project</h2>
                    <Col lg={6} sm={12} md={12} className="m-auto">
                        <div className="ido-box">
                            <Row className="gy-5">
                                <Col lg={12} sm={12} md={12}>
                                <Form onSubmit={(e) => {
                                        formSubmit(e);
                                        }}>
                                {
                                  preview != '' ? <>
                                  <img src={preview['img']} alt="upload image" className="upload-img"/>
                                  </>:<>
                                  <img src={image} alt="upload image" className="upload-img"/>
                                  </>
                                }
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control type="file" id="img" name="img" accept="image/*" className="w-100 mt-3 " onChange={(e)=>handleChangeImage(e)}/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group className="mt-3" controlId="intro">
                                <Form.Label>Short Intro</Form.Label>
                                <Form.Control type="text" value={shortintro} onChange={(e)=>setShortintro(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group className="mt-3" controlId="twitter">
                                <Form.Label>Twitter Link</Form.Label>
                                <Form.Control type="text" value={twitter} onChange={(e)=>setTwitter(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="telegram">
                                <Form.Label>Telegram Link</Form.Label>
                                <Form.Control type="text" value={telegram} onChange={(e)=>setTelegram(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="medium">
                                <Form.Label>Medium Link</Form.Label>
                                <Form.Control type="text" value={medium} onChange={(e)=>setMedium(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="medium">
                                <Form.Label>Web Link</Form.Label>
                                <Form.Control type="text" value={web} onChange={(e)=>setWeb(e.target.value)} required/>
                                </Form.Group>
                                {/* <Form.Group className="mt-3" controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Default select example" value={status} onChange={(e)=>setStatus(e.target.value)} required>
                                <option value="Live">Live</option>
                                <option value="Upcoming">Upcoming</option>
                                <option value="Close">Close</option>
                                </Form.Select>
                                </Form.Group> */}
                                <p className="text-success">{message}</p>
                                <button type="submit" className="btn-custom primary-btn mt-3">Submit</button>
                                </Form>
                                </Col>

                                {/* <Col lg={12} sm={12} md={12}>
                                <h3 class="main-heading">HIGHLIGHT LIST</h3>
                                <MDBDataTableV5
                                hover
                                entriesOptions={[5, 20, 25]}
                                entries={5}
                                pagesAmount={4}
                                data={datatable}
                                pagingTop
                                searchTop
                                searchBottom={false}
                                />
                                </Col>
                             <DetailUpdate id={id}/> */}
                            </Row>
                        </div>
                    </Col>
                 
                   
                   
                </Row>
                </Container>
                {props.footer}
                <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title className="text-dark">Edit Highlight</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={(e) => {
                                        updatehighlight(e);
                                    }}>
                  <Form.Group className="mt-3" controlId="intro">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" as="textarea" rows={3} value={hdescription} onChange={(e)=>setHdescription(e.target.value)} required/>
                  </Form.Group>
                  <button type="submit" className="btn-custom primary-btn mt-3">Submit</button>
                  </Form>
                </Modal.Body>
              </Modal>

              <Modal show={dshow} onHide={dhandleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title className="text-black">Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h4 className="text-white">Are you sure to delete this item.</h4>
                  <button type="button" onClick={(e)=>confirmdelete()} className="btn-custom primary-btn mt-3">Confirm</button>

                </Modal.Body>
              
            </Modal>
        </>
    )
}
export default UpdateProject;