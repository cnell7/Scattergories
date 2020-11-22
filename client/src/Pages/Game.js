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
            <div class="column is-one-fifths">
                <div class="container">
                    <h1 class='title is-3 has-text-centered'>Letter</h1>
                    <h1 id='gameLetter' class='title is-1 has-text-centered'></h1>
                    <h1 id="time" class="title is-4 has-text-centered">90</h1>
                    <div class="box has-text-centered">
                        <button id="playButton" class="button is-black"><strong class="has-text-danger">Play</strong></button>
                    </div>
                </div>
            </div>
            <div class="column is-three-fifths">
                <h1 class='title is-3 has-text-centered'>Categories</h1>
                {this.categories.map(cat => {
                    return <input class='input categories'></input>
                })}
            </div>
            <div class="column is-one-fifth">
                <ul>
                    <div class='columns'>
                        <div class="column">
                            <h1 class='title is-3'>Players</h1>
                                {this.players.map((player, index) => {
                                    return <li class='players'>{player}</li>
                                })}
                        </div>
                        <div class="column">
                            <h1 class='title is-3'>Points</h1>
                            {this.players.map(player => {
                                    return <li class='points'></li>
                            })}
                        </div>
                    </div>
                </ul>
                <h1 id='gameIDGame' class="title is-4 has-text-centered"></h1>
            </div>
          </div>
        );
    }
}