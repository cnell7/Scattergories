import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props){
        super(props);
      }
      loggedOut(){
        return(<p>Create an account or sign in to play.</p>);
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