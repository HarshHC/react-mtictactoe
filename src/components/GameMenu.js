import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { updateOnlineMode } from '../actions';
import { DEFAULT_PLAYER } from '../Helpers';
import InfoDialog from './InfoDialog';

function GameMenu() {

    const [infoModalShow, setInfoModalShow] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const startSinglePlayerGame = () => {
        history.push("/offline");
        dispatch(updateOnlineMode(false, DEFAULT_PLAYER, 0, 0, 0, 0, 1, 2, []))
    }

    const goToOnlineGame = () => {
        history.push("/online");
    }

    return (
        <div className="menu">
            <div className="menu-title">mTic Tac Toe</div>

            <button className="menu-btn" onClick={() => startSinglePlayerGame()}>PASS &amp; PLAY</button>
            <button className="menu-btn" onClick={() => goToOnlineGame()}>ONLINE MULTIPLAYER</button>
            <button className="menu-btn" onClick={() => setInfoModalShow(true)}>INSTRUCTIONS</button> 

             <InfoDialog
              show={infoModalShow}
              dialogClassName="resetModel"
              onHide={() => {setInfoModalShow(false)}}/>         
        </div>
    )
}

export default GameMenu
