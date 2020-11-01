import * as actions from '../actiontypes'

export const nextChance = (totalPlayed) => {
    console.log("COMING FROM ACTION", "NEXT CHANCE CALLE");
    return{
        type: actions.NEXT_CHANCE,
        payload: {
            totalPlayed,
        }
    }
}

export const resetChance = () => {
    return{
        type: actions.RESET_CHANCE,
    }
}

export const setCurrentPlayer = (playerId) => {
    return{
        type: actions.SET_PLAYER,
        payload: {
            playerId,
        }
    }
}

export const increaseTotalPlayed = () => {
    return{
        type: actions.INCREASE_TOTAL_PLAYED,
    }
}

export const resetTotalPlayed = () => {
    return{
        type: actions.RESET_TOTAL_PLAYED,
    }
}

export const setTotalPlayed = (totalPlayed) => {
    return{
        type: actions.SET_TOTAL_PLAYED,
        payload: {
            totalPlayed,
        }
    }
}

export const updateBoard = (currentPlayer, squareId) => {
    return{
        type: actions.UPDATE_BOARD,
        payload: {
            currentPlayer,
            index: squareId 
        }
    }
}

export const resetBoard = () => {
    return{
        type: actions.RESET_BOARD,
    }
}

export const setBoard = (newBoard) => {
    return{
        type: actions.SET_BOARD,
        payload: {
            newBoard
        }
    }
}

export const previousChance = (prev_id, prev_player, prev_tot, newData, wasReset) => {
    return{
        type: actions.PREVIOUS_CHANCE,
        payload: {
            prev_id,
            prev_player,
            prev_tot,
            newData,
            wasReset
        }
    }
}

export const updateGameState = (gameState) => {
    return{
        type: actions.UPDATE_GAME_STATE,
        payload: {
            gameState
        }
    }
}

export const updatePlayers = (player1, player2, winner) => {
    return{
        type: actions.UPDATE_PLAYERS,
        payload: {
            player1,
            player2,
            winner
        }
    }
}

export const updateOnlineMode = (active, code, thisPlayerIs, connected, joined, chancesPlayed, player1, player2, board) => {
    return{
        type: actions.UPDATE_ONLINE_MODE,
        payload: {
            active,
            code,
            thisPlayerIs,
            connected,
            joined,
            chancesPlayed,
            player1,
            player2,
            board,
        }
    }
}


export const resetOnlineMode = () => {
    return{
        type: actions.RESET_ONLINE_MODE,
    }
}
