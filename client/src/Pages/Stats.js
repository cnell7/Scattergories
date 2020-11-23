import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import history from '../history.js'
import { requestGetStats } from "../Services/GetStatsService.js"

export default class Stats extends React.Component {
    constructor(props){
        super(props);
    }
    async componentDidMount() {
        let r = await requestGetStats();
        document.getElementById('stats').innerHTML += r;
    }
    render(){
        return(
        <div class="section">
            <div class="is-max-desktop">
                <div class="box has-text-centered">
                    <h1 class="title is-2">User: {sessionStorage.getItem('user')}</h1>
                    <p id='stats'>Total wins: </p>
                </div>
            </div>
        </div>);
    }
}