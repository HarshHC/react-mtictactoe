import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory} from 'react-router-dom'
import Header from './Header'
import db from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { resetBoard, resetOnlineMode, updateOnlineMode } from '../actions'
import { PLAYER_O, PLAYER_X } from '../Helpers'
import AlertDialog from './AlertDialog'

function GameRoom() {

    var unsubscribe;

    const {code} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const [isNewGame, setisNewGame] = useState(null)
    const [isGameConnected, setisGameConnected] = useState(false)
    const [playerName, setplayerName] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [noRoomAler, setNoRoomAler] = useState(false)
    const [playerReady, setplayerReady] = useState(false)
    const [status, setStatus] = useState("STATUS")
    const [btn_text, setBtn_txt] = useState("READY")

    const totalPlayed = useSelector(state => state.totalPlayed)
    const players = useSelector(state => state.players)
    const board = useSelector(state => state.board)
    const onlineMode = useSelector(state => state.onlineMode)

    let content = null
    console.log(isNewGame);
    console.log("THIS PLAYER IS: "+ onlineMode.thisPlayerIs);
    if(code.length === 4 && /^\d+$/.test(code)){
        content = 
                <div>
                    <div className="game-room">
                            <div className="online-text">The opponent has to enter this code to join the game</div>
                            <div className="room-code">ROOM CODE: {code}</div>
                            <div className="online-text">ENTER YOUR PLAYER NAME:</div>
                            <input className="game-input" value={playerName} placeholder="Eg: BillGates" onChange={(e) => setplayerName(e.target.value)}/>
                            <button className="menu-btn" onClick={() => playerIsReady()}>{btn_text.toUpperCase()}</button>
                            <AlertDialog
                                show={showAlert}
                                dialogClassName="resetModel"
                                text = "The game you are trying to join is already full! Try joining another game or creating your own."
                                onHide={() => {
                                    setShowAlert(false)
                                    history.push("/online")
                                }}
                                />
                            <AlertDialog
                                show={noRoomAler}
                                dialogClassName="resetModel"
                                text = "It appears that the room owner left the game and the room you joined no longer exists"
                                onHide={() => {
                                    setNoRoomAler(false)
                                    history.push("/online")
                                }}
                                />
                    </div>
    <div className="player-status">{status.toUpperCase()}</div>
                </div>
    }else{
        content = 
            <div className="game-room text-center">
                OOPS - GAME NOT FOUND <br/> 
                PLEASE CHECK GAME CODE  <br/><br/> 

                <Link to="/">GO TO HOME PAGE</Link> 
                <br/>
                <p>Game developed by <a href="https://www.instagram.com/harshhc5">Harsh Chandra</a></p>
            </div>

    }

    useEffect(() => {
        dispatch(resetOnlineMode())
    }, [])

    useEffect(() => {
        // CHECK IF NEW GAME OR JOINING EXISTING ONE
        console.log("CODE IS " + code);

        if(code.length === 4 && /^\d+$/.test(code)){

            if(isNewGame == null){
                dispatch(resetOnlineMode())
                dispatch(resetBoard())
                db.collection('games').doc(code).get()
                .then(docSnapshot => {
                    console.log("DATA RECEIVED ABOUT EXISTANCE - Document data:", docSnapshot.data());

                    if (docSnapshot.exists) {
                        console.log("Joining existing game");
                        console.log("CURRENTLY HAS CONNECTED: "+ docSnapshot.data().connected);

                        if(docSnapshot.data().connected >= 2){

                            setShowAlert(true)
                            console.log("GAME IS FULL");
                        }else{
                            dispatch(updateOnlineMode(true, code, PLAYER_O, docSnapshot.data().connected, docSnapshot.data().joined, totalPlayed, players.player1, players.player2, board))
                            setisNewGame('OLD')
                            setisGameConnected(false)
                        }
                    }else{
                        console.log("Creating new game");
                        dispatch(updateOnlineMode(true, code,PLAYER_X, 1,0, totalPlayed, players.player1, players.player2, board))
                        setisNewGame('NEW')
                    }
                  });
            }
            

        }else{
            console.log("INVALID CODE");
        }
        
    }, [])

    useEffect(() => {
          // ADD or GET DATA AFTER KNOWING ITS A NEW GAME OR OLD ONE AND ATTACHING LISTNERS

          if(isNewGame != 'ALL DONE'){
            if(isNewGame === 'NEW'){

                db.collection('games').doc(code).set(
                    {
                        board: onlineMode.board,
                        chancesPlayed: onlineMode.chancesPlayed,
                        connected: onlineMode.connected,
                        joined: onlineMode.joined,
                        player1: onlineMode.player1,
                        player2: onlineMode.player2
                    }
                ).then(function() {
                    console.log("Document successfully written!");
                    setisNewGame('YES - ATTACH LISTNER');
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
    
    
            }else if(isNewGame === 'OLD'){
                // ATTACH LISTNER AND ADD THEN NEW CONNECTION
                console.log("ATTACHING LISTNER");
                unsubscribe = 
                    db.collection("games").doc(code)
                    .onSnapshot(function(doc) {
                        console.log("Current data: ", doc.data());
                        let data = doc.data()
    
                        if(doc.exists){
    
                            dispatch(updateOnlineMode(true, code, onlineMode.thisPlayerIs, data.connected, data.joined, data.chancesPlayed, data.player1, data.player2, data.board))
                        }else{
                            setNoRoomAler(true)
                        }
                    });
                
                setisGameConnected(true)
                setisNewGame('ALL DONE')
    
            }else if(isNewGame === 'YES - ATTACH LISTNER'){
                unsubscribe = 
                    db.collection("games").doc(code)
                    .onSnapshot(function(doc) {
                        console.log("Current data: ", doc.data());
                        let data = doc.data()
                        if(doc.exists){
                            dispatch(updateOnlineMode(true, code,onlineMode.thisPlayerIs, data.connected, data.joined, data.chancesPlayed, data.player1, data.player2, data.board))
                        }else{
                            setNoRoomAler(true)
                        }
                    });
    
                    setisNewGame('ALL DONE')
            }
          }
        
        return () => {
            // if(unsubscribe != null){
            //     console.log("UNSUBSCRIBING");
            //     if(onlineMode.thisPlayerIs == PLAYER_X){

            //         if(onlineMode.connected != 2 && onlineMode.joined != 2){
            //             db.collection("games").doc(code).delete().then(function() {
            //                 console.log("Document successfully deleted!");
            //             }).catch(function(error) {
            //                 console.error("Error removing document: ", error);
            //             });

            //             //unsubscribe()
            //         }
            //     }
            // }
        }
    }, [isNewGame])

    useEffect(() => {
        if(onlineMode.thisPlayerIs == PLAYER_O && isGameConnected){
            console.log("UPDATING GAME CONNECTED");
                console.log("RIGHT NOW IS " + onlineMode.connected );
                db.collection("games").doc(code).update({
                    connected: (onlineMode.connected + 1)
                })
                .then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        }
    }, [isGameConnected])


    useEffect(() => {
        if(onlineMode.thisPlayerIs == PLAYER_O){
            if(playerReady){
                console.log("UPDATING GAME JOINED");
                console.log(onlineMode.joined);
                
                let name = onlineMode.player2
                if(playerName.length > 1){
                    name = playerName
                }else{
                    setplayerName(name)
                }

                db.collection("games").doc(code).update({
                    joined: onlineMode.joined + 1,
                    player2: name
                })
                .then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            }
        }else if(onlineMode.thisPlayerIs == PLAYER_X){

                if(onlineMode.joined == 1){
                    let name = onlineMode.player1
                if(playerName.length > 1){
                    name = playerName
                }else{
                    setplayerName(name)
                }
                console.log("UPDATING GAME JOINED");
                console.log(onlineMode.joined);

                db.collection("games").doc(code).update({
                    joined: onlineMode.joined + 1,
                    player1: name
                })
                .then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            }
        }
    }, [playerReady])

    const playerIsReady = () => {
        console.log("PLAYER IS READY CLICKED");
        if(onlineMode.thisPlayerIs == PLAYER_O){
            setplayerReady(true)
        }else{
            if(onlineMode.joined + 1 == 2){
                // GAME STARTS NOW
                setStatus("game is starting")
                setplayerReady(true)
            }
        }
       
    }

    useEffect(() => {
        console.log("UPDATING STATUS");
        if(onlineMode.connected === 2 && onlineMode.joined === 2){
            // START GAME
            setStatus("game is starting")
            history.push("/"+code);
        }

        if(onlineMode.thisPlayerIs === PLAYER_X){
            setBtn_txt("START")
            if(onlineMode.connected === 1){
                setStatus("waiting for opponent to join the game")
                if(onlineMode.thisPlayerIs == 2){
                    noRoomAler(true)
                    dispatch(resetOnlineMode())
                }
            }else if(onlineMode.connected === 2){
                if(onlineMode.joined === 0){
                    setStatus("waiting for opponent to get ready")
                }else if(!playerReady){
                    setStatus("waiting for you to start the game")
                }
            }
        }else if(onlineMode.thisPlayerIs === PLAYER_O){
             setBtn_txt("READY")
            if(onlineMode.connected === 2){
                if(!playerReady){
                    setStatus("waiting for you to get ready")
                }else if(onlineMode.joined === 1){
                    setStatus("waiting for opponent to start the game")
                }
            }
        }
    }, [onlineMode])

    window.addEventListener("beforeunload", (ev) => 
    {  
        ev.preventDefault();
        if(onlineMode.thisPlayerIs == PLAYER_X){
            db.collection("games").doc(code).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }else if(onlineMode.thisPlayerIs == PLAYER_O){
            if(onlineMode.connected === 2 && onlineMode.joined === 2){
                
            }else if(onlineMode.connected === 2 && onlineMode.joined < 2){
                db.collection("games").doc(onlineMode.code).update({
                    connected: onlineMode.connected - 1,
                })
                .then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            }
        }
        
        unsubscribe()
        // return ev.returnValue = 'Are you sure you want to close?';
    });

    return (
        <div>
            <Header />
            {content}
        </div>
    )
}

export default GameRoom
