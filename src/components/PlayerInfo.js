import React from 'react'
import ic_x from '../images/ic_x.png'
import ic_o from '../images/ic_o.png'


function PlayerInfo() {
    return (
        <div className="playerInfo">
            <div className="players">
                <div className="player">
                    <img src={ic_x} className="player-icon"></img>
                    <div>PLAYER 1</div>
                </div>
                <div className="player2">
                    <div>PLAYER 2</div>
                    <img src={ic_o} className="player-icon"></img>
                </div>
            </div>

            <div className="currentPlayer">PLAYER 1's Turn</div>
        </div>
    )
}

export default PlayerInfo
