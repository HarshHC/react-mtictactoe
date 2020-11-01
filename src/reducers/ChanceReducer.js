import { NEXT_CHANCE, RESET_CHANCE, SET_PLAYER} from '../actiontypes'
import { PLAYER_O, PLAYER_X } from '../Helpers';

const chanceReducer = (state = 1, action) => {
    switch(action.type){
        case NEXT_CHANCE:
            if (isTimeToSwitchPlayer(action.payload.totalPlayed)) {
                if(state === PLAYER_X){
                    return PLAYER_O
                }else{
                    return PLAYER_X
                }
            }else{
                return state
            }
        case RESET_CHANCE:
            return PLAYER_X
        case SET_PLAYER:
            return action.payload.playerId
        default:
            return state;
    }
}

function isTimeToSwitchPlayer(totalPlayed) {
    if(totalPlayed%2 === 0){
        return true
    }else{
        return false
    }
}

export default chanceReducer;