import ic_x from './images/ic_x.png';
import ic_o from './images/ic_o.png';
import win_x from './images/win_x.png';
import win_o from './images/win_o.png';


export const PLAYER_X = 1;
export const PLAYER_O = 2;
export const WINNER_X = 3;
export const WINNER_O = 4;
export const DEFAULT_PLAYER = 0;

export const idToPlayer = (playerId) => {
    if(playerId === PLAYER_X){
        return "X";
    }else if(playerId === PLAYER_O){
        return "O";
    }else{
        return ""
    }
}

export const idToImage = (playerId) => {
    if(playerId === PLAYER_X){
        return ic_x
    }else if(playerId === PLAYER_O){
        return ic_o;
    }else if(playerId === WINNER_X){
        return win_x;
    }else if(playerId === WINNER_O){
        return win_o;
    }
}

export const idToWinner = (playerId) => {
    if(playerId === PLAYER_X){
        return WINNER_X;
    }else if(playerId === PLAYER_O){
        return WINNER_O;
    }else{
        return ""
    }
}