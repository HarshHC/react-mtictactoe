import {INCREASE_TOTAL_PLAYED} from '../actiontypes'

const totalPlayedReducer = (state = -1, action) => {
    switch(action.type) {
        case INCREASE_TOTAL_PLAYED:
            return state + 1;
        default:
            return state;
    }
}

export default totalPlayedReducer;