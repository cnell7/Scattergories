import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props){
        super(props);
      }
      loggedOut(){
        return(
        <div class='section'>
          <h1 class='title is-1 has-text-centered'><strong>Create an account or sign in to play.</strong></h1>
          <div id='homeContainer' class='container'>
            <div class='buttons is-grouped has-background-danger is-centered'>
              <button class="button is-danger is-inverted" disabled>Create</button>
              <button class="button is-danger is-inverted" disabled>Join</button>
            </div>
          </div>
        </div>);
      }
      loggedIn(){
        return(
          <div class='section'>
          <h1 class='title is-1 has-text-centered'><strong>Click a button below to play.</strong></h1>
          <div id='homeContainer' class='container'>
            <div class='buttons is-grouped has-background-danger is-centered'>
              <button class="button is-danger is-inverted">Create</button>
              <button class="button is-danger is-inverted">Join</button>
            </div>
          </div>
        </div>);
      }
      getState(){
        if(this.props.state.signedIn){
          return this.loggedIn();
        }
        return this.loggedOut();
      }
    render(){
        return this.getState()
    }
};