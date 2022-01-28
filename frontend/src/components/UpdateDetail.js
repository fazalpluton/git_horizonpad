import React, { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact';

function DetailUpdate(props){
    const [detail, setDetail] = useState([])
    const [datatable, setDatatable] = useState();
    const [description, setDescription] = useState();
    const [heading, setHeading] = useState();
    const [subheading, setSubHeading] = useState();
    const [id, setId] = useState();
    const [deleteid,setDeleteid] = useState('')
    const [show, setShow] = useState(false);
    let url = process.env.REACT_APP_API;
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState('')
    const [image, setImage] = useState('')
    const formData = new FormData();

    const handleClose =  ()  => setShow(false);
    const handleShow = () => setShow(true);
    const [token,setToken] = useState(sessionStorage.getItem("token"));


    const [dshow, setDhow] = useState(false);

    const dhandleClose = () => setDhow(false);
    const dhandleShow = () => setDhow(true);

    const confirmation =  (e)=>{
        setDeleteid(e);
        setDhow(true)
    }

    const confirmdelete = async e =>{
          await axios.post(url+'project-description-detail/delete/'+deleteid, {
            token:token
          })
        .then(function (response) {
            setDhow(false)
        })
        .catch(function (error) {
          // console.log(error);
        });
      }
    const handleChangeImage = e => {
        setSelectedFile(e.target.files[0]);
          setPreview({[e.target.name]: URL.createObjectURL(e.target.files[0])})
        }
    useEffect(async ()=>{
        await axios.get(url+'project-description?project_id='+props.id).then((res)=>{
            setDetail(res.data.detail)
            setDatatable({
              columns: [
                {
                    label: '',
                    field: 'image',
                    sort: 'asc',
                    width: 100,
                  },
                {
                    label: 'Heading',
                    field: 'heading',
                    sort: 'asc',
                    width: 100,
                  },
                  {
                    label: 'SubHeading',
                    field: 'subheading',
                    sort: 'asc',
                    width: 100,
                  },
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
              rows: res.data.detail,
            })
        })
    },[dshow,show]);
    detail.map((item, index) => {
      item.action = (
        <>
        <button  className='btn-custom primary-btn' onClick={(e)=>editdescription(item.id)}>Edit</button> 
        <button  className='btn-custom btn-danger ml-1' onClick={(e)=>confirmation(item.id)}>Delete</button>
        </>
      );
      item.image = (
        <>
        <img src={url+item.img} width={'100'}/>
        </>
      );
    });
    const editdescription = async (e)=>{
        await axios.get(url+'project-description?id='+e).then((res)=>{
        setHeading(res.data.detail.heading)  
        setSubHeading(res.data.detail.subheading)  
        setDescription(res.data.detail.description)
        setImage(url+res.data.detail.img)
        setId(e)
        console.log(res.data)
      })
        setShow(true)
      }
    const updatedescription  = async e =>{
        e.preventDefault();
        formData.append(
            "id",
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
        description
    );
        formData.append(
            'token',
            token
        )
      await axios.post(url+'project-description-detail/update', formData)
        .then(function (response) {
          setShow(false)
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
    return (<>
            <Col lg={12} sm={12} md={12}>
            <h3 class="main-heading">DETAIL LIST</h3>
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
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title className="text-dark">Edit Highlight</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={(e) => {
                                        updatedescription(e);
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
                <Form.Group className="mt-3" controlId="intro">
                    <Form.Label>Heading</Form.Label>
                    <Form.Control type="text" value={heading} onChange={(e)=>setHeading(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mt-3" controlId="intro">
                    <Form.Label>SubHeading</Form.Label>
                    <Form.Control type="text" value={subheading} onChange={(e)=>setSubHeading(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mt-3" controlId="intro">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" as="textarea" rows={3} value={description} onChange={(e)=>setDescription(e.target.value)}/>
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
    </>);
}
export default DetailUpdate;