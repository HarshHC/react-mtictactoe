import React from 'react'
import ic_x from '../images/ic_x.png'
import ic_o from '../images/ic_o.png'
import { useSelector } from 'react-redux'
import { idToImage } from '../Helpers'


function PlayerInfo() {

    const currentPlayer = useSelector(state => state.currentPlayer)
    const players = useSelector(state => state.players)

    let currentPlayerStatus = null

    if(players.winner != 0){
        currentPlayerStatus = 
            <div className="currentPlayer">
                <img src={idToImage(players.winner) } className="player-icon"></img>
                <div>{players[Object.keys(players)[players.winner - 1]]} WINS! </div>
            </div>
    }else{
        currentPlayerStatus = 
            <div className="currentPlayer">
                <img src={idToImage(currentPlayer) } className="player-icon"></img>
                <div>{players[Object.keys(players)[currentPlayer - 1]]}'s turn </div>
            </div>
    }

    return (
        <div className="playerInfo">
            <div className="players">
                <div className="player">
                    <img src={ic_x} className="player-icon"></img>
                <div>{players.player1}</div>
                </div>
                <div className="player2">
                    <div>{players.player2}</div>
                    <img src={ic_o} className="player-icon"></img>
                </div>
            </div>

            {currentPlayerStatus}
        </div>
    )
}

export default PlayerInfo
