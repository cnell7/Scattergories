import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export class GameForm extends React.Component {
  constructor(props){
    super(props);
  }
  getState(){
    let state = this.props.state.toString();
    if(state == 'null'){
      return;
    }else if(state == 'create'){
      return(<p>create</p>);
    } else {
      return(<p>join</p>);
    }
  }
  render(){
    return(this.getState());
  }
}

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {renderedForm: 'null'}
        this.setState = this.setState.bind(this);
      }
      setState(s){
        this.state.renderedForm = s;
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
              <button class="button is-danger is-inverted" onClick='e.preventDefault(); this.setState("create")'>Create</button>
              <button class="button is-danger is-inverted" onClick='e.preventDefault(); this.setState("join")'>Join</button>
            </div>
          </div>
          <GameForm state={this.state.renderedForm}/>
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