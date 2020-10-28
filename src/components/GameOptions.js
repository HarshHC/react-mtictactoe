import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { resetBoard, updateGameState } from '../actions'
import {Modal, Button} from 'react-bootstrap'

function VerticalModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to reset the game?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
           You will lose all progress in this game.
          </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide} variant="secondary">CANCEL</Button>
            <Button onClick={props.onReset} variant="primary">RESET</Button>
        </Modal.Footer>
      </Modal>
    );
  }

function GameOptions() {

    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    const gameReset= () => {
        setModalShow(false)
        dispatch(resetBoard());
        dispatch(updateGameState(false));
    }

    return (
        <div>

            <div className="gameOptions d-flex  flex-row">
                
                <button className="btn"  size="sm">INFO</button>
            
                <button 
                    className="btn-mg btn" 
                    variant="primary" 
                    size="sm" 
                    onClick={() => setModalShow(true)}>RESET</button>
            
                <button className="btn" size="sm">UNDO</button>
                
            </div>

            <VerticalModal
                show={modalShow}
                onHide={() => {setModalShow(false)}}
                onReset={() => gameReset()}
            />

        </div>
    )
}

export default GameOptions

