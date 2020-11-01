import React, { useEffect, useState } from 'react'
import { increaseTotalPlayed, nextChance, previousChance, setCurrentPlayer, setTotalPlayed, updateBoard } from '../actions';
import {useDispatch, useSelector} from 'react-redux'
import {DEFAULT_PLAYER, idToImage, PLAYER_O, PLAYER_X } from '../Helpers';
import db from '../firebase'

function Square(props) {

    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false)
    const currentPlayer = useSelector(state => state.currentPlayer)
    const totalPlayed = useSelector(state => state.totalPlayed)
    const board = useSelector(state => state.board)
    const value = board[props.id]
    const isGameEnded = useSelector(state => state.isGameEnded)
    const onlineMode = useSelector(state => state.onlineMode)
    
    function squareClicked(){
        console.log("sqr clicked, online mode: ", onlineMode);

        if(onlineMode.active){
            if(onlineMode.thisPlayerIs == currentPlayer && !isGameEnded){
                console.log("current player has to play");
                dispatch(setTotalPlayed(onlineMode.chancesPlayed))
                if(board[props.id] === DEFAULT_PLAYER ){
                    console.log("current player has played");
                    dispatch(updateBoard(currentPlayer, props.id))
                    dispatch(increaseTotalPlayed())
                    setClicked(true)
                }
            }                
        }else{
            if(board[props.id] === DEFAULT_PLAYER && !isGameEnded && !onlineMode.active){
                dispatch(updateBoard(currentPlayer, props.id))
                dispatch(increaseTotalPlayed())
                dispatch(nextChance(totalPlayed))
                dispatch(previousChance(props.id, currentPlayer, totalPlayed, true, false))
            }
        }
        
    }

    useEffect(() => {
        
        if(clicked){
            console.log("now going update db");

            db.collection("games").doc(onlineMode.code).update({
                board: board,
                chancesPlayed: onlineMode.chancesPlayed + 1
            })
            .then(function() {
                console.log("Document successfully updated!");
                dispatch(nextChance(onlineMode.chancesPlayed))
                setClicked(false)
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
    }, [clicked])

    let img = null;

    if(value !== 0){
        return <img className="square_img"  src={idToImage(value)}></img>;
    }

    return (
        <div className={ value !== 0 ? 'square-selected' : 'square selectDisable'} onClick={() => squareClicked()}>
            {img}      
        </div>
    )
}

export default Square