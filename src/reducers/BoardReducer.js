import {RESET_BOARD, UPDATE_BOARD} from '../actiontypes'

var defaultBoard = new Array(42).fill(0);

const boardReducer = (state = defaultBoard, action) => {
    switch(action.type) {
        case UPDATE_BOARD:
            return state.map((item, index) => {
                return index == action.payload.index ? action.payload.currentPlayer : item
            });
        case RESET_BOARD:
            return defaultBoard
        default:
            return state;
    }
}

export default boardReducer;