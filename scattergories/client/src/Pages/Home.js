import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export class GameForm extends React.Component {
  constructor(props){
    super(props);
  }
  getState(){
    if(this.props.state.renderedForm == 'null'){
      return(<p></p>);
    }else if(this.props.state.renderedForm == 'create'){
      return(<button class='button' onClick={this.createRoom()}>Create</button>);
    } else {
      return(<button class='button'>Join</button>);
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
      setForm(s){
        this.setState({renderedForm: s})
        return;
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
      loggedIn(user){
        return(
          <div class='section'>
          <h1 class='title is-1 has-text-centered'><strong>Hi {user}. Click a button below to play.</strong></h1>
          <div id='homeContainer' class='container'>
            <div class='buttons is-grouped has-background-danger is-centered'>
              <button class="button is-danger is-inverted" onClick={()=>{this.setForm('create')}}>Create</button>
              <button class="button is-danger is-inverted" onClick={()=>{this.setForm('join')}}>Join</button>
            </div>
          </div>
          <GameForm state={{ renderedForm: this.state.renderedForm}}/>
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