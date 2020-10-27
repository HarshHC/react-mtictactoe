import * as actions from '../actiontypes'

export const nextChance = (totalPlayed) => {
    return{
        type: actions.NEXT_CHANCE,
        payload: {
            totalPlayed,
        }
    }
}

export const increaseTotalPlayed = () => {
    return{
        type: actions.INCREASE_TOTAL_PLAYED,
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

export const updateGameState = (gameState) => {
    return{
        type: actions.UPDATE_GAME_STATE,
        payload: {
            gameState
        }
    }
}