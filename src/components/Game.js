import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { increaseTotalPlayed, nextChance, setBoard, setCurrentPlayer, setTotalPlayed, updateBoard, updateGameState, updateOnlineMode, updatePlayers } from '../actions';
import { idToWinner, PLAYER_O, PLAYER_X } from '../Helpers';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import GameOptions from './GameOptions';
import Header from './Header';
import db from '../firebase'
import AlertDialog from './AlertDialog';
import { useHistory } from 'react-router-dom';

let winner = -1;
var max = 3;

function Game() {

    var unsubscribe;

    const dispatch = useDispatch();
    const history = useHistory();
    const [counter, setCounter] = useState(0)
    const [noRoomAlert, setNoRoomAlert] = useState(false)
    const board = useSelector(state => state.board)
    const isGameEnded = useSelector(state => state.isGameEnded)
    const players = useSelector(state => state.players)
    const onlineMode = useSelector(state => state.onlineMode)
    const currentPlayer = useSelector(state => state.currentPlayer)

    const useDisablePinchZoomEffect = () => {
      useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0,1);

        const disablePinchZoom = (e) => {
          if (e.touches.length > 1) {
            e.preventDefault()
          }
        }
        document.addEventListener("touchmove", disablePinchZoom, { passive: false })
        return () => {
          document.removeEventListener("touchmove", disablePinchZoom)
        }
      }, [])
    }

      useEffect(() => {

        if(onlineMode.active){

          dispatch(updatePlayers(onlineMode.player1, onlineMode.player2, players.winner))

          console.log("executing");
          dispatch(updateOnlineMode(true, onlineMode.code, onlineMode.thisPlayerIs, onlineMode.connected, onlineMode.joined, onlineMode.chancesPlayed, onlineMode.player1, onlineMode.player2, onlineMode.board))
          if(unsubscribe != null){
            unsubscribe()
          }
          unsubscribe = 
            db.collection("games").doc(onlineMode.code)
            .onSnapshot(function(doc) {
                let data = doc.data()
        
                if(doc.exists){
                  if(doc.chancesPlayed > -1){
                    console.log("Current data: ", doc.data());
                    dispatch(updateOnlineMode(true, onlineMode.code, onlineMode.thisPlayerIs, data.connected, data.joined, data.chancesPlayed, onlineMode.player1, onlineMode.player2, data.board))
                  }
                }else{
                    setNoRoomAlert(true)
                }
            });
    
        }
        return () => {
          // console.log("UNSUBBING");
          // if(unsubscribe != null){
            
          //   db.collection("games").doc(onlineMode.code).delete().then(function() {
          //       console.log("Document successfully deleted!");
          //   }).catch(function(error) {
          //       console.error("Error removing document: ", error);
          //   });
          
          //   unsubscribe()
          // }
        }
      }, [isGameEnded])

      useEffect(() => {
        if(onlineMode.active){

          if(!isGameEnded){
            if(checkForWins(onlineMode.board) != null){
              highlightWinPositions(winner, checkForWins(onlineMode.board))
              dispatch(updatePlayers(players.player1, players.player2, winner))
              dispatch(updateGameState(true))
            }
          }

          if(onlineMode.thisPlayerIs != currentPlayer){
      
            console.log("GOT AN UPDATE");
            setCounter(counter + 1)
            console.log("counter: "+ counter);

            if(onlineMode.thisPlayerIs == PLAYER_O){
              console.log("WE HERE");

              if(onlineMode.chancesPlayed % 2 != 0 && onlineMode.chancesPlayed > 0){
                if(currentPlayer != PLAYER_O){
                  dispatch(setCurrentPlayer(PLAYER_O))
                }
              }
              
            }else{
              if(onlineMode.chancesPlayed % 2 != 0) {
                if(currentPlayer != PLAYER_X){
                  dispatch(setCurrentPlayer(PLAYER_X))
                }              
              }
            }

            
          }

          dispatch(setBoard(onlineMode.board))
          dispatch(setTotalPlayed(onlineMode.chancesPlayed))
            

          if (onlineMode.board.every(item => item === 0 && onlineMode.thisPlayerIs == PLAYER_O)) {
            // new game
            console.log("Starting new game");
            dispatch(updateGameState(false))
            dispatch(setCurrentPlayer(PLAYER_X))
            dispatch(updatePlayers(players.player1, players.player2, -1))
            dispatch(setTotalPlayed(-1))
            max = 3
            winner = -1
          }else if(onlineMode.board.every(item => item === 0 && onlineMode.thisPlayerIs == PLAYER_X)) {
            dispatch(updateGameState(false))  
            max = 3
            winner = -1
          }
          console.log("TOTAL PLAYED ONLINE:", onlineMode.chancesPlayed);
  
        }
        
      }, [onlineMode])

      useEffect(() => {
        
        if(!isGameEnded && !onlineMode.active){
          if(checkForWins(board) != null){      
            highlightWinPositions(winner, checkForWins(board))
            dispatch(updatePlayers(players.player1, players.player2, winner))
            dispatch(updateGameState(true))
          }
        }

        dispatch(updatePlayers(players.player1, players.player2, winner))

        if(winner != -1 && onlineMode.active){
            highlightWinPositions(winner, checkForWins(onlineMode.board))
            dispatch(updatePlayers(players.player1, players.player2, winner))
        }
      }, [board])
    
    useDisablePinchZoomEffect();

    function highlightWinPositions(winner, winPositions){
      console.log("SHOWING WINNER AT POSITIONS: "+ winPositions);
      if(winPositions != null && winner != null && max > 0){      
        console.log("OK SHOWING IT NOW "+ winPositions);
        for( var i = 0; i<5;i++) {
          dispatch(updateBoard(idToWinner(winner), winPositions[i]));
        }
        max = max -1
      }   
    }

    window.addEventListener("beforeunload", (ev) => 
    {  
        ev.preventDefault();
        db.collection("games").doc(onlineMode.code).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
        unsubscribe()
    });

    return (
        <div className="game">
            <Header />
            <PlayerInfo />
            <Board />
            <GameOptions />

            <AlertDialog
              show={noRoomAlert}
              dialogClassName="resetModel"
              text = "It appears that your opponent left the game and the room no longer exists"
              onHide={() => {
                  setNoRoomAlert(false)
                  history.push("/online")
              }}
              />
        </div>
    )
}

export default Game

//  GAME LOGIC

function convertBoardTo2D(boardCells) {

  var boardCells2d = Array(7).fill().map(() => Array(6).fill(0));
  
  for (var i = 0; i<7;i++){
      for(var j = 0; j<6;j++){
          boardCells2d[i][j] = boardCells[(6*i)+j]
      }
  }
  return boardCells2d
}

function checkForWins(boardCells){

    for(var i=0; i<42;i = i+6){
      if(checkWinInRow(i, boardCells) != null) return checkWinInRow(i, boardCells);
    }

    for(var i=1; i<42;i = i+6){
      if(checkWinInRow(i, boardCells) != null) return checkWinInRow(i, boardCells);
    }

    if(checkWinInColumn(PLAYER_X, boardCells) != null) return checkWinInColumn(PLAYER_X, boardCells);

    if(checkWinInColumn(PLAYER_O, boardCells) != null) return checkWinInColumn(PLAYER_O, boardCells);

    // checking diagonally for X
    if(checkWinsDiagonally(0, 0, 5, PLAYER_X, boardCells) != null) return  checkWinsDiagonally(0, 0, 5, PLAYER_X, boardCells);
    if(checkWinsDiagonally(0, 1, 4, PLAYER_X, boardCells) != null) return  checkWinsDiagonally(0, 1, 4, PLAYER_X, boardCells);
    if(checkWinsDiagonally(1, 0, 5, PLAYER_X, boardCells) != null) return  checkWinsDiagonally(1, 0, 5, PLAYER_X, boardCells);
    if(checkWinsDiagonally(2, 0, 4, PLAYER_X, boardCells) != null) return  checkWinsDiagonally(2, 0, 4, PLAYER_X, boardCells);
    
    // checking diagonally for O
    if(checkWinsDiagonally(0, 0, 5, PLAYER_O, boardCells) != null) return  checkWinsDiagonally(0, 0, 5, PLAYER_O, boardCells);
    if(checkWinsDiagonally(0, 1, 4, PLAYER_O, boardCells) != null) return  checkWinsDiagonally(0, 1, 4, PLAYER_O, boardCells);
    if(checkWinsDiagonally(1, 0, 5, PLAYER_O, boardCells) != null) return  checkWinsDiagonally(1, 0, 5, PLAYER_O, boardCells);
    if(checkWinsDiagonally(2, 0, 4, PLAYER_O, boardCells) != null) return  checkWinsDiagonally(2, 0, 4, PLAYER_O, boardCells);
    
    // checking inverse diagonally for X
    if(checkWinsDiagonallyInverse(0, 5, 5, PLAYER_X, boardCells) != null) return checkWinsDiagonallyInverse(0, 5, 5, PLAYER_X, boardCells);
    if(checkWinsDiagonallyInverse(0, 4, 4, PLAYER_X, boardCells) != null) return checkWinsDiagonallyInverse(0, 4, 4, PLAYER_X, boardCells);
    if(checkWinsDiagonallyInverse(1, 5, 5, PLAYER_X, boardCells) != null) return checkWinsDiagonallyInverse(1, 5, 5, PLAYER_X, boardCells);
    if(checkWinsDiagonallyInverse(2, 5, 4, PLAYER_X, boardCells) != null) return checkWinsDiagonallyInverse(2, 5, 4, PLAYER_X, boardCells);
    
    // checking inverse diagonally for O
    if(checkWinsDiagonallyInverse(0, 5, 5, PLAYER_O, boardCells) != null) return checkWinsDiagonallyInverse(0, 5, 5, PLAYER_O, boardCells);
    if(checkWinsDiagonallyInverse(0, 4, 4, PLAYER_O, boardCells) != null) return checkWinsDiagonallyInverse(0, 4, 4, PLAYER_O, boardCells);
    if(checkWinsDiagonallyInverse(1, 5, 5, PLAYER_O, boardCells) != null) return checkWinsDiagonallyInverse(1, 5, 5, PLAYER_O, boardCells);
    if(checkWinsDiagonallyInverse(2, 5, 4, PLAYER_O, boardCells) != null) return checkWinsDiagonallyInverse(2, 5, 4, PLAYER_O, boardCells);

  return null;
}

function checkWinInRow(startingAtCell, boardCells){
      
  let winPositions = []

  let checkForItem = boardCells[startingAtCell]
  var totalChecks = 0;
          
  if(checkForItem != 0){
      for(var i = startingAtCell; i< startingAtCell+5;i++){
          if(boardCells[i] == checkForItem){
              totalChecks+=1
              winPositions.push(i)
          }else{
              totalChecks = 0
              winPositions = []
              return
          }
      }
      
      if(totalChecks == 5){
        winner = checkForItem;
        return winPositions;
      }

      return null
  }
}

function checkWinInColumn(checkPlayer, boardCells){
      
      let winPositions = []
      let boardCells2d = convertBoardTo2D(boardCells)
              
      let checkForItem = checkPlayer
      var totalChecks = 0
      
      if(checkForItem != 0){
          
       for (var col = 0; col < 6; col++) {
              if(totalChecks == 5){
                winner = checkForItem;
                return winPositions
              }else{
                  totalChecks =   0
              }
              for(var row = 0; row<7; row++) {
                  if(boardCells2d[row][col] == checkForItem){
                      if(totalChecks<5){
                          totalChecks+=1
                          winPositions.push((6*row)+col)
                      }
                  }else{
                      if(totalChecks < 5){
                          totalChecks = 0
                          winPositions = []
                      }
                  }
              }
              if(totalChecks == 5){
                winner = checkForItem;
                return winPositions
              }
              winPositions = []
              //print("column done")
          }
      }
            
      if(totalChecks == 5){
          winner = checkForItem;
          return winPositions
      }
      
    return null;
}

function checkWinsDiagonally(startingAtRow, startingAtCol, max, checkFor, boardCells){     
  let boardCells2d = convertBoardTo2D(boardCells)
  
  let winPositions = []
  
  var row = startingAtRow
  var col = startingAtCol
  
  let checkForItem = checkFor

  var totalChecks = 0

  for (var i =0; i<= max; i++) {
    if(boardCells2d[row][col] == checkForItem){
        if(totalChecks < 5){
            totalChecks+=1
            winPositions.push((6*row)+col)
        }else{
          winner = checkForItem;
          return winPositions
        }
    }else{
        totalChecks = 0
        winPositions = []
    }
    
    if(totalChecks == 5){
      winner = checkForItem;
      return winPositions
    }
    
    row+=1
    col+=1
  }
  return null
}

function checkWinsDiagonallyInverse(startingAtRow, startingAtCol, max, checkFor, boardCells){
                  
      let boardCells2d = convertBoardTo2D(boardCells)
      
      let winPositions = []
      
      var row = startingAtRow
      var col = startingAtCol
      
      let checkForItem = checkFor
  
      var totalChecks = 0

      for(var i =0; i<= max; i++){

          if(boardCells2d[row][col] == checkForItem){
              if(totalChecks < 5){
                  totalChecks+=1
                  winPositions.push((6*row)+col)
              }else{
                winner = checkForItem;
                return winPositions
              }
          }else{
              totalChecks = 0
              winPositions = []
          }
          
          if(totalChecks == 5){
            winner = checkForItem;
            return winPositions
          }
          
          row+=1
          col-=1
      }
  
}
