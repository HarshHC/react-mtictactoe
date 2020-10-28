import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { previousChance, resetBoard, resetChance, resetTotalPlayed, setBoard, setCurrentPlayer, setTotalPlayed, updateBoard, updateGameState, updatePlayers } from '../actions'
import {Modal, Button} from 'react-bootstrap'
import { DEFAULT_PLAYER } from '../Helpers';

function ResetDialog(props) {
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

function GameOptions() {

    const [modalShow, setModalShow] = useState(false);
    const [infoModalShow, setInfoModalShow] = useState(false);
    const dispatch = useDispatch();
    const isGameEnded = useSelector(state => state.isGameEnded)
    const players = useSelector(state => state.players)
    const boardHistory = useSelector(state => state.boardHistory)

    const gameReset = () => {
        setModalShow(false)
        dispatch(resetBoard());
        dispatch(updateGameState(false));
        dispatch(resetChance())
        dispatch(resetTotalPlayed())
        dispatch(updatePlayers(players.player1, players.player2, 0))
        dispatch(previousChance(boardHistory.prev_id, boardHistory.prev_player, boardHistory.prev_tot, false))
    }

    const undoGame = () => {
      if(boardHistory.newData && !isGameEnded){
        dispatch(updateBoard(DEFAULT_PLAYER, boardHistory.prev_id))
        dispatch(setCurrentPlayer(boardHistory.prev_player))
        dispatch(setTotalPlayed(boardHistory.prev_tot))
        dispatch(previousChance(boardHistory.prev_id, boardHistory.prev_player, boardHistory.prev_tot, false))
      }
    }

    return (
        <div>

          <div className="gameOptions d-flex  flex-row">
              
              <button className="btn"  size="sm" onClick={() => setInfoModalShow(true)}>INFO</button>
          
              <button 
                  className="btn-mg btn" 
                  variant="primary" 
                  size="sm" 
                  onClick={() => isGameEnded ? gameReset() : setModalShow(true)}>RESET</button>
          
              <button className="btn" size="sm" onClick={() => undoGame()}>UNDO</button>
              
          </div>

          <ResetDialog
              show={modalShow}
              dialogClassName="resetModel"
              onHide={() => {setModalShow(false)}}
              onReset={() => gameReset()}
          />

          <InfoDialog
              show={infoModalShow}
              dialogClassName="resetModel"
              onHide={() => {setInfoModalShow(false)}}
          />

        </div>
    )
}

export default GameOptions

