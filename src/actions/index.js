import * as actions from '../actiontypes'

export const nextChance = (totalPlayed) => {
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

export const previousChance = (prev_id, prev_player, prev_tot, newData) => {
    return{
        type: actions.PREVIOUS_CHANCE,
        payload: {
            prev_id,
            prev_player,
            prev_tot,
            newData
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