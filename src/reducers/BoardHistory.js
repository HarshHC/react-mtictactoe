import {PREVIOUS_CHANCE} from '../actiontypes'

const initial_state = {
    prev_id: 0,
    prev_player: 1,
    prev_tot: -1,
    newData: false,
    wasReset: false
}

const BoardHistory = (state = initial_state, action) => {
    switch(action.type) {
        case PREVIOUS_CHANCE:
            return {
                prev_id: action.payload.prev_id,
                prev_player: action.payload.prev_player,
                prev_tot: action.payload.prev_tot,
                newData: action.payload.newData,
                wasReset: action.payload.wasReset,
            }
        default:
            return state;
    }
}

export default BoardHistory;