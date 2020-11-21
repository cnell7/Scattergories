import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import history from '../history.js'

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.players = ["Bob", "Joe", "Kate", "Sarah", "Cade", "Sam"]
        this.categories = ["", "","", "","", "","", "","", "","", ""]
        this.letter = "A";
    }
    render(){
        return(
        <div class="columns">
            <div class="column is-two-fifths">
                <div>
                    <h1>Letter</h1>
                    <h2 class='title is-1'>{this.letter}</h2>
                </div>
                <button class="button">Play</button>
            </div>
            <div class="column is-two-fifths">
                {this.categories.map(cat => {
                    return <input class='input' placeholder={cat}></input>
                })}
            </div>
            <div class="column is-one-fifth">
                <ul>
                    {this.players.map(player => {
                        return <li>{player}</li>
                    })}
                </ul>
                <p id='gameIDGame'></p>
            </div>
          </div>
        );
    }
}