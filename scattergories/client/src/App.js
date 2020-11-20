import React from "react";
import Home from "./Pages/Home.js"
import Signup from "./Pages/Signup.js"
import Login from "./Pages/Login.js"
import { requestLogout } from "./Services/LogoutService"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class LoginLogout extends React.Component {
  constructor(props){
    super(props)
    this.state = {signedIn: false};
    this.switchState = this.switchState.bind(this);
  }
  loggedOut(){
    return(<a class="button is-light" onClick={this.switchState}><Link to="/login"><strong>Login</strong></Link></a>);
  }
  loggedIn(){
    return(<a class="button is-light" onClick={this.switchState}><Link to="/logout"><strong>Logout</strong></Link></a>);
  }
  switchState(){
    console.log('hi');
    this.setState(state => ({
      signedIn: !state.signedIn
    }))
  }
  getState(){
    if(this.state.signedIn){
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

export default function App() {
  return (
    <Router>
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
                  <LoginLogout />
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
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
