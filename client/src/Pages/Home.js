import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import history from '../history.js'

export default class Home extends React.Component {
  constructor(props){
    super(props);
    window.addEventListener('click', (e) => {
      if (e.target.id == 'createRoomButton') {
          history.push('/game');
      }
    })
  }
  loggedOut(){
    return(
    <div id='homeSection' class='section'>
      <h1 class='title is-1 has-text-centered'><strong>Create an account or sign in to play.</strong></h1>
      <div id='homeContainer' class='container'>
        <div class='buttons is-grouped has-background-danger is-centered'>
          <button id='createRoomButton' class="button is-danger is-inverted" disabled>Create</button>
          <button class="button is-danger is-inverted" disabled>Join</button>
        </div>
      </div>
    </div>);
  }
  loggedIn(user){
    return(
      <div id='homeSection' class='section'>
      <h1 class='title is-1 has-text-centered'><strong>Hi {user}. Click a button below to play.</strong></h1>
      <div id='homeContainer' class='container'>
        <div class='buttons is-grouped has-background-danger is-centered'>
          <button id='createRoomButton' class="button is-danger is-inverted">Create</button>
          <button class="button is-danger is-inverted">Join</button>
        </div>
      </div>
    </div>);
  }
  getState(){
    let currentUser = sessionStorage.getItem('user')
    if(currentUser){
      return this.loggedIn(currentUser);
    }
    return this.loggedOut();
  }
render(){
    return this.getState()
}
};