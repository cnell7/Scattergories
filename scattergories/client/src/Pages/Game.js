import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import history from '../history.js'

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.players = ["Bob", "Joe", "Kate", "Sarah", "Cade", "Sam"]
        this.categories = ["Something you would eat","A game you play","Is in this room"]
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
              <ul>
                  {this.players.map(player => {
                      return <li>{player}</li>
                  })}
              </ul>
            </div>
            <div class="column is-two-fifths">
                {this.categories.map(cat => {
                    return <h1 class='title is-3'>{cat}</h1>
                })}
                <div>
                    <input class='input' placeholder='Type your answer here.'></input>
                </div>
            </div>
            <div class="column is-one-fifth">
                <button class="button">Play</button>
            </div>
          </div>
        );
    }
}