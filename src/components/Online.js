import React, {useState} from 'react'
import db from '../firebase'
import { useHistory } from "react-router-dom";
import AlertDialog from './AlertDialog';
import { resetOnlineMode } from '../actions';
import { useDispatch } from 'react-redux';

function Online() {

    const history = useHistory();
    const dispatch = useDispatch();
    const [gameCode, setgameCode] = useState("")
    const [showAlert, setShowAlert] = useState(false)


    const createRoom = () => {
        dispatch(resetOnlineMode())
        let code = generateCode();
        db.collection('games').doc().get()
        .then(docSnapshot => {
            if (docSnapshot.exists) {
              console.log("ALREADY EXISTS");
            }else{
                console.log("ALL GOOD");
                history.push("/online/"+code);
         
            }
          });
    }

    const joinGame = () => {
        dispatch(resetOnlineMode())
        if(gameCode.length === 4 && /^\d+$/.test(gameCode)){
            history.push("/online/"+gameCode);
        }else{
            setShowAlert(true)
        }
    }

    return (
        <div className="online">
            <button className="menu-btn" onClick={() => createRoom()}>CREATE ROOM</button>
            <div className="online-text"> - OR - </div>
            <div className="online-text"> JOIN ROOM:</div>
            <input maxLength={4} placeholder="ENTER CODE HERE" className="online-input" onChange={(e) => setgameCode(e.target.value)}/>
            <button className="menu-btn" onClick= {() => joinGame()}>JOIN</button>

            <AlertDialog
              show={showAlert}
              dialogClassName="resetModel"
              text = "Invalid Code, Try again!"
              onHide={() => {setShowAlert(false)}}
            />
        </div>
    )
}

export default Online


function generateCode(){
    return Math.floor(1000 + Math.random() * 9000);
}