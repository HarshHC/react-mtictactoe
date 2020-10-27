import {UPDATE_GAME_STATE} from '../actiontypes'

const GameStateReducer = (state = false, action) => {
    switch(action.type) {
        case UPDATE_GAME_STATE:
           return action.payload.gameState
        default:
            return state;
    }
}

export default GameStateReducer;