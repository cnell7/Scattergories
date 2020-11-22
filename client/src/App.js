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

class LoginLogout extends React.Component {
  constructor(props){
    super(props);
  }
  loggedOut(){
    return(<a class="button is-light"><Link to="/login"><strong class="has-text-danger">Login</strong></Link></a>);
  }
  loggedIn(){
    return(<a class="button is-light" onClick={this.props.state.switchState}><strong class="has-text-danger">Logout</strong></a>);
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
    if(this.state.signedIn){
      requestLogout();
      history.push('/home');
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
          <nav class="navbar is-danger" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <a class="navbar-item" href="https://en.wikipedia.org/wiki/Scattergories">
                <h1 id='scattergoriesTitle' class="title is-4">Scattergories</h1>
              </a>
            </div>
            <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item">
                  <Link to="/home"><strong class="has-text-white">Home</strong></Link>
                </a>
              </div>
              <div class="navbar-end">
                <div class="navbar-item">
                  <div class="buttons">
                    <a class="navbar-item">
                      <p id="usernameDisplay" class="has-text-white"></p>
                    </a>
                    <a class="button is-danger is-inverted">
                      <Link to="/signup"><strong class="has-text-danger">Signup</strong></Link>
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
