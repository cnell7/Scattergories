import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import history from '../history.js'

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.players = ["", "","", "","", ""]
        this.categories = ["", "","", "","", "","", "","", "","", ""]
    }
    render(){
        return(
        <div class="columns">
            <div class="column is-two-fifths">
                <div>
                    <h1 class='title is-3'>Letter</h1>
                    <h2 id='gameLetter' class='title is-1'></h2>
                </div>
                <div class="container">
                    <h1 id="time" class="title is-4">90</h1>
                    <button id="playButton" class="button">Play</button>
                </div>
            </div>
            <div class="column is-two-fifths">
                <h1 class='title is-3'>Categories</h1>
                {this.categories.map(cat => {
                    return <input class='input categories'></input>
                })}
            </div>
            <div class="column is-one-fifth">
                <ul>
                    <h1 class='title is-3'>Players</h1>
                    {this.players.map((player, index) => {
                        return <li class='players'>{player}</li>
                    })}
                </ul>
                <p id='gameIDGame'></p>
            </div>
          </div>
        );
    }
}