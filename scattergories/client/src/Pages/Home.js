import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export class GameForm extends React.Component {
  constructor(props){
    super(props);
  }
  getState(){
    console.log(this.props.state.renderedForm);
    if(this.props.state.renderedForm == 'null'){
      return(<p></p>);
    }else if(this.props.state.renderedForm == 'create'){
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
      loggedIn(){
        return(
          <div class='section'>
          <h1 class='title is-1 has-text-centered'><strong>Click a button below to play.</strong></h1>
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
        if(this.props.state.signedIn){
          return this.loggedIn();
        }
        return this.loggedOut();
      }
    render(){
        return this.getState()
    }
};