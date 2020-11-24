import React from 'react';
import '../App.css';
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
        <div class="section mt-5">
            <div class="columns is-centered">
                <div class="column is-one-quarter has-text-centered has-background-black">
                    <h1 class="title is-2 has-text-danger">User: {sessionStorage.getItem('user')}</h1>
                    <p id='stats' class="content has-text-danger is-medium">Total wins: </p>
                </div>
            </div>
        </div>);
    }
}