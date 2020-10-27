import React from 'react'
import { increaseTotalPlayed, nextChance, updateBoard } from '../actions';
import {useDispatch, useSelector} from 'react-redux'
import { idToPlayer, DEFAULT_PLAYER, idToImage } from '../Helpers';

function Square(props) {

    const dispatch = useDispatch();
    const currentPlayer = useSelector(state => state.currentPlayer)
    const totalPlayed = useSelector(state => state.totalPlayed)
    const board = useSelector(state => state.board)
    const value = board[props.id]
    const isGameEnded = useSelector(state => state.isGameEnded)


    function squareClicked(){
        if(board[props.id] == DEFAULT_PLAYER && !isGameEnded){
            dispatch(updateBoard(currentPlayer, props.id))
            dispatch(increaseTotalPlayed())
            dispatch(nextChance(totalPlayed))
        }
    }

    let img = null;

    if(value != 0){
        return <img className="square_img"  src={idToImage(value)}></img>;
    }

    return (
        <div className={ value != 0 ? 'square-selected' : 'square selectDisable'} onClick={() => squareClicked()}>
            {img}      
        </div>
    )
}

export default Square
