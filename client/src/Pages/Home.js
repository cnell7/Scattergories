import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import history from '../history.js'

class HowTo extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <section class="hero is-danger is-bold mt-4">
          <div class="hero-body">
            <div class="container">
              <h1 class="title has-text-black">
                Scattergories
              </h1>
              <h2 class="subtitle has-text-black">
                How to play
              </h2>
            </div>
          </div>
        </section>
        <div class="container is-max-desktop mt-3 mb-3">
          <div class="box has-background-black has-text-centered">
            <h1 class='title has-text-danger is-3'>
              Press one of the above buttons to get started.
            </h1>
            <p class="content has-text-white is-medium">
              Create button above will start a room for you and your friends. You will be placed into the room as the host and the room code will be displayed.<br></br>
              Your friends can input the game code after clicking the join button above.
            </p>
            <h1 class='title has-text-danger is-3'>
              Rounds
            </h1>
            <p class="content has-text-white is-medium">
              There are 10 rounds in the game. How many rounds left is displayed to the right under the game code.
            </p>
            <h1 class='title has-text-danger is-3'>
              Questions
            </h1>
            <p class="content has-text-white is-medium">
              You are given a letter to the left. The first word of your answer must begin with the key letter.<br></br>
              The articles "A", "An" and "The" cannot be used as key letters.<br></br>
              The same answer cannot be given more than once in the same round.<br></br>
              If two players have the same answer it cancels out and neither gets points.
            </p>
            <h1 class='title has-text-danger is-3'>
              Voting
            </h1>
            <p class="content has-text-white is-medium">
              After the 90 seconds are up for putting in your answers, they will be collected and sent to your friends.<br></br>
              Everyone will vote if your answer is good or bad. If 50% or more like your answer, you will get a point.<br></br>
              Whoever has the most points after the 10 rounds wins.
            </p>
          </div>
        </div>
      </div>);
  }
}

export default class Home extends React.Component {
  constructor(props){
    super(props);
    window.addEventListener('click', (e) => {
      if (e.target.id == 'createRoomButton') {
        history.push('/game');
      }
    })
    window.addEventListener('click', (e) => {
      if (e.target.id == 'joinRoomButton') {
        if(!document.getElementById('joinIDInput')){
          let container = document.createElement('container');
          let box = document.createElement('div')
          let input = document.createElement('input');
          let submit = document.createElement('button');
          container.setAttribute('class', 'container is-max-desktop');
          box.setAttribute('class', 'box has-text-centered')
          input.setAttribute('placeholder', 'Input game ID');
          input.setAttribute('class', 'input is-centered');
          input.setAttribute('id', 'joinIDInput');
          submit.setAttribute('class', 'button is-black has-text-danger mt-3');
          submit.setAttribute('id', 'submitJoinGame');
          submit.innerHTML += 'Submit';
          box.append(input, submit);
          container.append(box);
          document.getElementById('homeContainer').append(container);
        }
      }
    });
    window.addEventListener('click', (e) => {
      if(e.target.id == 'submitJoinGame'){
        history.push('/game');
      }
    })
  }
  loggedOut(){
    return(
    <div id='homeSection' class='section'>
      <h1 class='title is-1 has-text-centered'><strong>Create an account or sign in to play.</strong></h1>
      <div class='container is-max-desktop'>
        <div id='homeContainer' class='box has-background-danger'>
          <div class='buttons is-grouped is-centered'>
            <button id='createRoomButton' class="button is-danger is-inverted is-large is-rounded" disabled>Create</button>
            <button class="button is-danger is-inverted is-large is-rounded" disabled>Join</button>
          </div>
        </div>
      </div>
    </div>);
  }
  loggedIn(user){
    return(
      <div id='homeSection' class='section'>
        <h1 class='title is-1 has-text-centered'><strong>Hi {user}. Click a button below to play.</strong></h1>
        <div class="container is-max-desktop">
          <div id='homeContainer' class='box has-background-danger'>
            <div class='buttons is-grouped is-centered'>
              <button id='createRoomButton' class="button is-danger is-inverted is-large is-rounded">Create</button>
              <button id ='joinRoomButton' class="button is-danger is-inverted is-large is-rounded">Join</button>
            </div>
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
    return (
      <div>
        {this.getState()}
        <HowTo />
      </div>);
}
};