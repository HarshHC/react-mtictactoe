import {Modal, Button} from 'react-bootstrap'
import React from 'react'

function AlertDialog(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            ERROR
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
           {props.text}
          </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide} variant="secondary">OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default AlertDialog
