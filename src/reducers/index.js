import { combineReducers } from 'redux';
import chanceReducer from './ChanceReducer'
import TotalPlayedReducer from './TotalPlayedReducer'
import BoardReducer from './BoardReducer'
import GameStateReducer from './GameStateReducer'

const allReducers = combineReducers({
    currentPlayer: chanceReducer,
    totalPlayed: TotalPlayedReducer,
    board: BoardReducer,
    isGameEnded: GameStateReducer
});

export default allReducers;