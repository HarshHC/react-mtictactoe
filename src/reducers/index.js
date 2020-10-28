import { combineReducers } from 'redux';
import chanceReducer from './ChanceReducer'
import TotalPlayedReducer from './TotalPlayedReducer'
import BoardReducer from './BoardReducer'
import GameStateReducer from './GameStateReducer'
import PlayerReducer from './PlayerReducer'
import BoardHistory from './BoardHistory';

const allReducers = combineReducers({
    currentPlayer: chanceReducer,
    totalPlayed: TotalPlayedReducer,
    board: BoardReducer,
    isGameEnded: GameStateReducer,
    players: PlayerReducer,
    boardHistory: BoardHistory
});

export default allReducers;