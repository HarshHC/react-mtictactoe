import {Modal, Button} from 'react-bootstrap'
import React from 'react'

function InfoDialog(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            INSTRUCTIONS
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            This is a modified version of the famous Tic Tac Toe (X and O) game. <br/> On the game grid first player plays TWO chances followed by the second player playing his/her 2 turns. <br/> <br/> The player to first GET 5 in a row in any direction ( vertical / horizontal / diagonal ) WINS the game! <br/> <br/> Whenever a player wins the squares are highlighted and the winner is declared ! If all 42 squares get filled with no winner the game is declared a TIE !
          </p>
          <p>Game developed by <a href="https://www.instagram.com/harshhc5">Harsh Chandra</a></p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide} variant="secondary">OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default InfoDialog
