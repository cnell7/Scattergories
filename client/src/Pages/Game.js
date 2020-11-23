import React from 'react';
import '../App.css';

class RoundRecap extends React.Component {
    constructor(props){
        super(props);
        this.players = this.props.state.players;
    }
    render(){
        return(
        <div class="container">
            <div id='recapBox' class="box has-text-centered">
                <h1 class="title is-2">Round Recap</h1>
                <h2 id="currentQuestion" class="title is-4"></h2>
                <ul>
                    <div id='recapColumn' class="columns">
                    </div>
                </ul>
            </div>
        </div>);
    }
}

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.players = ["", "","", "","", ""]
        this.categories = ["", "","", "","", "","", "","", "","", ""]
    }
    render(){
        return(
        <div class="section">
            <div class="columns">
                <div class="column is-one-fifths">
                    <div class="box has-text-centered">
                        <h1 class='title is-3'>Letter</h1>
                        <h1 id='gameLetter' class='title is-1'></h1>
                        <h1 id="time" class="title is-4">90</h1>
                        <button id="playButton" class="button is-black has-text-danger">Play</button>
                    </div>
                </div>
                <div class="column is-three-fifths">
                    <div class="box has-text-centered">
                        <h1 class='title is-3'>Categories</h1>
                            {this.categories.map(cat => {
                                return <input class='input categories'></input>
                            })}
                    </div>
                </div>
                <div class="column is-one-fifth">
                    <div class="box has-text-centered">
                        <h1 id='gameIDGame' class="title is-4 has-text-centered"></h1>
                    </div>
                    <div class="box has-text-centered">
                        <h1 id='gameRoundTitle' class="title is-4 has-text-centered"></h1>
                    </div>
                    <ul>
                        <div class="box has-text-centered">
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
                        </div>
                    </ul>
                </div>
            </div>
        <RoundRecap state={{players: this.players}}/>
        </div>
        );
    }
}