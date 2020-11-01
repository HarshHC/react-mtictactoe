import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
 } from 'react-router-dom';
import './App.css';
import Game from './components/Game'
import GameMenu from './components/GameMenu';
import GameRoom from './components/GameRoom';
import Online from './components/Online'

function App() {
  return (
    <Router>
      <Switch>
       <Route exact path="/" component={GameMenu}></Route>
       <Route exact path="/offline" component={Game}></Route>
       <Route exact path="/online" component={Online}></Route>
       <Route exact path="/online/:code" component={GameRoom}></Route>
       <Route exact path="/:code" component={Game}></Route>
      </Switch>
    </Router>
  );
}

export default App;
