import React from 'react'
import ic_x from '../images/ic_x.png'
import ic_o from '../images/ic_o.png'
import { useSelector } from 'react-redux'
import { idToImage } from '../Helpers'


function PlayerInfo() {

    const currentPlayer = useSelector(state => state.currentPlayer)
    const players = useSelector(state => state.players)
    const isGameEnded = useSelector(state => state.isGameEnded)
    const onlineMode = useSelector(state => state.onlineMode)


    let currentPlayerStatus = null

    if(players.winner !== -1 && isGameEnded){
        currentPlayerStatus = 
            <div className="currentPlayer">
                <img src={idToImage(players.winner)} alt="tictactoe player icon" className="player-icon"></img>
                <div>{players[Object.keys(players)[players.winner - 1]]} WINS! </div>
            </div>
    }else{

        if(onlineMode.active){
            currentPlayerStatus = 
            <div className="currentPlayer">
                <img src={idToImage(currentPlayer) } alt="tictactoe player icon" className="player-icon"></img>
                <div>{onlineMode[Object.keys(onlineMode)[currentPlayer + 5]]}'s turn </div>
            </div>
        }else{
            currentPlayerStatus = 
            <div className="currentPlayer">
                <img src={idToImage(currentPlayer) } alt="tictactoe player icon" className="player-icon"></img>
                <div>{players[Object.keys(players)[currentPlayer - 1]]}'s turn </div>
            </div>
        }
        
    }

    return (
        <div className="playerInfo">
            <div className="players">
                <div className="player">
                    <img src={ic_x} alt="tictactoe player icon" className="player-icon"></img>
                <div>{onlineMode.active? onlineMode.player1 : players.player1}</div>
                </div>
                <div className="player2">
                    <div>{onlineMode.active? onlineMode.player2 : players.player2}</div>
                    <img src={ic_o} alt="tictactoe player icon" className="player-icon"></img>
                </div>
            </div>

            {currentPlayerStatus}
        </div>
    )
}

export default PlayerInfo
