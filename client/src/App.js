import React from "react";
import Home from "./Pages/Home.js"
import Signup from "./Pages/Signup.js"
import Login from "./Pages/Login.js"
import Game from "./Pages/Game.js"
import { requestLogout } from "./Services/LogoutService"
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import history from './history.js';
import io from 'socket.io-client'

const socket = io.connect();

socket.on('game connection', (gameID)=> {
    console.log("Connected to game: " + gameID);
})

socket.on('game update', (gameState) => {
    console.log(gameState);
})

window.addEventListener('click', (e) => {
    if (e.target.id == 'createRoomButton') {
        socket.emit('create room', sessionStorage.getItem('user'))
    }
})

class LoginLogout extends React.Component {
  constructor(props){
    super(props);
  }
  loggedOut(){
    return(<a class="button is-light"><Link to="/login"><strong>Login</strong></Link></a>);
  }
  loggedIn(){
    return(<a class="button is-light" onClick={this.props.state.switchState}><strong>Logout</strong></a>);
  }
  getState(){
    if(this.props.state.signedIn){
      return this.loggedIn();
    }
    return this.loggedOut();
  }
  render(){
    return(
      this.getState()
    );
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {signedIn: false};
    this.switchState = this.switchState.bind(this);
  }
  switchState(){
    requestLogout();
    if(this.state.signedIn){
      document.getElementById('usernameDisplay').innerHTML = "";
      sessionStorage.removeItem('user');
    }
    this.setState(state => (      {
      signedIn: !state.signedIn
    }))
    return;
  }
  render(){ 
    return(
      <Router history={history}>
        <div>
          <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <a class="navbar-item" href="https://en.wikipedia.org/wiki/Scattergories">
                <img src="https://i0.wp.com/blog.townscript.com/wp-content/uploads/2020/04/scattergories.jpg?ssl=1" width="112" height="28"></img>
              </a>

              <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item">
                  <Link to="/home"><strong>Home</strong></Link>
                </a>
              </div>
              <div class="navbar-end">
                <div class="navbar-item">
                  <div class="buttons">
                    <a class="navbar-item">
                      <p id="usernameDisplay"></p>
                    </a>
                    <a class="button is-primary">
                      <Link to="/signup"><strong>Signup</strong></Link>
                    </a>
                    <LoginLogout state = {{
                      signedIn: this.state.signedIn,
                      switchState: this.switchState
                    }}/>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login state = {{
                      signedIn: this.state.signedIn,
                      switchState: this.switchState
                    }}/>
            </Route>
            <Route path="/game">
              <Game state = {{
                      signedIn: this.state.signedIn,
                      switchState: this.switchState
                    }}/>
            </Route>
            <Route path="/">
              <Home state = {{
                      signedIn: this.state.signedIn,
                      switchState: this.switchState
                    }}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );}
}
