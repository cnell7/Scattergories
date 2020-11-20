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
            <button class="button is-primary is-inverted">Inverted</button>
            <button class="button is-link is-inverted">Inverted</button>
          </div>
        </div>);
      }
      loggedIn(){
        return(<div><button class='button'>Create</button><button class='button'>Join</button></div>);
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