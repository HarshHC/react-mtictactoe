import {INCREASE_TOTAL_PLAYED, RESET_TOTAL_PLAYED, SET_TOTAL_PLAYED} from '../actiontypes'

const totalPlayedReducer = (state = -1, action) => {
    switch(action.type) {
        case INCREASE_TOTAL_PLAYED:
            return state + 1;
        case RESET_TOTAL_PLAYED:
            return -1
        case SET_TOTAL_PLAYED:
            return action.payload.totalPlayed
        default:
            return state;
    }
}

export default totalPlayedReducer;