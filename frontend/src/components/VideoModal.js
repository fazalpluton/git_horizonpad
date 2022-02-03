import { Container, Row,Col, Table,Modal,Button } from "react-bootstrap";


function VideoModal(props) {
 
  
   return (<>
    <Modal show={props.show} onHide={props.handle_close} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered className="video-body">
     
        <Modal.Body >
        <iframe className="w-100" height={'400'} src="https://www.youtube.com/embed/nJw2W1ZVqas?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Modal.Body>
      
      </Modal>
   </>)
  }
  
 export default VideoModal