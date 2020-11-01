import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { previousChance, resetBoard, resetChance, resetTotalPlayed, setCurrentPlayer, setTotalPlayed, updateBoard, updateGameState, updateOnlineMode, updatePlayers } from '../actions'
import {Modal, Button} from 'react-bootstrap'
import { DEFAULT_PLAYER, PLAYER_O } from '../Helpers';
import InfoDialog from './InfoDialog';
import db from '../firebase'

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

function GameOptions() {

    const [modalShow, setModalShow] = useState(false);
    const [updateDb, setUpdateDb] =  useState(false);
    const [infoModalShow, setInfoModalShow] = useState(false);
    const dispatch = useDispatch();
    const isGameEnded = useSelector(state => state.isGameEnded)
    const players = useSelector(state => state.players)
    const boardHistory = useSelector(state => state.boardHistory)
    const onlineMode = useSelector(state => state.onlineMode)

    var defaultBoard = new Array(42).fill(0);

    const gameReset = () => {

        console.log("Resting game");
        setModalShow(false)
        dispatch(resetBoard());
        dispatch(updateGameState(false));
        dispatch(resetChance())
        dispatch(resetTotalPlayed())
        dispatch(updatePlayers(players.player1, players.player2, 0))
        dispatch(previousChance(boardHistory.prev_id, boardHistory.prev_player, boardHistory.prev_tot, false, true))

        if(onlineMode.active){
          console.log("Resting online game");
          dispatch(updateOnlineMode(true, onlineMode.code, onlineMode.thisPlayerIs, onlineMode.connected, onlineMode.joined, -1, onlineMode.player1, onlineMode.player2, defaultBoard))
          dispatch(updateGameState(true))
          setUpdateDb(true)
        }

    }

    useEffect(() => {
      if(updateDb){
        db.collection('games').doc(onlineMode.code).set(
          {
              board: defaultBoard,
              chancesPlayed: -1,
              connected: 2,
              joined: 2,
              player1: onlineMode.player1,
              player2: onlineMode.player2
          }
          ).then(function() {
              console.log("Document for reset successfully written!");
              setUpdateDb(false)
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
      }
    }, [updateDb])

    useEffect(() => {
      let firstTime = localStorage.getItem('first-time')
      if(firstTime == null){
        setInfoModalShow(true)
      }
      console.log('first time');
    }, [])
  
    useEffect(() => {
      localStorage.setItem('first-time', false)
      console.log('first time updated');
    }, [])

    const undoGame = () => {
      if(boardHistory.newData && !isGameEnded){
        dispatch(updateBoard(DEFAULT_PLAYER, boardHistory.prev_id))
        dispatch(setCurrentPlayer(boardHistory.prev_player))
        dispatch(setTotalPlayed(boardHistory.prev_tot))
        dispatch(previousChance(boardHistory.prev_id, boardHistory.prev_player, boardHistory.prev_tot, false, false))
      }
    }

    let undoDisabled = ""
    let resetDisabled = ""

    if(onlineMode.active){
      undoDisabled = "true"
      if(onlineMode.thisPlayerIs == PLAYER_O){
        resetDisabled = "true"
      }
    }

    return (
        <div>

          <div className="gameOptions d-flex  flex-row">
              
              <button className="btn"  size="sm" onClick={() => setInfoModalShow(true)}>INFO</button>
          
              <button 
                  disabled={resetDisabled}
                  className="btn-mg btn" 
                  variant="primary" 
                  size="sm" 
                  onClick={() => isGameEnded ? gameReset() : setModalShow(true)}>RESET</button>
          
              <button disabled={undoDisabled} className="btn" size="sm" onClick={() => undoGame()}>UNDO</button>
              
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

