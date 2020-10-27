import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateBoard, updateGameState } from '../actions';
import { idToWinner, PLAYER_O, PLAYER_X } from '../Helpers';
import Board from './Board'

let winner = -1;

function Game() {

    const dispatch = useDispatch();
    const board = useSelector(state => state.board)
    const isGameEnded = useSelector(state => state.isGameEnded)

    document.body.style.overflow = 'hidden';

    const useDisablePinchZoomEffect = () => {
      useEffect(() => {

        // highlightWinPositions(PLAYER_O, [0,1,2,3,4]);
        if(checkForWins(board) != null){
          if(!isGameEnded){
            highlightWinPositions(winner, checkForWins(board))
            dispatch(updateGameState(true))
          }
        }

        const disablePinchZoom = (e) => {
          if (e.touches.length > 1) {
            e.preventDefault()
          }
        }
        document.addEventListener("touchmove", disablePinchZoom, { passive: false })
        return () => {
          document.removeEventListener("touchmove", disablePinchZoom)
        }
      }, [board])
    }

    useDisablePinchZoomEffect();
    
    function highlightWinPositions(winner, winPositions){
      for( var i = 0; i<5;i++) {
          dispatch(updateBoard(idToWinner(winner), winPositions[i]));
      }
    }

    return (
        <div className="game">
            <Board />
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
              //print("column done")
          }
      }
            
      if(totalChecks == 5){
          winner = checkForItem;
          return winPositions
      }
      
    return null;
}